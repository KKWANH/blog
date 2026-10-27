import { createHash, randomUUID } from 'node:crypto'
import { z } from 'zod'
import countries from 'i18n-iso-countries'
import countryNames from 'i18n-iso-countries/langs/en.json'
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
export const travelDocumentSchema = z.object({
  version: z.literal(1),
  updatedAt: z.string().datetime().nullable(),
  places: z.array(storedPlaceSchema).max(5000),
}).strict().refine((data) => new Set(data.places.map((place) => place.id)).size === data.places.length, 'Place IDs must be unique.')

export type TravelDocument = z.infer<typeof travelDocumentSchema>
export type PlaceInput = z.infer<typeof placeInputSchema>
export type TravelMutation =
  | { type: 'create'; place: PlaceInput }
  | { type: 'edit'; id: string; place: PlaceInput }
  | { type: 'remove'; id: string }
  | { type: 'restore'; place: TravelCity }

export class TravelStoreError extends Error {
  constructor(message: string, public status: number) { super(message) }
}

export function travelSnapshot(document: TravelDocument): TravelSnapshot {
  return {
    places: document.places,
    updatedAt: document.updatedAt,
    revision: createHash('sha256').update(JSON.stringify(document)).digest('hex'),
  }
}

function locationKey(place: Pick<TravelCity, 'city' | 'countryCode'>) {
  return `${place.city.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase()}|${place.countryCode}`
}

function makePlace(input: PlaceInput, id: string): TravelCity {
  const parsed = placeInputSchema.parse(input)
  return { ...parsed, id, country: countries.getName(parsed.countryCode, 'en') ?? parsed.countryCode }
}

export function applyTravelMutation(current: TravelDocument, revision: string, change: TravelMutation): TravelDocument {
  if (travelSnapshot(current).revision !== revision) {
    throw new TravelStoreError('The atlas changed in another tab. Reload it before saving.', 409)
  }
  let places = current.places
  if (change.type === 'create') {
    const place = makePlace(change.place, `place-${randomUUID()}`)
    if (places.some((entry) => locationKey(entry) === locationKey(place))) {
      throw new TravelStoreError('This place is already in the atlas. Edit its existing entry instead.', 409)
    }
    places = [...places, place]
  } else if (change.type === 'restore') {
    const place = storedPlaceSchema.parse(change.place)
    if (places.some((entry) => entry.id === place.id)) throw new TravelStoreError('That entry already exists.', 409)
    places = [...places, place]
  } else {
    const previous = places.find((place) => place.id === change.id)
    if (!previous) throw new TravelStoreError('This entry no longer exists. Reload the atlas.', 404)
    if (change.type === 'remove') places = places.filter((place) => place.id !== change.id)
    else {
      const next = makePlace(change.place, change.id)
      if (next.countryCode === previous.countryCode) next.country = previous.country
      if (locationKey(next) !== locationKey(previous) && places.some((place) => place.id !== change.id && locationKey(place) === locationKey(next))) {
        throw new TravelStoreError('An entry with that city and country already exists.', 409)
      }
      places = places.map((place) => place.id === change.id ? next : place)
    }
  }
  return travelDocumentSchema.parse({ version: 1, updatedAt: new Date().toISOString(), places })
}

export function countryOptions() {
  return Object.entries(countries.getNames('en')).map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
