import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { CONTENT_ROOT } from '@/lib/content';

export const runtime = 'nodejs';

function contentTypeFor(file: string) {
  const ext = path.extname(file).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    case '.webp': return 'image/webp';
    case '.svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: segments } = await params;
    const target = path.join(CONTENT_ROOT, ...segments);
    const resolvedRoot = path.resolve(CONTENT_ROOT);
    const resolvedTarget = path.resolve(target);
    if (!resolvedTarget.startsWith(resolvedRoot)) {
      return new NextResponse('Forbidden', { status: 403 });
    }
    if (!fs.existsSync(resolvedTarget) || !fs.statSync(resolvedTarget).isFile()) {
      return new NextResponse('Not found', { status: 404 });
    }
    const data = fs.readFileSync(resolvedTarget);
    const res = new NextResponse(data, { status: 200 });
    res.headers.set('Content-Type', contentTypeFor(resolvedTarget));
    res.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return res;
  } catch {
    return new NextResponse('Error', { status: 500 });
  }
}
