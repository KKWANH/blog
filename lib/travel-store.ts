import fs from 'node:fs'
import path from 'node:path'
import { createHash, randomUUID } from 'node:crypto'
import { z } from 'zod'
import countries from 'i18n-iso-countries'
import countryNames from 'i18n-iso-countries/langs/en.json'
import seed from '@/contents/travel/places.json'
import { StayLevel, type TravelCity, type TravelSnapshot } from '@/components/travel/travel-types'

countries.registerLocale(countryNames)

const text = z.string().trim().min(1).max(100)
export const placeInputSchema = z.object({
  city: text,
  countryCode: z.string().trim().toUpperCase().length(2).refine((code) => countries.isValid(code), 'Choose a valid country.'),
  level: z.nativeEnum(StayLevel),
  lat: z.number().finite().min(-90).max(90),
  lng: z.number().finite().min(-180).max(180),
}).strict()
export const placeIdSchema = z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/)
export const storedPlaceSchema = placeInputSchema.extend({ id: placeIdSchema, country: text })
const documentSchema = z.object({
  version: z.literal(1),
  updatedAt: z.string().datetime().nullable(),
  places: z.array(storedPlaceSchema).max(5000),
}).strict().refine((data) => new Set(data.places.map((place) => place.id)).size === data.places.length, 'Place IDs must be unique.')

type TravelDocument = z.infer<typeof documentSchema>
export type PlaceInput = z.infer<typeof placeInputSchema>

export class TravelStoreError extends Error {
  constructor(message: string, public status: number) { super(message) }
}

const globalStore = globalThis as typeof globalThis & { __kwanhoTravelWrites?: Map<string, Promise<void>> }
const writes = globalStore.__kwanhoTravelWrites ??= new Map()

function snapshot(document: TravelDocument): TravelSnapshot {
  return {
    places: document.places,
    updatedAt: document.updatedAt,
    revision: createHash('sha256').update(JSON.stringify(document)).digest('hex'),
  }
}

function locationKey(place: Pick<TravelCity, 'city' | 'countryCode'>) {
  return `${place.city.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase()}|${place.countryCode}`
}

export function createTravelStore(filePath: string, initial: unknown = seed) {
  const file = path.resolve(filePath)
  function readDocument(): TravelDocument {
    try {
      return documentSchema.parse(JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '')))
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return documentSchema.parse(initial)
      throw error
    }
  }

  async function update(revision: string, transform: (places: TravelCity[]) => TravelCity[]) {
    const previous = writes.get(file) ?? Promise.resolve()
    const result = previous.then(async () => {
      const current = readDocument()
      if (snapshot(current).revision !== revision) {
        throw new TravelStoreError('The atlas changed in another tab. Reload it before saving.', 409)
      }
      const next = documentSchema.parse({
        version: 1,
        updatedAt: new Date().toISOString(),
        places: transform(current.places),
      })
      await fs.promises.mkdir(path.dirname(file), { recursive: true })
      const temporary = `${file}.${randomUUID()}.tmp`
      try {
        await fs.promises.writeFile(temporary, JSON.stringify(next, null, 2) + '\n', { flag: 'wx' })
        await fs.promises.rename(temporary, file)
      } finally {
        await fs.promises.unlink(temporary).catch((error: NodeJS.ErrnoException) => {
          if (error.code !== 'ENOENT') throw error
        })
      }
      return snapshot(next)
    })
    const tail = result.then(() => undefined, () => undefined)
    writes.set(file, tail)
    void tail.then(() => { if (writes.get(file) === tail) writes.delete(file) })
    return result
  }

  function makePlace(input: PlaceInput, id: string): TravelCity {
    const parsed = placeInputSchema.parse(input)
    return { ...parsed, id, country: countries.getName(parsed.countryCode, 'en') ?? parsed.countryCode }
  }

  return {
    read: () => snapshot(readDocument()),
    create: (input: PlaceInput, revision: string) => update(revision, (places) => {
      const id = `place-${randomUUID()}`
      const next = makePlace(input, id)
      if (places.some((place) => place.id === id)) throw new TravelStoreError('That entry already exists.', 409)
      if (places.some((place) => locationKey(place) === locationKey(next))) {
        throw new TravelStoreError('This place is already in the atlas. Edit its existing entry instead.', 409)
      }
      return [...places, next]
    }),
    restore: (input: TravelCity, revision: string) => update(revision, (places) => {
      const place = storedPlaceSchema.parse(input)
      if (places.some((entry) => entry.id === place.id)) throw new TravelStoreError('That entry already exists.', 409)
      return [...places, place]
    }),
    edit: (id: string, input: PlaceInput, revision: string) => update(revision, (places) => {
      const current = places.find((place) => place.id === id)
      if (!current) throw new TravelStoreError('This entry no longer exists. Reload the atlas.', 404)
      const next = makePlace(input, id)
      if (next.countryCode === current.countryCode) next.country = current.country
      if (locationKey(next) !== locationKey(current) && places.some((place) => place.id !== id && locationKey(place) === locationKey(next))) {
        throw new TravelStoreError('An entry with that city and country already exists.', 409)
      }
      return places.map((place) => place.id === id ? next : place)
    }),
    remove: (id: string, revision: string) => update(revision, (places) => {
      if (!places.some((place) => place.id === id)) throw new TravelStoreError('This entry no longer exists. Reload the atlas.', 404)
      return places.filter((place) => place.id !== id)
    }),
  }
}

export function travelStore() {
  return createTravelStore(process.env.TRAVEL_STORE_PATH ?? path.join(process.cwd(), 'contents', 'travel', 'places.json'))
}

export function countryOptions() {
  return Object.entries(countries.getNames('en')).map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
