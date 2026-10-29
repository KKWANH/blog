import fs from 'node:fs'
import path from 'node:path'
import { createHash, randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
/* contents/about/repository-hidden.json names repositories kept out of the public catalogue. */
export function repositoryIndex(catalogue, hidden = {}) {
  const shown = catalogue.repositories.filter(({ name }) => !Object.hasOwn(hidden, name))
  return {
    version: 1,
    revision: createHash('sha256').update(JSON.stringify(catalogue)).digest('hex'),
    reviewedAt: catalogue.reviewedAt,
    syncedAt: catalogue.syncedAt,
    count: shown.length,
    inspectedFiles: shown.reduce((total, repo) => total + repo.sources.length, 0),
    repositories: shown.map(({ name, url, description, scope, scopeNote, status, commit, updatedAt, sources, technologies }) => ({
      name, url, description, scope, scopeNote, status, commit, updatedAt,
      sourceCount: sources.length,
      technologies: technologies.map(({ id, label, group }) => ({ id, label, group })),
    })),
  }
}
export function ensureRepositoryIndex() {
  const catalogue = JSON.parse(fs.readFileSync(path.join(root, 'contents/about/repositories.generated.json'), 'utf8'))
  const hidden = JSON.parse(fs.readFileSync(path.join(root, 'contents/about/repository-hidden.json'), 'utf8')).repositories
  const contents = JSON.stringify(repositoryIndex(catalogue, hidden), null, 2) + '\n'
  const file = path.join(root, 'contents/about/repositories.index.json')
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === contents) return false
  const temporary = `${file}.${randomUUID()}.tmp`
  try { fs.writeFileSync(temporary, contents, { flag: 'wx' }); fs.renameSync(temporary, file) }
  finally { if (fs.existsSync(temporary)) fs.unlinkSync(temporary) }
  return true
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(ensureRepositoryIndex() ? 'Repository index updated.' : 'Repository index current.')
}
