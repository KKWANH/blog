'use client'

import { signIn, signOut } from 'next-auth/react'
import { Github, LockKeyhole, LogOut, ShieldCheck } from 'lucide-react'
import type { TravelEditorAccess } from './travel-types'

export function TravelOwnerPanel({ access, configured, loading, error }: {
  access: TravelEditorAccess | null
  configured: boolean
  loading: boolean
  error?: string | null
}) {
  if (loading) return <div className="owner-panel" role="status">Checking owner access…</div>
  if (access) {
    return <section className="owner-panel owner-connected" aria-label="Owner access">
      <ShieldCheck aria-hidden="true" />
      <div>
        <strong>{access.mode === 'github' ? 'Signed in as the site owner' : 'Local editing session'}</strong>
        <p>{access.mode === 'github' ? 'Save writes to the blog repository. The public atlas updates after deployment.' : 'Changes are saved on this computer and included in your next publish.'}</p>
        {error ? <p className="owner-warning">Editing stays unavailable until the saved atlas can be loaded.</p> : null}
      </div>
      {access.mode === 'github' ? <button type="button" className="action-button" onClick={() => void signOut({ callbackUrl: '/travel' })}><LogOut aria-hidden="true" />Sign out</button> : null}
    </section>
  }
  return <section className="owner-panel" aria-labelledby="owner-access-title">
    <LockKeyhole aria-hidden="true" />
    <div>
      <h2 id="owner-access-title">Owner access</h2>
      <p>Only the site owner&apos;s GitHub account can publish changes.</p>
      {configured ? <button type="button" className="action-button action-primary" onClick={() => void signIn('github', { callbackUrl: '/travel/manage' })}><Github aria-hidden="true" />Sign in with GitHub</button> : <>
        <p className="owner-warning">Sign-in is not configured on this deployment yet. The public atlas remains read-only.</p>
        <details className="owner-setup">
          <summary>Owner setup</summary>
          <ol>
            <li>Create a GitHub App and install it only on <code>KKWANH/blog</code>, with Contents read/write permission.</li>
            <li>Set its callback to <code>https://www.kwanho.dev/api/auth/callback/github</code>.</li>
            <li>Add <code>GITHUB_ID</code>, <code>GITHUB_SECRET</code>, <code>NEXTAUTH_SECRET</code> and <code>NEXTAUTH_URL</code> in the deployment settings, then redeploy.</li>
          </ol>
          <p>Use the app&apos;s OAuth client ID, not its numeric App ID. Keep secret values out of the repository.</p>
          <a className="text-link" href="https://github.com/settings/apps/new" target="_blank" rel="noopener noreferrer">Open GitHub App settings</a>
        </details>
      </>}
    </div>
  </section>
}
