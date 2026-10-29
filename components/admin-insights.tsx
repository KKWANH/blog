'use client'

import { useState, type MouseEvent, type PointerEvent } from 'react'
import { Download } from 'lucide-react'
import type { AnalyticsDay, AnalyticsReport } from '@/lib/admin-types'
import { referralLabels } from '@/lib/analytics-model'

/* Validated with the dataviz palette check on the admin panel surface (#10291e):
   lightness band, chroma, CVD and normal-vision separation, and contrast all pass. */
const series = [
  { key: 'views', label: 'Page views', color: '#b8862a' },
  { key: 'entries', label: 'Arrivals', color: '#3f9fcf' },
  { key: 'visitors', label: 'Opted-in visitors', color: '#c95883' },
] as const
type SeriesKey = typeof series[number]['key']
type Row = { name: string; count: number }

const arrivalHelp: Record<string, string> = {
  Direct: 'No source sent: typed address, bookmark, QR code, PDF CV, or an app that hides links (LinkedIn app, messengers).',
  Internal: 'Opened from kwanho.dev itself in a new tab or after a reload.',
}
const clickLabels: Record<string, string> = {
  cta_read_cv: 'Read the CV', cta_email: 'Email', cta_save_vcf: 'Save contact',
  cta_standalone_card: 'Open card & QR', outbound_linkedin: 'LinkedIn',
}
const regionNames = typeof Intl !== 'undefined' && 'DisplayNames' in Intl ? new Intl.DisplayNames(['en'], { type: 'region' }) : null
function countryLabel(code: string) {
  if (!/^[A-Z]{2}$/.test(code) || code === 'ZZ') return 'Unknown'
  const flag = String.fromCodePoint(...[...code].map((letter) => 0x1f1a5 + letter.charCodeAt(0)))
  return `${flag} ${regionNames?.of(code) ?? code}`
}

const sum = (record: Record<string, number> | undefined) => Object.values(record ?? {}).reduce((total, value) => total + value, 0)
function rank(records: Array<Record<string, number> | undefined>, rename: (key: string) => string = (key) => key): Row[] {
  const merged = new Map<string, number>()
  for (const record of records) for (const [key, value] of Object.entries(record ?? {})) merged.set(rename(key), (merged.get(rename(key)) ?? 0) + value)
  return [...merged].filter(([, count]) => count > 0).sort((a, b) => b[1] - a[1]).map(([name, count]) => ({ name, count }))
}

