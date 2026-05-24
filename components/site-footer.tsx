import Link from 'next/link'
import { Github, Linkedin, Instagram, Mail, FileText } from 'lucide-react'
import { externalLinks } from '@/lib/projects'

const socials = [
  { label: 'GitHub', href: externalLinks.github, icon: Github, external: true },
  { label: 'LinkedIn', href: externalLinks.linkedin, icon: Linkedin, external: true },
  { label: 'Instagram', href: externalLinks.instagram, icon: Instagram, external: true },
  { label: 'Email', href: externalLinks.email, icon: Mail, external: true },
  { label: 'CV', href: externalLinks.cv, icon: FileText, external: false },
] as const

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-32 border-t border-border/60">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="relative inline-flex h-6 w-6 items-center justify-center rounded-md border border-border bg-card"
              >
                <span className="absolute inset-1 rounded-[4px] bg-[conic-gradient(from_220deg,var(--brand-emerald),var(--brand-cyan),var(--brand-violet),var(--brand-emerald))] opacity-90" />
              </span>
              <span className="font-mono text-sm">kwanho<span className="text-muted-foreground">.dev</span></span>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Systems engineer working on robotics, computer vision, and automotive software.
              This site is the index page for the things I build under the kwanho.dev domain.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Links</div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {socials.map(({ label, href, icon: Icon, external }) =>
                external ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border/70 bg-card/50 hover:border-foreground/40 hover:bg-card transition-colors text-sm"
                  >
                    <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                    <span>{label}</span>
                  </a>
                ) : (
                  <Link
                    key={label}
                    href={href}
                    className="group inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border/70 bg-card/50 hover:border-foreground/40 hover:bg-card transition-colors text-sm"
                  >
                    <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                    <span>{label}</span>
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground">
          <p>© {year} Kwanho Kim. Built with Next.js on Vercel.</p>
          <p className="font-mono tracking-tight">
            kwanho.dev · earprint.kwanho.dev · ai.kwanho.dev
          </p>
        </div>
      </div>
    </footer>
  )
}
