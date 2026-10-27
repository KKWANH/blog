import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import seed from '@/contents/about/skill-profile.json'
import { skillProfileSchema, type SkillPatch, type SkillProfile } from '@/lib/skill-preferences'
import { applySkillPatch, skillSnapshot, SkillStoreError } from '@/lib/skill-data'

const globalStore = globalThis as typeof globalThis & { __kwanhoSkillWrites?: Map<string, Promise<void>> }
const writes = globalStore.__kwanhoSkillWrites ??= new Map()

export function createSkillStore(filePath: string, initial: unknown = seed) {
  const file = path.resolve(filePath)
  function readDocument(): SkillProfile {
    try {
      return skillProfileSchema.parse(JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '')))
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return skillProfileSchema.parse(initial)
      throw error
    }
  }
  async function save(revision: string, patch: SkillPatch) {
    const previous = writes.get(file) ?? Promise.resolve()
    const result = previous.then(async () => {
      const current = readDocument(), next = applySkillPatch(current, revision, patch)
      if (next === current) return skillSnapshot(current)
      await fs.promises.mkdir(path.dirname(file), { recursive: true })
      const temporary = `${file}.${randomUUID()}.tmp`
      try {
        await fs.promises.writeFile(temporary, JSON.stringify(next, null, 2) + '\n', { flag: 'wx' })
        if (skillSnapshot(readDocument()).revision !== revision) throw new SkillStoreError('The skill file changed during saving. Reload before continuing.', 409)
        await fs.promises.rename(temporary, file)
      } finally {
        await fs.promises.unlink(temporary).catch((error: NodeJS.ErrnoException) => {
          if (error.code !== 'ENOENT') throw error
        })
      }
      return skillSnapshot(next)
    })
    const tail = result.then(() => undefined, () => undefined)
    writes.set(file, tail)
    void tail.then(() => { if (writes.get(file) === tail) writes.delete(file) })
    return result
  }
  return { read: () => skillSnapshot(readDocument()), save }
}
export function skillStore() {
  return createSkillStore(process.env.SKILL_PROFILE_PATH ?? path.join(process.cwd(), 'contents', 'about', 'skill-profile.json'))
}
