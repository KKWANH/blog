import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Spotlight } from '@/components/spotlight'

/**
 * Landing hero — playful but disciplined.
 *
 * - Eyebrow chip identifies the page as the kwanho.dev hub
 * - Display heading runs over three lines, mixing serif + sans accent
 * - Two CTAs: anchor to #projects and link out to /editor
 * - Bottom row gives a tiny "live coordinates" strip to give the
 *   surface a "lab readout" feel
 */
export function Hero() {
  return (
    <Spotlight
      as="section"
      color="var(--brand-cyan)"
      className="relative isolate overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md px-6 py-16 md:px-12 md:py-24"
    >
      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-[var(--brand-emerald)] opacity-80" />
            <span className="absolute inset-0 rounded-full bg-[var(--brand-emerald)] animate-ping opacity-60" />
          </span>
          kwanho.dev / index
        </div>

        <h1 className="mt-7 font-display text-[clamp(2.5rem,7vw,5.25rem)] leading-[1.02] tracking-tight">
          A little hub for the things I&nbsp;build,
          <br className="hidden md:block" />{' '}
          <span className="bg-gradient-to-r from-[var(--brand-emerald)] via-[var(--brand-cyan)] to-[var(--brand-violet)] bg-clip-text text-transparent">
            shipped under one domain.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-base md:text-lg leading-8 text-muted-foreground">
          I&apos;m <span className="text-foreground">Kwanho Kim</span> — a systems engineer working
          on robotics, computer vision, and automotive software.
          This site indexes the demos that live on the subdomains and the longer profile that backs them up.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            <span>See the projects</span>
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <Link
            href="/editor"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium hover:border-foreground/40 transition-colors"
          >
            <span>Read the profile</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Bottom strip: tiny "lab readout" */}
      <dl className="relative z-10 mt-16 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-2 border-t border-border/60 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:grid-cols-4">
        <div>
          <dt>Based in</dt>
          <dd className="mt-1 text-foreground normal-case">Seoul · Wolfsburg</dd>
        </div>
        <div>
          <dt>Focus</dt>
          <dd className="mt-1 text-foreground normal-case">Robotics · CV · Automotive</dd>
        </div>
        <div>
          <dt>Stack</dt>
          <dd className="mt-1 text-foreground normal-case">C/C++ · TS · ROS · React</dd>
        </div>
        <div>
          <dt>Last update</dt>
          <dd className="mt-1 text-foreground normal-case">
            {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </dd>
        </div>
      </dl>

      {/* Decorative geometry — corner crosshairs to make the panel feel instrumented */}
      <Crosshair className="absolute left-3 top-3 text-border" />
      <Crosshair className="absolute right-3 top-3 text-border" />
      <Crosshair className="absolute left-3 bottom-3 text-border" />
      <Crosshair className="absolute right-3 bottom-3 text-border" />
    </Spotlight>
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
