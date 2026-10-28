'use client'

import { useEffect, useState, type FormEvent } from 'react'

export function AdminSetup() {
  const [token, setToken] = useState<string | null>(null), [loading, setLoading] = useState(true), [busy, setBusy] = useState(false), [password, setPassword] = useState(''), [confirmation, setConfirmation] = useState(''), [statistics, setStatistics] = useState(true), [error, setError] = useState(''), [done, setDone] = useState(false)
  useEffect(() => {
    void fetch('/api/admin/setup', { cache: 'no-store' }).then(async (response) => { const data = await response.json(); if (response.ok && data.available) setToken(data.token) }).catch(() => setError('Setup is unavailable.')).finally(() => setLoading(false))
  }, [])
  async function submit(event: FormEvent) {
    event.preventDefault(); if (!token || busy) return
    setBusy(true); setError('')
    const body = JSON.stringify({ password, confirmation, analyticsEnabled: statistics })
    setPassword(''); setConfirmation('')
    try {
      const response = await fetch('/api/admin/setup', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-setup-token': token }, body }), data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Setup did not complete.')
      setDone(true); setToken(null)
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Setup did not complete.') }
    finally { setBusy(false) }
  }
  if (loading) return <p role="status">Checking local setup…</p>
  if (done) return <section className="admin-login"><h2>Local setup saved.</h2><p>The password was hashed and private configuration was saved outside the repository. Production uses its own secret and storage settings.</p><a className="action-button action-primary" href="/admin">Open admin sign-in</a></section>
  if (!token) return <section className="admin-login"><h2>Setup is unavailable.</h2><p>Use the opt-in localhost editor for first setup. Existing credentials are never replaced by this page.</p><a className="text-link" href="/admin">Back to admin</a></section>
  return <section className="admin-login"><h2>Set up this computer.</h2><p>Choose your own passphrase. It stays in this form until submitted, then is hashed on the server. Production requires separate secret and durable-storage configuration.</p><form onSubmit={submit}>
    <label htmlFor="setup-password">Passphrase · at least 14 varied characters</label><input id="setup-password" type="password" autoComplete="new-password" minLength={14} maxLength={256} value={password} onChange={(event) => setPassword(event.target.value)} required disabled={busy} />
    <label htmlFor="setup-confirmation">Confirm passphrase</label><input id="setup-confirmation" type="password" autoComplete="new-password" minLength={14} maxLength={256} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required disabled={busy} />
    <label className="privacy-choice"><input type="checkbox" checked={statistics} onChange={(event) => setStatistics(event.target.checked)} disabled={busy} /><span>Enable local visit statistics with optional visitor cookies</span></label>
    <button className="action-button action-primary" disabled={busy} type="submit">{busy ? 'Creating…' : 'Create local admin access'}</button>
  </form>{error ? <p role="alert" className="admin-error">{error}</p> : null}</section>
}
