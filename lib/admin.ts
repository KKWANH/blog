import { getArticles } from '@/lib/articles'
import { getAllContentPages, getContentTree, type ContentTreeNode } from '@/lib/content'
import { absoluteUrl, siteUrl } from '@/lib/site'

function getTreeDepth(nodes: ContentTreeNode[], depth = 0): number {
  if (!nodes.length) {
    return depth
  }

  return Math.max(...nodes.map((node) => getTreeDepth(node.children ?? [], depth + 1)))
}

export function getAdminDashboardData() {
  const pages = getAllContentPages()
  const articles = getArticles()
  const tree = getContentTree()
  const latestArticle = articles[0]
  const articleCategories = new Set(articles.map((article) => article.category))
  const siteUrlConfigured = !siteUrl.includes('localhost')

  return {
    counts: {
      pages: pages.length,
      articles: articles.length,
      featured: articles.filter((article) => article.featured).length,
      treeDepth: getTreeDepth(tree),
      categories: articleCategories.size,
    },
    latestArticle,
    recentArticles: articles.slice(0, 6),
    seo: {
      siteUrl,
      siteUrlConfigured,
      sitemap: absoluteUrl('/sitemap.xml'),
      robots: absoluteUrl('/robots.txt'),
      googleVerificationConfigured: Boolean(process.env.GOOGLE_SITE_VERIFICATION),
    },
    analytics: {
      analyticsInstalled: true,
      speedInsightsInstalled: true,
    },
  }
}
