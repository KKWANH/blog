'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Printer, Copy, Check } from 'lucide-react'
import content from '@/contents/cv-content.json'

/* `gpa` is only passed by the local submission route (app/cv/submission), never by the public /cv. */
export function HtmlCv({ gpa }: { gpa?: Record<string, string> } = {}) {
  const [copied, setCopied] = useState(false)
  const paperRef = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    if (paperRef.current) {
      try {
        await navigator.clipboard.writeText(paperRef.current.innerText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // clipboard fallback
      }
    }
  }

  // Phones see the whole A4 sheet scaled to fit instead of a sideways-scrolling crop; print resets it (styles/notebook.css).
  useEffect(() => {
    const paper = paperRef.current, scroller = paper?.parentElement
    if (!paper || !scroller) return
    const fit = () => {
      paper.style.zoom = ''
      const available = scroller.clientWidth - 8
      paper.style.zoom = available < paper.offsetWidth ? String(available / paper.offsetWidth) : ''
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(scroller)
    return () => observer.disconnect()
  }, [])

  const selectedProjects = content.projects.filter((p) => (p as { includeInCV?: boolean }).includeInCV !== false)

  return (
    <div className="html-cv-container">
      <div className="html-cv-toolbar">
        <Link href="/about" className="cv-toolbar-back">
          <ArrowLeft aria-hidden="true" />
          <span>About Kwanho</span>
        </Link>
        <div className="cv-toolbar-actions">
          <button type="button" onClick={handleCopy} className="action-button">
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            <span>{copied ? 'Copied' : 'Copy text'}</span>
          </button>
          <a href="/CV.pdf" download="Kwanho_Kim_CV.pdf" className="action-button">
            <Download aria-hidden="true" />
            <span>Download PDF</span>
          </a>
          <button type="button" onClick={() => window.print()} className="action-button action-primary">
            <Printer aria-hidden="true" />
            <span>Print</span>
          </button>
        </div>
      </div>

      <div className="html-cv-scroll">
        <article ref={paperRef} className="html-cv-paper" aria-label="Kwanho Kim CV">
          <header className="cv-header">
            <div>
              <h1 className="cv-name">{content.name}</h1>
              <p className="cv-role">{content.role.split(' · ').map((part) => <span key={part}>{part}</span>)}</p>
            </div>
            {/* Three right-aligned lines beside the name: both header edges are used and the page keeps its line budget. */}
            <div className="cv-contact">
              <p>{content.location}<span className="cv-sep" aria-hidden="true">{" \u00b7 "}</span><a href={`tel:${content.phone.replace(/\s/g, '')}`}>{content.phone}</a></p>
              <p><a href={`mailto:${content.email}`}>{content.email}</a><span className="cv-sep" aria-hidden="true">{" \u00b7 "}</span><a href={content.website}>kwanho.dev</a></p>
              <p><a href={content.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/kwanhokim</a><span className="cv-sep" aria-hidden="true">{" \u00b7 "}</span><a href={content.github} target="_blank" rel="noopener noreferrer">github.com/KKWANH</a></p>
            </div>
          </header>

          <p className="cv-summary">{(content as { summary?: string }).summary}</p>

          <section className="cv-section">
            <h2 className="section-title">Experience</h2>
            {content.experience.map((job) => (
              <article key={job.company} className="cv-job">
                <div className="job-linear-heading">
                  <h3>{job.company}</h3>{' '}
                  <strong>{job.role}</strong>{' '}
                  <time>
                    {job.dates}
                    <span> · {job.location}</span>
                  </time>
                </div>
                <div className="job-body">
                  <ul>
                    {(job as { currentFocus?: string }).currentFocus ? (
                      <li className="job-progress">
                        {(job as { currentFocus?: string }).currentFocus} <span>(in progress)</span>
                      </li>
                    ) : null}
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>
                        {renderEmphasized(bullet, (job as { emphasis?: string[] }).emphasis || [])}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </section>

          <section className="cv-section">
            <h2 className="section-title">Projects</h2>
            {selectedProjects.map((project) => {
              const award = (project as { award?: { credit: string; rank: string; scope: string; event: string } }).award
              return (
                <article key={project.name} className="award-project">
                  {award ? (
                    <div className="award-result">
                      <span>Winner</span>{' '}
                      <strong>{award.rank}</strong>
                    </div>
                  ) : null}
                  <div>
                    <div className="award-heading">
                      <h3>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          {project.name}
                        </a>
                      </h3>
                      <span>{project.dates}</span>
                    </div>
                    {award ? (
                      <p className="award-scope">
                        {award.scope} · {award.event}
                      </p>
                    ) : null}
                    <p className="award-contribution">{project.description}</p>
                  </div>
                </article>
              )
            })}
          </section>

          <section className="cv-section">
            <h2 className="section-title">Technical skills</h2>
            {/* One paragraph per row so text extraction keeps each label with its values. */}
            <div className="skills-list">
              {content.skills.map((skill) => (
                <p key={skill.label}>
                  <strong>{skill.label}</strong> {skill.text}
                </p>
              ))}
            </div>
          </section>

          {/* Single column rows: PDF text extraction reads each entry with its own date. */}
          <section className="cv-section">
            <h2 className="section-title">Education</h2>
            {content.education.map((edu) => (
              <p key={edu.name} className="cv-row">
                <span><strong>{edu.name}</strong> · {((edu as { detailLines?: string[] }).detailLines || [edu.detail]).join(' · ')}{gpa?.[edu.name] ? ` · GPA ${gpa[edu.name]}` : null}</span>{' '}
                <span className="cv-row-date">{edu.date}</span>
              </p>
            ))}
          </section>

          <section className="cv-section">
            <h2 className="section-title">Training</h2>
            {content.training.map((prog) => (
              <p key={prog.id} className="cv-row">
                <span><strong>{prog.name}</strong> · {prog.program} · {prog.location}</span>{' '}
                <span className="cv-row-date">{prog.period || prog.status}</span>
              </p>
            ))}
          </section>

          <footer className="cv-footer">
            {content.languages}
          </footer>
        </article>
      </div>
    </div>
  )
}

function renderEmphasized(text: string, phrases: string[]): React.ReactNode {
  if (!phrases || phrases.length === 0) return text
  let parts: React.ReactNode[] = [text]
  for (const phrase of phrases) {
    const next: React.ReactNode[] = []
    for (const part of parts) {
      if (typeof part !== 'string') {
        next.push(part)
        continue
      }
      const index = part.indexOf(phrase)
      if (index === -1) {
        next.push(part)
      } else {
        const before = part.slice(0, index)
        const after = part.slice(index + phrase.length)
        if (before) next.push(before)
        next.push(<strong key={phrase}>{phrase}</strong>)
        if (after) next.push(after)
      }
    }
    parts = next
  }
  return parts
}
