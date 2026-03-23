import { JournalHeader } from '@/components/journal-header'
import { JournalFooter } from '@/components/journal-footer'
import { FeaturedArticle } from '@/components/featured-article'
import { ArticleList } from '@/components/article-list'
import { getArticles, getFeaturedArticles } from '@/lib/articles'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  const articles = getArticles()
  const featuredArticles = getFeaturedArticles()
  const primaryFeatured = featuredArticles[0]
  const secondaryFeatured = featuredArticles[1]
  const recentArticles = articles.filter((article) => !article.featured).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col">
      <JournalHeader />

      <main className="flex-1">
        {/* Featured Section */}
        <section className="px-6 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Primary featured with newspaper-style layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Lead story */}
              <div className="lg:col-span-2 lg:border-r lg:border-border lg:pr-12">
                {primaryFeatured && (
                  <FeaturedArticle article={primaryFeatured} variant="primary" />
                )}
              </div>

              {/* Secondary featured */}
              <div className="lg:col-span-1">
                {secondaryFeatured && (
                  <FeaturedArticle article={secondaryFeatured} variant="secondary" />
                )}

                {/* Issue information - newspaper style */}
                <div className="mt-10 pt-8 border-t border-border dark:border-transparent">
                  <div className="text-xs tracking-widest text-muted-foreground uppercase mb-3">
                    Current Issue
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Filesystem-driven publishing with Markdown, TSX, and nested content trees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider - newspaper style rule */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="rule-line-double dark:border-border" />
        </div>

        {/* Table of Contents */}
        <section className="px-6 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Section header */}
              <div className="lg:col-span-1">
                <h2 className="text-xs tracking-widest text-muted-foreground uppercase mb-4">
                  Table of Contents
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed hidden lg:block">
                  Recent publications discovered directly from the <code>contents/</code> tree.
                </p>
                <Link
                  href="/archive"
                  className="hidden lg:inline-flex items-center gap-2 mt-6 text-sm hover:text-muted-foreground transition-colors group"
                >
                  <span>View Full Archive</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Article listing */}
              <div className="lg:col-span-3">
                <ArticleList articles={recentArticles} showExcerpt />
              </div>
            </div>

            {/* Mobile archive link */}
            <div className="mt-10 lg:hidden">
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
                  <span>Open Editor&apos;s Introduction</span>
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
