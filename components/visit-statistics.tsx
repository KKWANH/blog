'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import routes from '@/contents/public-routes.generated.json'
import { coarseReferral } from '@/lib/analytics-model'

type StatisticsStatus = { enabled: boolean; prepared: boolean; consented: boolean; privacySignal: boolean; revocationPending: boolean }
const initial: StatisticsStatus = { enabled: false, prepared: false, consented: false, privacySignal: false, revocationPending: false }
const StatisticsContext = createContext({ status: initial, refresh: async () => {}, prepare: async () => {}, save: async (_enabled: boolean) => {}, saving: false, error: '' })
const publicPaths = new Set(routes.paths)

export function VisitStatisticsProvider({ children, possible = true }: { children: ReactNode; possible?: boolean }) {
  const pathname = usePathname()
  const [status, setStatus] = useState(initial), [saving, setSaving] = useState(false), [error, setError] = useState('')
  const previous = useRef<string | null>(null), requestSequence = useRef(0)
  const inFlight = useRef(false), lastWithdrawalRetry = useRef(0)
  const preferenceProof = useRef('')
  const changes = useRef<BroadcastChannel | null>(null)
  const queue = useRef<Promise<unknown>>(Promise.resolve())
  const refresh = useCallback(async () => {
    const sequence = ++requestSequence.current
    try {
      const response = await fetch('/api/analytics/status', { cache: 'no-store' })
      const data = await response.json()
      if (response.ok && sequence === requestSequence.current) {
        preferenceProof.current = data.preferenceToken ?? ''
        setStatus({ enabled: data.enabled === true, prepared: data.prepared === true, consented: data.consented === true, privacySignal: data.privacySignal === true, revocationPending: data.revocationPending === true })
      }
    } catch { /* No collector runs unless configuration was positively read. */ }
  }, [])
  useEffect(() => {
    if (possible) void refresh()
    const focused = () => { void refresh() }
    window.addEventListener('focus', focused)
    return () => window.removeEventListener('focus', focused)
  }, [refresh, possible])
  useEffect(() => {
    if (!('BroadcastChannel' in window)) return
    const channel = new BroadcastChannel('kwanho-visit-preferences')
    changes.current = channel; channel.onmessage = () => { void refresh() }
    return () => { channel.close(); changes.current = null }
  }, [refresh])
  useEffect(() => {
    if (!publicPaths.has(pathname)) { previous.current = null; return }
    if (!status.enabled || status.privacySignal || navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return
    if (previous.current === pathname) return
    const before = previous.current
    previous.current = pathname
    let referral = ''
    try { if (document.referrer) referral = new URL(document.referrer).hostname } catch { /* Empty referral is direct. */ }
    const body = JSON.stringify({ path: pathname, previous: before, referral: coarseReferral(referral, window.location.hostname) })
    queue.current = queue.current.catch(() => {}).then(() => fetch('/api/analytics/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, credentials: 'same-origin', keepalive: true })).catch(() => {})
  }, [pathname, status.enabled, status.privacySignal])
  const save = useCallback(async (enabled: boolean) => {
    if (inFlight.current) return
    inFlight.current = true
    setSaving(true); setError(''); requestSequence.current++
    try {
      const response = await fetch('/api/analytics/consent', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-visitor-preference': preferenceProof.current }, body: JSON.stringify({ enabled }), credentials: 'same-origin' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'The preference could not be saved.')
      setStatus((value) => ({ ...value, consented: data.consented === true, revocationPending: data.revocationPending === true }))
      if (data.preferenceToken) preferenceProof.current = data.preferenceToken
      if (data.warning) setError(data.warning)
      changes.current?.postMessage('changed')
      await refresh()
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'The preference could not be saved.') }
    finally { inFlight.current = false; setSaving(false) }
  }, [refresh])
  const prepare = useCallback(async () => {
    if (inFlight.current) return
    inFlight.current = true; setSaving(true); setError(''); requestSequence.current++
    try {
      const response = await fetch('/api/analytics/preference', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}', credentials: 'same-origin' }), data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Preferences could not be opened.')
      preferenceProof.current = data.preferenceToken ?? ''
      setStatus({ enabled: data.enabled === true, prepared: data.prepared === true, consented: data.consented === true, privacySignal: data.privacySignal === true, revocationPending: data.revocationPending === true })
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Preferences could not be opened.') }
    finally { inFlight.current = false; setSaving(false) }
  }, [])
  useEffect(() => {
    if (!status.revocationPending || inFlight.current || Date.now() - lastWithdrawalRetry.current < 60_000) return
    lastWithdrawalRetry.current = Date.now()
    void save(false)
  }, [status, save])
  return <StatisticsContext.Provider value={{ status, refresh, prepare, save, saving, error }}>{children}</StatisticsContext.Provider>
}

export function StatisticsPreference() {
  const { status, prepare, save, saving, error } = useContext(StatisticsContext)
  const dialog = useRef<HTMLDialogElement>(null)
  return <>
    <button type="button" className="privacy-link" onClick={() => { void prepare(); dialog.current?.showModal() }}>Privacy &amp; statistics</button>
    <dialog ref={dialog} className="privacy-dialog" aria-labelledby="statistics-privacy-title" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close() }}>
      <div><h2 id="statistics-privacy-title">Visit statistics</h2>
        <p>When enabled, this site counts public page views, coarse referral sources such as Google or LinkedIn, and page-to-page totals. Unknown sites share an “Other external” bucket. The statistics do not store IP addresses, URL query strings or individual browsing histories.</p>
        <p>Optional cookies use a random identifier to count daily returning browsers and sessions. Those figures cover only visitors who opt in. You can withdraw here at any time.</p>
        <p>These settings use a necessary control cookie to keep choices consistent across tabs. A preference cookie remembers withdrawal. If the server is unavailable, a sealed, revocation-only token allows a retry without resuming visitor counting.</p>
        {status.privacySignal ? <p className="privacy-status">Your browser&apos;s privacy signal disables collection.</p> : !status.enabled ? <p className="privacy-status">Statistics are not enabled on this deployment.</p> : <label className="privacy-choice"><input type="checkbox" checked={status.consented} disabled={saving || !status.prepared || status.revocationPending} onChange={(event) => void save(event.target.checked)} /><span>Allow optional visitor/session cookies</span></label>}
        {status.revocationPending ? <p className="privacy-status">Visitor counting is off. Server withdrawal is waiting to finish. <button type="button" className="text-link" disabled={saving} onClick={() => void save(false)}>Retry withdrawal</button></p> : !status.enabled && status.consented ? <button type="button" className="text-link" disabled={saving} onClick={() => void save(false)}>Remove visitor cookies</button> : null}
        {error ? <p role="alert">{error}</p> : null}
        <button type="button" className="action-button" onClick={() => dialog.current?.close()}>Close</button>
      </div>
    </dialog>
  </>
}
