import { ArrowUpRight, FileCode2, FolderGit2, PenTool } from 'lucide-react'
import { CareerIcon } from '@/components/career-icons'
import type { SkillProject } from '@/lib/skill-projects'
import type { CareerSkill } from '@/lib/profile'

export function RepositoryEvidence({ project, skill }: { project?: SkillProject; skill: CareerSkill | null }) {
  if (!project) return <aside id="career-evidence" className="career-evidence repository-evidence" tabIndex={-1} aria-labelledby="repository-title">
    <div className="repository-heading"><PenTool aria-hidden="true" /><span>Design practice</span></div>
    <h3 id="repository-title">Figma &amp; UI design</h3>
    <p>Working familiarity with Figma and basic UI design.</p>
    <div className="repository-skills"><CareerIcon skill="figma" /><span>Figma</span><CareerIcon skill="ui-design" /><span>UI design</span></div>
    <p className="repository-scope">A supporting part of my software work.</p>
  </aside>

  return <aside id="career-evidence" className="career-evidence repository-evidence" tabIndex={-1} aria-labelledby="repository-title">
    <div className="repository-heading"><FolderGit2 aria-hidden="true" /><span>{project.category}<small>{project.year}</small></span></div>
    <h3 id="repository-title">{project.title}</h3>
    <p>{project.description}</p>
    <div className="repository-skills">{project.skills.map((item) => <span key={item} data-active={skill === item}><CareerIcon skill={item} /></span>)}</div>
    <ul className="repository-files">{project.details.map((item) => <li key={item.href}><a href={item.href} target="_blank" rel="noopener noreferrer"><FileCode2 aria-hidden="true" /><span>{item.label}</span><ArrowUpRight aria-hidden="true" /></a></li>)}</ul>
    <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">Open repository <ArrowUpRight aria-hidden="true" /></a>
    <p className="repository-scope">Public project work; separate from employment experience.</p>
  </aside>
}
