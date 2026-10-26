'use client'

import { useEffect } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[kwanho.dev] Unhandled error:', error)
  }, [error])

  return (
    <div className="relative min-h-screen flex flex-col">
      <SiteHeader />

      <main id="main-content" className="site-width notebook-error">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Error
          </p>
          <h1 className="font-display text-5xl md:text-6xl tracking-tight leading-none">
            Something broke.
          </h1>
          <p className="text-sm leading-7 text-muted-foreground">
            The page could not be loaded. Try again, or head back to the home page.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="text-link"
            >
              Try again
            </button>
            <a
              href="/"
              className="text-link"
            >
              Go home
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
