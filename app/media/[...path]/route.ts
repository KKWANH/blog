import fs from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { CONTENT_ROOT } from '@/lib/content-paths'
import { createHash } from 'node:crypto'
import { pathWithin, safeContentSegments } from '@/lib/content-safety'
import routes from '@/contents/public-routes.generated.json'

export const runtime = 'nodejs'

function contentTypeFor(filePath: string) {
  const extension = path.extname(filePath).toLowerCase()
  switch (extension) {
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.gif':
      return 'image/gif'
    case '.webp':
      return 'image/webp'
    case '.svg':
      return 'image/svg+xml'
    default:
      return null
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path: segments } = await params
    if (!safeContentSegments(segments)) return new NextResponse('Not found', { status: 404 })
    if (segments.some((segment) => segment.startsWith('_') && !['_media', '_assets'].includes(segment)) ||
      !segments.slice(0, -1).some((_segment, index) => routes.paths.includes('/' + segments.slice(0, index + 1).map(encodeURIComponent).join('/')))) return new NextResponse('Not found', { status: 404 })
    const targetPath = path.join(CONTENT_ROOT, ...segments)
    const resolvedRoot = path.resolve(CONTENT_ROOT)
    const resolvedTarget = path.resolve(targetPath)

    if (!pathWithin(resolvedRoot, resolvedTarget)) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    if (!fs.existsSync(resolvedTarget) || !fs.statSync(resolvedTarget).isFile()) {
      return new NextResponse('Not found', { status: 404 })
    }
    const realRoot = fs.realpathSync(resolvedRoot), realTarget = fs.realpathSync(resolvedTarget)
    const type = contentTypeFor(realTarget)
    if (!pathWithin(realRoot, realTarget) || !type || !contentTypeFor(resolvedTarget) || fs.statSync(realTarget).size > 10_000_000) return new NextResponse('Not found', { status: 404 })
    const data = fs.readFileSync(realTarget)
    const etag = `"${createHash('sha256').update(data).digest('hex')}"`
    const headers = { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'public, max-age=3600, s-maxage=86400', ETag: etag }
    if (request.headers.get('if-none-match') === etag) return new NextResponse(null, { status: 304, headers })
    const response = new NextResponse(data, { status: 200 })
    for (const [name, value] of Object.entries(headers)) response.headers.set(name, value)
    if (type === 'image/svg+xml') response.headers.set('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; sandbox")
    return response
  } catch {
    return new NextResponse('Error', { status: 500 })
  }
}
