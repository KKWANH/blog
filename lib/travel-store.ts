import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import seed from '@/contents/travel/places.json'
import type { TravelCity } from '@/components/travel/travel-types'
import { applyTravelMutation, travelDocumentSchema, travelSnapshot, type TravelDocument, type PlaceInput, type TravelMutation } from '@/lib/travel-data'
export { countryOptions, placeIdSchema, placeInputSchema, storedPlaceSchema, TravelStoreError } from '@/lib/travel-data'
export type { PlaceInput } from '@/lib/travel-data'

const globalStore = globalThis as typeof globalThis & { __kwanhoTravelWrites?: Map<string, Promise<void>> }
const writes = globalStore.__kwanhoTravelWrites ??= new Map()

export function createTravelStore(filePath: string, initial: unknown = seed) {
  const file = path.resolve(filePath)
  function readDocument(): TravelDocument {
    try {
      return travelDocumentSchema.parse(JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '')))
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return travelDocumentSchema.parse(initial)
      throw error
    }
  }

  async function update(revision: string, change: TravelMutation) {
    const previous = writes.get(file) ?? Promise.resolve()
    const result = previous.then(async () => {
      const current = readDocument()
      const next = applyTravelMutation(current, revision, change)
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
      return travelSnapshot(next)
    })
    const tail = result.then(() => undefined, () => undefined)
    writes.set(file, tail)
    void tail.then(() => { if (writes.get(file) === tail) writes.delete(file) })
    return result
  }

  return {
    read: () => travelSnapshot(readDocument()),
    create: (place: PlaceInput, revision: string) => update(revision, { type: 'create', place }),
    restore: (place: TravelCity, revision: string) => update(revision, { type: 'restore', place }),
    edit: (id: string, place: PlaceInput, revision: string) => update(revision, { type: 'edit', id, place }),
    remove: (id: string, revision: string) => update(revision, { type: 'remove', id }),
  }
}

export function travelStore() {
  return createTravelStore(process.env.TRAVEL_STORE_PATH ?? path.join(process.cwd(), 'contents', 'travel', 'places.json'))
}
