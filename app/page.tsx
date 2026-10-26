import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/hero'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/lib/projects'
import { experience } from '@/lib/profile'
import { getAllContentPages } from '@/lib/content'

export default function HomePage() {
  const notes = getAllContentPages().filter((page) => page.slug[0] === 'notes' && page.slug.length > 1)
  const featured = notes.find((page) => page.slugPath === 'notes/device-readback')
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
                <h3>{job.company}</h3>
                <p className="work-field">{job.field}</p>
                <p className="work-description">{job.description}</p>
              </li>
            ))}
          </ol>
          <Link className="text-link work-more" href="/about">My card &amp; work notes <ArrowUpRight aria-hidden="true" /></Link>
        </section>

        <section id="projects" className="home-section" aria-labelledby="projects-title">
          <div className="section-heading">
            <h2 id="projects-title">Selected work.</h2>
            <Link className="text-link" href="/projects">Projects &amp; experiments <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className="project-list">
            {selectedProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
          </div>
        </section>

        <section id="notes" className="home-section" aria-labelledby="notes-title">
          <div className="section-heading">
            <h2 id="notes-title">From the notebook.</h2>
            <Link className="text-link" href="/notes">All notes <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className="writing-layout">
            {featured ? (
              <article className="featured-note">
                <div className="note-meta">Engineering · English · {featured.readTime}</div>
                <h3><Link href={featured.href}>{featured.title}</Link></h3>
                <p>{featured.excerpt}</p>
                <Link className="text-link" href={featured.href}>Read the note <ArrowUpRight aria-hidden="true" /></Link>
              </article>
            ) : null}
            <div>
              <h3 className="archive-heading">Study archive</h3>
              <ul className="archive-list">
                {archive.map((note) => (
                  <li key={note.href}>
                    <Link href={note.href}>
                      <span>{note.title}{note.slugPath === 'notes/kla' ? <small className="archive-provenance">Public-source study guide</small> : null}</span>
                      <span>Korean</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="archive-caption">Longer study guides, prepared with AI assistance. Kept in their original language.</p>
            </div>
          </div>
        </section>

        <aside className="travel-aside" aria-label="Travel">
          <div>
            <p className="handwritten">Away from the keyboard</p>
            <p>A map of places I&apos;ve visited and lived.</p>
          </div>
          <Link className="text-link" href="/travel">Explore the map <ArrowUpRight aria-hidden="true" /></Link>
        </aside>
      </main>
      <SiteFooter />
    </>
  )
}
