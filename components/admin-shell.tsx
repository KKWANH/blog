import type { ReactNode } from 'react'

export function AdminShell({ children }: { children: ReactNode }) {
  return <><header className="admin-site-header site-width"><a href="/"><span className="site-mark" aria-hidden="true" />kwanho.dev</a><a href="/admin">Owner workspace</a></header><main id="main-content" className="site-width admin-page">{children}</main></>
}
