import rawCatalogue from '@/contents/about/repositories.index.json'
import { careerSkills, careerSkillGroups } from '@/lib/skill-definitions'
import { skillProjects } from '@/lib/skill-projects'
import type { RepositoryIndex, RepositorySummary } from '@/lib/repository-types'
import { preferenceFor, type SkillKind, type SkillProfile } from '@/lib/skill-preferences'

export const repositoryCatalogue = rawCatalogue as RepositoryIndex
export const reviewedRepositories = repositoryCatalogue.repositories
export const repositoryTechnologyCount = new Set(reviewedRepositories.flatMap((repo) => repo.technologies.map((tech) => tech.id))).size
export const reviewedRepositoryCount = reviewedRepositories.filter((repo) => repo.status !== 'needs-review').length

export const repositoryScopeLabels = {
  project: 'Project repository',
  learning: 'Learning / project practice',
  reference: 'Fork / reference',
  'ai-directed': 'AI-directed project',
  profile: 'Profile / supporting material',
  empty: 'Empty repository',
} as const

const preferred: Record<string, string[]> = {
  c: ['42_minishell', '42Philosopher'], cpp: ['ft_containers', 'webserv'],
  csharp: ['QuantumPang', 'QuantumPang2'], unity: ['QuantumPang', 'QuantumPang2'],
  java: ['AlgorithmNotes'], shell: ['42s-setting-sh'], django: ['42_Django_Piscine', '42_Django_Piscine_Rush01'],
  html: ['42_Django_Piscine'], css: ['42_Django_Piscine'],
  qt: ['DES_Instrument-Cluster'], qmake: ['DES_Instrument-Cluster'], make: ['ft_containers'],
  numpy: ['ft_linear_regression', 'dslr'], pandas: ['dslr', 'ft_linear_regression'],
  matplotlib: ['ft_linear_regression'], sklearn: ['total-perspective-vortex', 'ft_linear_regression'],
  mne: ['total-perspective-vortex'], raspberrypi: ['DES01-PiRacer-Assembly', 'DES_Instrument-Cluster'],
  raycasting: ['cub3d_kkim'], minilibx: ['cub3d_kkim'],
}

const technologyRepositories = new Map<string, RepositorySummary[]>()
for (const repo of reviewedRepositories) {
  const ids = new Set(repo.technologies.map((tech) => tech.id))
  for (const project of skillProjects) if (project.href.endsWith(`/${repo.name}`)) project.skills.forEach((id) => ids.add(id))
  for (const id of ids) technologyRepositories.set(id, [...(technologyRepositories.get(id) ?? []), repo])
}

export function repositoriesForTechnology(id: string, includeReferences = false): RepositorySummary[] {
  const curatedNames = skillProjects.filter((project) => project.skills.some((skill) => skill === id)).map((project) => project.href.split('/').at(-1))
  return (technologyRepositories.get(id) ?? []).filter((repo) => (
    includeReferences || !['reference', 'ai-directed'].includes(repo.scope)
  ) && (repo.technologies.some((tech) => tech.id === id) || curatedNames.includes(repo.name))).sort((a, b) => {
    const priorities = preferred[id] ?? []
    const score = (repo: RepositorySummary) => priorities.includes(repo.name) ? priorities.indexOf(repo.name) : repo.scope === 'learning' ? 30 : repo.scope === 'project' ? 40 : 60
    return score(a) - score(b) || a.name.localeCompare(b.name)
  })
}

export type MapTechnology = { id: string; label: string; group: string; detail: string; personal: boolean; kind?: SkillKind; related?: string[] }

const technologies = new Map<string, MapTechnology>(
  careerSkills.map((skill) => [skill.id, { ...skill, personal: true }]),
)
for (const repo of reviewedRepositories) {
  for (const tech of repo.technologies) {
    if (!technologies.has(tech.id)) technologies.set(tech.id, {
      id: tech.id, label: tech.label, group: tech.group,
      detail: 'Repository technology or reference topic; inspect its source context.',
      personal: false,
    })
  }
}

export const mapTechnologies = [...technologies.values()]
export function resolveMapTechnologies(profile: SkillProfile) {
  return mapTechnologies.map((tech) => {
    const preference = preferenceFor(profile, tech.id, tech.personal)
    return { ...tech, curated: tech.personal, personal: preference.visibility === 'profile', ...preference }
  })
}
export const mapGroups = [
  ...careerSkillGroups.map((group) => ({ ...group })),
  ...[...new Set(mapTechnologies.map((tech) => tech.group))].filter((id) => !careerSkillGroups.some((group) => group.id === id)).map((id) => ({ id, label: id })),
]
