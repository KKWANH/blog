import { z } from 'zod'

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
export const skillIdSchema = z.string().regex(/^[a-z][a-z0-9-]{0,63}$/).refine((id) => !['constructor', 'prototype'].includes(id), 'Use a technology ID.')
export const skillPreferenceSchema = z.object({
  level: z.enum(['learning', 'used', 'comfortable', 'strong']).nullable(),
  visibility: z.enum(['profile', 'repository', 'hidden']),
}).strict()
export const skillProfileSchema = z.object({
  version: z.literal(1),
  updatedAt: z.string().datetime().nullable(),
  entries: z.record(skillIdSchema, skillPreferenceSchema).refine((entries) => Object.keys(entries).length <= 500, 'Too many skill settings.'),
}).strict()
export type SkillPreference = z.infer<typeof skillPreferenceSchema>
export type SkillProfile = z.infer<typeof skillProfileSchema>
export const skillPatchSchema = z.record(skillIdSchema, skillPreferenceSchema.nullable())
  .refine((entries) => Object.keys(entries).length > 0 && Object.keys(entries).length <= 500, 'Choose at least one skill change.')
export type SkillPatch = z.infer<typeof skillPatchSchema>

export const skillDefinitionsSchema = z.object({
  version: z.literal(1),
  groups: z.array(z.object({ id: skillIdSchema, label: z.string().trim().min(1).max(80) }).strict()).max(30),
  skills: z.array(z.object({
    id: skillIdSchema, label: z.string().trim().min(1).max(80),
    detail: z.string().trim().min(1).max(250), group: skillIdSchema,
  }).strict()).max(500),
}).strict().superRefine((value, context) => {
  const groups = new Set(value.groups.map((group) => group.id))
  if (groups.size !== value.groups.length) context.addIssue({ code: 'custom', message: 'Group IDs must be unique.' })
  if (new Set(value.skills.map((skill) => skill.id)).size !== value.skills.length) context.addIssue({ code: 'custom', message: 'Skill IDs must be unique.' })
  if (value.skills.some((skill) => !groups.has(skill.group))) context.addIssue({ code: 'custom', message: 'Every skill needs a known group.' })
})

export function preferenceFor(profile: SkillProfile, id: string, curated: boolean): SkillPreference {
  return profile.entries[id] ?? { level: null, visibility: curated ? 'profile' : 'repository' }
}
export function familiarityLabel(level: FamiliarityLevel | null) {
  return familiarityLevels.find((entry) => entry.id === level)?.label ?? 'Not rated'
}
