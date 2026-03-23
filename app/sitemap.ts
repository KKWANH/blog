import type { MetadataRoute } from 'next'
import { getAllContentPages } from '@/lib/content'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/archive'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  const contentRoutes: MetadataRoute.Sitemap = getAllContentPages().map((page) => ({
    url: absoluteUrl(page.href),
    lastModified: page.date ? new Date(page.date) : new Date(),
    changeFrequency: page.slug[0] === 'articles' ? 'monthly' : 'yearly',
    priority: page.slug[0] === 'articles' ? 0.8 : 0.6,
  }))

  return [...staticRoutes, ...contentRoutes]
}
