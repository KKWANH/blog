import definitions from '@/contents/about/skill-definitions.json'
import type { SkillDefinition } from '@/lib/skill-preferences'

// The write/build checks validate this owner-maintained file; no validator bundle
// is needed just to display the public labels.
export const careerSkills = definitions.skills as SkillDefinition[]
export const careerSkillGroups = definitions.groups
