import fs from 'node:fs/promises'
import path from 'node:path'

const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
}

export async function readStudioFile(root: string, segments: string[]) {
  if (segments.some((part) => !part || part.startsWith('.') || /[\\/:\0]/.test(part))) return null
  try {
    const realRoot = await fs.realpath(root)
    let candidate = path.resolve(realRoot, ...segments)
    const directory = (await fs.stat(candidate)).isDirectory()
    if (directory) candidate = path.join(candidate, 'index.html')
    const file = await fs.realpath(candidate)
    const relative = path.relative(realRoot, file)
    if (!relative || relative.startsWith(`..${path.sep}`) || relative === '..' || path.isAbsolute(relative)) return null
    const type = types[path.extname(file).toLowerCase()]
    if (!type || !(await fs.stat(file)).isFile()) return null
    return { type, directory, data: await fs.readFile(file) }
  } catch {
    return null
  }
}
