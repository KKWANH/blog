import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { countryOptions, placeIdSchema, placeInputSchema, storedPlaceSchema, travelStore, TravelStoreError } from '@/lib/travel-store'
import { travelOwner } from '@/lib/travel-owner'
import { ownerAuthConfigured } from '@/lib/owner-auth'
import { HttpInputError, readJsonBody } from '@/lib/http-input'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
const revision = z.string().regex(/^[a-f0-9]{64}$/)
const createSchema = z.union([
  z.object({ revision, place: placeInputSchema }).strict(),
  z.object({ revision, restore: storedPlaceSchema }).strict(),
])
const editSchema = z.object({ revision, id: placeIdSchema, place: placeInputSchema }).strict()
const removeSchema = z.object({ revision, id: placeIdSchema }).strict()
const json = (body: unknown, status = 200) => Response.json(body, { status, headers })

export async function GET(request: Request) {
  let owner: Awaited<ReturnType<typeof travelOwner>> = null
  try {
    owner = await travelOwner(request)
    const query = new URL(request.url).searchParams.get('q')
    if (query !== null) {
      if (!owner) return json({ error: 'Sign in as the site owner to look up locations.' }, 403)
      if (query.trim().length < 2 || query.length > 80) return json({ locations: [] })
      const { searchTravelLocations } = await import('@/lib/travel')
      return json({ locations: searchTravelLocations(query) })
    }
    return json({
      ...(owner ? await owner.store.read() : travelStore().read()),
      editor: owner ? { token: owner.token, countries: countryOptions(), mode: owner.mode } : null,
      ownerSignInAvailable: ownerAuthConfigured(),
    })
  } catch (error) {
    console.error('Travel atlas read failed', error)
    return json({
      error: error instanceof TravelStoreError ? error.message : 'The atlas could not be loaded. No saved data was replaced.',
      editor: owner ? { token: owner.token, countries: countryOptions(), mode: owner.mode } : null,
      ownerSignInAvailable: ownerAuthConfigured(),
    }, 500)
  }
}

async function mutate(request: Request, method: 'POST' | 'PATCH' | 'DELETE') {
  const owner = await travelOwner(request)
  if (!owner?.canWrite) return json({ error: 'Owner access is required. Sign in again if your session expired.' }, 403)
  try {
    const body = await readJsonBody(request, 16_384)
    const store = owner.store
    let result
    if (method === 'POST') {
      const input = createSchema.parse(body)
      result = 'restore' in input ? await store.restore(input.restore, input.revision) : await store.create(input.place, input.revision)
    } else if (method === 'PATCH') {
      const input = editSchema.parse(body)
      result = await store.edit(input.id, input.place, input.revision)
    } else {
      const input = removeSchema.parse(body)
      result = await store.remove(input.id, input.revision)
    }
    try { revalidatePath('/travel') } catch (error) {
      console.warn('Travel data saved; page revalidation did not complete', error)
    }
    return json(result, method === 'POST' ? 201 : 200)
  } catch (error) {
    if (error instanceof HttpInputError) return json({ error: error.message }, error.status)
    if (error instanceof z.ZodError) return json({ error: 'Check the place details.', fields: error.flatten().fieldErrors }, 422)
    if (error instanceof TravelStoreError) return json({ error: error.message }, error.status)
    console.error('Travel atlas save failed')
    return json({ error: 'The save could not be confirmed. Reload the atlas before trying again.' }, 500)
  }
}

export const POST = (request: Request) => mutate(request, 'POST')
export const PATCH = (request: Request) => mutate(request, 'PATCH')
export const DELETE = (request: Request) => mutate(request, 'DELETE')
