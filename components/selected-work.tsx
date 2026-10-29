'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { ArrowUpRight, ChevronDown, Gauge, Trophy } from 'lucide-react'

const ProjectEvidence = dynamic(() => import('@/components/project-evidence').then((module) => module.ProjectEvidence), { loading: () => <p role="status">Opening project material…</p> })
const PiRacerEvidence = dynamic(() => import('@/components/piracer-evidence').then((module) => module.PiRacerEvidence), { loading: () => <p role="status">Opening project material…</p> })

const projects = [
  {
    id: 'color-saves-life',
    name: 'Color Saves Life',
    context: 'Feb 2024 · BCX Hackathon Team Project',
    summary: 'Driver visual-assistance prototype: eye tracking, image processing and simulation',
    award: { rank: '1st', scope: 'digital.auto & mobility challenge' },
    icon: Trophy,
  },
  {
    id: 'piracer-instrument',
    name: 'PiRacer Instrument Cluster',
    context: 'SEA:ME Automotive Project · Embedded Systems',
    summary: 'Real-time digital speedometer cluster with CAN bus, D-Bus IPC & Qt/QML on Raspberry Pi',
    icon: Gauge,
    award: null,
  },
]

export function SelectedWork() {
  const [open, setOpen] = useState<string | null>(null)

  useEffect(() => {
    const follow = () => {
      const hash = window.location.hash
      const project = projects.find((item) => hash === `#project-${item.id}`)
      if (project) setOpen(project.id)
      else if (hash === '#selected-project' || hash === '#selected-work') setOpen('color-saves-life')
    }
    follow()
    window.addEventListener('hashchange', follow)
    return () => window.removeEventListener('hashchange', follow)
  }, [])

  return (
    <section id="selected-work" className="selected-work" aria-labelledby="selected-work-title">
      <span id="selected-project" className="legacy-project-anchor" />
      <div className="profile-section-heading">
        <h2 id="selected-work-title">Selected projects</h2>
        <p>Featured mobility &amp; software projects with real architecture, hardware and prototypes.</p>
      </div>
      <div className="selected-work-list">
        {projects.map((project) => {
          const expanded = open === project.id
          const Icon = project.icon
          return (
            <article key={project.id} id={`project-${project.id}`} className="selected-work-record" data-open={expanded}>
              <h3>
                <button
                  type="button"
                  id={`project-summary-${project.id}`}
                  aria-expanded={expanded}
                  aria-controls={expanded ? `project-details-${project.id}` : undefined}
                  onClick={() => setOpen(expanded ? null : project.id)}
                >
                  <Icon aria-hidden="true" className="project-record-icon" />
                  <span className="project-record-titles">
                    <strong>{project.name}</strong>
                    <small>{project.context}</small>
                  </span>
                  <span className="selected-work-topic">{project.summary}</span>
                  {/* Collapsed rows carry the result too; the open detail repeats it in its own header. */}
                  {project.award ? <span className="track-award selected-work-award"><strong>{project.award.rank}</strong><span>{project.award.scope}</span></span> : null}
                  <ChevronDown className="selected-work-chevron" aria-hidden="true" />
                </button>
              </h3>
              {expanded ? (
                <div
                  id={`project-details-${project.id}`}
                  className="selected-work-detail"
                  role="region"
                  aria-labelledby={`project-summary-${project.id}`}
                >
                  {project.id === 'color-saves-life' ? (
                    <ProjectEvidence />
                  ) : (
                    <PiRacerEvidence />
                  )}
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}
