import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Aurora } from '@/components/aurora'
import {
  ContentBackLink,
  ContentFooterMeta,
  ContentHero,
} from '@/components/content-shell'
import { MarkdownBody } from '@/components/markdown-body'
import {
  getAllContentPages,
  getContentPage,
  rewriteRelativeMedia,
  rewriteRelativeMediaInReactNode,
} from '@/lib/content'
import { absoluteUrl } from '@/lib/site'
import { extractTocItemsFromMarkdown, type TocItem } from '@/lib/toc'

export const dynamicParams = false

function decodeSlug(slug: string[]) {
  return slug.map((segment) => {
    try {
      return decodeURIComponent(segment)
    } catch {
      return segment
    }
  })
}

export async function generateStaticParams() {
  return getAllContentPages().map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getContentPage(decodeSlug(slug))
  if (!page) return {}

  const baseMetadata = page.metadata ?? {
    title: page.title,
    description: page.description ?? page.excerpt,
  }

  return {
    ...baseMetadata,
    alternates: { canonical: page.href },
    openGraph: {
      url: absoluteUrl(page.href),
      type: 'article',
      title: baseMetadata.title ?? page.title,
      description: baseMetadata.description ?? page.description ?? page.excerpt,
    },
  }
}

/**
 * Dynamic content route — renders any folder under `contents/` that
 * carries an `index.md` or `index.tsx`. Uses the same shell as the
 * homepage (aurora + site header + footer) so /editor and /travel
 * read as kwanho.dev pages rather than journal articles.
 */
export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const decodedSlug = decodeSlug(slug)
  const page = getContentPage(decodedSlug)

  if (!page) {
    notFound()
  }

  const markdownToc =
    page.kind === 'markdown' ? extractTocItemsFromMarkdown(page.content ?? '') : []
  const tocItems = page.kind === 'tsx' ? page.toc ?? [] : markdownToc
  const showInlineToc = (page.showToc ?? false) && tocItems.length > 0
  const Component = page.Component
  const html =
    page.kind === 'markdown' ? rewriteRelativeMedia(page.html ?? '', decodedSlug) : ''

  return (
    <div className="relative min-h-screen flex flex-col">
      <Aurora />
      <SiteHeader />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-8 md:pt-10">
          <ContentBackLink />
        </div>

        <div className="max-w-6xl mx-auto px-5 md:px-8 mt-6 md:mt-8">
          <ContentHero page={page} decodedSlug={decodedSlug} />
        </div>

        <article
          lang={page.lang}
          className={`max-w-6xl mx-auto px-5 md:px-8 mt-12 md:mt-16 ${page.bodyClassName ?? ''}`}
        >
          {showInlineToc ? <InlineToc items={tocItems} /> : null}

          {page.kind === 'markdown' ? (
            <MarkdownBody html={html} />
          ) : Component ? (
            <div>{rewriteRelativeMediaInReactNode(<Component />, decodedSlug)}</div>
          ) : null}

          <ContentFooterMeta page={page} />
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}

function InlineToc({ items }: { items: TocItem[] }) {
  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 max-w-2xl rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-5"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        On this page
      </p>
      <ul className="mt-3 grid gap-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm transition-colors hover:text-foreground ${
                item.level === 3 ? 'pl-3 text-muted-foreground' : 'text-foreground/80'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
