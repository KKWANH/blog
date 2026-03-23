import { toTocId } from '@/lib/toc'

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function tokenizeHtmlBlocks(source: string) {
  const htmlBlocks: string[] = []
  const lines = source.split(/\r?\n/)
  const output: string[] = []
  let index = 0

  const isHtmlStart = (line: string) =>
    /^<(div|section|article|aside|figure|figcaption|picture|img|video|audio|iframe|details|summary|table|thead|tbody|tr|td|th|blockquote|hr|br|ul|ol|li|pre|code)\b/i.test(
      line.trim(),
    )

  while (index < lines.length) {
    const line = lines[index]
    if (!isHtmlStart(line)) {
      output.push(line)
      index += 1
      continue
    }

    const block: string[] = [line]
    index += 1

    while (index < lines.length) {
      const next = lines[index]
      if (next.trim() === '') {
        break
      }
      block.push(next)
      index += 1
    }

    const blockIndex = htmlBlocks.push(block.join('\n')) - 1
    output.push(`@@HTML_BLOCK_${blockIndex}@@`)
  }

  return { htmlBlocks, output: output.join('\n') }
}

function tokenizeCodeBlocks(source: string) {
  const codeBlocks: string[] = []
  let output = source
  const matcher = /```([a-zA-Z0-9+-]*)\n([\s\S]*?)\n```/g
  let match: RegExpExecArray | null

  while ((match = matcher.exec(source))) {
    const blockIndex = codeBlocks.push(match[2]) - 1
    output = output.replace(match[0], `@@CODE_BLOCK_${blockIndex}@@`)
  }

  return { codeBlocks, output }
}

function renderInline(markdown: string) {
  let value = markdown
  value = value.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, url) => {
    return `<img alt="${escapeHtml(alt)}" src="${escapeHtml(url)}" />`
  })
  value = value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => {
    return `<a href="${escapeHtml(url)}">${escapeHtml(text)}</a>`
  })
  value = value.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  value = value.replace(/\*(?!\s)([^*]+)\*/g, '<em>$1</em>')
  value = value.replace(/`([^`]+)`/g, (_match, code) => `<code>${escapeHtml(code)}</code>`)
  return value
}

export function markdownToHtml(markdown: string) {
  const { htmlBlocks, output: withHtmlPlaceholders } = tokenizeHtmlBlocks(markdown)
  const { codeBlocks, output } = tokenizeCodeBlocks(withHtmlPlaceholders)
  const lines = output.split(/\r?\n/)
  const html: string[] = []
  let inList: null | 'ul' | 'ol' = null
  let inBlockquote = false
  let index = 0

  const closeList = () => {
    if (inList) {
      html.push(`</${inList}>`)
      inList = null
    }
  }

  const closeBlockquote = () => {
    if (inBlockquote) {
      html.push('</blockquote>')
      inBlockquote = false
    }
  }

  while (index < lines.length) {
    let line = lines[index]

    const codePlaceholder = line.match(/^@@CODE_BLOCK_(\d+)@@$/)
    if (codePlaceholder) {
      closeList()
      closeBlockquote()
      html.push(`<pre><code>${escapeHtml(codeBlocks[Number.parseInt(codePlaceholder[1], 10)])}</code></pre>`)
      index += 1
      continue
    }

    const htmlPlaceholder = line.match(/^@@HTML_BLOCK_(\d+)@@$/)
    if (htmlPlaceholder) {
      closeList()
      closeBlockquote()
      html.push(htmlBlocks[Number.parseInt(htmlPlaceholder[1], 10)])
      index += 1
      continue
    }

    if (/^>\s?/.test(line)) {
      if (!inBlockquote) {
        closeList()
        html.push('<blockquote>')
        inBlockquote = true
      }
      line = line.replace(/^>\s?/, '')
      html.push(`<p>${renderInline(line)}</p>`)
      index += 1
      continue
    }

    if (inBlockquote && line.trim() === '') {
      closeBlockquote()
      index += 1
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    if (heading) {
      closeList()
      closeBlockquote()
      const level = heading[1].length
      const label = heading[2].trim()
      html.push(`<h${level} id="${toTocId(label)}">${renderInline(label)}</h${level}>`)
      index += 1
      continue
    }

    const unorderedItem = line.match(/^[-*]\s+(.+)$/)
    const orderedItem = line.match(/^\d+\.\s+(.+)$/)
    if (unorderedItem || orderedItem) {
      const listType = unorderedItem ? 'ul' : 'ol'
      if (inList !== listType) {
        closeList()
        closeBlockquote()
        inList = listType
        html.push(`<${listType}>`)
      }

      html.push(`<li>${renderInline((unorderedItem ? unorderedItem[1] : orderedItem?.[1] ?? '').trim())}</li>`)
      index += 1

      while (index < lines.length && lines[index].match(listType === 'ul' ? /^[-*]\s+/ : /^\d+\.\s+/)) {
        const nextLine = lines[index].replace(listType === 'ul' ? /^[-*]\s+/ : /^\d+\.\s+/, '')
        html.push(`<li>${renderInline(nextLine.trim())}</li>`)
        index += 1
      }

      continue
    }

    if (line.trim() === '') {
      closeList()
      closeBlockquote()
      index += 1
      continue
    }

    closeList()
    closeBlockquote()
    html.push(`<p>${renderInline(line)}</p>`)
    index += 1
  }

  closeList()
  closeBlockquote()

  return html.join('\n')
}