export function AdminInsights({ report }: { report: AnalyticsReport }) {
  const [focusDate, setFocusDate] = useState<string | null>(null)
  const [hidden, setHidden] = useState<Set<SeriesKey>>(new Set())
  const [localTime, setLocalTime] = useState(true)
  const scope = focusDate ? report.days.filter((day) => day.date === focusDate) : report.days
  const clicksPerDay = report.days.map((day) => sum(day.conversions))
  const totals = {
    views: scope.reduce((total, day) => total + day.views, 0),
    entries: scope.reduce((total, day) => total + day.entries, 0),
    visitors: scope.reduce((total, day) => total + day.visitors, 0),
    clicks: scope.reduce((total, day) => total + sum(day.conversions), 0),
  }
  const breakdown = {
    arrivals: rank(scope.map((day) => day.referrals), (key) => referralLabels[key] ?? 'Other external'),
    pages: rank(scope.map((day) => day.pages)),
    countries: rank(scope.map((day) => day.countries)),
    devices: rank(scope.map((day) => day.devices)),
    browsers: rank(scope.map((day) => day.browsers)),
    clicks: rank(scope.map((day) => day.conversions), (key) => clickLabels[key] ?? key),
    flows: rank(scope.map((day) => day.flows)).map(({ name, count }) => ({ from: name.split('\t')[0], to: name.split('\t')[1], count })),
    hours: rank(scope.map((day) => day.hours)),
  }
  const scopeLabel = focusDate ? formatDate(focusDate) : `last ${report.days.length} days`

  return <div className="ai">
    <div className="ai-kpis">
      <Kpi label="Page views" value={totals.views} trend={report.days.map((day) => day.views)} />
      <Kpi label="Arrivals" hint="Visits that started on this site" value={totals.entries} trend={report.days.map((day) => day.entries)} />
      <Kpi label="Opted-in visitors" hint="Only visitors who allowed the optional cookie" value={totals.visitors} trend={report.days.map((day) => day.visitors)} />
      <Kpi label="Clicks" hint="CV, email, contact, card and LinkedIn buttons" value={totals.clicks} trend={clicksPerDay} />
      <Kpi label="Pages per arrival" value={totals.entries ? +(totals.views / totals.entries).toFixed(1) : 0} />
    </div>

    <section className="ai-panel ai-wide">
      <header className="ai-head">
        <div><h2>Traffic over time</h2><p>Hover to read a day, click to filter every panel below to that day.</p></div>
        <div className="ai-legend" role="group" aria-label="Series">
          {series.map((item) => <button key={item.key} type="button" aria-pressed={!hidden.has(item.key)} onClick={() => setHidden((current) => { const next = new Set(current); if (next.has(item.key)) next.delete(item.key); else next.add(item.key); return next })}>
            <i style={{ background: item.color }} aria-hidden="true" />{item.label}
          </button>)}
        </div>
      </header>
      <TrafficLines days={report.days} hidden={hidden} focusDate={focusDate} onFocus={setFocusDate} />
    </section>

    <div className={`ai-scope${focusDate ? ' is-day' : ''}`} role="status">
      <span>Showing <strong>{scopeLabel}</strong></span>
      {focusDate ? <button type="button" onClick={() => setFocusDate(null)}>Show whole range</button> : null}
    </div>

    <div className="ai-grid">
      <BarPanel title="How people arrived" rows={breakdown.arrivals} empty="No arrivals recorded." help={arrivalHelp} />
      <BarPanel title="Pages viewed" rows={breakdown.pages} empty="No page views recorded." />
      <BarPanel title="Countries" rows={breakdown.countries.map((row) => ({ ...row, name: countryLabel(row.name) }))} empty="Countries are recorded from the next visit on (collection fixed 29 Oct 2026)." />
      <SharePanel title="Devices" rows={breakdown.devices} empty="Recorded from the next visit on." />
      <SharePanel title="Browsers" rows={breakdown.browsers} empty="Recorded from the next visit on." />
      <BarPanel title="Clicks" rows={breakdown.clicks} empty="No button clicks recorded." />
    </div>

    <div className="ai-grid ai-grid-2">
      <section className="ai-panel">
        <header className="ai-head">
          <div><h2>Time of day</h2><p>Page views per hour, {localTime ? 'Brussels time' : 'UTC'}.</p></div>
          <div className="ai-toggle" role="group" aria-label="Time zone">
            <button type="button" aria-pressed={localTime} onClick={() => setLocalTime(true)}>Brussels</button>
            <button type="button" aria-pressed={!localTime} onClick={() => setLocalTime(false)}>UTC</button>
          </div>
        </header>
        <HourCurve hours={breakdown.hours} localTime={localTime} />
      </section>
      <WeekdayPanel days={scope} />
    </div>

    <section className="ai-panel ai-wide">
      <header className="ai-head"><div><h2>Paths through the site</h2><p>Which page people opened next.</p></div></header>
      {breakdown.flows.length ? <ol className="ai-flows">{breakdown.flows.slice(0, 12).map((flow) => <li key={`${flow.from}>${flow.to}`}>
        <code>{flow.from}</code><span aria-hidden="true">→</span><code>{flow.to}</code><strong>{flow.count}</strong>
      </li>)}</ol> : <p className="ai-empty">No page-to-page moves recorded.</p>}
    </section>

    <DataExplorer days={report.days} />
  </div>
}

function formatDate(date: string) {
  return new Date(date + 'T12:00:00Z').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })
}

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(1, ...values), width = 100, height = 28
  const points = values.map((value, index) => `${(index / Math.max(1, values.length - 1)) * width},${height - 2 - (value / max) * (height - 4)}`).join(' ')
  return <svg className="ai-spark" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true"><polyline points={points} /></svg>
}

