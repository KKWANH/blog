import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteFooter from '@/components/SiteFooter';
import { readTree, flattenPages, readPage } from '@/lib/content';
import { getAllComponentPageSlugs, getComponentPage } from '@/lib/content-pages';
import { markdownToHtml, rewriteRelativeMedia } from '@/lib/markdown';
import Breadcrumbs from '@/components/Breadcrumbs';
import { extractTocItemsFromMarkdown, PageToc, renderTocHtml, TOC_PLACEHOLDER } from '@/lib/toc';

export const dynamicParams = true;

export async function generateStaticParams() {
  const tree = readTree();
  const pages = flattenPages(tree);
  const mdPages = pages.map(p => ({ slug: p.slug }));
  const componentPages = getAllComponentPageSlugs().map((slug) => ({ slug }));
  return [...mdPages, ...componentPages];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const componentPage = getComponentPage(slug);
  if (componentPage) {
    return componentPage.metadata ?? { title: componentPage.title };
  }
  const data = readPage(slug);
  if (!data) return {};
  return { title: (data.frontmatter.title as string) || data.title };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const componentPage = getComponentPage(slug);
  if (componentPage) {
    const Component = componentPage.Component;
    const toc = componentPage.showToc ? componentPage.toc ?? [] : [];
    const usesRailToc = toc.length > 0 && componentPage.tocVariant !== 'inline';
    return (
      <main className="page-shell">
        <Breadcrumbs slug={slug} />
        <div className={`component-page-shell ${componentPage.className ?? ''}${usesRailToc ? ' component-page-shell--with-toc' : ''}`}>
          <div className="component-page-shell__main">
            {toc.length && componentPage.tocVariant === 'inline' ? (
              <PageToc items={toc} inline />
            ) : null}
            <Component />
          </div>
          {usesRailToc ? (
            <PageToc items={toc} />
          ) : null}
        </div>
        <SiteFooter />
      </main>
    );
  }
  const data = readPage(slug);
  if (!data) return notFound();
  const tocItems = extractTocItemsFromMarkdown(data.content);
  const shouldShowToc = Boolean(data.frontmatter.showToc) || Boolean(data.frontmatter.toc);
  const tocVariant = data.frontmatter.tocVariant === 'inline' ? 'inline' : 'rail';
  const hasInlineTocPlaceholder = data.content.includes(TOC_PLACEHOLDER);
  const normalizedMarkdown = data.content.replace(/^\[\[toc\]\]\s*$/gm, '<div data-page-toc></div>');
  const rawHtml = markdownToHtml(normalizedMarkdown);
  const htmlWithToc = rawHtml.replace(
    /<div data-page-toc><\/div>/g,
    renderTocHtml(tocItems)
  );
  const html = rewriteRelativeMedia(htmlWithToc, slug);
  const usesRailToc = shouldShowToc && tocItems.length > 0 && tocVariant === 'rail' && !hasInlineTocPlaceholder;
  const usesInlineToc = shouldShowToc && tocItems.length > 0 && tocVariant === 'inline' && !hasInlineTocPlaceholder;

  return (
    <main className="page-shell page-shell--article">
      <Breadcrumbs slug={slug} />
      <div className={`component-page-shell${usesRailToc ? ' component-page-shell--with-toc' : ''}`}>
        <article className="prose article-body paper-sheet component-page-shell__main">
          <h1 className="article-title">{data.title}</h1>
          {usesInlineToc ? <PageToc items={tocItems} inline /> : null}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
        {usesRailToc ? (
          <PageToc items={tocItems} />
        ) : null}
      </div>
      <SiteFooter />
    </main>
  );
}
