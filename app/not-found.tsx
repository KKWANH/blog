import Link from 'next/link'
import { Aurora } from '@/components/aurora'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Aurora />
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center px-5">
        <div className="animate-content-appear text-center space-y-7 max-w-md">
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
            className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm px-5 py-2.5 text-sm transition-all hover:-translate-y-0.5 hover:border-foreground/40"
          >
            ← Back home
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
