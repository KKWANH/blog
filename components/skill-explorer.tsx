'use client'

import { useEffect, useRef, useState } from 'react'
import { List, Network } from 'lucide-react'
import { CareerIcon } from '@/components/career-icons'
import { careerSkillGroups, careerSkills, type CareerSkill, type CareerSkillGroup } from '@/lib/profile'

type Branch = { group: CareerSkillGroup; path: string }

export function SkillExplorer({ selected, onSelect }: { selected: CareerSkill | null; onSelect: (skill: CareerSkill | null) => void }) {
  const [view, setView] = useState<'list' | 'map'>('list')
  const [branches, setBranches] = useState<Branch[]>([])
  const canvas = useRef<HTMLDivElement>(null)
  const hub = useRef<HTMLDivElement>(null)
  const groups = useRef<Partial<Record<CareerSkillGroup, HTMLElement>>>({})
  const selectedGroup = careerSkills.find((skill) => skill.id === selected)?.group

  useEffect(() => {
    const element = canvas.current
    if (view !== 'map' || !element || !hub.current) return
    let frame = 0
    const measure = () => {
      frame = 0
      const box = element.getBoundingClientRect(), center = hub.current!.getBoundingClientRect()
      const start = { x: center.x + center.width / 2 - box.x, y: center.y + center.height / 2 - box.y }
      setBranches(careerSkillGroups.flatMap((group) => {
        const target = groups.current[group.id]?.getBoundingClientRect()
        if (!target) return []
        const end = { x: target.x + target.width / 2 - box.x, y: target.y + target.height / 2 - box.y }
        const middle = (start.x + end.x) / 2
        return [{ group: group.id, path: `M${start.x},${start.y} C${middle},${start.y} ${middle},${end.y} ${end.x},${end.y}` }]
      }))
    }
    const queue = () => { if (!frame) frame = requestAnimationFrame(measure) }
    const observer = new ResizeObserver(queue)
    observer.observe(element); observer.observe(hub.current)
    Object.values(groups.current).forEach((group) => { if (group) observer.observe(group) })
    queue()
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [view])

  return (
    <div className="skill-explorer" data-view={view}>
      <div className="skill-view-controls" aria-label="Skills presentation">
        <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')}><List aria-hidden="true" />Icon list</button>
        <button type="button" aria-pressed={view === 'map'} onClick={() => setView('map')}><Network aria-hidden="true" />Mind map</button>
      </div>
      <div ref={canvas} className="skill-explorer-canvas">
        {view === 'map' ? <svg className="skill-map-lines" aria-hidden="true" focusable="false">
          {branches.map((branch) => <path key={branch.group} d={branch.path} pathLength="1" data-active={selectedGroup === branch.group} />)}
        </svg> : null}
        <div ref={hub} className="skill-map-hub"><CareerIcon skill="cpp" /><strong>C++ systems</strong><span>Work focus</span></div>
        {careerSkillGroups.map((group) => (
          <section key={group.id} ref={(element) => { if (element) groups.current[group.id] = element }} className="skill-family" data-group={group.id} data-active={selectedGroup === group.id} aria-labelledby={`skill-group-${group.id}`}>
            <h3 id={`skill-group-${group.id}`}>{group.label}</h3>
            <div className="skill-lenses">
              {careerSkills.filter((skill) => skill.group === group.id).map((skill) => <button
                key={skill.id}
                type="button"
                aria-pressed={selected === skill.id}
                aria-controls="career-evidence"
                title={skill.detail}
                onClick={() => onSelect(selected === skill.id ? null : skill.id)}
              ><CareerIcon skill={skill.id} /><span>{skill.label}</span></button>)}
            </div>
          </section>
        ))}
      </div>
      <p className="skill-explorer-caption">Select an icon to follow it into the work or CV.</p>
    </div>
  )
}
