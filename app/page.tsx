import { JournalHeader } from '@/components/journal-header'
import { JournalFooter } from '@/components/journal-footer'
import { FeaturedArticle } from '@/components/featured-article'
import { ArchiveTree } from '@/components/archive-tree'
import { getArticles, getFeaturedArticles } from '@/lib/articles'
import { getContentTree } from '@/lib/content'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const revalidate = 86400

function getDailyFeaturedArticleIndex(length: number) {
  if (length <= 1) {
    return 0
  }

  const now = new Date()
  const utcDayKey = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  const daysSinceEpoch = Math.floor(utcDayKey / 86_400_000)
  return daysSinceEpoch % length
}

export default function HomePage() {
  const articles = getArticles()
  const featuredArticles = getFeaturedArticles()
  const dailyFeaturedIndex = getDailyFeaturedArticleIndex(featuredArticles.length)
  const primaryFeatured = featuredArticles[dailyFeaturedIndex] ?? articles[0]
  const remainingFeatured = featuredArticles.filter((article) => article.href !== primaryFeatured?.href)
  const nonPrimaryArticles = articles.filter((article) => article.href !== primaryFeatured?.href)
  const frontPageStories = [
    ...remainingFeatured,
    ...nonPrimaryArticles.filter((article) =>
      !remainingFeatured.some((featured) => featured.href === article.href),
    ),
  ].slice(0, 3)
  const articleTree = getContentTree().find((node) => node.slug[0] === 'articles')?.children ?? []

  return (
    <div className="min-h-screen flex flex-col">
      <JournalHeader />

      <main className="flex-1">
        {/* Featured Section */}
        <section className="px-6 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              <div className="lg:col-span-2 lg:border-r lg:border-border lg:pr-12">
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-xs tracking-[0.24em] uppercase text-muted-foreground">Front Page</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                {primaryFeatured && (
                  <FeaturedArticle article={primaryFeatured} variant="primary" />
                )}
                {featuredArticles.length > 1 ? (
                  <p className="mt-5 text-xs tracking-[0.16em] uppercase text-muted-foreground">
                    Lead story rotates across featured articles every 24 hours.
                  </p>
                ) : null}
              </div>

              <aside className="lg:col-span-1 space-y-8">
                <div className="border border-border bg-secondary/35 p-6 dark:bg-secondary/20">
                  <div className="text-xs tracking-widest text-muted-foreground uppercase">
                    Start Here
                  </div>
                  <h2 className="mt-3 font-serif text-2xl leading-tight dark:font-sans">
                    This journal is not a blog. It is a working system.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    The editor page explains the logic behind the site, the kind of engineering it
                    is trying to understand, and why the writing is organized this way.
                  </p>
                  <Link
                    href="/editor"
                    className="inline-flex items-center gap-2 mt-5 text-sm hover:text-muted-foreground transition-colors group"
                  >
                    <span>Read the Editor&apos;s Introduction</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="border-t border-border pt-8 dark:border-transparent">
                  <div className="text-xs tracking-widest text-muted-foreground uppercase mb-3">
                    Current Issue
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A journal about systems that look correct in theory but fail under real
                    conditions.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6">
          <div className="rule-line-double dark:border-border" />
        </div>

        <section className="px-6 py-10 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center gap-3">
              <span className="text-xs tracking-[0.24em] uppercase text-muted-foreground">More From Page One</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              {frontPageStories.map((article, index) => (
                <Link key={article.slugPath} href={article.href} className="group block border-t border-border pt-5">
                  <article>
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="mt-3 font-serif text-2xl leading-tight transition-colors group-hover:text-muted-foreground dark:font-sans">
                      {article.title}
                    </h2>
                    {article.subtitle ? (
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{article.subtitle}</p>
                    ) : null}
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground uppercase">
                      <span>{article.category}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-1">
                <h2 className="text-xs tracking-widest text-muted-foreground uppercase mb-4">
                  Table of Contents
                </h2>
                <div className="hidden lg:block space-y-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This is the actual article tree, not a second front page. Folder structure and
                    publication structure stay aligned, so the archive reads the same way the
                    repository is organized.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>{articles.length} published article{articles.length === 1 ? '' : 's'} currently indexed.</p>
                    <p>{featuredArticles.length} featured article{featuredArticles.length === 1 ? '' : 's'} eligible for the lead slot.</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    If you want the same structure with category filters and the full publication
                    list, move into the archive.
                  </p>
                </div>
                <Link
                  href="/archive"
                  className="hidden lg:inline-flex items-center gap-2 mt-6 text-sm hover:text-muted-foreground transition-colors group"
                >
                  <span>View Full Archive</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="lg:col-span-3">
                <div className="border border-border bg-secondary/20 p-6 md:p-8">
                  {articleTree.length ? (
                    <ArchiveTree nodes={articleTree} />
                  ) : (
                    <p className="text-sm text-muted-foreground">No article tree is available yet.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 lg:hidden">
              <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                This section shows the actual article tree so the homepage reflects the same
                structure that exists in <code>contents/</code>.
              </p>
              <Link
                href="/archive"
                className="inline-flex items-center gap-2 text-sm hover:text-muted-foreground transition-colors group"
              >
                <span>View Full Archive</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Editor's Note Section */}
        <section className="px-6 py-12 md:py-16 dark:bg-transparent bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="lg:col-span-1">
                <h2 className="text-xs tracking-widest text-muted-foreground uppercase">
                  From the Editor
                </h2>
              </div>
              <div className="lg:col-span-3 max-w-2xl">
                <p className="text-lg leading-relaxed dark:font-sans font-serif">
                  The KKIM Journal now reads directly from the local content tree, making the
                  site itself part of the writing workflow rather than a separate CMS.
                </p>
                <Link
                  href="/editor"
                  className="inline-flex items-center gap-2 mt-6 text-sm hover:text-muted-foreground transition-colors group"
                >
                  <span>Read the Editor&apos;s Introduction</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <JournalFooter />
    </div>
  )
}
