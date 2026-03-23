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
}

export function getBundledContentModule(slug: string[]) {
  return bundledContentModules[slug.join('/')] ?? null
}
