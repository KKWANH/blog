import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { JournalHeader } from '@/components/journal-header'
import { JournalFooter } from '@/components/journal-footer'
import { ArticleList } from '@/components/article-list'
import { ArchiveTree } from '@/components/archive-tree'
import {
  ArchiveGrid,
  ArchiveSidebar,
  ArchiveSidebarTitle,
} from '@/components/styled/archive.styles'
import { categoryLabels, type ArticleCategory, getArticles } from '@/lib/articles'
import { getContentTree } from '@/lib/content'

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedSearchParams = await searchParams
  const categoryParam =
    typeof resolvedSearchParams.category === 'string'
      ? (resolvedSearchParams.category as ArticleCategory)
      : null

  const articles = getArticles()
  const articleTree = getContentTree().find((node) => node.slug[0] === 'articles')?.children ?? []
  const filteredArticles = categoryParam
    ? articles.filter((article) => article.category === categoryParam)
    : articles

  const categories: (ArticleCategory | 'all')[] = ['all', 'essay', 'technical', 'opinion', 'research']

  return (
    <div className="min-h-screen flex flex-col">
      <JournalHeader />

      <main className="flex-1">
        <div className="px-6 pt-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Journal</span>
            </Link>
          </div>
        </div>

        <section className="px-6 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-xs tracking-widest text-muted-foreground uppercase mb-6">
              Archive
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight dark:font-sans font-serif">
              All Publications
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              A complete index of all article pages discovered from the local content tree.
            </p>
          </div>
        </section>

        <section className="px-6 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => {
                const isActive = category === 'all' ? !categoryParam : categoryParam === category

                return (
                  <Link
                    key={category}
                    href={category === 'all' ? '/archive' : `/archive?category=${category}`}
                    className={`
                      px-4 py-2 text-xs tracking-wider uppercase transition-colors
                      ${
                        isActive
                          ? 'bg-foreground text-background'
                          : 'bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground dark:bg-transparent dark:border dark:border-border dark:hover:border-foreground'
                      }
                    `}
                  >
                    {category === 'all' ? 'All' : categoryLabels[category]}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-6">
          <div className="rule-line dark:border-border" />
        </div>

        <ArchiveGrid>
          <ArchiveSidebar>
            <ArchiveSidebarTitle>Content Tree</ArchiveSidebarTitle>
            <ArchiveTree nodes={articleTree} />
          </ArchiveSidebar>

          <section>
            {filteredArticles.length > 0 ? (
              <>
                <div className="text-xs tracking-wider text-muted-foreground uppercase mb-8">
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'}
                </div>
                <ArticleList articles={filteredArticles} showExcerpt />
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No articles found in this category.</p>
              </div>
            )}
          </section>
        </ArchiveGrid>
      </main>

      <JournalFooter />
    </div>
  )
}