function Kpi({ label, value, hint, trend }: { label: string; value: number; hint?: string; trend?: number[] }) {
  return <article className="ai-kpi" title={hint}>
    <span>{label}</span>
    <strong>{value.toLocaleString()}</strong>
    {trend ? <Sparkline values={trend} /> : <small>{hint ?? 'Average across the range'}</small>}
  </article>
}

function TrafficLines({ days, hidden, focusDate, onFocus }: { days: AnalyticsDay[]; hidden: Set<SeriesKey>; focusDate: string | null; onFocus: (date: string | null) => void }) {
  const [hover, setHover] = useState<number | null>(null)
  const width = 960, height = 260, pad = { top: 16, right: 18, bottom: 30, left: 36 }
  const visible = series.filter((item) => !hidden.has(item.key))
  const max = Math.max(1, ...days.flatMap((day) => visible.map((item) => day[item.key])))
  const niceMax = Math.max(4, Math.ceil(max / 4) * 4)
  const x = (index: number) => pad.left + (index / Math.max(1, days.length - 1)) * (width - pad.left - pad.right)
  const y = (value: number) => pad.top + (1 - value / niceMax) * (height - pad.top - pad.bottom)
  const labelEvery = Math.ceil(days.length / 10)
  function indexAt(event: PointerEvent<SVGSVGElement> | MouseEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect()
    const relative = ((event.clientX - box.left) / box.width) * width
    return Math.max(0, Math.min(days.length - 1, Math.round(((relative - pad.left) / (width - pad.left - pad.right)) * (days.length - 1))))
  }
  const active = hover ?? (focusDate ? days.findIndex((day) => day.date === focusDate) : null)
  const activeDay = active !== null && active >= 0 ? days[active] : null
  return <div className="ai-chart">
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Daily page views, arrivals and opted-in visitors" onPointerMove={(event) => setHover(indexAt(event))} onPointerLeave={() => setHover(null)} onClick={(event) => { const date = days[indexAt(event)].date; onFocus(date === focusDate ? null : date) }}>
      {[0, 0.25, 0.5, 0.75, 1].map((step) => <g key={step}>
        <line className="ai-grid-line" x1={pad.left} x2={width - pad.right} y1={y(niceMax * step)} y2={y(niceMax * step)} />
        <text className="ai-axis" x={pad.left - 8} y={y(niceMax * step) + 4} textAnchor="end">{Math.round(niceMax * step)}</text>
      </g>)}
      {days.map((day, index) => index % labelEvery === 0 || index === days.length - 1 ? <text key={day.date} className="ai-axis" x={x(index)} y={height - 8} textAnchor="middle">{day.date.slice(5).replace('-', '/')}</text> : null)}
      {visible.map((item) => <g key={item.key}>
        <path d={`M${x(0)},${y(0)} ` + days.map((day, index) => `L${x(index)},${y(day[item.key])}`).join(' ') + ` L${x(days.length - 1)},${y(0)} Z`} fill={item.color} opacity={item.key === 'views' ? 0.1 : 0} />
        <polyline className="ai-line" points={days.map((day, index) => `${x(index)},${y(day[item.key])}`).join(' ')} stroke={item.color} />
      </g>)}
      {activeDay ? <g>
        <line className="ai-cross" x1={x(active!)} x2={x(active!)} y1={pad.top} y2={height - pad.bottom} />
        {visible.map((item) => <circle key={item.key} cx={x(active!)} cy={y(activeDay[item.key])} r={5} fill={item.color} className="ai-dot" />)}
      </g> : null}
      <rect x={0} y={0} width={width} height={height} fill="transparent" style={{ cursor: 'pointer' }} />
    </svg>
    {activeDay ? <div className="ai-tip" style={{ left: `${(x(active!) / width) * 100}%` }}>
      <strong>{formatDate(activeDay.date)}</strong>
      {visible.map((item) => <span key={item.key}><i style={{ background: item.color }} />{item.label}<b>{activeDay[item.key]}</b></span>)}
    </div> : null}
  </div>
}

