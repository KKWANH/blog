export const title = 'State Machines Everywhere'
export const subtitle = 'A unifying abstraction for complex behavior'
export const description = 'A compact argument for using explicit states to simplify interactive systems.'
export const excerpt =
  'From interfaces to protocols, state machines are often less about academic formality and more about making transitions explicit enough to debug.'
export const date = '2025-12-15'
export const category = 'technical'
export const readTime = '14 min'
export const showToc = true
export const tocVariant = 'rail'
export const bodyClassName = 'font-sans'
export const toc = [
  { id: 'why-machines', label: 'Why State Machines' },
  { id: 'ui-example', label: 'UI Example' },
  { id: 'discipline', label: 'Design Discipline' },
]

export default function StateMachinesPage() {
  return (
    <div className="space-y-10">
      <section id="why-machines" className="space-y-4">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Why State Machines</p>
        <h2 className="text-3xl font-semibold tracking-tight">Complex behavior usually hides in unspoken transitions.</h2>
        <p className="max-w-3xl text-muted-foreground leading-8">
          Teams often document the visible screens and API responses while leaving the intermediate
          states implicit. State machines force those hidden transitions into the open.
        </p>
      </section>

      <section id="ui-example" className="grid gap-5 border-t border-border pt-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">UI Example</p>
          <h3 className="mt-3 text-2xl font-semibold">Idle, validating, saving, failed, resolved.</h3>
        </div>
        <div className="space-y-4 text-muted-foreground leading-8">
          <p>
            A form that treats those states distinctly is easier to reason about than one that only
            toggles booleans like <code>isLoading</code> or <code>hasError</code>.
          </p>
          <p>
            The extra precision is not ceremony. It reduces impossible combinations and makes both
            user feedback and test coverage more coherent.
          </p>
        </div>
      </section>

      <section id="discipline" className="border-t border-border pt-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Design Discipline</p>
        <ul className="mt-4 grid gap-3 text-muted-foreground leading-8">
          <li>List states before transitions.</li>
          <li>Name terminal and retryable failures differently.</li>
          <li>Check whether each transition can actually be triggered from the UI or runtime.</li>
        </ul>
      </section>
    </div>
  )
}
