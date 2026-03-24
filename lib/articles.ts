import {
  formatContentDate,
  formatContentDateShort,
  getAllContentPages,
  getContentPage,
  type ContentPage,
} from '@/lib/content'

export type ArticleCategory = 'essay' | 'technical' | 'opinion' | 'research'

export interface Article extends ContentPage {
  slug: string
  date: string
  category: ArticleCategory
  readTime: string
}

function normalizeArticleCategory(category: string | undefined): ArticleCategory | null {
  if (!category) {
    return null
  }

  const normalized = category.trim().toLowerCase()
  const aliasMap: Record<string, ArticleCategory> = {
    essay: 'essay',
    essays: 'essay',
    technical: 'technical',
    technicals: 'technical',
    opinion: 'opinion',
    opinions: 'opinion',
    research: 'research',
  }

  return aliasMap[normalized] ?? null
}

function isArticlePage(page: ContentPage): page is Article {
  return (
    page.slug[0] === 'articles' &&
    typeof page.date === 'string' &&
    typeof page.readTime === 'string' &&
    normalizeArticleCategory(page.category) !== null
  )
}

export function getArticles(): Article[] {
  return getAllContentPages()
    .filter(isArticlePage)
    .map((page) => ({
      ...page,
      category: normalizeArticleCategory(page.category)!,
    }))
}

export const articles = getArticles()

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return getArticles().filter((article) => article.category === category)
}

export function getFeaturedArticles(): Article[] {
  return getArticles().filter((article) => article.featured)
}

export function getArticleBySlug(slug: string): Article | undefined {
  const page = getContentPage(slug.split('/'))
  return page && isArticlePage(page) ? page : undefined
}

export function formatDate(dateString: string): string {
  return formatContentDate(dateString)
}

export function formatDateShort(dateString: string): string {
  return formatContentDateShort(dateString)
}

export const categoryLabels: Record<ArticleCategory, string> = {
  essay: 'Essay',
  technical: 'Technical',
  opinion: 'Opinion',
  research: 'Research',
}
