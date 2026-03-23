import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { JournalFooter } from '@/components/journal-footer'
import { JournalHeader } from '@/components/journal-header'
import {
  formatContentDate,
  getAllContentPages,
  getContentPage,
  rewriteRelativeMedia,
  rewriteRelativeMediaInReactNode,
} from '@/lib/content'
import { categoryLabels } from '@/lib/articles'
import { absoluteUrl } from '@/lib/site'
import { extractTocItemsFromMarkdown, type TocItem } from '@/lib/toc'
import {
  ArticleColumn,
  ArticleMeta,
  ArticleRule,
  ArticleSubtitle,
  ArticleTitle,
  BackInner,
  BackRow,
  BreadcrumbCurrent,
  BreadcrumbsNav,
  ComponentBody,
  ContentGrid,
  FooterMeta,
  MarkdownBody,
  PageMain,
  PageShell,
  TocEyebrow,
  TocLink,
  TocList,
  TocNav,
  TocWrap,
} from '@/components/styled/content-page.styles'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllContentPages().map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getContentPage(slug)
  if (!page) {
    return {}
  }

  const baseMetadata = page.metadata ?? {
    title: page.title,
    description: page.description ?? page.excerpt,
  }

  return {
    ...baseMetadata,
    alternates: {
      canonical: page.href,
    },
    openGraph: {
      url: absoluteUrl(page.href),
      type: page.slug[0] === 'articles' ? 'article' : 'website',
      title: baseMetadata.title ?? page.title,
      description: baseMetadata.description ?? page.description ?? page.excerpt,
    },
  }
}

function PageToc({
  inline = false,
  items,
}: {
  inline?: boolean
  items: TocItem[]
}) {
  if (!items.length) {
    return null
  }

  return (
    <TocNav $inline={inline} aria-label="Table of contents">
      <TocEyebrow>On This Page</TocEyebrow>
      <TocList>
        {items.map((item) => (
          <li key={item.id}>
            <TocLink href={`#${item.id}`} $nested={item.level === 3}>
              {item.label}
            </TocLink>
          </li>
        ))}
      </TocList>
    </TocNav>
  )
}

function Breadcrumbs({ slug, title }: { slug: string[]; title: string }) {
  const parts = slug.map((segment, index) => ({
    href: `/${slug.slice(0, index + 1).join('/')}`,
    label: segment.replace(/[-_]/g, ' '),
  }))

  return (
    <BreadcrumbsNav aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {parts.map((part, index) => {
        const isLast = index === parts.length - 1
        return (
          <span key={part.href} className="contents">
            <span>/</span>
            {isLast ? (
              <BreadcrumbCurrent>{title}</BreadcrumbCurrent>
            ) : (
              <Link href={part.href}>{part.label}</Link>
            )}
          </span>
        )
      })}
    </BreadcrumbsNav>
  )
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const page = getContentPage(slug)

  if (!page) {
    notFound()
  }

  const markdownToc = page.kind === 'markdown' ? extractTocItemsFromMarkdown(page.content ?? '') : []
  const tocItems = page.kind === 'tsx' ? page.toc ?? [] : markdownToc
  const showToc = (page.showToc ?? tocItems.length > 0) && tocItems.length > 0
  const useInlineToc = showToc && page.tocVariant === 'inline'
  const useRailToc = showToc && !useInlineToc
  const Component = page.Component
  const html = page.kind === 'markdown' ? rewriteRelativeMedia(page.html ?? '', slug) : ''

  return (
    <PageShell>
      <JournalHeader />

      <PageMain>
        <BackRow>
          <BackInner>
            <Link
              href={slug[0] === 'articles' ? '/archive' : '/'}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>{slug[0] === 'articles' ? 'Back to Archive' : 'Back to Journal'}</span>
            </Link>
          </BackInner>
        </BackRow>

        <ContentGrid $withToc={useRailToc}>
          <ArticleColumn $withToc={useRailToc}>
            <Breadcrumbs slug={slug} title={page.title} />

            <ArticleMeta>
              {page.category ? <span>{categoryLabels[page.category as keyof typeof categoryLabels] ?? page.category}</span> : null}
              {page.date ? <time>{formatContentDate(page.date)}</time> : null}
              {page.readTime ? <span>{page.readTime}</span> : null}
              <span>{page.kind === 'markdown' ? 'Markdown' : 'TSX'}</span>
            </ArticleMeta>

            <ArticleTitle>{page.title}</ArticleTitle>
            {page.subtitle ? <ArticleSubtitle>{page.subtitle}</ArticleSubtitle> : null}
            <ArticleRule />

            {useInlineToc ? <PageToc inline items={tocItems} /> : null}
            {useRailToc ? (
              <TocWrap $mobileOnly>
                <PageToc inline items={tocItems} />
              </TocWrap>
            ) : null}

            {page.kind === 'markdown' ? (
              <MarkdownBody
                className={page.bodyClassName}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : Component ? (
              <ComponentBody className={page.bodyClassName}>
                {rewriteRelativeMediaInReactNode(<Component />, slug)}
              </ComponentBody>
            ) : null}

            <FooterMeta>
              {page.date ? <time>{formatContentDate(page.date)}</time> : null}
              <span>{page.kind === 'markdown' ? 'Markdown article' : 'TSX article'}</span>
              <span>{page.href}</span>
            </FooterMeta>
          </ArticleColumn>

          {useRailToc ? (
            <TocWrap>
              <PageToc items={tocItems} />
            </TocWrap>
          ) : null}
        </ContentGrid>
      </PageMain>

      <JournalFooter />
    </PageShell>
  )
}
