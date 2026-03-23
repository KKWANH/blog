export const title = 'Temporal Patterns in Software Design'
export const subtitle = 'Managing time and state in modern applications'
export const description = 'A design note on how timing shapes interfaces, architecture, and user trust.'
export const excerpt =
  'Time is one of the most underestimated variables in software. Interfaces break not only because state is wrong, but because state changes at the wrong moment.'
export const date = '2026-01-22'
export const category = 'technical'
export const readTime = '15 min'
export const showToc = true
export const tocVariant = 'inline'
export const bodyClassName = 'font-sans'
export const toc = [
  { id: 'sequencing', label: 'Sequencing' },
  { id: 'latency', label: 'Latency' },
  { id: 'recovery', label: 'Recovery' },
]

export default function TemporalPatternsPage() {
  return (
    <div className="space-y-10">
      <section id="sequencing" className="grid gap-4">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Sequencing</p>
        <h2 className="text-3xl font-semibold tracking-tight">Correct state delivered too late is still incorrect.</h2>
        <p className="max-w-3xl text-muted-foreground leading-8">
          Users experience systems as sequences, not snapshots. A loading state that appears after
          the result, a modal that closes before the action settles, or a sync badge that lags
          behind persisted state all produce distrust even when the data model is technically sound.
        </p>
      </section>

      <section id="latency" className="grid gap-5 border-t border-border pt-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Latency</p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-secondary/40 p-5">
            <h3 className="font-semibold">Human threshold</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Small delays change interpretation. A system feels responsive or uncertain long before
              it is objectively slow.
            </p>
          </div>
          <div className="bg-secondary/40 p-5">
            <h3 className="font-semibold">System threshold</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Backpressure, retry storms, and queue drift appear when time budgets are implied rather
              than enforced.
            </p>
          </div>
          <div className="bg-secondary/40 p-5">
            <h3 className="font-semibold">Editorial threshold</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Writing has timing too. Sequence determines emphasis, and emphasis determines what the
              reader remembers.
            </p>
          </div>
        </div>
      </section>

      <section id="recovery" className="grid gap-4 border-t border-border pt-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Recovery</p>
        <p className="max-w-3xl text-muted-foreground leading-8">
          Recovery paths should feel like continuations, not punishments. When a session expires or a
          submission collides with newer state, the system should tell the user what changed, what was
          preserved, and what action remains available.
        </p>
      </section>
    </div>
  )
}
