'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { Check, Download, Github, LockKeyhole, RotateCcw, Save, Search, ShieldCheck } from 'lucide-react'
import { CareerIcon } from '@/components/career-icons'
import { SkillLevelBadge } from '@/components/skill-level-badge'
import { announceSkillProfileUpdate } from '@/lib/skill-events'
import { mapGroups, mapTechnologies } from '@/lib/repository-catalogue'
import { familiarityLevels, preferenceFor, skillProfileSchema, visibilityOptions, type SkillPatch, type SkillPreference, type SkillProfile, type FamiliarityLevel, type SkillVisibility } from '@/lib/skill-preferences'

type EditorSnapshot = {
  profile: SkillProfile
  revision: string
  editor: { mode: 'local' | 'github'; token: string } | null
  ownerSignInAvailable: boolean
}

export function SkillEditor() {
  const [snapshot, setSnapshot] = useState<EditorSnapshot | null>(null)
  const [changes, setChanges] = useState<SkillPatch>({})
  const [query, setQuery] = useState('')
  const [visibility, setVisibility] = useState('all')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [conflict, setConflict] = useState(false)
  const dirtyCount = Object.keys(changes).length

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const response = await fetch('/api/skills', { cache: 'no-store' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Skill settings could not be loaded.')
      const profile = skillProfileSchema.parse(data.profile)
      setSnapshot({ ...data, profile })
      setChanges({}); setConflict(false)
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Skill settings could not be loaded.') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { void load() }, [load])
  useEffect(() => {
    if (!dirtyCount) return
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = '' }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirtyCount])

  const technologies = useMemo(() => {
    const list = [...mapTechnologies]
    for (const id of Object.keys(snapshot?.profile.entries ?? {})) {
      if (!list.some((tech) => tech.id === id)) list.push({ id, label: id, group: 'unavailable', personal: false, detail: 'Preference retained; this ID is not in the current repository catalogue.' })
    }
    return list.sort((a, b) => Number(b.personal) - Number(a.personal) || a.label.localeCompare(b.label))
  }, [snapshot])

  function currentPreference(id: string, personal: boolean) {
    if (Object.hasOwn(changes, id)) return changes[id] ?? { level: null, visibility: personal ? 'profile' as const : 'repository' as const }
    return preferenceFor(snapshot!.profile, id, personal)
  }
  function update(id: string, personal: boolean, patch: Partial<SkillPreference>) {
    const next = { ...currentPreference(id, personal), ...patch }
    const saved = preferenceFor(snapshot!.profile, id, personal)
    setChanges((before) => {
      const value = { ...before }
      if (JSON.stringify(next) === JSON.stringify(saved)) delete value[id]
      else value[id] = next
      return value
    })
    setMessage('')
  }
  function reset(id: string) {
    setChanges((before) => {
      const value = { ...before }
      if (snapshot?.profile.entries[id]) value[id] = null
      else delete value[id]
      return value
    })
  }
  async function save() {
    if (!snapshot?.editor || !dirtyCount || saving || loading) return
    setSaving(true); setError(''); setMessage('')
    try {
      const response = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-skills-editor-token': snapshot.editor.token },
        body: JSON.stringify({ revision: snapshot.revision, changes }),
      })
      const data = await response.json()
      if (!response.ok) {
        if (response.status === 409) setConflict(true)
        throw new Error(data.error ?? 'The save could not be confirmed.')
      }
      const profile = skillProfileSchema.parse(data.profile)
      setSnapshot({ ...snapshot, profile, revision: data.revision })
      setChanges({}); setConflict(false)
      setMessage(snapshot.editor.mode === 'local' ? 'Saved. The icon list and map now use these preferences.' : 'Saved to the repository. The public profile updates after deployment.')
      announceSkillProfileUpdate()
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'The save could not be confirmed. Reload before retrying.') }
    finally { setSaving(false) }
  }
  function download() {
    if (!snapshot) return
    const url = URL.createObjectURL(new Blob([JSON.stringify(snapshot.profile, null, 2) + '\n'], { type: 'application/json' }))
    const link = document.createElement('a'); link.href = url; link.download = 'skill-profile.json'; link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  if (loading && !snapshot) return <p role="status">Loading skill settings…</p>
  if (!snapshot) return <div className="skill-editor-error" role="alert"><p>{error}</p><button type="button" className="action-button" onClick={() => void load()}>Try loading again</button></div>
  if (!snapshot.editor) return <section className="owner-panel">
    <LockKeyhole aria-hidden="true" /><div><h2>Owner access</h2><p>Only the site owner can change familiarity levels and visibility.</p>
      {snapshot.ownerSignInAvailable ? <button type="button" className="action-button action-primary" onClick={() => void signIn('github', { callbackUrl: '/about/manage' })}><Github aria-hidden="true" />Sign in with GitHub</button> : <p className="owner-warning">Owner sign-in is not configured on this deployment. The local editor and JSON files can be used now; the public page is read-only.</p>}
      <a className="text-link" href="https://github.com/KKWANH/blog/blob/main/docs/skills-editor.md" target="_blank" rel="noopener noreferrer">Owner setup and file format</a>
    </div>
  </section>

  const needle = query.toLowerCase().trim()
  const visible = technologies.filter((tech) => {
    const value = currentPreference(tech.id, tech.personal)
    return (!needle || `${tech.label} ${tech.id} ${tech.detail}`.toLowerCase().includes(needle)) && (visibility === 'all' || value.visibility === visibility)
  })
  return <div className="skill-editor">
    <section className="owner-panel owner-connected"><ShieldCheck aria-hidden="true" /><div><strong>{snapshot.editor.mode === 'local' ? 'Local editing session' : 'Signed in as the site owner'}</strong><p>{snapshot.editor.mode === 'local' ? 'Saved to contents/about/skill-profile.json. Other agents can edit the same file.' : 'Saves update the skill profile file in the repository.'}</p></div>{snapshot.editor.mode === 'github' ? <button type="button" className="action-button" onClick={() => void signOut({ callbackUrl: '/about' })}>Sign out</button> : null}</section>
    <div className="skill-editor-savebar"><span>{dirtyCount ? `${dirtyCount} unsaved skill ${dirtyCount === 1 ? 'change' : 'changes'}` : 'Saved settings'}{snapshot.profile.updatedAt ? <small>Updated {new Date(snapshot.profile.updatedAt).toLocaleString()}</small> : null}</span><button type="button" className="action-button action-primary" disabled={!dirtyCount || saving || conflict || loading} onClick={() => void save()}><Save aria-hidden="true" />{saving ? 'Saving…' : 'Save changes'}</button><button type="button" className="action-button" onClick={download}><Download aria-hidden="true" />Saved JSON</button></div>
    {message ? <p className="skill-editor-success" role="status"><Check aria-hidden="true" />{message}</p> : null}
    {error ? <div className="skill-editor-error" role="alert"><p>{error}</p>{conflict ? <><p>Your unsaved choices are still shown. Reload the latest file before making a new save.</p><button type="button" className="action-button" onClick={() => void load()}>Reload latest and discard unsaved edits</button></> : null}</div> : null}
    <div className="skill-editor-filters"><label><Search aria-hidden="true" /><span className="sr-only">Find a technology to edit</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a technology" /></label><label><span className="sr-only">Filter by profile visibility</span><select value={visibility} onChange={(event) => setVisibility(event.target.value)}><option value="all">All technologies</option>{visibilityOptions.map((option) => <option value={option.id} key={option.id}>{option.label}</option>)}</select></label></div>
    <details className="skill-level-help"><summary>What do the familiarity levels mean?</summary><p>These are your own current assessments. Unrated entries show no level badge.</p><dl>{familiarityLevels.map((level) => <div key={level.id}><dt>{level.label}</dt><dd>{level.detail}</dd></div>)}</dl><p>Hidden entries leave the icon list and map. Historical repository facts remain in their source records.</p></details>
    <p className="skill-editor-count" role="status">{visible.length} technologies shown.</p>
    <div className="skill-editor-rows">{visible.map((tech) => {
      const value = currentPreference(tech.id, tech.personal)
      return <article key={tech.id} className="skill-editor-row" data-skill-id={tech.id} data-dirty={Object.hasOwn(changes, tech.id)}>
        <div className="skill-editor-identity"><CareerIcon skill={tech.id} /><div><h2>{tech.label}</h2><p>{mapGroups.find((group) => group.id === tech.group)?.label ?? 'Retained setting'} · {tech.id}</p><SkillLevelBadge level={value.level} /></div></div>
        <label><span>Familiarity</span><select disabled={saving || loading} aria-label={`Familiarity for ${tech.label}`} value={value.level ?? ''} onChange={(event) => update(tech.id, tech.personal, { level: (event.target.value || null) as FamiliarityLevel | null })}><option value="">Not rated</option>{familiarityLevels.map((level) => <option key={level.id} value={level.id}>{level.label}</option>)}</select></label>
        <label><span>Visibility</span><select disabled={saving || loading} aria-label={`Visibility for ${tech.label}`} value={value.visibility} onChange={(event) => update(tech.id, tech.personal, { visibility: event.target.value as SkillVisibility })}>{visibilityOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></label>
        <button type="button" disabled={saving || loading} className="skill-reset" aria-label={`Reset ${tech.label} to definition default`} title="Reset to definition default" onClick={() => reset(tech.id)}><RotateCcw aria-hidden="true" /></button>
      </article>
    })}</div>
    <p className="skill-editor-file-note">Definitions: <code>contents/about/skill-definitions.json</code><br />Your settings: <code>contents/about/skill-profile.json</code><br />Repository refresh: <code>npm run skills:sync</code>. Sync preserves these settings.</p>
  </div>
}
