import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readTree, flattenPages, readPage } from '@/lib/content';
import { markdownToHtml, rewriteRelativeMedia } from '@/lib/markdown';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamicParams = true;

export async function generateStaticParams() {
  const tree = readTree();
  const pages = flattenPages(tree);
  return pages.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = readPage(slug);
  if (!data) return {};
  return { title: (data.frontmatter.title as string) || data.title };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const data = readPage(slug);
  if (!data) return notFound();
  const rawHtml = markdownToHtml(data.content);
  const html = rewriteRelativeMedia(rawHtml, slug);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumbs slug={slug} />
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <h1 className="!mb-6 text-3xl font-semibold tracking-tight">{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}
