'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, LockKeyhole, LogOut, RefreshCw, ShieldCheck } from 'lucide-react'
import type { AnalyticsReport } from '@/lib/admin-types'
import { AdminInsights } from '@/components/admin-insights'

type SessionStatus = { configured: boolean; authenticated: boolean; setupAvailable: boolean; csrf?: string; expires?: number; analyticsEnabled?: boolean; error?: string }
type Report = AnalyticsReport & { analyticsEnabled: boolean }

export function AdminDashboard() {
  const [session, setSession] = useState<SessionStatus | null>(null), [password, setPassword] = useState(''), [busy, setBusy] = useState(false), [error, setError] = useState('')
  const [days, setDays] = useState(7), [report, setReport] = useState<Report | null>(null)
  const [sessionRead, setSessionRead] = useState(0)
  const pendingMetrics = useRef<AbortController | null>(null)
  const status = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/session', { cache: 'no-store' }), data = await response.json()
      setSession(data)
      setSessionRead((value) => value + 1)
      if (!response.ok) setError(data.error ?? 'Admin access is unavailable.')
    } catch { setError('Admin access is unavailable.'); setSession({ configured: false, authenticated: false, setupAvailable: false }) }
  }, [])
  const metrics = useCallback(async () => {
    pendingMetrics.current?.abort()
    const controller = new AbortController()
    pendingMetrics.current = controller
    setError('')
    try {
      const response = await fetch(`/api/admin/metrics?days=${days}`, { cache: 'no-store', signal: controller.signal }), data = await response.json()
      if (controller.signal.aborted) return
      if (response.status === 401) { setReport(null); await status(); return }
      if (!response.ok) throw new Error(data.error ?? 'Statistics could not be loaded.')
      setReport(data)
    } catch (cause) { if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : 'Statistics could not be loaded.') }
    finally { if (pendingMetrics.current === controller) pendingMetrics.current = null }
  }, [days, status])
  useEffect(() => { void status() }, [status])
  useEffect(() => { if (session?.authenticated) void metrics() }, [session?.authenticated, metrics, sessionRead])
  useEffect(() => {
    const visible = () => {
      if (document.visibilityState === 'hidden') { pendingMetrics.current?.abort(); setReport(null) }
      else void status()
    }
    window.addEventListener('pageshow', visible)
    document.addEventListener('visibilitychange', visible)
    return () => { pendingMetrics.current?.abort(); window.removeEventListener('pageshow', visible); document.removeEventListener('visibilitychange', visible) }
  }, [status])
  useEffect(() => {
    if (!session?.authenticated || !session.expires) return
    const timer = setTimeout(() => { pendingMetrics.current?.abort(); setReport(null); void status() }, Math.max(0, session.expires - Date.now()))
    return () => clearTimeout(timer)
  }, [session?.authenticated, session?.expires, status])
  async function signIn(event: FormEvent) {
    event.preventDefault(); if (busy) return
    setBusy(true); setError('')
    const submitted = password
    setPassword('')
    try {
      const response = await fetch('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: submitted }), credentials: 'same-origin' }), data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Sign-in did not succeed.')
      setSession({ configured: true, setupAvailable: false, ...data })
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Sign-in did not succeed.') }
    finally { setBusy(false) }
  }
  async function signOut() {
    pendingMetrics.current?.abort()
    setBusy(true); setError('')
    try {
      const response = await fetch('/api/admin/session', { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'x-admin-csrf': session?.csrf ?? '' }, body: '{}', credentials: 'same-origin' })
      if (!response.ok) throw new Error('Sign-out could not be confirmed. Try again.')
      setReport(null); await status()
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Sign-out could not be confirmed.') }
    finally { setBusy(false) }
  }
  // Hooks stay above the early returns: signing in must not change the hook count (React error #310).
  useEffect(() => {
    if (session?.authenticated && typeof document !== 'undefined') {
      document.cookie = 'kwanho-admin-device=1; path=/; max-age=31536000; SameSite=Lax;'
      try { localStorage.setItem('kwanho-admin-device', '1') } catch {}
    }
  }, [session?.authenticated])

  if (!session) return <p role="status">Checking admin access…</p>
  if (!session.authenticated) return <section className="admin-login" aria-labelledby="admin-login-title"><LockKeyhole aria-hidden="true" /><h2 id="admin-login-title">Administrator sign-in</h2>
    {session.configured ? <form onSubmit={signIn}><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" autoComplete="current-password" maxLength={256} value={password} onChange={(event) => setPassword(event.target.value)} required disabled={busy} /><button type="submit" className="action-button action-primary" disabled={busy}>{busy ? 'Checking…' : 'Sign in'}</button></form> : <p>Admin access needs a password and private storage configuration.</p>}
    {session.setupAvailable ? <a href="/admin/setup" className="action-button">Set up on this computer <ArrowUpRight aria-hidden="true" /></a> : null}
    {error ? <p role="alert" className="admin-error">{error}</p> : null}
    <p className="admin-muted">Public visitors can read the site. Editing and private statistics require owner access.</p>
  </section>

  return <div className="admin-dashboard">
    <div className="admin-toolbar"><span><ShieldCheck aria-hidden="true" />Private owner session</span><label><span className="sr-only">Statistics range</span><select value={days} onChange={(event) => setDays(Number(event.target.value))}><option value={7}>7 days</option><option value={30}>30 days</option><option value={90}>90 days</option></select></label><button type="button" className="action-button" onClick={() => void metrics()}><RefreshCw aria-hidden="true" />Refresh</button><button type="button" className="action-button" disabled={busy} onClick={() => void signOut()}><LogOut aria-hidden="true" />Sign out</button></div>
    <nav className="admin-tools" aria-label="Content management"><a href="/about/manage">Skill familiarity &amp; visibility <ArrowUpRight aria-hidden="true" /></a><a href="/travel/manage">Travel records <ArrowUpRight aria-hidden="true" /></a></nav>
    <p className="admin-muted">Content publishing uses the existing GitHub owner connection. Local editor saves stay on this computer until publication.</p>
    {error ? <p role="alert" className="admin-error">{error}</p> : null}
    {!report ? <p role="status">Loading statistics…</p> : <>
      {!report.analyticsEnabled ? <p className="admin-notice">Collection is disabled. Stored statistics remain available.</p> : null}
      <AdminInsights report={report} />
      <p className="admin-muted">Views, arrivals and paths are client-reported aggregate counts. Visitor/session figures cover optional cookies only; visitors are deduplicated per UTC day, not identified people. The sum across days is not a count of distinct people. Admin visits and browser privacy signals are excluded. Statistics retain up to 90 days.</p>
    </>}
  </div>
}
