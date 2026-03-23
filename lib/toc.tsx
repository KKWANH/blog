import React from 'react'

export type TocItem = {
  id: string
  label: string
  level?: number
}

export const TOC_PLACEHOLDER = '[[toc]]'

export function toTocId(value: string) {
  return value
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z0-9#]+;/gi, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function extractTocItemsFromMarkdown(markdown: string): TocItem[] {
  return markdown
    .split(/\r?\n/)
    .flatMap((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/)
      if (!match) {
        return []
      }

      return [
        {
          id: toTocId(match[2].trim()),
          label: match[2].trim(),
          level: match[1].length,
        },
      ]
    })
}

export function renderTocHtml(items: TocItem[], eyebrow = 'On This Page') {
  const links = items
    .map((item) => `<li><a href="#${item.id}" class="page-toc__link page-toc__link--inline">${item.label}</a></li>`)
    .join('')

  return `
    <nav class="page-toc page-toc--inline" aria-label="Table of contents">
      <p class="page-toc__eyebrow">${eyebrow}</p>
      <ul class="page-toc__list">${links}</ul>
    </nav>
  `
}

export function PageToc({
  items,
  eyebrow = 'On This Page',
  inline = false,
}: {
  items: TocItem[]
  eyebrow?: string
  inline?: boolean
}) {
  if (!items.length) {
    return null
  }

  return (
    <nav className={`page-toc${inline ? ' page-toc--inline' : ''}`} aria-label="Table of contents">
      <p className="page-toc__eyebrow">{eyebrow}</p>
      <ul className="page-toc__list">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={`page-toc__link${inline ? ' page-toc__link--inline' : ''}`}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
