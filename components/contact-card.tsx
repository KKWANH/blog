'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowDownToLine, ArrowUpRight, Mail, ContactRound, FileText } from 'lucide-react'
import { CollectibleCard } from '@/components/collectible-card'
import { CopyText } from '@/components/copy-email'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { education, experience, profile, recruiterBrief } from '@/lib/profile'
import { externalLinks } from '@/lib/projects'

export function ContactCard() {
  const [largeType, setLargeType] = useState(false)
  const typeProbe = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const probe = typeProbe.current
    if (!probe) return
    const observer = new ResizeObserver(() => setLargeType(probe.getBoundingClientRect().width > 20))
    observer.observe(probe)
    return () => observer.disconnect()
  }, [])
  return (
    <div className="contact-layout" data-large-type={largeType}>
      <span ref={typeProbe} className="type-size-probe" aria-hidden="true" />
      <section className="contact-scene" aria-labelledby="card-name">
        <div className="contact-rail">
          <div className="contact-heading">
          <p className="scene-eyebrow">A little introduction</p>
          <h1 id="card-name">Kwanho Kim<span aria-hidden="true">.</span></h1>
          <p className="contact-role">{profile.role}</p>
          <p className="contact-current">KLA · ICOS Division · Zeta team<span className="contact-place">Leuven, Belgium</span></p>
          </div>
          <p className="contact-focus">C++ systems, communication interfaces and error recovery.</p>
          <div className="contact-actions">
          <a href={externalLinks.cv} className="action-button action-primary"><FileText aria-hidden="true" /> CV (PDF)</a>
          <a href={`mailto:${profile.contact}`} className="action-button"><Mail aria-hidden="true" /> Email</a>
          </div>
          <div className="contact-secondary">
            <a href="/contact.vcf" download="Kwanho_Kim.vcf"><ContactRound aria-hidden="true" /> Save contact</a>
            <a href={profile.linkedin}>LinkedIn <ArrowUpRight aria-hidden="true" /></a>
          </div>
          <div className="contact-brief-entry">
          <Dialog>
            <DialogTrigger asChild>
              <button className="recruiter-trigger" type="button">Recruiter brief <ArrowUpRight aria-hidden="true" /></button>
            </DialogTrigger>
            <DialogContent className="brief-dialog">
              <DialogTitle>Quick brief</DialogTitle>
              <DialogDescription>Kwanho Kim · C++ Software Engineer · Leuven, Belgium</DialogDescription>
              <div className="brief-focus">
                <strong>General C++ systems development</strong>
                <p>Error recovery, software integration and device interfaces. Equipment control is a direction I&apos;m continuing to develop.</p>
              </div>
              <h3>Experience</h3>
              <dl className="brief-timeline">
                {experience.map((job) => (
                  <div key={job.company}>
                    <dt>{job.company}<span>{job.period}</span></dt>
                    <dd>{job.role} · {job.location}</dd>
                  </div>
                ))}
              </dl>
              <p className="brief-note">Current lifter work is in problem analysis, design and early implementation with team review.</p>
              <h3>Background</h3>
              <p>Three awarded bachelor&apos;s degrees: Computer Engineering, Artificial Intelligence and Business Administration. Mechatronics in progress at KNOU Prime College. 42 and SEA:ME completed.</p>
              <p><strong>BCX 2024:</strong> first place in the digital.auto &amp; mobility challenge with Color Saves Life.</p>
              <div className="brief-actions">
                <a href={externalLinks.cv} className="action-button action-primary"><ArrowDownToLine aria-hidden="true" /> Open CV</a>
                <a href={`mailto:${profile.contact}`} className="action-button">Get in touch</a>
                <DialogClose asChild><button type="button" className="action-button">Close brief</button></DialogClose>
                <CopyText text={recruiterBrief} label="Copy brief" success="Recruiter brief copied." />
              </div>
            </DialogContent>
          </Dialog>
            <p>Dates, experience and the practical details.</p>
          </div>
        </div>
        <CollectibleCard staticTilt={largeType} />
      </section>

      <section id="work" className="card-work" aria-labelledby="card-work-title">
        <div className="section-heading">
          <h2 id="card-work-title">Work notes</h2>
          <span className="section-note">Open the part you came for.</span>
        </div>
        {experience.map((job) => (
          <details className="work-disclosure" key={job.company}>
            <summary>
              <span className="work-disclosure-name">{job.company}<small>{job.role}</small></span>
              <span className="work-disclosure-date">{job.period}</span>
              <span className="disclosure-plus" aria-hidden="true">+</span>
            </summary>
            <div className="work-disclosure-body">
              <p>{job.field} · {job.location}</p>
              <ul>{job.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </div>
          </details>
        ))}
      </section>

      <div className="card-bottom-grid">
        <section className="background-note" aria-labelledby="background-title">
          <h2 id="background-title">Still learning.</h2>
          <p>Mechatronics at KNOU Prime College, alongside C++ work.</p>
          <details className="education-disclosure">
            <summary>Degrees &amp; completed programs</summary>
            <dl>
              {education.map((item) => (
                <div key={item.subject}>
                  <dt>{item.subject}<span>{item.period}</span></dt>
                  <dd>{item.status}<br />{item.institution}</dd>
                </div>
              ))}
              <div><dt>42 &amp; SEA:ME</dt><dd>Software engineering and automotive/mobility programs. Both completed.</dd></div>
            </dl>
          </details>
        </section>
        <section className="award-note" aria-labelledby="award-title">
          <span className="handwritten">One for the team.</span>
          <h2 id="award-title">BCX 2024</h2>
          <p><strong>1st place</strong><br />digital.auto &amp; mobility challenge</p>
          <Link href="/projects/color-saves-life" className="text-link">Color Saves Life <ArrowUpRight aria-hidden="true" /></Link>
        </section>
      </div>
      <nav className="card-exits" aria-label="More from Kwanho">
        <Link href="/projects">Projects <ArrowUpRight aria-hidden="true" /></Link>
        <Link href="/notes">Notes <ArrowUpRight aria-hidden="true" /></Link>
        <Link href="/travel">Places I&apos;ve been <ArrowUpRight aria-hidden="true" /></Link>
      </nav>
    </div>
  )
}
