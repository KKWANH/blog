'use client';
import Link from 'next/link';

export default function Breadcrumbs({ slug }: { slug: string[] }) {
  const parts = ['/', ...slug.map((_, i) => '/' + slug.slice(0, i + 1).join('/'))];
  const labels = ['Home', ...slug];
  return (
    <nav className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
      {parts.map((href, i) => (
        <span key={href}>
          <Link href={i === 0 ? '/' : href} className="hover:underline">{labels[i]}</Link>
          {i < parts.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}
