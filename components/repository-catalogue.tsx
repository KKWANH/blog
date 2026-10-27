'use client'

import { useMemo, useState } from 'react'
import { Search, ArrowUpRight } from 'lucide-react'
import { RepositoryInspector } from '@/components/repository-inspector'
import { repositoryCatalogue, reviewedRepositories, repositoryScopeLabels, repositoriesForTechnology, repositoryTechnologyCount, reviewedRepositoryCount } from '@/lib/repository-catalogue'

export function RepositoryCatalogue({ skill, onClearSkill, onTechnology }: { skill: string | null; onClearSkill: () => void; onTechnology: (id: string) => void }) {
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState('all')
  const [selected, setSelected] = useState<string | null>(null)
  const filtered = useMemo(() => {
    const source = skill ? repositoriesForTechnology(skill, true) : reviewedRepositories
    const needle = query.toLowerCase().trim()
    return source.filter((repo) => (scope === 'all' || repo.scope === scope) && (!needle || `${repo.name} ${repo.description} ${repo.technologies.map((tech) => tech.label).join(' ')}`.toLowerCase().includes(needle)))
  }, [query, scope, skill])
  const current = filtered.find((repo) => repo.name === selected) ?? filtered[0]
  return <div className="repository-catalogue">
    <div className="repository-catalogue-heading"><p><strong>{repositoryCatalogue.count === reviewedRepositoryCount ? `${repositoryCatalogue.count} repositories reviewed individually` : `${repositoryCatalogue.count} repositories indexed · ${reviewedRepositoryCount} reviewed`}</strong><span>{repositoryCatalogue.inspectedFiles} source files recorded · {repositoryTechnologyCount} technologies and reference topics.</span></p>{skill ? <button type="button" onClick={onClearSkill}>Show all repositories</button> : null}</div>
    <div className="catalogue-filters"><label><Search aria-hidden="true" /><span className="sr-only">Search repository catalogue</span><input type="search" placeholder="Repository or technology" value={query} onChange={(event) => setQuery(event.target.value)} /></label><label><span className="sr-only">Repository context</span><select value={scope} onChange={(event) => setScope(event.target.value)}><option value="all">All contexts</option>{Object.entries(repositoryScopeLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label></div>
    <div className="catalogue-layout"><div className="catalogue-list" aria-label={`${filtered.length} matching repositories`}>{filtered.map((repo) => <button type="button" key={repo.name} aria-pressed={current?.name === repo.name} onClick={() => setSelected(repo.name)}><span><strong>{repo.name}</strong><small>{repositoryScopeLabels[repo.scope]} · {repo.sources.length} files</small><em>{repo.technologies.map((tech) => tech.label).join(' · ') || (repo.status === 'empty' ? 'Empty repository' : 'Documentation / source index')}</em></span><ArrowUpRight aria-hidden="true" /></button>)}{!filtered.length ? <p>No repositories match this search.</p> : null}</div><section className="catalogue-detail" aria-label="Selected repository review">{current ? <RepositoryInspector key={current.name} repository={current} onTechnology={onTechnology} /> : <p>Select a repository to inspect its review.</p>}</section></div>
    <p className="sr-only" role="status">{filtered.length} repositories. {current ? `Showing ${current.name}.` : ''}</p>
  </div>
}
