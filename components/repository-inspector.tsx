'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, FileCode2, FolderGit2 } from 'lucide-react'
import { CareerIcon } from '@/components/career-icons'
import { useSkillPreferences } from '@/components/skill-profile-provider'
import { repositoryScopeLabels, repositoryCatalogue } from '@/lib/repository-catalogue'
import type { ReviewedRepository, RepositorySummary } from '@/lib/repository-types'

const detailsCache = new Map<string, ReviewedRepository>()

export function RepositoryInspector({ repository, onTechnology }: { repository: RepositorySummary; onTechnology?: (id: string) => void }) {
  const [allFiles, setAllFiles] = useState(false)
  const [detail, setDetail] = useState<ReviewedRepository | null>(null)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  const { preference } = useSkillPreferences()
  useEffect(() => {
    const key = `${repositoryCatalogue.revision}:${repository.name}`
    const cached = detailsCache.get(key)
    setError(''); setAllFiles(false)
    if (cached) { setDetail(cached); return }
    const controller = new AbortController()
    setDetail(null); setError('')
    void fetch(`/api/repositories/${encodeURIComponent(repository.name)}?revision=${repositoryCatalogue.revision}`, { signal: controller.signal }).then(async (response) => {
      const value = await response.json()
      if (!response.ok || value.repository?.name !== repository.name || value.revision !== repositoryCatalogue.revision) throw new Error(value.error ?? 'Source details could not be loaded.')
      if (!controller.signal.aborted) {
        if (detailsCache.size >= 200) detailsCache.clear()
        detailsCache.set(key, value.repository); setDetail(value.repository)
      }
    }).catch((cause) => { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : 'Source details could not be loaded.') })
    return () => controller.abort()
  }, [repository.name, repositoryCatalogue.revision, retry])
  const files = detail ? allFiles ? detail.sources : detail.sources.slice(0, 5) : []
  const technologies = detail?.technologies ?? repository.technologies
  return <div className="repository-inspector" key={repository.name}>
    <p className="repository-context"><FolderGit2 aria-hidden="true" />{repositoryScopeLabels[repository.scope]}</p>
    <h3>{repository.name}</h3>
    {repository.status === 'needs-review' ? <p className="repository-review-note">Source updated by sync. Contribution and technology changes need review.</p> : null}
    <p>{repository.scopeNote}</p>
    {repository.description ? <p className="repository-description">{repository.description}</p> : null}
    <div className="catalogue-technologies">{technologies.map((tech) => onTechnology && preference(tech.id).visibility !== 'hidden'
      ? <button type="button" key={tech.id} onClick={() => onTechnology(tech.id)} title={detail?.technologies.find((item) => item.id === tech.id)?.evidence.map((evidence) => `${evidence.path}: ${evidence.basis}`).join('\n')}><CareerIcon skill={tech.id} />{tech.label}</button>
      : <span key={tech.id} title={preference(tech.id).visibility === 'hidden' ? 'Historical repository technology; hidden from the skill profile.' : undefined}><CareerIcon skill={tech.id} />{tech.label}</span>)}</div>
    {repository.status === 'empty' ? <p>No source files in this repository at the review date.</p> : <>
      <h4>{repository.sourceCount} inspected files</h4>
      {!detail && !error ? <p role="status">Loading source records…</p> : null}
      {error ? <p role="alert">{error} <button type="button" className="text-link" onClick={() => setRetry((value) => value + 1)}>Try again</button></p> : null}
      <ul className="repository-source-files">{files.map((file) => <li key={file.path}><a href={file.url} target="_blank" rel="noopener noreferrer"><FileCode2 aria-hidden="true" /><span>{file.path}</span><ArrowUpRight aria-hidden="true" /></a></li>)}</ul>
      {detail && repository.sourceCount > 5 ? <button className="repository-more-files" type="button" onClick={() => setAllFiles((value) => !value)}>{allFiles ? 'Show fewer files' : `Show all ${repository.sourceCount} files`}</button> : null}
    </>}
    {detail?.limitations.map((note) => <p className="repository-review-note" key={note}>{note}</p>)}
    <a className="text-link" href={repository.url} target="_blank" rel="noopener noreferrer">Open repository <ArrowUpRight aria-hidden="true" /></a>
  </div>
}
