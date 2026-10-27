import { CodeXml, ScanLine, RotateCcw, Network, RadioTower, Check, ArrowUpRight, PanelsTopLeft, type LucideIcon } from 'lucide-react'
import { experience, type CareerSkill } from '@/lib/profile'
import { CareerIcon } from '@/components/career-icons'
import { CompanyMark } from '@/components/company-mark'

type WorkDiagram = { title: string; nodes: Array<{ icon: LucideIcon; label: string; skill?: CareerSkill }>; caption: string }
const diagrams: Record<string, WorkDiagram> = {
  kla: {
    title: 'Current work scope',
    nodes: [{ icon: ScanLine, label: 'Fault analysis' }, { icon: RotateCcw, label: 'Recovery design' }, { icon: CodeXml, label: 'Early implementation', skill: 'cpp' }],
    caption: 'Lifter recovery work is ongoing, with team review. Camera settings and serial device-control integration are additional areas of work.',
  },
  pickit: {
    title: 'Communication interfaces',
    nodes: [{ icon: CodeXml, label: 'Python client', skill: 'python' }, { icon: Network, label: 'Validation & messages' }, { icon: RotateCcw, label: 'Reconnect & backoff' }],
    caption: 'A Python WebSocket client for internal integrations, with message validation and connection recovery. A field communication failure was traced to a port conflict.',
  },
  bosch: {
    title: 'V2X demonstrator',
    nodes: [{ icon: RadioTower, label: 'Communication modules' }, { icon: Network, label: 'Message interfaces' }, { icon: Check, label: 'End-to-end checks' }],
    caption: 'Vehicle-to-everything demonstrator work and test runs. A separate React interface supported an eBike safety prototype.',
  },
}

export function CareerEvidence({ selected, skill }: { selected: string; skill: CareerSkill | null }) {
  const job = experience.find((item) => item.id === selected) ?? experience[0]
  const diagram: WorkDiagram = skill === 'react' && job.id === 'bosch' ? {
    title: 'eBike operator interface',
    nodes: [{ icon: PanelsTopLeft, label: 'React interface', skill: 'react' }, { icon: RadioTower, label: 'eBike safety prototype' }],
    caption: 'Developed a React interface for an eBike safety prototype during the Bosch internship. This was separate from the V2X demonstrator.',
  } : skill === 'react' && job.id === 'pickit' ? {
    title: 'Configuration interfaces',
    nodes: [{ icon: PanelsTopLeft, label: 'System & network screens', skill: 'react' }, { icon: Check, label: 'Input validation' }],
    caption: 'Developed system and network configuration screens with input validation. Communication-interface design remained the main focus of the role.',
  } : diagrams[job.id]
  return (
    <aside className="career-evidence" id="career-evidence" aria-labelledby="evidence-title" tabIndex={-1}>
      <div className="career-evidence-heading"><CompanyMark company={job.id} /><span>{job.company}<small>{job.period}</small></span></div>
      <h3 id="evidence-title">{diagram.title}</h3>
      <div className="work-scope-diagram" aria-label={diagram.title}>
        {diagram.nodes.map(({ icon: NodeIcon, label, skill: nodeSkill }, index) => <div className="scope-node" key={label}>
          {nodeSkill ? <CareerIcon skill={nodeSkill} /> : <NodeIcon aria-hidden="true" />}<span>{label}</span>{index < diagram.nodes.length - 1 ? <i aria-hidden="true">↓</i> : null}
        </div>)}
      </div>
      <p>{diagram.caption}</p>
      <div className="evidence-skill-tags">{job.skills.map((skill) => <span key={skill}><CareerIcon skill={skill as CareerSkill} />{skill === 'cpp' ? 'C++' : skill === 'react' ? 'React' : skill === 'python' ? 'Python' : skill}</span>)}</div>
      <a href={`#experience-${job.id}`} className="text-link">Contribution details <ArrowUpRight aria-hidden="true" /></a>
    </aside>
  )
}
