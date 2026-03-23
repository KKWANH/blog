export const title = 'Building Resilient Distributed Systems'
export const subtitle = 'Principles and patterns for fault-tolerant architecture'
export const description =
  'A structured note on designing distributed systems that stay debuggable under partial failure.'
export const excerpt =
  'Distributed systems fail in incomplete ways. Resilience is less about eliminating failure than about reducing the ambiguity around it.'
export const date = '2026-02-28'
export const category = 'technical'
export const featured = true
export const readTime = '18 min'
export const showToc = true
export const tocVariant = 'rail'
export const bodyClassName = 'font-sans'
export const toc = [
  { id: 'partial-failure', label: 'Partial Failure' },
  { id: 'traceability', label: 'Traceability' },
  { id: 'containment', label: 'Containment' },
]

export default function DistributedResiliencePage() {
  return (
    <div className="space-y-12">
      <section id="partial-failure" className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Partial Failure</p>
          <h2 className="text-3xl font-semibold tracking-tight">A distributed system almost never fails all at once.</h2>
        </div>
        <div className="space-y-5 text-muted-foreground leading-8">
          <p>
            One dependency times out. Another returns stale data. A queue drains in one region while
            another silently backs up. The design problem is not only survival. It is diagnosis.
          </p>
          <figure className="border border-border bg-secondary/40 p-4">
            <img src="./_media/failure-map.svg" alt="Diagram of service boundaries and failure zones" />
          </figure>
        </div>
      </section>

      <section id="traceability" className="grid gap-5 border-t border-border pt-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Traceability</p>
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="border border-border p-5">
            <h3 className="text-lg font-semibold">Correlate requests</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Request IDs, causal context, and event timestamps keep distributed behavior visible
              once logs leave a single process boundary.
            </p>
          </article>
          <article className="border border-border p-5">
            <h3 className="text-lg font-semibold">Expose degradation</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              A graceful failure should still be legible. Hidden fallback paths turn incidents into
              archaeology.
            </p>
          </article>
          <article className="border border-border p-5">
            <h3 className="text-lg font-semibold">Prefer explicit budgets</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Retries, queue depth, and timeout windows need explicit operating limits or they start
              amplifying one another under load.
            </p>
          </article>
        </div>
      </section>

      <section id="containment" className="grid gap-5 border-t border-border pt-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Containment</p>
        <blockquote className="border-l-2 border-foreground pl-5 text-lg leading-8 text-foreground">
          Resilience depends on whether the system can fail in a narrow shape instead of a contagious
          one.
        </blockquote>
        <p className="max-w-3xl text-muted-foreground leading-8">
          Isolation boundaries, idempotent consumers, and reversible state transitions matter because
          they keep local damage from becoming systemic damage. The better design question is always:
          what stops here, and what keeps going?
        </p>
      </section>
    </div>
  )
}
