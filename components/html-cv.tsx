'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, Printer, Copy, Check } from 'lucide-react'
import content from '@/contents/cv-content.json'

export function HtmlCv() {
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
            <div className="identity-row">
              <div>
                <h1 className="cv-name">{content.name}</h1>
                <p className="cv-role">{content.role}</p>
              </div>
              <div className="identity-context">
                <p>
                  {content.domains.map((domain) => (
                    <span key={domain}>{domain}</span>
                  ))}
                </p>
                <span className="identity-rule" aria-hidden="true" />
              </div>
            </div>
            <div className="cv-contact">
              <span>{content.location}</span>
              <a href={`mailto:${content.email}`}>{content.email}</a>
              <a href={content.website}>kwanho.dev</a>
              <a href={content.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/kwanhokim</a>
              <a href={content.github} target="_blank" rel="noopener noreferrer">github.com/KKWANH</a>
            </div>
          </header>

          <section className="cv-section">
            <h2 className="section-title">Experience</h2>
            {content.experience.map((job) => (
              <article key={job.company} className="cv-job">
                <div className="job-linear-heading">
                  <h3>{job.company}</h3>
                  <strong>{job.role}</strong>
                  <time>
                    {job.dates}
                    <span> · {job.location}</span>
                  </time>
                </div>
                <div className="job-body">
                  <ul>
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>
                        {renderEmphasized(bullet, (job as { emphasis?: string[] }).emphasis || [])}
                      </li>
                    ))}
                  </ul>
                  {(job as { currentFocus?: string }).currentFocus ? (
                    <p className="job-progress">
                      <span>In progress</span>
                      {(job as { currentFocus?: string }).currentFocus}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </section>

          <section className="cv-section">
            <h2 className="section-title">Team project &amp; award</h2>
            {selectedProjects.map((project) => {
              const award = (project as { award?: { credit: string; rank: string; scope: string; event: string } }).award
              return (
                <article key={project.name} className="award-project">
                  {award ? (
                    <div className="award-result">
                      <span>{award.credit}</span>
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
            <div className="skills-band">
              {content.skills.map((skill) => (
                <div key={skill.label}>
                  <h3>{skill.label}</h3>
                  <p>
                    {((skill as { lines?: string[] }).lines || [skill.text]).map((line, idx) => (
                      <span key={idx} className="skill-line">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="cv-section education-grid">
            <section>
              <h2 className="section-title">Education</h2>
              {content.education.map((edu) => (
                <article key={edu.name} className="education-item">
                  <div className="education-heading">
                    <h3>{edu.name}</h3>
                    <span>{edu.date}</span>
                  </div>
                  <p>
                    {((edu as { detailLines?: string[] }).detailLines || [edu.detail]).map((line, idx) => (
                      <span key={idx} className="edu-line">
                        {line}
                      </span>
                    ))}
                  </p>
                </article>
              ))}
            </section>
            <section>
              <h2 className="section-title">Technical training</h2>
              {content.training.map((prog) => (
                <article key={prog.id} className="training-item">
                  <h3>
                    {prog.name}
                    <span>{prog.status}</span>
                  </h3>
                  <p>{prog.program}</p>
                  <p>{prog.period || prog.location}</p>
                </article>
              ))}
            </section>
          </div>

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
