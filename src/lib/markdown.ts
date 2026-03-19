// Very small Markdown to HTML converter (headings, paragraphs, lists, code, links, images)
// Not a full spec implementation; good enough for writing posts without extra deps.
export function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function tokenizeHtmlBlocks(src: string) {
  const htmlBlocks: string[] = [];
  const lines = src.split(/\r?\n/);
  const out: string[] = [];
  let i = 0;

  const isHtmlStart = (line: string) =>
    /^<(div|section|article|aside|figure|figcaption|picture|img|video|audio|iframe|details|summary|table|thead|tbody|tr|td|th|blockquote|hr|br)\b/i.test(
      line.trim()
    );

  while (i < lines.length) {
    const line = lines[i];
    if (!isHtmlStart(line)) {
      out.push(line);
      i += 1;
      continue;
    }

    const block: string[] = [line];
    i += 1;

    while (i < lines.length) {
      const next = lines[i];
      if (next.trim() === "") break;
      block.push(next);
      i += 1;
    }

    const idx = htmlBlocks.push(block.join("\n")) - 1;
    out.push(`@@HTML_BLOCK_${idx}@@`);
  }

  return { out: out.join("\n"), htmlBlocks };
}

function tokenizeCodeBlocks(src: string) {
  const codeBlocks: string[] = [];
  const placeholder = (i: number) => `@@CODE_BLOCK_${i}@@`;
  let out = src;
  const re = /```([a-zA-Z0-9+-]*)\n([\s\S]*?)\n```/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const idx = codeBlocks.push(m[2]) - 1;
    out = out.replace(m[0], placeholder(idx));
  }
  return { out, codeBlocks, placeholder };
}

function renderInline(md: string) {
  // images
  md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_s, alt, url) => `<img alt="${escapeHtml(alt)}" src="${escapeHtml(url)}" />`);
  // links
  md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_s, text, url) => `<a href="${escapeHtml(url)}">${escapeHtml(text)}</a>`);
  // bold
  md = md.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // italics
  md = md.replace(/\*(?!\s)([^*]+)\*/g, '<em>$1</em>');
  // inline code
  md = md.replace(/`([^`]+)`/g, (_s, code) => `<code>${escapeHtml(code)}</code>`);
  return md;
}

export function markdownToHtml(md: string) {
  const { out: withHtmlPlaceholders, htmlBlocks } = tokenizeHtmlBlocks(md);
  const { out, codeBlocks } = tokenizeCodeBlocks(withHtmlPlaceholders);
  const lines = out.split(/\r?\n/);
  const html: string[] = [];
  let i = 0;
  let inList: null | 'ul' | 'ol' = null;
  let inBlockquote = false;

  function closeList() {
    if (inList) {
      html.push(`</${inList}>`);
      inList = null;
    }
  }
  function closeBlockquote() {
    if (inBlockquote) {
      html.push('</blockquote>');
      inBlockquote = false;
    }
  }

  while (i < lines.length) {
    let line = lines[i];
    // code placeholders
    const codePh = line.match(/^@@CODE_BLOCK_(\d+)@@$/);
    if (codePh) {
      closeList();
      closeBlockquote();
      const idx = parseInt(codePh[1], 10);
      html.push(`<pre><code>${escapeHtml(codeBlocks[idx])}</code></pre>`);
      i++;
      continue;
    }

    const htmlPh = line.match(/^@@HTML_BLOCK_(\d+)@@$/);
    if (htmlPh) {
      closeList();
      closeBlockquote();
      const idx = parseInt(htmlPh[1], 10);
      html.push(htmlBlocks[idx]);
      i++;
      continue;
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      if (!inBlockquote) {
        closeList();
        html.push('<blockquote>');
        inBlockquote = true;
      }
      line = line.replace(/^>\s?/, '');
      html.push(`<p>${renderInline(line)}</p>`);
      i++;
      continue;
    } else if (inBlockquote && line.trim() === '') {
      closeBlockquote();
      i++;
      continue;
    }

    // headings
    const h = line.match(/^(#{1,6})\s+(.+)$/);
    if (h) {
      closeList();
      closeBlockquote();
      const level = h[1].length;
      html.push(`<h${level}>${renderInline(h[2].trim())}</h${level}>`);
      i++;
      continue;
    }

    // lists
    const ul = line.match(/^[-*]\s+(.+)$/);
    const ol = line.match(/^\d+\.\s+(.+)$/);
    if (ul || ol) {
      const listType: 'ul' | 'ol' = ul ? 'ul' : 'ol';
      if (inList !== listType) {
        closeList();
        closeBlockquote();
        inList = listType;
        html.push(`<${listType}>`);
      }
      html.push(`<li>${renderInline((ul ? ul[1] : (ol as RegExpMatchArray)[1]).trim())}</li>`);
      i++;
      // handle subsequent list items until pattern breaks
      while (i < lines.length && lines[i].match(listType === 'ul' ? /^[-*]\s+/ : /^\d+\.\s+/)) {
        const next = lines[i].replace(listType === 'ul' ? /^[-*]\s+/ : /^\d+\.\s+/, '');
        html.push(`<li>${renderInline(next.trim())}</li>`);
        i++;
      }
      continue;
    }

    // paragraph or blank
    if (line.trim() === '') {
      closeList();
      closeBlockquote();
      i++;
      continue;
    }
    closeList();
    closeBlockquote();
    html.push(`<p>${renderInline(line)}</p>`);
    i++;
  }
  closeList();
  closeBlockquote();

  const result = html.join('\n');
  return result;
}

export function rewriteRelativeMedia(html: string, slug: string[]) {
  const base = '/' + slug.map(encodeURIComponent).join('/');

  return html.replace(
    /\b(src|href|poster)=["'](\.\.?\/[^"']+)["']/g,
    (_match, attr, value) => {
      const clean = value.replace(/^\.\/?/, '');
      const full = `/media${base}/${clean}`;
      return `${attr}="${full}"`;
    }
  );
}
