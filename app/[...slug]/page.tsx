import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import {
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
      images: [{ url: absoluteUrl('/og-image.png'), width: 1200, height: 630, alt: 'Kwanho Kim' }],
    },
  }
}

/** Content keeps one shared reading layout across Markdown and interactive pages. */
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

  // The travel atlas is a full-bleed globe under the header, not a reading page.
  if (page.bodyClassName === 'atlas-page' && Component) {
    return (
      <div className="atlas-shell">
        <SiteHeader />
        <main id="main-content" className="atlas-page">
          <Component />
        </main>
      </div>
    )
  }

  return (
    <div>
      <SiteHeader />

      <main id="main-content" className="site-width">
        <ContentHero page={page} decodedSlug={decodedSlug} />

        <article
          lang={page.lang}
          className={`content-body ${page.bodyClassName ?? ''}`}
        >
          {showInlineToc ? <InlineToc items={tocItems} lang={page.lang} /> : null}

          {page.kind === 'markdown' ? (
            <MarkdownBody html={html} />
          ) : Component ? (
            <div>{rewriteRelativeMediaInReactNode(<Component />, decodedSlug)}</div>
          ) : null}

          {page.bodyClassName !== 'profile-page' ? <ContentFooterMeta page={page} /> : null}
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}

function InlineToc({ items, lang }: { items: TocItem[]; lang?: string }) {
  return (
    <details className="reading-toc" lang="en">
      <summary>On this page</summary>
      <nav aria-label="Table of contents">
      <ul lang={lang}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={item.level === 3 ? 'toc-nested' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      </nav>
    </details>
  )
}
