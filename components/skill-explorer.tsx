'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { List, Network, FolderGit2, Search, Pencil } from 'lucide-react'
import { CareerIcon } from '@/components/career-icons'
import { RepositoryCatalogue } from '@/components/repository-catalogue'
import { SkillLevelBadge } from '@/components/skill-level-badge'
import { useSkillPreferences } from '@/components/skill-profile-provider'
import type { CareerSkill } from '@/lib/profile'
import { mapGroups, resolveMapTechnologies, repositoryCatalogue } from '@/lib/repository-catalogue'

const SkillMindMap = dynamic(() => import('@/components/skill-mind-map'), { ssr: false, loading: () => <p className="map-loading" role="status">Opening the interactive map…</p> })

export function SkillExplorer({ selected, onSelect, onViewEvidence }: { selected: CareerSkill | null; onSelect: (skill: CareerSkill | null) => void; onViewEvidence: () => void }) {
  const [view, setView] = useState<'list' | 'map' | 'repositories'>('list')
  const [mapOpened, setMapOpened] = useState(false)
  const [includeStacks, setIncludeStacks] = useState(false)
  const [query, setQuery] = useState('')
  const [catalogueFilter, setCatalogueFilter] = useState<string | null>(null)
  const [focusRequest, setFocusRequest] = useState<{ id: string; serial: number }>()
  const { profile } = useSkillPreferences()
  const technologies = resolveMapTechnologies(profile).filter((tech) => tech.visibility !== 'hidden')
  const profileCount = technologies.filter((tech) => tech.personal).length
  const visible = technologies.filter((tech) => (includeStacks || tech.personal) && `${tech.label} ${tech.detail}`.toLowerCase().includes(query.toLowerCase().trim()))
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
  return (
    <div className="skill-explorer" data-view={view}>
      <div className="skill-view-controls" aria-label="Skills presentation">
        <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}><List aria-hidden="true" />Icon list <span aria-hidden="true">{profileCount}</span></button>
        <button type="button" aria-pressed={view === 'map'} onClick={() => { setMapOpened(true); setView('map') }}><Network aria-hidden="true" />Mind map</button>
        <button type="button" aria-pressed={view === 'repositories'} onClick={() => setView('repositories')}><FolderGit2 aria-hidden="true" />Repositories <span aria-hidden="true">{repositoryCatalogue.count}</span></button>
        <Link className="skill-manage-link" href="/about/manage"><Pencil aria-hidden="true" />Edit skill levels</Link>
      </div>
      {view === 'list' ? <>
        <div className="skill-list-controls"><label><Search aria-hidden="true" /><span className="sr-only">Find a skill</span><input type="search" placeholder="Find a skill or tool" value={query} onChange={(event) => setQuery(event.target.value)} /></label><button type="button" aria-pressed={includeStacks} onClick={() => setIncludeStacks((value) => !value)}>{includeStacks ? 'Experience & practice' : `Also show ${technologies.length - profileCount} repository technologies`}</button></div>
        <div className="skill-explorer-canvas">
          {mapGroups.map((group) => {
            const skills = visible.filter((skill) => skill.group === group.id)
            if (!skills.length) return null
            return <section key={group.id} className="skill-family" aria-labelledby={`skill-group-${group.id}`}>
              <h3 id={`skill-group-${group.id}`}>{group.label}</h3><div className="skill-lenses">
                {skills.map((skill) => <button key={skill.id} data-skill-id={skill.id} type="button" aria-pressed={selected === skill.id} aria-controls={skill.personal ? 'career-evidence' : undefined} title={skill.detail} data-repository-stack={!skill.personal} onClick={() => {
                  if (skill.personal) onSelect(selected === skill.id ? null : skill.id)
                  else openTechnology(skill.id)
                }}><CareerIcon skill={skill.id} /><span>{skill.label}{skill.personal ? <SkillLevelBadge level={skill.level} /> : <small>Repository stack</small>}</span></button>)}
              </div>
            </section>
          })}
        </div>
        {!visible.length ? <p>No skills match this search.</p> : null}
        <div className="skill-list-footer"><p>Familiarity labels are self-assessed. Select an icon for its work or project context.</p>{selected ? <button type="button" onClick={() => { setCatalogueFilter(selected); setView('repositories') }}>Inspect repositories for this skill <FolderGit2 aria-hidden="true" /></button> : null}</div>
      </> : null}
      {mapOpened ? <div style={{ display: view === 'map' ? 'block' : 'none' }}><SkillMindMap selectedSkill={selected} onSelectSkill={onSelect} onViewEvidence={onViewEvidence} focusRequest={focusRequest} /></div> : null}
      {view === 'repositories' ? <RepositoryCatalogue skill={catalogueFilter} onClearSkill={() => setCatalogueFilter(null)} onTechnology={openTechnology} /> : null}
    </div>
  )
}
