'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, BriefcaseBusiness, Check, GraduationCap, RadioTower, X, ArrowRight } from 'lucide-react'
import { PaperIntroduction } from '@/components/paper-introduction'
import { CareerIcon } from '@/components/career-icons'
import { SkillExplorer } from '@/components/skill-explorer'
import { CompanyMark } from '@/components/company-mark'
import { CareerTimeline } from '@/components/career-timeline'
import { CareerEvidence } from '@/components/career-evidence'
import { ProjectEvidence } from '@/components/project-evidence'
import { RepositoryEvidence } from '@/components/repository-evidence'
import { RepositoryInspector } from '@/components/repository-inspector'
import { SkillProfileProvider, useSkillPreferences } from '@/components/skill-profile-provider'
import { SelectedWork } from '@/components/selected-work'
import { skillProjects } from '@/lib/skill-projects'
import { repositoriesForTechnology, reviewedRepositories, mapTechnologies } from '@/lib/repository-catalogue'
import { useMotion } from '@/components/motion-provider'
import { education, experience, projectSkillIds, type CareerSkill } from '@/lib/profile'
import { careerSkillGroups, careerSkills } from '@/lib/skill-definitions'

export function ProfileOverview() {
  return <SkillProfileProvider><ProfileContent /></SkillProfileProvider>
}

