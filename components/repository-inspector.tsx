'use client'

import { useState } from 'react'
import { ArrowUpRight, FileCode2, FolderGit2 } from 'lucide-react'
import { CareerIcon } from '@/components/career-icons'
import { useSkillPreferences } from '@/components/skill-profile-provider'
import { repositoryScopeLabels } from '@/lib/repository-catalogue'
import type { ReviewedRepository } from '@/lib/repository-types'

export function RepositoryInspector({ repository, onTechnology }: { repository: ReviewedRepository; onTechnology?: (id: string) => void }) {
  const [allFiles, setAllFiles] = useState(false)
  const { preference } = useSkillPreferences()
  const files = allFiles ? repository.sources : repository.sources.slice(0, 5)
  return <div className="repository-inspector" key={repository.name}>
    <p className="repository-context"><FolderGit2 aria-hidden="true" />{repositoryScopeLabels[repository.scope]}</p>
    <h3>{repository.name}</h3>
    {repository.status === 'needs-review' ? <p className="repository-review-note">Source updated by sync. Contribution and technology changes need review.</p> : null}
    <p>{repository.scopeNote}</p>
    {repository.description ? <p className="repository-description">{repository.description}</p> : null}
    <div className="catalogue-technologies">{repository.technologies.map((tech) => onTechnology && preference(tech.id).visibility !== 'hidden'
      ? <button type="button" key={tech.id} onClick={() => onTechnology(tech.id)} title={tech.evidence.map((evidence) => `${evidence.path}: ${evidence.basis}`).join('\n')}><CareerIcon skill={tech.id} />{tech.label}</button>
      : <span key={tech.id} title={preference(tech.id).visibility === 'hidden' ? 'Historical repository technology; hidden from the skill profile.' : undefined}><CareerIcon skill={tech.id} />{tech.label}</span>)}</div>
    {repository.status === 'empty' ? <p>No source files in this repository at the review date.</p> : <>
      <h4>{repository.sources.length} inspected files</h4>
      <ul className="repository-source-files">{files.map((file) => <li key={file.path}><a href={file.url} target="_blank" rel="noopener noreferrer"><FileCode2 aria-hidden="true" /><span>{file.path}</span><ArrowUpRight aria-hidden="true" /></a></li>)}</ul>
      {repository.sources.length > 5 ? <button className="repository-more-files" type="button" onClick={() => setAllFiles((value) => !value)}>{allFiles ? 'Show fewer files' : `Show all ${repository.sources.length} files`}</button> : null}
    </>}
    {repository.limitations.map((note) => <p className="repository-review-note" key={note}>{note}</p>)}
    <a className="text-link" href={repository.url} target="_blank" rel="noopener noreferrer">Open repository <ArrowUpRight aria-hidden="true" /></a>
  </div>
}
