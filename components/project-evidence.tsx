'use client'

import { useState } from 'react'
import { ArrowUpRight, Monitor, Route, Workflow, Play } from 'lucide-react'
import Link from 'next/link'
import { ProjectDemo } from '@/components/project-demo'

const views = [
  { id: 'film', label: 'Demo film', icon: Play },
  { id: 'driver', label: 'Driver view', src: '/project-media/bcx-driver-view.webp', width: 971, height: 553, alt: 'Driver perspective in the Color Saves Life simulation prototype', icon: Monitor },
  { id: 'world', label: 'Simulation', src: '/project-media/bcx-simulation.webp', width: 971, height: 553, alt: 'Gazebo simulation world from the Color Saves Life team prototype', icon: Route },
  { id: 'architecture', label: 'Pipeline', src: '/project-media/bcx-architecture.webp', width: 1600, height: 283, alt: 'Prototype pipeline: controls and eye tracking, Gazebo, ROS connection, driver view, Python client and result', icon: Workflow },
] as const

export function ProjectEvidence({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<(typeof views)[number]['id']>('film')
  const view = views.find((item) => item.id === selected)!
  return (
    <section className={`project-evidence ${compact ? 'compact-evidence' : ''}`} aria-label="Color Saves Life project evidence">
      <div className="evidence-heading">
        <div><span className="evidence-kicker">BCX 2024 · Team project</span><h2>Color Saves Life</h2></div>
        <div className="track-award"><strong>1st</strong><span>digital.auto &amp;<br />mobility challenge</span></div>
      </div>
      <div className="evidence-views" aria-label="Prototype views">
        {views.map(({ id, label, icon: Icon }) => <button type="button" key={id} aria-pressed={selected === id} onClick={() => setSelected(id)}><Icon aria-hidden="true" />{label}</button>)}
      </div>
      {view.id === 'film' ? <ProjectDemo /> : <figure className="evidence-image" data-view={view.id}>
        <a href={view.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${view.label.toLowerCase()} image`}>
          <img src={view.src} width={view.width} height={view.height} alt={view.alt} loading="lazy" />
        </a>
        <figcaption>Images from the team&apos;s public prototype. <a href="https://github.com/KKWANH/ColorSavesLife" target="_blank" rel="noopener noreferrer">Team repository</a>{view.id === 'architecture' ? <a className="pipeline-fullsize" href={view.src} target="_blank" rel="noopener noreferrer">Open full-size pipeline <ArrowUpRight aria-hidden="true" /></a> : null}</figcaption>
      </figure>}
      <div className="evidence-contribution"><p>My contribution: the plugin-based Python client, integration and presentation.</p><Link href="/projects/color-saves-life" className="text-link">Inside the prototype <ArrowUpRight aria-hidden="true" /></Link></div>
    </section>
  )
}
