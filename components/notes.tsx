import type { ReactNode, CSSProperties } from 'react'

/**
 * Shared component library for the long-form study notes under /notes.
 *
 * Design goals:
 *  - Rich, dense "study note" look (bordered cards, accent colour, diagrams)
 *    matching the original standalone HTML notes, but theme-aware via the
 *    blog's CSS custom properties.
 *  - Purely presentational: no hooks, no next/link. The content pages are
 *    rendered server-side and walked by rewriteRelativeMediaInReactNode,
 *    which clones every element — anchors use plain <a>, links use "#id".
 *  - Animation lives in globals.css (.note-doc scope); components just opt
 *    in via the nt-* class names.
 *
 * Per-page accent: wrap a page in <NoteRoot accent="var(--brand-violet)">.
 */

type Accent = string

/* ───────────────────────── root + structure ───────────────────────── */

export function NoteRoot({
  accent = 'var(--brand-cyan)',
  children,
}: {
  accent?: Accent
  children: ReactNode
}) {
  return (
    <div className="note-doc space-y-16 md:space-y-24 pb-6" style={{ '--nt-accent': accent } as CSSProperties}>
      {children}
    </div>
  )
}

export function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="nt-section nt-reveal space-y-5">
      {children}
    </section>
  )
}

export function PartTag({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground/70">
      {children}
    </p>
  )
}

export function Kicker({ num, children }: { num: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="nt-num w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[13px] font-bold shrink-0">
        {num}
      </span>
      <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--nt-accent)' }}>
        {children}
      </p>
    </div>
  )
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-[1.15]">{children}</h2>
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="font-display text-xl md:text-2xl tracking-tight mt-8 mb-1">{children}</h3>
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="text-lg md:text-xl leading-8 text-muted-foreground">{children}</p>
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[0.95rem] leading-8 text-muted-foreground">{children}</p>
}

/* ───────────────────────── containers ───────────────────────── */

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`nt-card rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-5 md:p-6 ${className}`}>
      {children}
    </div>
  )
}

