import fs from 'node:fs'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { CONTENT_ROOT } from '@/lib/content-paths'

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
      return 'application/octet-stream'
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path: segments } = await params
    const targetPath = path.join(CONTENT_ROOT, ...segments)
    const resolvedRoot = path.resolve(CONTENT_ROOT)
    const resolvedTarget = path.resolve(targetPath)

    if (!resolvedTarget.startsWith(resolvedRoot)) {
      return new NextResponse('Forbidden', { status: 403 })
    }

    if (!fs.existsSync(resolvedTarget) || !fs.statSync(resolvedTarget).isFile()) {
      return new NextResponse('Not found', { status: 404 })
    }

    const data = fs.readFileSync(resolvedTarget)
    const response = new NextResponse(data, { status: 200 })
    response.headers.set('Content-Type', contentTypeFor(resolvedTarget))
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    return response
  } catch {
    return new NextResponse('Error', { status: 500 })
  }
}
