import { applyTravelMutation, travelDocumentSchema, travelSnapshot, TravelStoreError, type PlaceInput, type TravelMutation } from '@/lib/travel-data'
import type { TravelCity } from '@/components/travel/travel-types'

const repository = 'KKWANH/blog'
const branch = 'main'
const file = 'contents/travel/places.json'
const endpoint = `https://api.github.com/repos/${repository}/contents/${file}`

export function createGitHubTravelStore(accessToken: string, request: typeof fetch = fetch) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'kwanho-travel-editor',
  }
  async function current() {
    const response = await request(`${endpoint}?ref=${branch}`, { headers, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(12_000) })
    if (!response.ok) throw new TravelStoreError('GitHub could not read the atlas. Check the app installation and repository access.', 503)
    const data = await response.json()
    if (data.type !== 'file' || data.encoding !== 'base64' || typeof data.sha !== 'string' || typeof data.content !== 'string') {
      throw new TravelStoreError('The saved atlas could not be read. No changes were made.', 503)
    }
    const document = travelDocumentSchema.parse(JSON.parse(Buffer.from(data.content, 'base64').toString('utf8').replace(/^\uFEFF/, '')))
    return { document, sha: data.sha }
  }

  async function update(revision: string, change: TravelMutation) {
    const previous = await current()
    const document = applyTravelMutation(previous.document, revision, change)
    const contents = JSON.stringify(document, null, 2) + '\n'
    if (Buffer.byteLength(contents) > 900_000) throw new TravelStoreError('This atlas is too large for the repository editor.', 413)
    const response = await request(endpoint, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        message: `Update travel atlas (${change.type})`,
        content: Buffer.from(contents).toString('base64'),
        sha: previous.sha,
        branch,
      }),
    })
    if (response.status === 409 || response.status === 422) throw new TravelStoreError('The atlas changed while saving. Reload it before continuing.', 409)
    if (response.status === 401 || response.status === 403) throw new TravelStoreError('GitHub did not allow this change. Check the app’s Contents permission and sign in again.', 403)
    if (!response.ok) throw new TravelStoreError('The save could not be confirmed. Reload the atlas before trying again.', 503)
    const saved = await response.json()
    return { ...travelSnapshot(document), publication: { commit: saved.commit?.sha, url: saved.commit?.html_url } }
  }
  return {
    read: async () => travelSnapshot((await current()).document),
    create: (place: PlaceInput, revision: string) => update(revision, { type: 'create', place }),
    restore: (place: TravelCity, revision: string) => update(revision, { type: 'restore', place }),
    edit: (id: string, place: PlaceInput, revision: string) => update(revision, { type: 'edit', id, place }),
    remove: (id: string, revision: string) => update(revision, { type: 'remove', id }),
  }
}
