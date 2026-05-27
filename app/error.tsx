'use client'

import { useEffect } from 'react'
import { Aurora } from '@/components/aurora'
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
      <Aurora />
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center px-5">
        <div className="animate-content-appear text-center space-y-7 max-w-md">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Error
          </p>
          <h1 className="font-display text-5xl md:text-6xl tracking-tight leading-none">
            Something broke.
          </h1>
          <p className="text-sm leading-7 text-muted-foreground">
            {error?.message
              ? error.message
              : 'An unexpected error occurred. Try reloading the page.'}
          </p>
          {error?.digest && (
            <p className="font-mono text-[10px] text-muted-foreground/50">
              {error.digest}
            </p>
          )}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm px-5 py-2.5 text-sm transition-all hover:-translate-y-0.5 hover:border-foreground/40"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-border/40 px-5 py-2.5 text-sm text-muted-foreground transition-all hover:text-foreground hover:-translate-y-0.5"
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