function BarPanel({ title, rows, empty, help }: { title: string; rows: Row[]; empty: string; help?: Record<string, string> }) {
  const total = Math.max(1, rows.reduce((value, row) => value + row.count, 0)), max = Math.max(1, ...rows.map((row) => row.count))
  return <section className="ai-panel">
    <header className="ai-head"><div><h2>{title}</h2></div></header>
    {rows.length ? <ul className="ai-bars">{rows.slice(0, 8).map((row) => <li key={row.name} title={help?.[row.name]}>
      <div><span>{row.name}</span><b>{row.count.toLocaleString()} <small>{Math.round((row.count / total) * 100)}%</small></b></div>
      <i><em style={{ width: `${Math.max(3, (row.count / max) * 100)}%` }} /></i>
      {help?.[row.name] ? <p>{help[row.name]}</p> : null}
    </li>)}</ul> : <p className="ai-empty">{empty}</p>}
  </section>
}

/* Parts of one whole: a single 100% bar with a 2px surface gap between segments. */
const shareColors = ['#b8862a', '#3f9fcf', '#c95883', '#6f8c79']
function SharePanel({ title, rows, empty }: { title: string; rows: Row[]; empty: string }) {
  const top = rows.slice(0, 3), rest = rows.slice(3).reduce((value, row) => value + row.count, 0)
  const parts = rest ? [...top, { name: 'Other', count: rest }] : top
  const total = Math.max(1, parts.reduce((value, row) => value + row.count, 0))
  return <section className="ai-panel">
    <header className="ai-head"><div><h2>{title}</h2></div></header>
    {parts.length ? <>
      <div className="ai-share" role="img" aria-label={parts.map((row) => `${row.name} ${Math.round((row.count / total) * 100)}%`).join(', ')}>
        {parts.map((row, index) => <span key={row.name} style={{ flexGrow: row.count, background: shareColors[index] }} title={`${row.name}: ${row.count}`} />)}
      </div>
      <ul className="ai-share-legend">{parts.map((row, index) => <li key={row.name}><i style={{ background: shareColors[index] }} />{row.name}<b>{Math.round((row.count / total) * 100)}%</b><small>{row.count}</small></li>)}</ul>
    </> : <p className="ai-empty">{empty}</p>}
  </section>
}

function brusselsOffset() {
  const now = new Date()
  const local = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Brussels' }))
  const utc = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }))
  return Math.round((local.getTime() - utc.getTime()) / 3_600_000)
}
function HourCurve({ hours, localTime }: { hours: Row[]; localTime: boolean }) {
  const [hover, setHover] = useState<number | null>(null)
  const offset = localTime ? brusselsOffset() : 0
  const counts = Array.from({ length: 24 }, () => 0)
  for (const row of hours) { const hour = Number(row.name.slice(0, 2)); if (Number.isInteger(hour)) counts[(hour + offset + 24) % 24] += row.count }
  const width = 480, height = 180, pad = { top: 12, right: 10, bottom: 26, left: 10 }
  const max = Math.max(1, ...counts)
  const x = (hour: number) => pad.left + (hour / 23) * (width - pad.left - pad.right)
  const y = (value: number) => pad.top + (1 - value / max) * (height - pad.top - pad.bottom)
  const line = counts.map((count, hour) => `${x(hour)},${y(count)}`).join(' ')
  if (!counts.some(Boolean)) return <p className="ai-empty">Recorded from the next visit on.</p>
  return <div className="ai-chart">
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Page views by hour of day" onPointerMove={(event) => { const box = event.currentTarget.getBoundingClientRect(); setHover(Math.max(0, Math.min(23, Math.round((((event.clientX - box.left) / box.width) * width - pad.left) / (width - pad.left - pad.right) * 23)))) }} onPointerLeave={() => setHover(null)}>
      <path d={`M${x(0)},${y(0)} L${line.split(' ').join(' L')} L${x(23)},${y(0)} Z`} fill="#b8862a" opacity={0.14} />
      <polyline className="ai-line" points={line} stroke="#b8862a" />
      {[0, 6, 12, 18, 23].map((hour) => <text key={hour} className="ai-axis" x={x(hour)} y={height - 6} textAnchor="middle">{String(hour).padStart(2, '0')}h</text>)}
      {hover !== null ? <g><line className="ai-cross" x1={x(hover)} x2={x(hover)} y1={pad.top} y2={height - pad.bottom} /><circle cx={x(hover)} cy={y(counts[hover])} r={5} fill="#b8862a" className="ai-dot" /></g> : null}
    </svg>
    {hover !== null ? <div className="ai-tip" style={{ left: `${(x(hover) / width) * 100}%` }}><strong>{String(hover).padStart(2, '0')}:00–{String(hover).padStart(2, '0')}:59</strong><span>{counts[hover]} page views</span></div> : null}
  </div>
}

