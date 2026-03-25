import { JournalHeader } from '@/components/journal-header'
import { JournalFooter } from '@/components/journal-footer'
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
  const rotatedFeatured = featuredArticles.length
    ? [
        featuredArticles[dailyFeaturedIndex],
        ...featuredArticles.filter((article) => article.href !== featuredArticles[dailyFeaturedIndex]?.href),
      ]
    : []
  const frontPageStories = [
    ...rotatedFeatured,
    ...articles.filter((article) =>
      !rotatedFeatured.some((featured) => featured.href === article.href),
    ),
  ].slice(0, 3)
  const articleTree = getContentTree().find((node) => node.slug[0] === 'articles')?.children ?? []

  return (
    <div className="min-h-screen flex flex-col">
      <JournalHeader />

      <main className="flex-1">
        <section className="px-6 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_0.9fr] gap-12 lg:gap-16">
              <div className="lg:border-r lg:border-border lg:pr-12">
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-xs tracking-[0.24em] uppercase text-muted-foreground">How This Journal Works</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h1 className="max-w-4xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">
                  This is not a blog. It is a system for organizing thoughts, experiments, and failures.
                </h1>
                <div className="mt-6 max-w-3xl space-y-4 text-base leading-8 text-muted-foreground font-sans font-light md:text-lg">
                  <p>
                    Entries are structured, not posted. They live inside the same tree as the code,
                    media, and layout rules that present them.
                  </p>
                  <p>
                    The front page shows a rotating sample of the work. The archive keeps the full
                    tree visible. The editor page explains the logic behind the whole system.
                  </p>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="border border-border bg-secondary/20 p-6">
                  <div className="text-xs tracking-widest text-muted-foreground uppercase">
                    Current Logic
                  </div>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground font-sans font-light">
                    <p>Entries evolve instead of disappearing into a timeline.</p>
                    <p>The file tree and the publication structure stay aligned.</p>
                    <p>Featured pieces rotate, but the archive remains stable.</p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <Link
                    href="/editor"
                    className="inline-flex items-center gap-2 text-sm hover:text-muted-foreground transition-colors group"
                  >
                    <span>Read the Editor&apos;s Introduction</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="px-6 py-10 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center gap-3">
              <span className="text-xs tracking-[0.24em] uppercase text-muted-foreground">From Page One</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              {frontPageStories.map((article, index) => (
                <Link key={article.slugPath} href={article.href} className="group block border-t border-border pt-5">
                  <article>
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2
                      lang={article.lang}
                      className="mt-3 font-serif text-2xl leading-tight transition-colors group-hover:text-muted-foreground"
                    >
                      {article.title}
                    </h2>
                    {article.subtitle ? (
                      <p lang={article.lang} className="mt-3 text-sm leading-7 text-muted-foreground font-serif">{article.subtitle}</p>
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
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
              <div className="lg:pt-2">
                <h2 className="text-xs tracking-widest text-muted-foreground uppercase mb-4">
                  Table of Contents
                </h2>
                <p className="hidden lg:block text-sm text-muted-foreground leading-relaxed font-serif">
                  Browse the live article tree, then move into the archive for the full publication index.
                </p>
                <Link
                  href="/archive"
                  className="hidden lg:inline-flex items-center gap-2 mt-5 text-sm hover:text-muted-foreground transition-colors group"
                >
                  <span>View Full Archive</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div>
                <div className="border border-border bg-secondary/10 p-6 md:p-8">
                  <div className="mb-5 flex items-center justify-between gap-4 border-b border-border pb-4">
                    <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                      Live From contents/articles
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {articles.length} article{articles.length === 1 ? '' : 's'}
                    </p>
                  </div>
                  {articleTree.length ? (
                    <ArchiveTree nodes={articleTree} />
                  ) : (
                    <p className="text-sm text-muted-foreground">No article tree is available yet.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 lg:hidden">
              <p className="mb-4 text-sm text-muted-foreground leading-relaxed font-serif">
                Browse the live article tree here, or move into the archive for the full publication index.
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
                <p className="text-lg leading-relaxed font-serif">
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
