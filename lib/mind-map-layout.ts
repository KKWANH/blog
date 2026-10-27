import { mapGroups, resolveMapTechnologies, repositoriesForTechnology, reviewedRepositories } from '@/lib/repository-catalogue'
import type { FamiliarityLevel, SkillProfile } from '@/lib/skill-preferences'

export type MapPoint = { x: number; y: number }
export type MindMapNode = MapPoint & {
  id: string
  kind: 'root' | 'group' | 'skill' | 'repo'
  label: string
  detail: string
  width: number
  height: number
  group?: string
  techId?: string
  repoName?: string
  count?: number
  expanded?: boolean
  personal?: boolean
  level?: FamiliarityLevel | null
}
export type MindMapEdge = { id: string; from: string; to: string }
export type MapBounds = { x: number; y: number; width: number; height: number }

export function boundsOf(nodes: MindMapNode[]): MapBounds {
  if (!nodes.length) return { x: -100, y: -50, width: 200, height: 100 }
  const left = Math.min(...nodes.map((node) => node.x)), top = Math.min(...nodes.map((node) => node.y))
  return { x: left, y: top, width: Math.max(...nodes.map((node) => node.x + node.width)) - left, height: Math.max(...nodes.map((node) => node.y + node.height)) - top }
}

export function createMindMap({
  expanded, activeTech, pinnedRepository, allRepositories, allTechnologies, positions, profile,
}: {
  expanded: Set<string>
  activeTech: string | null
  pinnedRepository: string | null
  allRepositories: boolean
  allTechnologies: boolean
  positions: Record<string, MapPoint>
  profile: SkillProfile
}) {
  const technologies = resolveMapTechnologies(profile).filter((tech) => tech.visibility !== 'hidden' && (allTechnologies || tech.personal || tech.id === activeTech))
  const groups = mapGroups.filter((group) => technologies.some((tech) => tech.group === group.id))
  const nodes: MindMapNode[] = [{ id: 'root', kind: 'root', label: 'Kwanho Kim', detail: 'Skills & projects', x: -105, y: -43, width: 210, height: 86 }]
  const edges: MindMapEdge[] = []
  for (const side of [-1, 1]) {
    const branchGroups = groups.filter((_, index) => (index % 2 ? 1 : -1) === side)
    const heights = branchGroups.map((group) => expanded.has(group.id) ? Math.max(112, technologies.filter((tech) => tech.group === group.id).length * 78) : 112)
    let top = -(heights.reduce((a, b) => a + b, 0) + (heights.length - 1) * 48) / 2
    branchGroups.forEach((group, groupIndex) => {
      const children = technologies.filter((tech) => tech.group === group.id)
      const height = heights[groupIndex], groupId = `group:${group.id}`
      nodes.push({ id: groupId, kind: 'group', label: group.label, detail: `${children.length} technologies`, x: side < 0 ? -430 : 240, y: top + height / 2 - 34, width: 190, height: 68, group: group.id, count: children.length, expanded: expanded.has(group.id) })
      edges.push({ id: `root-${groupId}`, from: 'root', to: groupId })
      if (expanded.has(group.id)) children.forEach((tech, index) => {
        const id = `skill:${tech.id}`
        nodes.push({ id, kind: 'skill', label: tech.label, detail: tech.personal ? 'Experience / project practice' : 'Repository technology', techId: tech.id, group: group.id, personal: tech.personal, level: tech.level, x: side < 0 ? -740 : 550, y: top + index * 78 + 6, width: 190, height: 64 })
        edges.push({ id: `${groupId}-${id}`, from: groupId, to: id })
      })
      top += height + 48
    })
  }
  const linked = activeTech ? repositoriesForTechnology(activeTech, allTechnologies) : []
  const repositories = allRepositories ? reviewedRepositories : [...linked]
  const pinned = reviewedRepositories.find((repo) => repo.name === pinnedRepository)
  if (pinned && !repositories.some((repo) => repo.name === pinned.name)) repositories.push(pinned)
  const activeNode = nodes.find((node) => node.techId === activeTech)
  const side = activeNode && activeNode.x < 0 ? -1 : 1
  const columns = allRepositories ? 4 : repositories.length > 6 ? 3 : 1
  const rows = Math.ceil(repositories.length / columns)
  const parentRepositories = new Map(nodes.filter((node) => node.kind === 'skill').map((node) => [node.id, new Set(repositoriesForTechnology(node.techId!, allTechnologies).map((repo) => repo.name))]))
  repositories.forEach((repo, index) => {
    const column = index % columns, row = Math.floor(index / columns)
    const id = `repo:${repo.name}`
    nodes.push({ id, kind: 'repo', label: repo.name, detail: repo.status === 'needs-review' ? 'Synced · review pending' : repo.scope === 'reference' ? 'Fork / reference' : repo.scope === 'ai-directed' ? 'AI-directed' : repo.scope === 'learning' ? 'Project practice' : repo.scope === 'empty' ? 'Empty repository' : 'Repository', repoName: repo.name, x: side < 0 ? -1080 - column * 234 : 880 + column * 234, y: (activeNode?.y ?? 0) - rows * 48 + row * 96, width: 212, height: 76 })
    const parents = nodes.filter((node) => node.kind === 'skill' && (
      repo.technologies.some((tech) => tech.id === node.techId) ||
      parentRepositories.get(node.id)?.has(repo.name)
    ))
    if (parents.length) parents.forEach((parent) => edges.push({ id: `${parent.id}-${id}`, from: parent.id, to: id }))
    else edges.push({ id: `root-${id}`, from: 'root', to: id })
  })
  const positioned = nodes.map((node) => positions[node.id] ? { ...node, ...positions[node.id] } : node)
  return { nodes: positioned, edges, bounds: boundsOf(positioned) }
}

export function edgePath(from: MindMapNode, to: MindMapNode) {
  const forward = to.x >= from.x
  const x1 = from.x + (forward ? from.width : 0), y1 = from.y + from.height / 2
  const x2 = to.x + (forward ? 0 : to.width), y2 = to.y + to.height / 2
  const bend = Math.max(55, Math.abs(x2 - x1) * .52)
  return `M${x1},${y1} C${x1 + (forward ? bend : -bend)},${y1} ${x2 + (forward ? -bend : bend)},${y2} ${x2},${y2}`
}
