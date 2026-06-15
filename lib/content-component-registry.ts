import TravelPage, {
  bodyClassName as travelBodyClassName,
  category as travelCategory,
  date as travelDate,
  description as travelDescription,
  excerpt as travelExcerpt,
  readTime as travelReadTime,
  showToc as travelShowToc,
  subtitle as travelSubtitle,
  title as travelTitle,
} from '@/contents/travel/index'
import KlaPage, {
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

export type BundledContentModule = {
  default: React.ComponentType
  metadata?: Record<string, unknown>
  title?: string
  subtitle?: string
  description?: string
  excerpt?: string
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
  travel: {
    default: TravelPage,
    title: travelTitle,
    subtitle: travelSubtitle,
    description: travelDescription,
    excerpt: travelExcerpt,
    date: travelDate,
    category: travelCategory,
    readTime: travelReadTime,
    showToc: travelShowToc,
    bodyClassName: travelBodyClassName,
  },
  'notes/kla': {
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
}

export function getBundledContentModule(slug: string[]) {
  return bundledContentModules[slug.join('/')] ?? null
}
