import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Spotlight } from '@/components/spotlight'
import { ProjectVisual } from '@/components/project-visuals'
import type { Project } from '@/lib/projects'

const statusLabel: Record<Project['status'], string> = {
  live: 'Live',
  beta: 'Beta',
  wip: 'In progress',
}

const statusDotClass: Record<Project['status'], string> = {
  live: 'bg-[var(--brand-emerald)]',
  beta: 'bg-[var(--brand-amber)]',
  wip: 'bg-[var(--brand-violet)]',
}

export function ProjectCard({ project }: { project: Project }) {
  const accent = `var(${project.accentVar})`

  return (
    <Spotlight
      as="article"
      color={accent}
      className="card-glow group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Project visual */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
          <ProjectVisual visual={project.visual} />
        </div>

        {/* Status pill */}
        <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/85">
          <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${statusDotClass[project.status]}`}>
            <span className={`absolute inset-0 rounded-full ${statusDotClass[project.status]} animate-ping opacity-70`} />
          </span>
          {statusLabel[project.status]}
        </div>

        {/* Subdomain breadcrumb */}
        <div className="absolute left-3 top-3 inline-flex items-center rounded-md bg-black/40 backdrop-blur-sm px-2.5 py-1 font-mono text-[10px] tracking-tight text-white/80">
          {readableHost(project.href)}
        </div>
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-1 flex-col gap-5 p-6 md:p-7">
        <header className="space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <h3
              className="font-display text-2xl md:text-3xl tracking-tight"
              style={{ color: 'var(--foreground)' }}
            >
              {project.name}
            </h3>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              /{project.id}
            </span>
          </div>
          <p lang="ko" className="text-sm leading-7 text-foreground/90">
            {project.tagline.ko}
          </p>
          <p className="text-xs leading-6 text-muted-foreground">
            {project.tagline.en}
          </p>
        </header>

        <p lang="ko" className="text-sm leading-7 text-muted-foreground">
          {project.description.ko}
        </p>

        {/* Stack chips */}
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-md border border-border/70 bg-background/40 px-2 py-1 font-mono text-[10.5px] text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group/btn inline-flex flex-1 items-center justify-between rounded-xl border px-4 py-2.5 text-sm font-medium transition-all"
            style={{
              borderColor: 'color-mix(in oklab, var(--spotlight-color) 40%, var(--border))',
              backgroundColor: 'color-mix(in oklab, var(--spotlight-color) 6%, transparent)',
              color: 'var(--foreground)',
              ['--spotlight-color' as string]: accent,
            }}
          >
            <span>Open the demo</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
          <a
            href={project.source}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${project.name} source on GitHub`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-card/40 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Spotlight>
  )
}

function readableHost(href: string) {
  try {
    return new URL(href).host
  } catch {
    return href
  }
}
