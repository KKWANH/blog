import Link from 'next/link'
import { Article, formatDate, categoryLabels } from '@/lib/articles'
import { ArrowRight } from 'lucide-react'

interface FeaturedArticleProps {
  article: Article
  variant?: 'primary' | 'secondary'
}

export function FeaturedArticle({ article, variant = 'primary' }: FeaturedArticleProps) {
  if (variant === 'primary') {
    return (
      <Link
        href={article.href}
        className="group block"
      >
        <article>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs tracking-widest text-muted-foreground uppercase font-medium">
              Featured
            </span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs tracking-wider text-muted-foreground uppercase">
              {categoryLabels[article.category]}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight group-hover:text-muted-foreground transition-colors dark:font-sans font-serif text-balance">
            {article.title}
          </h2>

          {article.subtitle && (
            <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
              {article.subtitle}
            </p>
          )}

          <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-2xl">
            {article.excerpt}
          </p>

          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <time>{formatDate(article.date)}</time>
            <span>·</span>
            <span>{article.readTime}</span>
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link
      href={article.href}
      className="group block"
    >
      <article>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs tracking-wider text-muted-foreground uppercase">
            {categoryLabels[article.category]}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold leading-tight group-hover:text-muted-foreground transition-colors dark:font-sans font-serif">
          {article.title}
        </h3>

        {article.subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">
            {article.subtitle}
          </p>
        )}

        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <time>{formatDate(article.date)}</time>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </article>
    </Link>
  )
}
