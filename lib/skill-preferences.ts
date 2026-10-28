export const familiarityLevels = [
  { id: 'learning', label: 'Learning', detail: 'Currently learning or refreshing the basics.' },
  { id: 'used', label: 'Used before', detail: 'Have used it in a project; may need a refresh.' },
  { id: 'comfortable', label: 'Comfortable', detail: 'Comfortable using it independently.' },
  { id: 'strong', label: 'Strong', detail: 'Can use it confidently and explain the important decisions.' },
] as const
export type FamiliarityLevel = typeof familiarityLevels[number]['id']
export const visibilityOptions = [
  { id: 'profile', label: 'Show on profile' },
  { id: 'repository', label: 'Repository context only' },
  { id: 'hidden', label: 'Hide from skills and map' },
] as const
export type SkillVisibility = typeof visibilityOptions[number]['id']
export type SkillPreference = { level: FamiliarityLevel | null; visibility: SkillVisibility }
export type SkillProfile = { version: 1; updatedAt: string | null; entries: Record<string, SkillPreference> }
export type SkillPatch = Record<string, SkillPreference | null>
export const skillKinds = ['language', 'framework', 'library', 'tool', 'platform', 'interface', 'practice'] as const
export type SkillKind = typeof skillKinds[number]
export const skillKindLabels: Record<SkillKind, string> = { language: 'Language', framework: 'Framework', library: 'Library', tool: 'Tool', platform: 'Platform', interface: 'Interface', practice: 'Engineering practice' }
export type SkillDefinition = { id: string; label: string; detail: string; group: string; kind: SkillKind; related?: string[] }
export function isSkillId(id: string) {
  return /^[a-z][a-z0-9-]{0,63}$/.test(id) && !['constructor', 'prototype'].includes(id)
}

// Small client boundary. Authoritative file/write validation stays on the server.
export function parseSkillProfile(value: unknown): SkillProfile {
  if (!value || typeof value !== 'object' || Array.isArray(value) || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) throw new Error('Invalid skill profile.')
  const profile = value as SkillProfile
  if (Object.keys(profile).some((key) => !['version', 'updatedAt', 'entries'].includes(key)) || profile.version !== 1 ||
    !(profile.updatedAt === null || (typeof profile.updatedAt === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(profile.updatedAt) && Number.isFinite(Date.parse(profile.updatedAt)))) ||
    !profile.entries || typeof profile.entries !== 'object' || Array.isArray(profile.entries) || ![Object.prototype, null].includes(Object.getPrototypeOf(profile.entries)) || Object.keys(profile.entries).length > 500) throw new Error('Invalid skill profile.')
  for (const [id, entry] of Object.entries(profile.entries)) {
    if (!isSkillId(id) || !entry || typeof entry !== 'object' || Array.isArray(entry) || ![Object.prototype, null].includes(Object.getPrototypeOf(entry)) ||
      Object.keys(entry).some((key) => !['level', 'visibility'].includes(key)) ||
      !(entry.level === null || familiarityLevels.some((level) => level.id === entry.level)) ||
      !visibilityOptions.some((visibility) => visibility.id === entry.visibility)) throw new Error('Invalid skill preference.')
  }
  return profile
}

export function preferenceFor(profile: SkillProfile, id: string, curated: boolean): SkillPreference {
  return profile.entries[id] ?? { level: null, visibility: curated ? 'profile' : 'repository' }
}
export function familiarityLabel(level: FamiliarityLevel | null) {
  return familiarityLevels.find((entry) => entry.id === level)?.label ?? 'Not rated'
}
