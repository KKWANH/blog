import { repositoryRecord, repositoryRevision } from '@/lib/repository-records'

export const runtime = 'nodejs'

export async function GET(request: Request, context: { params: Promise<{ name: string }> }) {
  const { name } = await context.params
  if (!/^[A-Za-z0-9_.-]{1,100}$/.test(name)) return Response.json({ error: 'Unknown repository.' }, { status: 404 })
  const record = repositoryRecord(name)
  if (!record) return Response.json({ error: 'Unknown repository.' }, { status: 404 })
  const requestedRevision = new URL(request.url).searchParams.get('revision')
  if (requestedRevision && requestedRevision !== repositoryRevision) return Response.json({ error: 'The catalogue changed. Reload the profile.' }, { status: 409, headers: { 'Cache-Control': 'no-store' } })
  const etag = `"${repositoryRevision}-${name}"`
  const headers = { 'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400', 'X-Content-Type-Options': 'nosniff', ETag: etag }
  if (request.headers.get('if-none-match') === etag) return new Response(null, { status: 304, headers })
  return Response.json({ revision: repositoryRevision, repository: record }, { headers })
}
