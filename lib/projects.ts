/**
 * Project catalog used on the homepage and anywhere else the site
 * enumerates the demos that live under *.kwanho.dev. Visual identity
 * lives in the card component, not here.
 */

export type ProjectStatus = 'live' | 'beta' | 'wip'

export type Project = {
  id: string
  name: string
  tagline: string
  description: string
  href: string
  source: string
  stack: string[]
  status: ProjectStatus
  /** CSS variable (without `var(...)`) for the project accent color. */
  accentVar: '--brand-emerald' | '--brand-cyan' | '--brand-violet' | '--brand-amber'
  /** Identity visual rendered as the card's hero block. */
  visual: 'earprint' | 'ariadne'
}

export const projects: Project[] = [
  {
    id: 'earprint',
    name: 'Earprint',
    tagline: 'What you actually listen to, mapped.',
    description:
      'A YouTube Music taste analyzer. The Chrome extension scrapes your liked tracks; the web app pulls them through Deezer and Last.fm, runs Gemini analysis, and renders a taste profile, an artist map, and a five-mode recommender.',
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
    tagline: 'Local-first AI workspace where every answer cites its source files.',
    description:
      'Point it at a folder. Each run produces an evidence pack tying every claim back to the file it came from. Custom action pipelines, an agent mode, and sandboxed TypeScript dashboards that render inside the app. BYO API key, or run keyless against local Ollama.',
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
  description: string
  href: string
  accentVar: Project['accentVar']
}

/**
 * Secondary destinations under kwanho.dev — rendered as a quieter row
 * below the main project grid.
 */
export const siteLinks: SiteLink[] = [
  {
    id: 'editor',
    name: 'Editor',
    description:
      'The long-form profile. Started writing math and science essays at 14; got here via 42 Seoul, SEA:ME, Bosch, and Pickit 3D.',
    href: '/editor',
    accentVar: '--brand-amber',
  },
  {
    id: 'travel',
    name: 'Travel atlas',
    description:
      'An interactive map of the cities I stayed in long enough for them to change how I think.',
    href: '/travel',
    accentVar: '--brand-violet',
  },
]

export const externalLinks = {
  github: 'https://github.com/KKWANH',
  linkedin: 'https://www.linkedin.com/in/kwanho-kim-327152232/',
  instagram: 'https://instagram.com/kwanho._kim',
  email: 'mailto:contact@kwanho.dev',
  cv: '/CV.pdf',
} as const