function WeekdayPanel({ days }: { days: AnalyticsDay[] }) {
  const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const totals = names.map(() => 0)
  for (const day of days) totals[(new Date(day.date + 'T12:00:00Z').getUTCDay() + 6) % 7] += day.views
  const max = Math.max(1, ...totals)
  return <section className="ai-panel">
    <header className="ai-head"><div><h2>Day of the week</h2><p>Page views per weekday in the selection.</p></div></header>
    <div className="ai-columns" role="img" aria-label={names.map((name, index) => `${name} ${totals[index]}`).join(', ')}>
      {names.map((name, index) => <div key={name} title={`${name}: ${totals[index]} page views`}>
        <b>{totals[index] || ''}</b>
        <i><em style={{ height: `${Math.max(totals[index] ? 4 : 0, (totals[index] / max) * 100)}%` }} /></i>
        <span>{name}</span>
      </div>)}
    </div>
  </section>
}

function DataExplorer({ days }: { days: AnalyticsDay[] }) {
  const [open, setOpen] = useState(false)
  const rows = [...days].reverse()
  function download() {
    const header = ['date', 'views', 'arrivals', 'visitors', 'sessions', 'clicks', 'top_page', 'top_country']
    const top = (record: Record<string, number>) => Object.entries(record ?? {}).sort((a, b) => b[1] - a[1])[0]?.[0] ?? ''
    const lines = days.map((day) => [day.date, day.views, day.entries, day.visitors, day.sessions, sum(day.conversions), top(day.pages), top(day.countries)].join(','))
    const url = URL.createObjectURL(new Blob([[header.join(','), ...lines].join('\n')], { type: 'text/csv' }))
    const link = Object.assign(document.createElement('a'), { href: url, download: `kwanho-dev-traffic-${days[0]?.date}-${days.at(-1)?.date}.csv` })
    link.click(); URL.revokeObjectURL(url)
  }
  return <section className="ai-panel ai-wide">
    <header className="ai-head">
      <div><h2>Daily data</h2><p>Every day in the range, newest first.</p></div>
      <div className="ai-toggle">
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Hide table' : 'Show table'}</button>
        <button type="button" onClick={download}><Download aria-hidden="true" />CSV</button>
      </div>
    </header>
    {open ? <div className="ai-table-wrap"><table className="ai-table">
      <thead><tr><th>Date</th><th>Views</th><th>Arrivals</th><th>Visitors</th><th>Clicks</th><th>Top page</th><th>Top country</th></tr></thead>
      <tbody>{rows.map((day) => {
        const topPage = Object.entries(day.pages).sort((a, b) => b[1] - a[1])[0]
        const topCountry = Object.entries(day.countries ?? {}).sort((a, b) => b[1] - a[1])[0]
        return <tr key={day.date}><td>{formatDate(day.date)}</td><td>{day.views}</td><td>{day.entries}</td><td>{day.visitors}</td><td>{sum(day.conversions)}</td><td>{topPage ? <code>{topPage[0]}</code> : '—'}</td><td>{topCountry ? countryLabel(topCountry[0]) : '—'}</td></tr>
      })}</tbody>
    </table></div> : null}
  </section>
}
