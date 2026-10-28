import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export function ensurePublicRoutes() {
  const content = path.join(root, 'contents'), routes = new Set(['/'])
  function visit(directory, segments = []) {
    if (segments.some((segment) => segment.startsWith('.') || ['admin', 'api', 'studio', 'editor'].includes(segment))) return
    const names = fs.readdirSync(directory, { withFileTypes: true })
    if (segments.length && names.some((entry) => entry.isFile() && /^index\.(?:md|mdx|tsx|ts)$/.test(entry.name))) routes.add('/' + segments.map(encodeURIComponent).join('/'))
    for (const entry of names) if (entry.isDirectory()) visit(path.join(directory, entry.name), [...segments, entry.name])
  }
  visit(content)
  routes.delete('/projects')
  routes.add('/cv')
  const photos = JSON.parse(fs.readFileSync(path.join(content, 'photography/photos.json'), 'utf8'))
  const travel = JSON.parse(fs.readFileSync(path.join(content, 'photography/travel-galleries.json'), 'utf8'))
  if ((photos.published && photos.items.length) || travel.galleries.length) routes.add('/photography')
  else routes.delete('/photography')
  const file = path.join(root, 'contents/public-routes.generated.json'), output = JSON.stringify({ version: 1, paths: [...routes].sort() }, null, 2) + '\n'
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === output) return false
  fs.writeFileSync(file, output)
  return true
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) console.log(ensurePublicRoutes() ? 'Public route index updated.' : 'Public route index current.')
