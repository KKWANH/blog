/**
 * Per-project hero artwork. Two custom SVGs, one per visual id, sized
 * to fit the 16:9 slot at the top of the project card. They're styled
 * to feel like the project itself rather than being literal product
 * screenshots, which let me keep the cards looking deliberate even
 * while the actual subdomain UI evolves.
 */

import type { Project } from '@/lib/projects'

export function ProjectVisual({ visual }: { visual: Project['visual'] }) {
  if (visual === 'earprint') {
    return <EarprintVisual />
  }
  return <AriadneVisual />
}

/* -----------------------------------------------------------------
 * Earprint — emerald soundwave fingerprint over a dark glass panel.
 * Echoes the logo's organic curve and the "earprint" name.
 * ----------------------------------------------------------------- */
function EarprintVisual() {
  return (
    <svg
      role="img"
      aria-label="Earprint — a soundwave fingerprint"
      viewBox="0 0 640 360"
      className="block h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="ep-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0b" />
          <stop offset="100%" stopColor="#0e1a14" />
        </linearGradient>
        <radialGradient id="ep-glow" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#34d399" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ep-bars" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      <rect width="640" height="360" fill="url(#ep-bg)" />
      <rect width="640" height="360" fill="url(#ep-glow)" />

      {/* Tiny equalizer bars across the bottom — recognisable music UI */}
      <g transform="translate(40 270)">
        {Array.from({ length: 48 }).map((_, i) => {
          // Deterministic pseudo-random heights so render is stable
          const seed = Math.sin(i * 12.9898) * 43758.5453
          const h = 8 + Math.abs(seed - Math.floor(seed)) * 60
          return (
            <rect
              key={i}
              x={i * 11}
              y={-h}
              width="5"
              height={h}
              rx="2"
              fill="url(#ep-bars)"
              opacity={0.4 + (i % 5) * 0.12}
            />
          )
        })}
      </g>

      {/* Earprint logo curve, centred and oversized */}
      <g transform="translate(200 50) scale(0.45)" fill="none" stroke="#34d399" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round">
        <path d="M214 392 C 172 366 156 306 164 248 C 174 168 230 122 300 132 C 364 141 384 210 366 272 C 357 312 330 344 292 350" />
        <path d="M300 262 C 258 286 220 258 230 214 C 237 184 278 174 306 198" />
      </g>

      {/* Lab readout — top-left chip */}
      <g transform="translate(20 20)" fontFamily="ui-monospace, 'Geist Mono', monospace" fontSize="11" fill="#a7f3d0">
        <rect width="138" height="22" rx="6" fill="#062a1c" />
        <text x="10" y="15">analyze · liked · 1,284</text>
      </g>

      {/* Mini metadata strip — top-right */}
      <g transform="translate(486 20)" fontFamily="ui-monospace, 'Geist Mono', monospace" fontSize="11" fill="#86efac">
        <rect width="134" height="22" rx="6" fill="#062a1c" />
        <circle cx="13" cy="11" r="3" fill="#34d399" />
        <text x="24" y="15">live · 취향 DNA</text>
      </g>
    </svg>
  )
}

/* -----------------------------------------------------------------
 * Ariadne — cyan/violet "inspector panel" mock. Stacked claim lines
 * connected to source files, matching the project's evidence-pack
 * vocabulary.
 * ----------------------------------------------------------------- */
function AriadneVisual() {
  return (
    <svg
      role="img"
      aria-label="Ariadne — an inspector panel mock with claim-to-source mapping"
      viewBox="0 0 640 360"
      className="block h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="ar-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#080b14" />
          <stop offset="100%" stopColor="#0a1320" />
        </linearGradient>
        <radialGradient id="ar-glow" cx="80%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.32" />
          <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="640" height="360" fill="url(#ar-bg)" />
      <rect width="640" height="360" fill="url(#ar-glow)" />

      {/* Title bar */}
      <g transform="translate(20 18)" fontFamily="ui-monospace, 'Geist Mono', monospace" fontSize="11">
        <rect width="600" height="26" rx="6" fill="#0f172a" stroke="#1e293b" />
        <circle cx="16" cy="13" r="4" fill="#ef4444" />
        <circle cx="32" cy="13" r="4" fill="#f59e0b" />
        <circle cx="48" cy="13" r="4" fill="#10b981" />
        <text x="68" y="17" fill="#94a3b8">ariadne — run · workspace/notes</text>
        <text x="500" y="17" fill="#67e8f9">⌘ K · evidence</text>
      </g>

      {/* Left column: claim panel */}
      <g transform="translate(20 60)" fontFamily="ui-monospace, 'Geist Mono', monospace" fontSize="11" fill="#cbd5e1">
        <rect width="290" height="280" rx="10" fill="#0b1220" stroke="#1e293b" />
        <text x="14" y="22" fill="#67e8f9" fontSize="10" letterSpacing="0.16em">CLAIMS</text>

        <g transform="translate(14 38)">
          {claimLines.map((c, i) => (
            <g key={i} transform={`translate(0 ${i * 36})`}>
              <rect x="0" y="0" width="262" height="26" rx="6" fill="#0d1729" stroke="#1e293b" />
              <circle cx="12" cy="13" r="4" fill={c.color} />
              <text x="24" y="17">{c.text}</text>
            </g>
          ))}
        </g>
      </g>

      {/* Connector lines between claims and sources */}
      <g stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.55" fill="none">
        {claimLines.map((_, i) => {
          const y1 = 60 + 38 + 13 + i * 36 // y of claim midpoint
          const y2 = 60 + 38 + 13 + i * 36
          return (
            <path
              key={i}
              d={`M310 ${y1} C 340 ${y1}, 340 ${y2 + (i % 3 === 0 ? 8 : 0)}, 370 ${y2 + (i % 3 === 0 ? 8 : 0)}`}
            />
          )
        })}
      </g>

      {/* Right column: source files panel */}
      <g transform="translate(370 60)" fontFamily="ui-monospace, 'Geist Mono', monospace" fontSize="11" fill="#cbd5e1">
        <rect width="250" height="280" rx="10" fill="#0b1220" stroke="#1e293b" />
        <text x="14" y="22" fill="#a78bfa" fontSize="10" letterSpacing="0.16em">SOURCES</text>

        <g transform="translate(14 38)">
          {sourceLines.map((s, i) => (
            <g key={i} transform={`translate(0 ${i * 36})`}>
              <rect x="0" y="0" width="222" height="26" rx="6" fill="#0d1729" stroke="#1e293b" />
              <rect x="8" y="7" width="12" height="12" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              <text x="28" y="17">{s}</text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  )
}

const claimLines = [
  { text: 'Earprint mapping', color: '#10b981' },
  { text: 'evidence: supported', color: '#34d399' },
  { text: 'taste DNA index', color: '#67e8f9' },
  { text: 'cluster: indie-folk', color: '#f59e0b' },
  { text: 'partial: live shows', color: '#ef4444' },
  { text: 'rerun · 03:21', color: '#a78bfa' },
  { text: 'export → md', color: '#94a3b8' },
] as const

const sourceLines = [
  'notes/2024-06-14.md',
  'liked-tracks.json',
  'docs/playlist-spec.md',
  'analysis/run-318.log',
  'scrape/yt-music.txt',
  'README.md',
  'manifest.json',
] as const
