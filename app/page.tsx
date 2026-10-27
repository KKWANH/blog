import Link from 'next/link'
import { ArrowUpRight, BrainCircuit, Cpu, ScanLine } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/hero'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/lib/projects'
import { experience } from '@/lib/profile'
import { getAllContentPages } from '@/lib/content'
import { ProjectEvidence } from '@/components/project-evidence'
import { TravelPreview } from '@/components/travel/travel-preview'
import { CompanyMark } from '@/components/company-mark'

export default function HomePage() {
  const notes = getAllContentPages().filter((page) => page.slug[0] === 'notes' && page.slug.length > 1)
  const archive = notes.filter((page) => page.category === 'Study archive')
  const selectedProjects = projects.filter((project) => project.category !== 'AI-built experiment')
    .sort((left, right) => Number(right.id === 'color-saves-life') - Number(left.id === 'color-saves-life'))

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="site-width">
        <Hero />

        <section id="work" className="home-section" aria-labelledby="work-title">
          <div className="section-heading">
            <h2 id="work-title">Work, so far.</h2>
            <span className="section-note">C++, integration and error handling</span>
          </div>
          <ol className="work-list">
            {experience.map((job, index) => (
              <li key={job.company}>
                <p className="work-period">
                  {index === 0 ? <span className="current-dot" aria-hidden="true" /> : null}
                  {job.period}
                </p>
                <h3><Link className="home-company-link" href={`/about#experience-${job.id}`}><CompanyMark company={job.id} /><span>{job.company}</span><ArrowUpRight aria-hidden="true" /></Link></h3>
                <p className="work-field">{job.field}</p>
                <p className="work-description">{job.description}</p>
              </li>
            ))}
          </ol>
          <Link className="text-link work-more" href="/about">Experience &amp; education <ArrowUpRight aria-hidden="true" /></Link>
        </section>

        <section id="projects" className="home-section" aria-labelledby="projects-title">
          <div className="section-heading">
            <h2 id="projects-title">Selected work.</h2>
            <Link className="text-link" href="/projects">Projects &amp; experiments <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className="project-list">
            <ProjectEvidence />
            {selectedProjects.filter((project) => project.id !== 'color-saves-life').map((project, index) => <ProjectCard key={project.id} project={project} index={index + 1} />)}
          </div>
        </section>

        <section id="notes" className="home-section" aria-labelledby="notes-title">
          <div className="section-heading">
            <h2 id="notes-title">Study notes.</h2>
            <Link className="text-link" href="/notes">All notes <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className="study-index">
            {archive.map((note, index) => {
              const Icon = note.slugPath === 'notes/ai' ? BrainCircuit : note.slugPath === 'notes/kla' ? ScanLine : Cpu
              return <Link href={note.href} key={note.href} className="study-index-entry">
                <Icon className="study-subject-icon" aria-hidden="true" />
                <span><small>0{index + 1} · Korean study archive</small><strong>{note.title}</strong>{note.slugPath === 'notes/kla' ? <em>Public-source study material</em> : null}</span>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            })}
          </div>
          <p className="archive-caption">Longer study guides, prepared with AI assistance. Kept in their original language.</p>
        </section>

        <TravelPreview />
      </main>
      <SiteFooter />
    </>
  )
}
