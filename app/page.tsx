import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Aurora } from '@/components/aurora'
import { Hero } from '@/components/hero'
import { ProjectCard } from '@/components/project-card'
import { SiteLinkCard } from '@/components/site-link-card'
import { projects, siteLinks } from '@/lib/projects'

export const revalidate = 86400

/**
 * kwanho.dev — landing.
 *
 * Aurora background → hero panel → /projects grid → /more grid → footer.
 * Everything is server-rendered; only the spotlight pointer handler is
 * client-side, which keeps the page light.
 */
export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Aurora />
      <SiteHeader />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-10 md:pt-16">
          <Hero />
        </div>

        {/* Projects */}
        <section id="projects" className="max-w-6xl mx-auto px-5 md:px-8 mt-24 md:mt-32 scroll-mt-24">
          <SectionHeading
            eyebrow="Projects"
            title={
              <>
                Live demos under <span className="font-mono">*.kwanho.dev</span>
              </>
            }
            description="Each subdomain runs its own stack. The cards below summarise what each one does and link straight to the running site."
          />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Internal destinations */}
        <section id="more" className="max-w-6xl mx-auto px-5 md:px-8 mt-24 md:mt-32 scroll-mt-24">
          <SectionHeading
            eyebrow="More"
            title="Inside the index"
            description="The two pages that stay on this domain — a long-form profile, and a map of cities I lived in long enough for them to matter."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {siteLinks.map((link) => (
              <SiteLinkCard key={link.id} link={link} />
            ))}
          </div>
        </section>

        {/* What I'm building / status strip */}
        <section className="max-w-6xl mx-auto px-5 md:px-8 mt-24 md:mt-32 scroll-mt-24">
          <SectionHeading eyebrow="Now" title="What I'm working on" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
            <StatusCell
              tag="Day job"
              title="Industrial robotic picking at Pickit 3D"
              span="Aug 2025 — Mar 2026"
            />
            <StatusCell
              tag="Side"
              title="Earprint v0.2 — pgvector recs, taste-DNA exports"
              span="Active"
            />
            <StatusCell
              tag="Side"
              title="Ariadne v0.1 — local-first AI workspace, evidence-pack runs"
              span="Active"
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: React.ReactNode
  description?: string
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl tracking-tight">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-md text-sm leading-7 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}

function StatusCell({ tag, title, span }: { tag: string; title: string; span: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/50 backdrop-blur-sm p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {tag}
      </p>
      <p className="mt-3 text-base leading-7">{title}</p>
      <p className="mt-2 font-mono text-[11px] text-muted-foreground">{span}</p>
    </div>
  )
}
