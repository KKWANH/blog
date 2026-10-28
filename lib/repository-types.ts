export type RepositoryScope = 'project' | 'learning' | 'reference' | 'ai-directed' | 'profile' | 'empty'
export type RepositoryTechnology = {
  id: string
  label: string
  group: string
  evidence: Array<{ path: string; basis: string }>
}
export type ReviewedRepository = {
  name: string
  url: string
  description: string
  scope: RepositoryScope
  scopeNote: string
  status: 'reviewed' | 'reviewed-limited' | 'empty' | 'needs-review'
  commit: string | null
  updatedAt: string
  defaultBranch?: string
  lastReviewedCommit?: string | null
  sources: Array<{ path: string; url: string }>
  limitations: string[]
  technologies: RepositoryTechnology[]
}
export type RepositoryCatalogue = {
  reviewedAt: string
  syncedAt?: string
  count: number
  inspectedFiles: number
  repositories: ReviewedRepository[]
}
export type RepositorySummary = Omit<ReviewedRepository, 'sources' | 'limitations' | 'technologies'> & {
  sourceCount: number
  technologies: Array<Omit<RepositoryTechnology, 'evidence'>>
}
export type RepositoryIndex = Omit<RepositoryCatalogue, 'repositories'> & {
  version: 1
  revision: string
  repositories: RepositorySummary[]
}
