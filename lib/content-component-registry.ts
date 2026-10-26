import AboutPage, {
  title as aboutTitle,
  description as aboutDescription,
  excerpt as aboutExcerpt,
  lang as aboutLang,
  showToc as aboutShowToc,
  bodyClassName as aboutBodyClassName,
} from '@/contents/about/index'
import TravelPage, {
  bodyClassName as travelBodyClassName,
  description as travelDescription,
  excerpt as travelExcerpt,
  showToc as travelShowToc,
  subtitle as travelSubtitle,
  title as travelTitle,
} from '@/contents/travel/index'
import KlaPage, {
  lang as klaLang,
  category as klaCategory,
  date as klaDate,
  description as klaDescription,
  excerpt as klaExcerpt,
  readTime as klaReadTime,
  showToc as klaShowToc,
  subtitle as klaSubtitle,
  title as klaTitle,
  toc as klaToc,
} from '@/contents/notes/kla/index'
import SemiconductorPage, {
  lang as semiLang,
  category as semiCategory,
  date as semiDate,
  description as semiDescription,
  excerpt as semiExcerpt,
  readTime as semiReadTime,
  showToc as semiShowToc,
  subtitle as semiSubtitle,
  title as semiTitle,
  toc as semiToc,
} from '@/contents/notes/semiconductor/index'
import AiPage, {
  lang as aiLang,
  category as aiCategory,
  date as aiDate,
  description as aiDescription,
  excerpt as aiExcerpt,
  readTime as aiReadTime,
  showToc as aiShowToc,
  subtitle as aiSubtitle,
  title as aiTitle,
  toc as aiToc,
} from '@/contents/notes/ai/index'

export type BundledContentModule = {
  default: React.ComponentType
  metadata?: Record<string, unknown>
  title?: string
  subtitle?: string
  description?: string
  excerpt?: string
  summary?: string
  lang?: string
  date?: string
  category?: string
  featured?: boolean
  readTime?: string
  showToc?: boolean
  toc?: Array<{ id: string; label: string; level?: number }>
  tocVariant?: 'inline' | 'rail'
  bodyClassName?: string
}

const bundledContentModules: Record<string, BundledContentModule> = {
  about: {
    default: AboutPage,
    title: aboutTitle,
    description: aboutDescription,
    excerpt: aboutExcerpt,
    lang: aboutLang,
    showToc: aboutShowToc,
    bodyClassName: aboutBodyClassName,
  },
  travel: {
    default: TravelPage,
    title: travelTitle,
    subtitle: travelSubtitle,
    description: travelDescription,
    excerpt: travelExcerpt,
    showToc: travelShowToc,
    bodyClassName: travelBodyClassName,
  },
  'notes/kla': {
    lang: klaLang,
    default: KlaPage,
    title: klaTitle,
    subtitle: klaSubtitle,
    description: klaDescription,
    excerpt: klaExcerpt,
    date: klaDate,
    category: klaCategory,
    readTime: klaReadTime,
    showToc: klaShowToc,
    toc: klaToc,
  },
  'notes/semiconductor': {
    lang: semiLang,
    default: SemiconductorPage,
    title: semiTitle,
    subtitle: semiSubtitle,
    description: semiDescription,
    excerpt: semiExcerpt,
    date: semiDate,
    category: semiCategory,
    readTime: semiReadTime,
    showToc: semiShowToc,
    toc: semiToc,
  },
  'notes/ai': {
    lang: aiLang,
    default: AiPage,
    title: aiTitle,
    subtitle: aiSubtitle,
    description: aiDescription,
    excerpt: aiExcerpt,
    date: aiDate,
    category: aiCategory,
    readTime: aiReadTime,
    showToc: aiShowToc,
    toc: aiToc,
  },
}

export function getBundledContentModule(slug: string[]) {
  return bundledContentModules[slug.join('/')] ?? null
}
