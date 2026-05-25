import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Spotlight } from '@/components/spotlight'
import type { SiteLink } from '@/lib/projects'

/**
 * Quieter card for internal destinations (Editor, Travel). Same hover
 * mechanics as the project card but no oversized hero artwork.
 */
export function SiteLinkCard({ link }: { link: SiteLink }) {
  const accent = `var(${link.accentVar})`
  return (
    <Spotlight
      as="article"
      color={accent}
      className="card-glow group relative flex flex-col gap-4 rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.22em]"
            style={{ color: accent }}
          >
            kwanho.dev{link.href}
          </p>
          <h3 className="mt-2 font-display text-2xl tracking-tight">{link.name}</h3>
        </div>
        <span
          aria-hidden
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-background/40 text-muted-foreground transition-colors group-hover:border-foreground/40 group-hover:text-foreground"
        >
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
      <p className="text-sm leading-7 text-muted-foreground">{link.description}</p>
      <Link href={link.href} className="absolute inset-0" aria-label={`Open ${link.name}`} />
    </Spotlight>
  )
}
