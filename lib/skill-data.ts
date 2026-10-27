import { createHash } from 'node:crypto'
import { skillPatchSchema, skillProfileSchema, type SkillPatch, type SkillProfile } from '@/lib/skill-preferences'

export class SkillStoreError extends Error {
  constructor(message: string, public status: number) { super(message) }
}
export type SkillSnapshot = {
  profile: SkillProfile
  revision: string
  publication?: { commit?: string; url?: string }
}
export function skillSnapshot(profile: SkillProfile): SkillSnapshot {
  return { profile, revision: createHash('sha256').update(JSON.stringify(profile)).digest('hex') }
}
export function applySkillPatch(current: SkillProfile, revision: string, rawPatch: SkillPatch, now = new Date().toISOString()): SkillProfile {
  if (skillSnapshot(current).revision !== revision) throw new SkillStoreError('Skill settings changed. Reload the latest file before saving.', 409)
  const patch = skillPatchSchema.parse(rawPatch)
  const entries = { ...current.entries }
  for (const [id, value] of Object.entries(patch)) {
    if (value === null) delete entries[id]
    else entries[id] = value
  }
  const sorted = Object.fromEntries(Object.entries(entries).sort(([a], [b]) => a.localeCompare(b)))
  if (JSON.stringify(sorted) === JSON.stringify(Object.fromEntries(Object.entries(current.entries).sort(([a], [b]) => a.localeCompare(b))))) return current
  return skillProfileSchema.parse({ version: 1, updatedAt: now, entries: sorted })
}
