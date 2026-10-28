import type { MetadataRoute } from 'next'
import { getAllContentPages } from '@/lib/content'
import { absoluteUrl } from '@/lib/site'
import { photographyPublished } from '@/lib/photographs'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  const contentRoutes: MetadataRoute.Sitemap = getAllContentPages().filter((page) => page.href !== '/projects').map((page) => ({
    url: absoluteUrl(page.href),
    lastModified: page.date ? new Date(page.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...contentRoutes, ...(photographyPublished ? [{ url: absoluteUrl('/photography'), changeFrequency: 'monthly' as const, priority: .6 }] : [])]
}
