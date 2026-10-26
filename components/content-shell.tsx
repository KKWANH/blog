import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { formatContentDate, type ContentPage } from '@/lib/content'

const labels: Record<string, string> = {
  editor: 'About',
  about: 'About',
  projects: 'Projects',
  notes: 'Notes',
  travel: 'Travel',
}

export function ContentHero({ page, decodedSlug }: { page: ContentPage; decodedSlug: string[] }) {
  return (
    <header className={page.bodyClassName === 'contact-page' ? 'contact-path' : 'content-hero'}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        {decodedSlug.map((segment, index) => (
          <span key={segment} className="contents">
            <span aria-hidden="true">/</span>
            {index === decodedSlug.length - 1
              ? <span aria-current="page">{page.bodyClassName === 'contact-page' ? 'Contact card' : page.title}</span>
              : <Link href={`/${decodedSlug.slice(0, index + 1).map(encodeURIComponent).join('/')}`}>{labels[segment] ?? segment}</Link>}
          </span>
        ))}
      </nav>
      {page.bodyClassName !== 'contact-page' ? <h1>{page.title}</h1> : null}
      {page.subtitle ? <p className="content-subtitle">{page.subtitle}</p> : null}
      {page.bodyClassName !== 'contact-page' ? <div className="content-meta">
        {page.date ? <time dateTime={page.date}>{page.slugPath === 'editor' ? 'Updated ' : ''}{formatContentDate(page.date)}</time> : null}
        {page.readTime ? <span>{page.readTime} read</span> : null}
        {page.category ? <span>{page.category}</span> : null}
        {page.lang === 'ko' ? <span>Korean original</span> : null}
      </div> : null}
      {page.category === 'Study archive' ? (
        <p className="archive-notice">
          This guide was written and organised with AI assistance in June 2026.
          It is study material based on public information
          {page.slugPath === 'notes/kla' ? ', separate from my work at KLA' : ''}.
        </p>
      ) : null}
    </header>
  )
}

export function ContentBackLink() {
  return <Link href="/" className="text-link"><ArrowLeft aria-hidden="true" /> Home</Link>
}

export function ContentFooterMeta({ page }: { page: ContentPage }) {
  const isNote = page.slug[0] === 'notes'
  const isProject = page.slug[0] === 'projects'
  return (
    <footer className="content-end" lang="en">
      <Link href={isNote ? '/notes' : isProject ? '/projects' : '/'}>{isNote ? 'All notes' : isProject ? 'All projects' : 'Back to home'}</Link>
      <a href="#main-content">Back to top ↑</a>
    </footer>
  )
}
