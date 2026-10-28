'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { List, Network, FolderGit2, Search, Pencil } from 'lucide-react'
import { CareerIcon } from '@/components/career-icons'
import { SkillLevelBadge } from '@/components/skill-level-badge'
import { useSkillPreferences } from '@/components/skill-profile-provider'
import type { CareerSkill } from '@/lib/profile'
import { mapGroups, resolveMapTechnologies, repositoryCatalogue } from '@/lib/repository-catalogue'
import { skillKindLabels } from '@/lib/skill-preferences'

const SkillMindMap = dynamic(() => import('@/components/skill-mind-map'), { ssr: false, loading: () => <p className="map-loading" role="status">Opening the interactive map…</p> })
const RepositoryCatalogue = dynamic(() => import('@/components/repository-catalogue').then((module) => module.RepositoryCatalogue), { loading: () => <p role="status">Opening repository records…</p> })

export function SkillExplorer({ selected, onSelect, onViewEvidence }: { selected: CareerSkill | null; onSelect: (skill: CareerSkill | null) => void; onViewEvidence: () => void }) {
  const [view, setView] = useState<'list' | 'map' | 'repositories'>('list')
  const [mapOpened, setMapOpened] = useState(false)
  const [includeStacks, setIncludeStacks] = useState(false)
  const [query, setQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState<string | null>(null)
  const [catalogueFilter, setCatalogueFilter] = useState<string | null>(null)
  const [focusRequest, setFocusRequest] = useState<{ id: string; serial: number }>()
  const { profile } = useSkillPreferences()
  const technologies = useMemo(() => resolveMapTechnologies(profile).filter((tech) => tech.visibility !== 'hidden'), [profile])
  const profileCount = technologies.filter((tech) => tech.personal).length
  const strongCount = technologies.filter((t) => t.personal && t.level === 'strong').length
  const comfortableCount = technologies.filter((t) => t.personal && t.level === 'comfortable').length
  const usedCount = technologies.filter((t) => t.personal && t.level === 'used').length
  const visible = technologies.filter((tech) =>
    (includeStacks || tech.personal) &&
    (!levelFilter || tech.level === levelFilter) &&
    `${tech.label} ${tech.detail}`.toLowerCase().includes(query.toLowerCase().trim()),
  )
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('view')
    if (initial === 'map') { setMapOpened(true); setView('map') }
    else if (initial === 'repositories') setView('repositories')
  }, [])
  function openTechnology(id: string) {
    setMapOpened(true)
    setView('map')
    setFocusRequest((current) => ({ id, serial: (current?.serial ?? 0) + 1 }))
  }
  function skillButton(skill: typeof technologies[number]) {
    return <button key={skill.id} data-skill-id={skill.id} data-kind={skill.kind} type="button" aria-pressed={selected === skill.id} aria-controls={skill.personal ? 'career-evidence' : undefined} title={skill.detail} data-repository-stack={!skill.personal} onClick={() => {
      if (skill.personal) onSelect(selected === skill.id ? null : skill.id)
      else openTechnology(skill.id)
    }}><CareerIcon skill={skill.id} /><span className="skill-item-copy"><span className="skill-item-heading">{skill.label}{skill.personal ? <SkillLevelBadge level={skill.level} /> : null}</span><small>{skill.kind === 'practice' ? skill.detail : skill.personal ? skill.kind ? skillKindLabels[skill.kind] : 'Profile skill' : 'Repository context'}</small></span></button>
  }
  const levelPriority: Record<string, number> = {
    strong: 1,
    comfortable: 2,
    used: 3,
    learning: 4,
  }

  function sortSkillsByLevel<T extends { level?: string | null; label: string }>(items: T[]): T[] {
    return [...items].sort((a, b) => {
      const pA = levelPriority[a.level ?? ''] ?? 99
      const pB = levelPriority[b.level ?? ''] ?? 99
      if (pA !== pB) return pA - pB
      return a.label.localeCompare(b.label)
    })
  }

  const practices = sortSkillsByLevel(visible.filter((skill) => skill.kind === 'practice'))
  return (
    <div className="skill-explorer" data-view={view}>
      <div className="skill-view-controls" aria-label="Skills presentation">
        <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}><List aria-hidden="true" />Icon list <span aria-hidden="true">{profileCount}</span></button>
        <button type="button" aria-pressed={view === 'map'} onClick={() => { setMapOpened(true); setView('map') }}><Network aria-hidden="true" />Mind map</button>
        <button type="button" aria-pressed={view === 'repositories'} onClick={() => setView('repositories')}><FolderGit2 aria-hidden="true" />Repositories <span aria-hidden="true">{repositoryCatalogue.count}</span></button>
        <Link prefetch={false} className="skill-manage-link" href="/about/manage"><Pencil aria-hidden="true" />Owner skill settings</Link>
      </div>
      {view === 'list' ? <>
        <div className="skill-list-controls">
          <label><Search aria-hidden="true" /><span className="sr-only">Find a skill</span><input type="search" placeholder="Find a skill or tool" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <button type="button" aria-pressed={includeStacks} onClick={() => setIncludeStacks((value) => !value)}>{includeStacks ? 'Experience & practice' : `Also show ${technologies.length - profileCount} repository technologies`}</button>
        </div>
        <div className="skill-level-filter-bar" role="group" aria-label="Filter skills by self-assessed familiarity">
          <button type="button" className="filter-pill" aria-pressed={levelFilter === null} onClick={() => setLevelFilter(null)}>
            All ({profileCount})
          </button>
          <button type="button" className="filter-pill filter-strong" aria-pressed={levelFilter === 'strong'} onClick={() => setLevelFilter(levelFilter === 'strong' ? null : 'strong')}>
            <span className="badge-symbol" aria-hidden="true">◆</span> Strong ({strongCount})
          </button>
          <button type="button" className="filter-pill filter-comfortable" aria-pressed={levelFilter === 'comfortable'} onClick={() => setLevelFilter(levelFilter === 'comfortable' ? null : 'comfortable')}>
            <span className="badge-symbol" aria-hidden="true">▲</span> Comfortable ({comfortableCount})
          </button>
          <button type="button" className="filter-pill filter-used" aria-pressed={levelFilter === 'used'} onClick={() => setLevelFilter(levelFilter === 'used' ? null : 'used')}>
            <span className="badge-symbol" aria-hidden="true">◈</span> Used before ({usedCount})
          </button>
        </div>
        <div className="skill-explorer-canvas">
          {mapGroups.map((group) => {
            const skills = sortSkillsByLevel(visible.filter((skill) => skill.group === group.id && skill.kind !== 'practice'))
            if (!skills.length) return null
            return <section key={group.id} className="skill-family" aria-labelledby={`skill-group-${group.id}`}>
              <h3 id={`skill-group-${group.id}`}>{group.label}</h3><div className="skill-lenses">
                {skills.map(skillButton)}
              </div>
            </section>
          })}
        </div>
        {practices.length ? <section className="skill-practice-section" aria-labelledby="engineering-practice-title"><h3 id="engineering-practice-title">Engineering practice</h3><p>Concepts and implementation experience, connected to the languages and tools used.</p><div className="skill-lenses skill-practice-list">{practices.map(skillButton)}</div></section> : null}
        {!visible.length ? <p>No skills match this search.</p> : null}
        <div className="skill-list-footer"><p>Familiarity labels are self-assessed. Select an icon for its work or project context.</p>{selected ? <button type="button" onClick={() => { setCatalogueFilter(selected); setView('repositories') }}>Inspect repositories for this skill <FolderGit2 aria-hidden="true" /></button> : null}</div>
      </> : null}
      {mapOpened ? <div style={{ display: view === 'map' ? 'block' : 'none' }}><SkillMindMap selectedSkill={selected} onSelectSkill={onSelect} onViewEvidence={onViewEvidence} focusRequest={focusRequest} /></div> : null}
      {view === 'repositories' ? <RepositoryCatalogue skill={catalogueFilter} onClearSkill={() => setCatalogueFilter(null)} onTechnology={openTechnology} /> : null}
    </div>
  )
}
