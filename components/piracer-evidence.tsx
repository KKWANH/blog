'use client'

import { useState } from 'react'
import { ArrowUpRight, Gauge, Cpu, Workflow } from 'lucide-react'

const views = [
  { id: 'dashboard', label: 'Digital cluster UI', src: '/project-media/piracer-dashboard.webp', width: 1600, height: 500, alt: 'PiRacer digital speedometer dashboard with RPM and battery levels', icon: Gauge },
  { id: 'vehicle', label: 'Assembled hardware', src: '/project-media/piracer-assembled.webp', width: 1121, height: 1200, alt: 'Assembled PiRacer vehicle with Raspberry Pi, CAN shield and display', icon: Cpu },
  { id: 'architecture', label: 'Architecture', src: '/project-media/piracer-architecture.webp', width: 818, height: 547, alt: 'PiRacer software architecture: sensors, CAN bus, D-Bus broker, and Qt/QML dashboard', icon: Workflow },
] as const

export function PiRacerEvidence({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState<(typeof views)[number]['id']>('dashboard')
  const view = views.find((item) => item.id === selected)!
  return (
    <section className={`project-evidence piracer-evidence ${compact ? 'compact-evidence' : ''}`} aria-label="PiRacer instrument cluster project evidence">
      <div className="evidence-heading">
        <div>
          <span className="evidence-kicker">SEA:ME · Automotive mobility project</span>
          <h2>PiRacer Instrument Cluster</h2>
        </div>
        <div className="track-badge">
          <strong>Qt/QML</strong>
          <span>CAN · D-Bus · RPi</span>
        </div>
      </div>
      <p className="evidence-summary">
        A real-time digital speedometer instrument cluster running on Raspberry Pi and Qt/QML, receiving telemetry from a speed sensor via CAN bus and an inter-process D-Bus broker.
      </p>
      <div className="evidence-views" aria-label="PiRacer views">
        {views.map(({ id, label, icon: Icon }) => (
          <button type="button" key={id} aria-pressed={selected === id} onClick={() => setSelected(id)}>
            <Icon aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
      <figure className="evidence-image" data-view={view.id}>
        <a href={view.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${view.label.toLowerCase()} image`}>
          <img src={view.src} width={view.width} height={view.height} alt={view.alt} loading="lazy" />
        </a>
        <figcaption>
          Images from the project documentation. <a href="https://github.com/KKWANH/DES02-PiRacer-instrument" target="_blank" rel="noopener noreferrer">Project repository <ArrowUpRight aria-hidden="true" /></a>
        </figcaption>
      </figure>
      <div className="evidence-contribution">
        <p>Key work: Multi-process IPC design with D-Bus, CAN sensor integration, and Qt/QML digital gauge dashboard.</p>
        <a href="https://github.com/KKWANH/DES02-PiRacer-instrument#software-architecture" target="_blank" rel="noopener noreferrer" className="text-link">Architecture documentation <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  )
}
