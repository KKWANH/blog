import Link from 'next/link'
import { Article, formatDateShort, categoryLabels } from '@/lib/articles'
import { ArrowRight } from 'lucide-react'

interface ArticleListProps {
  articles: Article[]
  showExcerpt?: boolean
}

export function ArticleList({ articles, showExcerpt = false }: ArticleListProps) {
  return (
    <div className="divide-y divide-border">
      {articles.map((article) => (
        <Link
          key={article.slugPath}
          href={article.href}
          className="group block py-6 first:pt-0 last:pb-0"
        >
          <article className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
            {/* Date column */}
            <div className="flex-shrink-0 md:w-28">
              <time className="text-xs tracking-wider text-muted-foreground uppercase">
                {formatDateShort(article.date)}
              </time>
            </div>

            {/* Content column */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs tracking-wider text-muted-foreground uppercase">
                      {categoryLabels[article.category]}
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold leading-tight group-hover:text-muted-foreground transition-colors dark:font-sans font-serif">
                    {article.title}
                  </h3>

                  {article.subtitle && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {article.subtitle}
                    </p>
                  )}

                  {showExcerpt && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  )}
                </div>

                <ArrowRight className="flex-shrink-0 h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}
