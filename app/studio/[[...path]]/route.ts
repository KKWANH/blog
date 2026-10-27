import { localDevelopmentRequest } from '@/lib/travel-editor-access'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  // A compile-time guard keeps the private filesystem reader out of production.
  if (process.env.NODE_ENV !== 'development') return new Response('Not found', { status: 404 })
  const root = process.env.DEV_STUDIO_DIR
  if (!root || !localDevelopmentRequest(request)) return new Response('Not found', { status: 404 })
  const { path: segments = [] } = await params
  // Explicit index paths keep relative assets correct without a second origin.
  if (!segments.length) return Response.redirect(new URL('/studio/index.html', request.url), 307)
  const { readStudioFile } = await import('@/lib/local-studio')
  const file = await readStudioFile(root, segments)
  if (!file) return new Response('Not found', { status: 404 })
  if (file.directory) return Response.redirect(new URL(`/studio/${segments.map(encodeURIComponent).join('/')}/index.html`, request.url), 307)
  return new Response(new Uint8Array(file.data), {
    headers: {
      'Content-Type': file.type,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'self'; frame-ancestors 'self'",
    },
  })
}
