import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SiteHeader />

      <main id="main-content" className="site-width notebook-error">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            404
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-none">
            Not found.
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            This page doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="text-link"
          >
            ← Back home
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
