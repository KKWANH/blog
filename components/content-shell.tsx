import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Spotlight } from '@/components/spotlight'
import { formatContentDate, type ContentPage } from '@/lib/content'

/**
 * The page header rendered above /editor, /travel, and any other
 * content tree page. Same visual language as the homepage hero panel
 * (rounded card, aurora-compatible glass, mouse spotlight, lab readout
 * meta strip, corner crosshairs) so content pages feel native to the
 * kwanho.dev hub rather than to a separate publication.
 */
export function ContentHero({
  page,
  decodedSlug,
}: {
  page: ContentPage
  decodedSlug: string[]
}) {
  const meta = buildMeta(page)

  return (
    <Spotlight
      as="header"
      color="var(--brand-cyan)"
      className="relative isolate overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md px-6 py-12 md:px-10 md:py-16"
    >
      <div className="relative z-10">
        <Breadcrumbs slug={decodedSlug} title={page.title} />

        <h1 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05] tracking-tight">
          {page.title}
        </h1>

        {page.subtitle ? (
          <p
            lang={page.lang}
            className="mt-5 max-w-2xl text-base md:text-lg leading-8 text-muted-foreground"
          >
            {page.subtitle}
          </p>
        ) : null}

        {meta.length ? (
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-3 border-t border-border/60 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:grid-cols-4">
            {meta.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd className="mt-1 text-foreground normal-case">{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      <Crosshair className="absolute left-3 top-3 text-border" />
      <Crosshair className="absolute right-3 top-3 text-border" />
      <Crosshair className="absolute left-3 bottom-3 text-border" />
      <Crosshair className="absolute right-3 bottom-3 text-border" />
    </Spotlight>
  )
}

/** Small "back to hub" row that sits above the hero panel. */
export function ContentBackLink() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      <span>Back to kwanho.dev</span>
    </Link>
  )
}

/** Bottom-of-page meta row — quiet attribution / canonical path. */
export function ContentFooterMeta({ page }: { page: ContentPage }) {
  return (
    <footer className="mt-16 flex flex-wrap items-center gap-3 border-t border-border/60 pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
      {page.date ? <time>{formatContentDate(page.date)}</time> : null}
      <span>·</span>
      <span>{page.kind === 'markdown' ? 'Markdown' : 'TSX'}</span>
      <span>·</span>
      <span className="normal-case">kwanho.dev{page.href}</span>
    </footer>
  )
}

function buildMeta(page: ContentPage) {
  const meta: Array<{ label: string; value: string }> = []
  if (page.date) meta.push({ label: 'Published', value: formatContentDate(page.date) })
  if (page.readTime) meta.push({ label: 'Read', value: page.readTime })
  if (page.category) meta.push({ label: 'Type', value: page.category })
  meta.push({ label: 'Path', value: `kwanho.dev${page.href}` })
  return meta
}

function Breadcrumbs({ slug, title }: { slug: string[]; title: string }) {
  const parts = slug.map((segment, index) => ({
    href: `/${slug.slice(0, index + 1).map(encodeURIComponent).join('/')}`,
    label: segment.replace(/[-_]/g, ' '),
  }))

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
    >
      <Link href="/" className="hover:text-foreground transition-colors">
        Home
      </Link>
      {parts.map((part, index) => {
        const isLast = index === parts.length - 1
        return (
          <span key={part.href} className="contents">
            <span className="text-muted-foreground/60">/</span>
            {isLast ? (
              <span className="text-foreground">{title}</span>
            ) : (
              <Link href={part.href} className="hover:text-foreground transition-colors">
                {part.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

function Crosshair({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M8 1v14M1 8h14" />
    </svg>
  )
}