function ProfileContent() {
  const [skill, setSkill] = useState<CareerSkill | null>(null)
  const [selected, setSelected] = useState<string>('kla')
  const { enabled } = useMotion()
  const { profile: skillProfile, preference } = useSkillPreferences()
  const related = skill ? experience.filter((job) => (job.skills as readonly string[]).includes(skill)) : experience
  const projectLinked = !skill || projectSkillIds.includes(skill)
  const currentSkill = mapTechnologies.find((entry) => entry.id === skill)
  const repositories = skill ? skillProjects.filter((project) => project.skills.includes(skill)) : []
  const catalogued = skill ? repositoriesForTechnology(skill) : []
  const additionalRepositories = catalogued.filter((repo) => !repositories.some((project) => project.href.endsWith(`/${repo.name}`)) && repo.name !== 'ColorSavesLife')
  const designSkill = skill === 'figma' || skill === 'ui-design'
  const currentRepository = skillProjects.find((project) => selected === `repo:${project.id}`)
  const currentReviewedRepository = reviewedRepositories.find((repo) => selected === `catalog:${repo.name}`)
  const cvOnly = Boolean(skill && !related.length && !projectLinked && !repositories.length && !catalogued.length && !designSkill)

  useEffect(() => {
    if (skill && preference(skill).visibility === 'hidden') { setSkill(null); setSelected('kla') }
  }, [skill, skillProfile, preference])

  useEffect(() => {
    const followHash = () => {
      const id = window.location.hash.replace('#experience-', '')
      const job = experience.find((entry) => entry.id === id)
      if (job) {
        setSelected(id)
        setSkill((current) => current && !(job.skills as readonly string[]).includes(current) ? null : current)
      }
    }
    followHash()
    window.addEventListener('hashchange', followHash)
    return () => window.removeEventListener('hashchange', followHash)
  }, [])

  function chooseSkill(next: CareerSkill | null) {
    setSkill(next)
    if (!next) setSelected('kla')
    else if (next === 'figma' || next === 'ui-design') setSelected('design')
    else {
      const job = next === 'react' ? experience.find((entry) => entry.id === 'bosch') : experience.find((entry) => (entry.skills as readonly string[]).includes(next))
      const project = skillProjects.find((entry) => entry.skills.includes(next))
      const reviewed = repositoriesForTechnology(next)[0]
      setSelected(job?.id ?? (project ? `repo:${project.id}` : projectSkillIds.includes(next) ? 'bcx' : reviewed ? `catalog:${reviewed.name}` : 'cv'))
    }
  }

  function viewScope() {
    const pane = document.getElementById('career-evidence')
    pane?.scrollIntoView({ block: 'start', behavior: enabled ? 'smooth' : 'instant' })
    pane?.focus({ preventScroll: true })
  }

  function selectRole(id: string) {
    setSelected(id)
    const job = experience.find((entry) => entry.id === id)
    if (skill && job && !(job.skills as readonly string[]).includes(skill)) setSkill(null)
  }

  function chooseEntry(id: string) {
    selectRole(id)
    const entry = document.getElementById(`experience-${id}`)
    entry?.scrollIntoView({ block: 'center', behavior: enabled ? 'smooth' : 'instant' })
    entry?.querySelector<HTMLButtonElement>('.company-select')?.focus({ preventScroll: true })
  }

  return (
    <div className="profile-overview">
      <PaperIntroduction />

      <section className="open-experience" id="work" aria-labelledby="experience-title">
        <div className="profile-section-heading"><h2 id="experience-title"><BriefcaseBusiness aria-hidden="true" />Experience</h2><p>Select a role to inspect its work scope and evidence.</p></div>
        <div className="experience-layout">
          <ol className="experience-records">
            {experience.map((job) => {
              const linked = !skill || (job.skills as readonly string[]).includes(skill)
              return <li id={`experience-${job.id}`} key={job.id} data-selected={selected === job.id} data-linked={linked}>
                <div className="experience-record-heading">
                  <div className="experience-primary-row">
                    <h3 className="experience-role">{job.role}</h3>
                    <span className="experience-period">{job.period}</span>
                  </div>
                  <div className="experience-secondary-row">
                    <button className="company-select" type="button" aria-pressed={selected === job.id} aria-controls="career-evidence" onClick={() => selectRole(job.id)}>
                      <CompanyMark company={job.id} compact />
                      <span className="company-name">{job.company}</span>
                      <ArrowUpRight aria-hidden="true" />
                    </button>
                    <span className="experience-place">{job.field} · {job.location}</span>
                  </div>
                </div>
                <ul className="contribution-list">{job.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                <div className="record-skill-links">{job.skills.filter((item) => preference(item).visibility !== 'hidden').map((item) => <button type="button" key={item} aria-pressed={skill === item} onClick={() => chooseSkill(skill === item ? null : item as CareerSkill)}><CareerIcon skill={item as CareerSkill} size={18} />{careerSkills.find((value) => value.id === item)?.label}</button>)}</div>
                <button type="button" className="scope-jump" onClick={() => { selectRole(job.id); requestAnimationFrame(viewScope) }}>View this work scope ↓</button>
              </li>
            })}
          </ol>
          {currentRepository || selected === 'design' ? <RepositoryEvidence project={currentRepository} skill={skill} /> : currentReviewedRepository ? <aside id="career-evidence" className="career-evidence" tabIndex={-1} aria-label={`${currentReviewedRepository.name} repository review`}><RepositoryInspector key={currentReviewedRepository.name} repository={currentReviewedRepository} /></aside> : selected === 'bcx' ? <aside id="career-evidence" className="career-evidence project-companion" tabIndex={-1} aria-label="Color Saves Life project material">
            {skill && ['git', 'docker', 'linux'].includes(skill) ? <div className="project-tool-context"><CareerIcon skill={skill} /><p><strong>{currentSkill?.label} · Project environment</strong><span>{skill === 'git' ? 'Public team source and repository history.' : skill === 'docker' ? 'The public project includes Docker run instructions.' : 'The documented prototype environment uses Ubuntu 20.04.'}</span></p></div> : null}
            <ProjectEvidence compact />
          </aside> : selected === 'cv' && currentSkill ? <aside id="career-evidence" className="career-evidence cv-skill-context" tabIndex={-1} aria-labelledby="cv-skill-title">
            <CareerIcon skill={currentSkill.id} /><h3 id="cv-skill-title">{currentSkill.label}</h3>
            <p>{careerSkillGroups.find((group) => group.id === currentSkill.group)?.label}</p>
            <p>Included in the CV&apos;s technical skills.</p><a className="text-link" href="/CV.pdf">Read the CV <ArrowUpRight aria-hidden="true" /></a>
          </aside> : <CareerEvidence selected={selected} skill={skill} />}
        </div>
        <p className="sr-only" role="status">Showing {currentRepository?.title ?? currentReviewedRepository?.name ?? (selected === 'design' ? 'Figma and UI design practice' : selected === 'bcx' ? 'Color Saves Life project material' : selected === 'cv' ? `${currentSkill?.label} CV entry` : `${experience.find((job) => job.id === selected)?.company ?? 'KLA'} work scope`)}. All career entries remain visible.</p>
      </section>

      <CareerTimeline skill={skill} selected={selected} onSelect={chooseEntry} />

      <section className="open-education" id="education" aria-labelledby="education-title">
        <div className="profile-section-heading"><h2 id="education-title"><GraduationCap aria-hidden="true" />Education &amp; training</h2></div>
        <div className="education-records">
          {education.map((item) => <article key={item.id} id={item.id} className="education-record" data-ongoing={!item.end}>
            <GraduationCap className="education-symbol" aria-hidden="true" />
            <div><h3>{item.subject}</h3><p>{item.institution}</p></div>
            <div className="education-state"><span>{item.period}</span><strong>{item.end ? <><Check aria-hidden="true" />Bachelor&apos;s awarded</> : 'Bachelor’s in progress'}</strong></div>
          </article>)}
        </div>
        <div className="completed-programs">
          <article><span className="program-symbol">42</span><div><h3>42 Seoul / Wolfsburg</h3><p>Software engineering program · Completed</p></div><Check aria-label="Completed" /></article>
          <article><RadioTower className="program-symbol" aria-hidden="true" /><div><h3>SEA:ME</h3><p>Automotive &amp; Mobility · Jul 2023–Jun 2024 · Completed</p></div><Check aria-label="Completed" /></article>
        </div>
      </section>

      <SelectedWork />

      <section className="skill-connections" id="skills" aria-labelledby="skill-connections-title">
        <div className="profile-section-heading">
          <h2 id="skill-connections-title">Skills &amp; practice</h2>
          <p>Languages and tools, then engineering practice. Follow an item to its work or project context.</p>
        </div>
        <SkillExplorer selected={skill} onSelect={chooseSkill} onViewEvidence={viewScope} />
        <div className="skill-selection-status">
          <span role="status">{skill ? `${currentSkill?.label}: ${[...related.map((job) => job.company), ...(catalogued.length ? [`${catalogued.length} public repository connections`] : []), ...(projectLinked ? ['Color Saves Life'] : []), ...(designSkill ? ['Design practice'] : []), ...(cvOnly ? ['CV technical skills'] : [])].join(' · ')}.` : 'Explore languages, tools and practice below.'}</span>
          {skill ? <button type="button" onClick={() => chooseSkill(null)}><X aria-hidden="true" />Clear focus</button> : null}
        </div>
        {skill ? <div className="linked-work" aria-label="Work connected to the selected skill">
          <span className="linked-work-origin"><CareerIcon skill={skill} /><ArrowRight aria-hidden="true" /></span>
          {related.map((job) => <button type="button" key={job.id} onClick={() => chooseEntry(job.id)}><CompanyMark company={job.id} compact /><span>{job.company}</span><ArrowUpRight aria-hidden="true" /></button>)}
          {repositories.map((project) => <button type="button" key={project.id} onClick={() => { setSelected(`repo:${project.id}`); requestAnimationFrame(viewScope) }}><span>{project.title}</span><ArrowUpRight aria-hidden="true" /></button>)}
          {additionalRepositories.slice(0, 2).map((repo) => <button type="button" key={repo.name} onClick={() => { setSelected(`catalog:${repo.name}`); requestAnimationFrame(viewScope) }}><span>{repo.name}</span><ArrowUpRight aria-hidden="true" /></button>)}
          {projectLinked ? <button type="button" onClick={() => { setSelected('bcx'); requestAnimationFrame(viewScope) }}><span>Color Saves Life</span><ArrowUpRight aria-hidden="true" /></button> : null}
          {cvOnly ? <a className="text-link" href="/CV.pdf">CV technical skills <ArrowUpRight aria-hidden="true" /></a> : null}
          <button type="button" className="scope-jump" onClick={viewScope}>View matching {selected === 'bcx' || currentRepository || currentReviewedRepository ? 'project' : selected === 'design' ? 'design practice' : selected === 'cv' ? 'CV entry' : 'work scope'} ↑</button>
        </div> : null}
      </section>

      <nav className="profile-exits" aria-label="Explore more">
        <Link href="/travel">Travel atlas <ArrowUpRight aria-hidden="true" /></Link>
        <Link href="/notes">Study notes <ArrowUpRight aria-hidden="true" /></Link>
      </nav>
    </div>
  )
}
