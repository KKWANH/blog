/**
 * Project catalog rendered on the homepage and anywhere else the site
 * needs to enumerate the demos that live under *.kwanho.dev.
 *
 * Each entry is intentionally compact — visual identity lives in the
 * card component, not here. The `accentVar` points at a CSS variable
 * defined in app/globals.css (var(--brand-*)).
 */

export type ProjectStatus = 'live' | 'beta' | 'wip'

export type Project = {
  /** Stable key used as React key + analytics id. */
  id: string
  /** Display name. */
  name: string
  /** One-line tagline. Korean first; English fallback inside the card. */
  tagline: { ko: string; en: string }
  /** 2-3 sentence description for the card body. */
  description: { ko: string; en: string }
  /** Live URL the "Open ↗" button points to. */
  href: string
  /** Public source URL (GitHub). */
  source: string
  /** Stack chips rendered as mono-font badges. */
  stack: string[]
  /** Lifecycle marker — drives the colored dot in the card header. */
  status: ProjectStatus
  /** CSS variable name (without `var(...)`) for the project accent color. */
  accentVar: '--brand-emerald' | '--brand-cyan' | '--brand-violet' | '--brand-amber'
  /** Identity visual rendered as the card's hero block. */
  visual: 'earprint' | 'ariadne'
}

export const projects: Project[] = [
  {
    id: 'earprint',
    name: 'Earprint',
    tagline: {
      ko: '당신의 음악 취향, 과학적으로 그려내다.',
      en: 'Your music taste, mapped — psychology and ML.',
    },
    description: {
      ko: 'YouTube Music의 "좋아요" 트랙을 크롬 확장으로 모으고, Deezer·Last.fm 메타데이터와 AI 분석을 더해 취향 DNA·아티스트 맵·다섯 모드 추천 엔진으로 펼쳐 보여주는 컴패니언 웹앱.',
      en: 'A YouTube Music companion. A Chrome extension collects your liked tracks; the web app enriches them with Deezer/Last.fm metadata and Gemini analysis to render a taste-DNA core, an interactive artist map, and a five-mode recommendation engine.',
    },
    href: 'https://earprint.kwanho.dev',
    source: 'https://github.com/KKWANH/playlist-analyzer',
    stack: ['Next.js', 'TypeScript', 'Neon · pgvector', 'Cloudflare Workers', 'Chrome MV3', 'Gemini'],
    status: 'live',
    accentVar: '--brand-emerald',
    visual: 'earprint',
  },
  {
    id: 'ariadne',
    name: 'Ariadne',
    tagline: {
      ko: '내 컴퓨터에서 돌아가는, 출처가 따라오는 AI 워크스페이스.',
      en: 'A local-first AI workspace where every answer carries its sources.',
    },
    description: {
      ko: '로컬 폴더 하나를 워크스페이스로 만든다. 모든 실행은 evidence pack을 남겨 어떤 파일에서 어떤 주장이 나왔는지 추적 가능하고, 커스텀 액션 파이프라인·에이전트 모드·샌드박스 TS 대시보드까지 한 자리에서 운영한다.',
      en: 'Turns a local folder into an AI workspace. Every run leaves an evidence pack mapping claims back to source files, with custom action pipelines, agent mode, and sandboxed TypeScript dashboards under one roof.',
    },
    href: 'https://ai.kwanho.dev',
    source: 'https://github.com/KKWANH/ai-assistant',
    stack: ['Fastify', 'React · Vite', 'SQLite', 'Tailwind v4', 'Multi-provider AI', 'Cloudflare Tunnel'],
    status: 'live',
    accentVar: '--brand-cyan',
    visual: 'ariadne',
  },
]

export type SiteLink = {
  id: string
  name: string
  description: { ko: string; en: string }
  href: string
  accentVar: Project['accentVar']
}

/**
 * Secondary destinations the hub points to — same shape as projects but
 * rendered as a quieter row below the main project grid.
 */
export const siteLinks: SiteLink[] = [
  {
    id: 'editor',
    name: 'Editor',
    description: {
      ko: '풀 에디토리얼 프로필 — 14살 에세이부터 42 Seoul, SEA:ME, Bosch, Pickit 3D까지.',
      en: 'Full editorial profile — from age-14 essays to 42 Seoul, SEA:ME, Bosch, and Pickit 3D.',
    },
    href: '/editor',
    accentVar: '--brand-amber',
  },
  {
    id: 'travel',
    name: 'Travel Atlas',
    description: {
      ko: '내가 머문 도시들의 인터랙티브 지도 — 단순 체크인이 아닌, 결정을 바꾼 환경의 기록.',
      en: 'An interactive map of cities I stayed in — recorded as environments that shaped decisions, not check-ins.',
    },
    href: '/travel',
    accentVar: '--brand-violet',
  },
]

export const externalLinks = {
  github: 'https://github.com/KKWANH',
  linkedin: 'https://www.linkedin.com/in/kwanho-kim-327152232/',
  instagram: 'https://instagram.com/kwanho._kim',
  email: 'mailto:kwanho0096@gmail.com',
  cv: '/CV.pdf',
} as const
