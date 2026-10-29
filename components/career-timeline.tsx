'use client'

import { useEffect, useRef } from 'react'
import { ArrowLeftRight, BriefcaseBusiness, GraduationCap } from 'lucide-react'
import { education, experience, type CareerSkill } from '@/lib/profile'

const firstYear = 2020
const lastYear = 2027
const years = Array.from({ length: lastYear - firstYear }, (_, index) => firstYear + index)
function position(value: string) {
  const [year, month] = value.split('-').map(Number)
  return ((year + (month - 1) / 12 - firstYear) / (lastYear - firstYear)) * 100
}

export function CareerTimeline({ skill, selected, onSelect }: { skill: CareerSkill | null; selected: string; onSelect: (id: string) => void }) {
  const scroll = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const media = matchMedia('(max-width: 47.99rem)')
    const recent = () => {
      if (media.matches && scroll.current) scroll.current.scrollLeft = scroll.current.scrollWidth - scroll.current.clientWidth
    }
    recent()
    media.addEventListener('change', recent)
    return () => media.removeEventListener('change', recent)
  }, [])
  return (
    <section className="career-timeline" aria-labelledby="timeline-title">
      <div className="timeline-heading"><h2 id="timeline-title">Work &amp; education</h2><span>2020 → Present</span></div>
      <p className="timeline-mobile-cue"><ArrowLeftRight aria-hidden="true" />Recent work is shown first. Scroll sideways for earlier study.</p>
      <div ref={scroll} className="timeline-scroll" tabIndex={0} aria-label="Career timeline. Use left and right arrow keys to scroll. A complete text record follows below.">
        <div className="timeline-chart">
          <div className="timeline-axis" aria-hidden="true"><span />{years.map((year) => <span key={year}>{year}</span>)}</div>
          <div className="timeline-group-label"><BriefcaseBusiness aria-hidden="true" />Experience</div>
          {[...experience].reverse().map((job) => {
            const start = position(job.start), finish = job.end ? position(job.end) : 100
            const linked = !skill || (job.skills as readonly string[]).includes(skill)
            return <button type="button" className="timeline-row" key={job.id} data-linked={linked} aria-pressed={selected === job.id} onClick={() => onSelect(job.id)}>
              <span className="timeline-label">{job.company}<span>{job.period}</span></span>
              <span className="timeline-track" aria-hidden="true">
                <span className="timeline-band work-band" data-ongoing={!job.end} style={{ left: `${start}%`, width: `${Math.max(finish - start, 2)}%` }} />
              </span>
            </button>
          })}
          <div className="timeline-group-label"><GraduationCap aria-hidden="true" />Education</div>
          {/* Awarded degrees are dated by graduation only: a marker, not a study-length band. */}
          {[...education].sort((a, b) => (a.end ?? a.start).localeCompare(b.end ?? b.start)).map((item) => {
            return <a className="timeline-row education-row" key={item.id} href={`#${item.id}`}>
              <span className="timeline-label">{item.subject}<span>{item.period}</span></span>
              <span className="timeline-track" aria-hidden="true">
                {item.end
                  ? <span className="timeline-band study-mark" style={{ left: `${position(item.end)}%` }} />
                  : <span className="timeline-band study-band" data-ongoing="true" style={{ left: `${position(item.start)}%`, width: `${Math.max(100 - position(item.start), 2)}%` }} />}
              </span>
            </a>
          })}
        </div>
      </div>
      <p className="timeline-legend"><span><i className="work-key" aria-hidden="true" />Experience</span><span><i className="study-key" aria-hidden="true" />Awarded degree</span><span><i className="ongoing-key" aria-hidden="true" />Ongoing</span></p>
    </section>
  )
}
