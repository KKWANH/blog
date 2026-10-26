import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ProjectSketch } from '@/components/project-sketch'
import type { Project } from '@/lib/projects'
import { TiltSurface } from '@/components/tilt-surface'

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <TiltSurface className="project-material" pitch={0} yaw={0} lift={4} scale={1}>
      <article className="project-entry" aria-labelledby={`project-${project.id}`}>
      <Link className="project-art" href={project.href} aria-label={`Read about ${project.name}`}>
        <ProjectSketch kind={project.visual} />
      </Link>
      <div>
        <div className="project-meta">
          <span>{String(index + 1).padStart(2, '0')} / {project.category}</span>
          {project.year ? <span>{project.year}</span> : null}
          {project.status ? <span className="project-status">{project.status}</span> : null}
        </div>
        <h3 id={`project-${project.id}`}><Link href={project.href}>{project.name}</Link></h3>
        <p className="project-description">{project.description}</p>
        <div className="project-actions">
          <Link className="text-link" href={project.href}>Project notes <ArrowUpRight aria-hidden="true" /></Link>
          {project.source ? <a className="text-link" href={project.source}>Source <ArrowUpRight aria-hidden="true" /></a> : null}
        </div>
        <details className="project-details">
          <summary>Implementation<span className="sr-only"> of {project.name}</span></summary>
          <p>{project.details}</p>
          <p className="project-stack">{project.stack.join(' · ')}</p>
        </details>
      </div>
      </article>
    </TiltSurface>
  )
}
