'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, LockKeyhole, LogOut, RefreshCw, ShieldCheck } from 'lucide-react'
import type { AnalyticsReport } from '@/lib/admin-types'

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

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  if (!session) return <p role="status">Checking admin access…</p>
  if (!session.authenticated) return <section className="admin-login" aria-labelledby="admin-login-title"><LockKeyhole aria-hidden="true" /><h2 id="admin-login-title">Administrator sign-in</h2>
    {session.configured ? <form onSubmit={signIn}><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" autoComplete="current-password" maxLength={256} value={password} onChange={(event) => setPassword(event.target.value)} required disabled={busy} /><button type="submit" className="action-button action-primary" disabled={busy}>{busy ? 'Checking…' : 'Sign in'}</button></form> : <p>Admin access needs a password and private storage configuration.</p>}
    {session.setupAvailable ? <a href="/admin/setup" className="action-button">Set up on this computer <ArrowUpRight aria-hidden="true" /></a> : null}
    {error ? <p role="alert" className="admin-error">{error}</p> : null}
    <p className="admin-muted">Public visitors can read the site. Editing and private statistics require owner access.</p>
  </section>
  const latest = report?.days.at(-1)
  const maximum = Math.max(1, ...(report?.days.map((day) => day.views) ?? []))
  const inspectedDay = selectedDate ? report?.days.find((d) => d.date === selectedDate) : latest

  return <div className="admin-dashboard">
    <div className="admin-toolbar"><span><ShieldCheck aria-hidden="true" />Private owner session</span><label><span className="sr-only">Statistics range</span><select value={days} onChange={(event) => setDays(Number(event.target.value))}><option value={7}>7 days</option><option value={30}>30 days</option><option value={90}>90 days</option></select></label><button type="button" className="action-button" onClick={() => void metrics()}><RefreshCw aria-hidden="true" />Refresh</button><button type="button" className="action-button" disabled={busy} onClick={() => void signOut()}><LogOut aria-hidden="true" />Sign out</button></div>
    <nav className="admin-tools" aria-label="Content management"><a href="/about/manage">Skill familiarity &amp; visibility <ArrowUpRight aria-hidden="true" /></a><a href="/travel/manage">Travel records <ArrowUpRight aria-hidden="true" /></a></nav>
    <p className="admin-muted">Content publishing uses the existing GitHub owner connection. Local editor saves stay on this computer until publication.</p>
    {error ? <p role="alert" className="admin-error">{error}</p> : null}
    {!report ? <p role="status">Loading statistics…</p> : <>
      {!report.analyticsEnabled ? <p className="admin-notice">Collection is disabled. Stored statistics remain available.</p> : null}
      <div className="admin-totals">
        <article><span>Page views · range</span><strong>{report.totals.views.toLocaleString()}</strong></article>
        <article><span>Entrances · range</span><strong>{report.totals.entries.toLocaleString()}</strong></article>
        <article><span>Visitors today · opt-in</span><strong>{latest?.visitors.toLocaleString() ?? 0}</strong></article>
        <article><span>Sessions · opt-in</span><strong>{report.totals.sessions.toLocaleString()}</strong></article>
        <article><span>Avg views / session</span><strong>{(report.totals.views / Math.max(1, report.totals.sessions)).toFixed(1)}</strong></article>
      </div>
      <section className="admin-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '.6rem', flexWrap: 'wrap', gap: '.4rem' }}>
          <h2>Daily traffic</h2>
          {inspectedDay ? (
            <span style={{ fontSize: '.78rem', color: '#cbe4b8' }}>
              <strong>{inspectedDay.date}</strong>: {inspectedDay.views} views, {inspectedDay.entries} entrances, {inspectedDay.visitors} visitors
            </span>
          ) : null}
        </div>
        <div className="traffic-chart" aria-label="Daily page views">
          {report.days.map((day) => (
            <div
              key={day.date}
              onClick={() => setSelectedDate(day.date)}
              onMouseEnter={() => setSelectedDate(day.date)}
              style={{ cursor: 'pointer' }}
              title={`${day.date}: ${day.views} views, ${day.visitors} opted-in visitors`}
            >
              <span
                className="traffic-bar"
                style={{
                  height: `${Math.max(2, (day.views / maximum) * 100)}%`,
                  background: selectedDate === day.date ? 'linear-gradient(#f0dfb0, #d4b574)' : undefined,
                }}
              />
              <small>{day.date.slice(5)}</small>
            </div>
          ))}
        </div>
      </section>
      <div className="admin-data-grid admin-three-grid">
        <VisualDataTable title="Entry referrals" rows={report.referrals} empty="No entry referrals recorded." />
        <VisualDataTable title="Pages viewed" rows={report.pages} empty="No page views recorded." />
        <VisualDataTable title="Visitor countries" rows={report.countries || []} empty="No country records yet (active in Vercel deployment)." />
      </div>
      <div className="admin-data-grid admin-three-grid" style={{ marginTop: '1.5rem' }}>
        <VisualDataTable title="Device types" rows={report.devices || []} empty="No device telemetry yet." />
        <VisualDataTable title="Browser family" rows={report.browsers || []} empty="No browser telemetry yet." />
        <HourlyChart hours={report.hours || []} />
      </div>
      <FunnelOverview totals={report.totals} conversions={report.conversions || []} />
      <section className="admin-section"><h2>Page flows</h2>{report.flows.length ? <table><thead><tr><th>From</th><th>To</th><th>Transitions</th></tr></thead><tbody>{report.flows.map((flow) => <tr key={`${flow.from}:${flow.to}`}><td>{flow.from}</td><td>{flow.to}</td><td>{flow.count}</td></tr>)}</tbody></table> : <p>No page-to-page transitions recorded.</p>}</section>
      <p className="admin-muted">Views, entrances and flows are client-reported aggregate counts. Visitor/session figures cover optional cookies only; visitors are deduplicated per UTC day, not identified people. The sum across days is not a count of distinct people. Admin visits and browser privacy signals are excluded. Statistics retain up to 90 days.</p>
    </>}
  </div>
}
function VisualDataTable({ title, rows, empty }: { title: string; rows: Array<{ name: string; count: number }>; empty: string }) {
  const [viewTuples, setViewTuples] = useState(false)
  const max = Math.max(1, ...rows.map((r) => r.count))
  const sum = Math.max(1, rows.reduce((acc, r) => acc + r.count, 0))
  return (
    <section className="admin-section admin-card-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.7rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.05rem' }}>{title}</h2>
        {rows.length ? (
          <button
            type="button"
            className="action-button"
            style={{ minHeight: '26px', padding: '2px 8px', fontSize: '.68rem', borderRadius: '3px' }}
            onClick={() => setViewTuples(!viewTuples)}
          >
            {viewTuples ? 'Visual Bars' : 'Data Tuples'}
          </button>
        ) : null}
      </div>
      {rows.length ? (
        viewTuples ? (
          <pre className="admin-tuple-view" style={{ fontSize: '.72rem', background: '#071810', padding: '.6rem', borderRadius: '4px', overflowX: 'auto', color: '#bfe4c5', margin: 0 }}>
            <code>
              {rows.map((r) => `("${r.name}", ${r.count}, "${Math.round((r.count / sum) * 100)}%")`).join('\n')}
            </code>
          </pre>
        ) : (
          <div className="admin-stat-list">
            {rows.slice(0, 8).map((row) => {
              const pct = Math.round((row.count / sum) * 100)
              const widthPct = Math.max(4, Math.round((row.count / max) * 100))
              return (
                <div key={row.name} className="admin-stat-item">
                  <div className="admin-stat-label-row">
                    <span className="admin-stat-name">{row.name}</span>
                    <span className="admin-stat-val">
                      <strong>{row.count.toLocaleString()}</strong>
                      <small>({pct}%)</small>
                    </span>
                  </div>
                  <div className="admin-stat-bar-track">
                    <div className="admin-stat-bar-fill" style={{ width: `${widthPct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        )
      ) : (
        <p className="admin-empty">{empty}</p>
      )}
    </section>
  )
}

function HourlyChart({ hours }: { hours: Array<{ name: string; count: number }> }) {
  const hourMap = new Map(hours.map((h) => [h.name.slice(0, 2), h.count]))
  const allHours = Array.from({ length: 24 }, (_, i) => {
    const key = i.toString().padStart(2, '0')
    return { hour: key, count: hourMap.get(key) || 0 }
  })
  const max = Math.max(1, ...allHours.map((h) => h.count))
  return (
    <section className="admin-section admin-card-panel">
      <h2>Activity by hour (UTC)</h2>
      <div className="hourly-chart" aria-label="Hourly traffic distribution">
        {allHours.map((h) => (
          <div key={h.hour} className="hourly-col" title={`${h.hour}:00 UTC - ${h.count} views`}>
            <span
              className="hourly-bar"
              style={{ height: `${Math.max(4, (h.count / max) * 100)}%` }}
            />
            <small>{h.hour}</small>
          </div>
        ))}
      </div>
    </section>
  )
}

function FunnelOverview({ totals, conversions }: { totals: { views: number; entries: number; sessions: number }; conversions: Array<{ name: string; count: number }> }) {
  const totalCta = conversions.reduce((sum, c) => sum + c.count, 0)
  const views = Math.max(1, totals.views)
  const ctaRate = ((totalCta / views) * 100).toFixed(1)

  return (
    <section className="admin-section admin-card-panel">
      <h2>Recruiter &amp; visitor engagement funnel</h2>
      <div className="funnel-grid">
        <div className="funnel-step">
          <span className="funnel-badge">Step 1</span>
          <strong>{totals.views.toLocaleString()}</strong>
          <p>Total page views</p>
        </div>
        <div className="funnel-step">
          <span className="funnel-badge">Step 2</span>
          <strong>{totals.sessions.toLocaleString()}</strong>
          <p>Active visitor sessions</p>
        </div>
        <div className="funnel-step">
          <span className="funnel-badge">Step 3 · High Intent</span>
          <strong>{totalCta.toLocaleString()}</strong>
          <p>CTA interactions ({ctaRate}% conversion)</p>
        </div>
      </div>
      {conversions.length > 0 ? (
        <div className="funnel-conversions">
          {conversions.map((conv) => (
            <span key={conv.name} className="funnel-conv-chip">
              {conv.name}: <strong>{conv.count}</strong>
            </span>
          ))}
        </div>
      ) : null}
    </section>
  )
}
