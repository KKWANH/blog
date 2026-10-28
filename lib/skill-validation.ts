import { z } from 'zod'
import { isSkillId, skillKinds } from '@/lib/skill-preferences'

export const skillIdSchema = z.string().refine(isSkillId, 'Use a technology ID.')
export const skillPreferenceSchema = z.object({
  level: z.enum(['learning', 'used', 'comfortable', 'strong']).nullable(),
  visibility: z.enum(['profile', 'repository', 'hidden']),
}).strict()
const recordInput = z.unknown().refine((value) => value !== null && typeof value === 'object' && !Array.isArray(value) &&
  [Object.prototype, null].includes(Object.getPrototypeOf(value)) && Object.keys(value).every(isSkillId), 'Use a plain object with valid skill IDs.')
export const skillProfileSchema = z.object({
  version: z.literal(1),
  updatedAt: z.string().datetime().nullable(),
  entries: recordInput.pipe(z.record(skillIdSchema, skillPreferenceSchema)).refine((entries) => Object.keys(entries).length <= 500, 'Too many skill settings.'),
}).strict()
export const skillPatchSchema = recordInput.pipe(z.record(skillIdSchema, skillPreferenceSchema.nullable()))
  .refine((entries) => Object.keys(entries).length > 0 && Object.keys(entries).length <= 500, 'Choose at least one skill change.')
export const skillDefinitionsSchema = z.object({
  version: z.literal(1),
  groups: z.array(z.object({ id: skillIdSchema, label: z.string().trim().min(1).max(80) }).strict()).max(30),
  skills: z.array(z.object({
    id: skillIdSchema, label: z.string().trim().min(1).max(80),
    detail: z.string().trim().min(1).max(250), group: skillIdSchema,
    kind: z.enum(skillKinds),
    related: z.array(skillIdSchema).max(12).optional(),
  }).strict()).max(500),
}).strict().superRefine((value, context) => {
  const groups = new Set(value.groups.map((group) => group.id)), skills = new Set(value.skills.map((skill) => skill.id))
  if (groups.size !== value.groups.length || skills.size !== value.skills.length) context.addIssue({ code: 'custom', message: 'Group and skill IDs must be unique.' })
  if (value.skills.some((skill) => !groups.has(skill.group))) context.addIssue({ code: 'custom', message: 'Every skill needs a known group.' })
  if (value.skills.some((skill) => skill.related?.some((id) => !skills.has(id) || id === skill.id))) context.addIssue({ code: 'custom', message: 'Related skills must reference another known ID.' })
})