export function Grid2({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 md:grid-cols-2">{children}</div>
}

export function Grid3({ children }: { children: ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">{children}</div>
}

export function Box({ title, icon, children }: { title?: ReactNode; icon?: ReactNode; children: ReactNode }) {
  return (
    <div className="nt-box rounded-xl border border-border/60 bg-card/40 p-5 h-full">
      {title ? (
        <div className="font-semibold text-[0.95rem] text-foreground mb-1.5 flex items-center gap-2">
          {icon ? <span aria-hidden>{icon}</span> : null}
          <span>{title}</span>
        </div>
      ) : null}
      <div className="text-sm text-muted-foreground leading-7">{children}</div>
    </div>
  )
}

/* ───────────────────────── tinted call-outs ───────────────────────── */

function Tint({
  color,
  label,
  children,
  tt,
}: {
  color: Accent
  label?: ReactNode
  tt?: ReactNode
  children: ReactNode
}) {
  return (
    <div
      className="rounded-xl border p-4 md:p-5 text-sm leading-7"
      style={{
        borderColor: `color-mix(in oklab, ${color} 32%, transparent)`,
        background: `color-mix(in oklab, ${color} 7%, transparent)`,
      }}
    >
      {tt ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2 font-semibold" style={{ color }}>
          {tt}
        </p>
      ) : null}
      {label ? (
        <span className="font-semibold" style={{ color }}>
          {label}
        </span>
      ) : null}
      <span className="text-foreground/80">{children}</span>
    </div>
  )
}

/** Amber — "watch out / key takeaway". */
export function Callout({ label, children }: { label?: ReactNode; children: ReactNode }) {
  return (
    <Tint color="var(--brand-amber)" label={label}>
      {children}
    </Tint>
  )
}

/** Emerald — "good to know / so what". */
export function Note({ label, children }: { label?: ReactNode; children: ReactNode }) {
  return (
    <Tint color="var(--brand-emerald)" label={label}>
      {children}
    </Tint>
  )
}

/** Violet — "한 걸음 더 / one step deeper". */
export function Deep({ title = '한 걸음 더', children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <Tint color="var(--brand-violet)" tt={title}>
      {children}
    </Tint>
  )
}

/** Cyan gradient strip with a big emoji — the "비유 / analogy" block. */
export function Analogy({ emoji, children }: { emoji: ReactNode; children: ReactNode }) {
  return (
    <div
      className="flex gap-4 items-center rounded-xl border p-4 md:p-5 text-sm leading-7"
      style={{
        borderColor: 'color-mix(in oklab, var(--brand-cyan) 28%, transparent)',
        background:
          'linear-gradient(135deg, color-mix(in oklab, var(--brand-cyan) 9%, transparent), color-mix(in oklab, var(--card) 60%, transparent))',
      }}
    >
      <span className="text-3xl leading-none shrink-0" aria-hidden>
        {emoji}
      </span>
      <span className="text-foreground/85">{children}</span>
    </div>
  )
}

/* ───────────────────────── quiz ───────────────────────── */

export function Quiz({ q, children }: { q: ReactNode; children: ReactNode }) {
  return (
    <details className="nt-quiz rounded-xl border border-dashed border-border bg-card/40 backdrop-blur-sm p-4 group">
      <summary className="cursor-pointer text-sm font-medium flex items-center gap-2">
        <span className="nt-chev text-[var(--nt-accent)]" aria-hidden>
          ▶
        </span>
        <span className="nt-q-label text-foreground/80">{q}</span>
      </summary>
      <div className="mt-3 text-sm leading-7 text-muted-foreground pl-6">{children}</div>
    </details>
  )
}

/* ───────────────────────── step flow ───────────────────────── */

export type FlowStep = { icon?: ReactNode; title: ReactNode; desc?: ReactNode }

export function Flow({ steps, loop }: { steps: FlowStep[]; loop?: ReactNode }) {
  return (
    <Card>
      <div className="flex items-stretch gap-2 overflow-x-auto pb-1">
        {steps.map((s, i) => (
          <div key={i} className="contents">
            <div className="flex-1 min-w-[7rem] rounded-xl border border-border/60 bg-card/50 p-3 text-center">
              {s.icon ? (
                <div className="text-2xl mb-1" aria-hidden>
                  {s.icon}
                </div>
              ) : null}
              <div className="font-semibold text-[0.8rem] leading-snug text-foreground">{s.title}</div>
              {s.desc ? <div className="text-[0.7rem] text-muted-foreground leading-tight mt-0.5">{s.desc}</div> : null}
            </div>
            {i < steps.length - 1 ? (
              <div className="nt-farrow grid place-items-center text-lg shrink-0" style={{ color: 'var(--nt-accent)' }}>
                →
              </div>
            ) : loop && i === steps.length - 1 ? (
              <div className="nt-farrow grid place-items-center text-lg shrink-0" style={{ color: 'var(--nt-accent)' }}>
                ↻
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {loop ? <p className="mt-2 text-center text-xs text-muted-foreground">{loop}</p> : null}
    </Card>
  )
}

/* ───────────────────────── stat grid (numbers to remember) ───────────────────────── */

export function StatGrid({ stats }: { stats: Array<{ v: ReactNode; l: ReactNode }> }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s, i) => (
        <div key={i} className="nt-box rounded-xl border border-border/60 bg-card/40 p-4 text-center">
          <div
            className="text-2xl font-extrabold leading-tight"
            style={{
              background: 'linear-gradient(90deg, var(--nt-accent), var(--brand-violet))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {s.v}
          </div>
          <div className="mt-1.5 text-xs text-muted-foreground leading-snug whitespace-pre-line">{s.l}</div>
        </div>
      ))}
    </div>
  )
}

/* ───────────────────────── timeline ───────────────────────── */

export function Timeline({ items }: { items: Array<{ y: ReactNode; t: ReactNode }> }) {
  return (
    <Card>
      <div className="relative pl-7">
        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border/60" />
        {items.map((it, i) => (
          <div key={i} className="relative mb-5 last:mb-0">
            <div
              className="absolute -left-[1.42rem] top-1 w-3 h-3 rounded-full border-2"
              style={{ background: 'var(--nt-accent)', borderColor: 'var(--background)' }}
            />
            <span className="font-extrabold text-sm" style={{ color: 'var(--nt-accent)' }}>
              {it.y}
            </span>
            <p className="mt-0.5 text-sm text-muted-foreground leading-7">{it.t}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ───────────────────────── tables ───────────────────────── */

export function NTable({ head, rows }: { head: ReactNode[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="nt-table">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ───────────────────────── punch line ───────────────────────── */

export function Punch({ children }: { children: ReactNode }) {
  return (
    <div className="nt-card rounded-2xl border border-border/60 bg-gradient-to-br from-card/60 to-card/20 backdrop-blur-sm p-8 text-center">
      <p className="text-xl md:text-2xl font-display leading-relaxed tracking-tight">{children}</p>
    </div>
  )
}

/* ───────────────────────── numbered process grid ───────────────────────── */

export function ProcessGrid({
  steps,
}: {
  steps: Array<{ n: ReactNode; t: ReactNode; en?: ReactNode; d: ReactNode; highlight?: boolean }>
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {steps.map((s, i) => (
        <div
          key={i}
          className="nt-box relative rounded-xl border bg-card/40 p-5 pt-6"
          style={
            s.highlight
              ? {
                  borderColor: 'color-mix(in oklab, var(--brand-emerald) 45%, transparent)',
                  background:
                    'linear-gradient(135deg, color-mix(in oklab, var(--brand-emerald) 10%, transparent), color-mix(in oklab, var(--card) 55%, transparent))',
                }
              : { borderColor: 'color-mix(in oklab, var(--border) 70%, transparent)' }
          }
        >
          <span
            className="absolute -top-3 left-4 w-7 h-7 rounded-lg grid place-items-center font-mono text-[13px] font-extrabold"
            style={{
              background: s.highlight ? 'var(--brand-emerald)' : 'var(--nt-accent)',
              color: 'var(--background)',
            }}
          >
            {s.n}
          </span>
          <div className="font-semibold text-base text-foreground">{s.t}</div>
          {s.en ? (
            <div className="text-xs mb-1.5" style={{ color: s.highlight ? 'var(--brand-emerald)' : 'var(--nt-accent)' }}>
              {s.en}
            </div>
          ) : null}
          <div className="text-sm text-muted-foreground leading-7">{s.d}</div>
        </div>
      ))}
    </div>
  )
}

/* ───────────────────────── horizontal bars / ladder ───────────────────────── */

export function Bars({
  rows,
  unit,
}: {
  rows: Array<{ nm: ReactNode; pct: number; val?: ReactNode; accent?: Accent }>
  unit?: ReactNode
}) {
  return (
    <Card>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-[6.5rem_1fr_4rem] gap-3 items-center text-sm">
            <span className="font-medium text-foreground/80 truncate">{r.nm}</span>
            <div className="h-4 rounded-full bg-muted/70 overflow-hidden">
              <div
                className="nt-bar-fill h-full rounded-full"
                style={{
                  width: `${r.pct}%`,
                  background: `linear-gradient(90deg, ${r.accent ?? 'var(--nt-accent)'}, var(--brand-violet))`,
                }}
              />
            </div>
            <span className="text-right font-bold" style={{ color: r.accent ?? 'var(--nt-accent)' }}>
              {r.val}
            </span>
          </div>
        ))}
      </div>
      {unit ? <p className="mt-3 text-xs text-muted-foreground">{unit}</p> : null}
    </Card>
  )
}

/** Size-comparison ladder (e.g. nm scale). pct is bar length 0–100. */
export function Ladder({
  rows,
}: {
  rows: Array<{ label: ReactNode; pct: number; value: ReactNode; accent?: Accent }>
}) {
  return (
    <Card>
      <div className="divide-y divide-border/40">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-[5.5rem_1fr] gap-3 items-center py-2.5">
            <div className="font-bold text-right text-sm" style={{ color: r.accent ?? 'var(--nt-accent)' }}>
              {r.label}
            </div>
            <div>
              <div className="h-3.5 rounded-full overflow-hidden bg-muted/40">
                <div
                  className="nt-bar-fill h-full rounded-full"
                  style={{
                    width: `${Math.max(r.pct, 1.5)}%`,
                    background: `linear-gradient(90deg, ${r.accent ?? 'var(--nt-accent)'}, var(--brand-cyan))`,
                  }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{r.value}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ───────────────────────── figure (SVG wrapper) ───────────────────────── */

export function Figure({ caption, children }: { caption?: ReactNode; children: ReactNode }) {
  return (
    <Card>
      <div className="[&_svg]:w-full [&_svg]:h-auto [&_svg]:block">{children}</div>
      {caption ? <p className="text-center text-xs text-muted-foreground/80 mt-3">{caption}</p> : null}
    </Card>
  )
}

/* ───────────────────────── glossary ───────────────────────── */

export function Glossary({ terms }: { terms: Array<{ w: ReactNode; en?: ReactNode; m: ReactNode }> }) {
  return (
    <Card>
      {terms.map((t, i) => (
        <div key={i} className="nt-term">
          <div className="font-bold text-[0.95rem] text-foreground">
            {t.w}
            {t.en ? <small className="block text-muted-foreground/70 font-normal text-xs mt-0.5">{t.en}</small> : null}
          </div>
          <div className="text-sm text-muted-foreground leading-7">{t.m}</div>
        </div>
      ))}
    </Card>
  )
}

/* ───────────────────────── inline accent text ───────────────────────── */

export function Hl({ children }: { children: ReactNode }) {
  return (
    <span className="font-semibold" style={{ color: 'var(--nt-accent)' }}>
      {children}
    </span>
  )
}
export function HlG({ children }: { children: ReactNode }) {
  return (
    <span className="font-semibold" style={{ color: 'var(--brand-emerald)' }}>
      {children}
    </span>
  )
}
export function HlA({ children }: { children: ReactNode }) {
  return (
    <span className="font-semibold" style={{ color: 'var(--brand-amber)' }}>
      {children}
    </span>
  )
}
export function HlV({ children }: { children: ReactNode }) {
  return (
    <span className="font-semibold" style={{ color: 'var(--brand-violet)' }}>
      {children}
    </span>
  )
}
export function B({ children }: { children: ReactNode }) {
  return <strong className="text-foreground font-semibold">{children}</strong>
}
export function Em({ children }: { children: ReactNode }) {
  return (
    <em className="not-italic font-semibold" style={{ color: 'var(--brand-cyan)' }}>
      {children}
    </em>
  )
}
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 text-xs font-mono text-foreground">
      {children}
    </kbd>
  )
}
