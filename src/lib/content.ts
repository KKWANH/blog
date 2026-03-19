import fs from 'node:fs';
import path from 'node:path';

export const CONTENT_ROOT = path.join(process.cwd(), 'content');

export type ContentNode = {
  name: string;            // folder or file name (no extension)
  slug: string[];          // route segments
  type: 'folder' | 'page';
  children?: ContentNode[];
};

export function isIgnoredDir(name: string) {
  return name.startsWith('_'); // e.g., _images, _assets
}

export function ensureContentRoot() {
  if (!fs.existsSync(CONTENT_ROOT)) {
    fs.mkdirSync(CONTENT_ROOT, { recursive: true });
  }
}

export function readTree(dir = CONTENT_ROOT, baseSlug: string[] = []): ContentNode[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const nodes: ContentNode[] = [];

  for (const ent of entries) {
    if (ent.isDirectory()) {
      if (isIgnoredDir(ent.name)) continue;
      const subdir = path.join(dir, ent.name);
      const slug = [...baseSlug, ent.name];
      const indexMd = path.join(subdir, 'index.md');
      const children = readTree(subdir, slug);
      const hasPage = fs.existsSync(indexMd);
      if (hasPage) nodes.push({ name: ent.name, slug, type: 'page', children });
      else nodes.push({ name: ent.name, slug, type: 'folder', children });
    } else if (ent.isFile()) {
      if (ent.name.toLowerCase().endsWith('.md')) {
        // Allow loose md files at root; use file name as segment
        const name = ent.name.replace(/\.md$/i, '');
        const slug = [...baseSlug, name];
        // ignore index.md handled by its folder
        if (name === 'index') continue;
        nodes.push({ name, slug, type: 'page' });
      }
    }
  }

  // Sort folders first, then pages, alphabetically
  nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    return a.name.localeCompare(b.name, 'en');
  });
  return nodes;
}

export function flattenPages(tree: ContentNode[]): ContentNode[] {
  const pages: ContentNode[] = [];
  const walk = (nodes: ContentNode[]) => {
    for (const n of nodes) {
      if (n.type === 'page') pages.push(n);
      if (n.children && n.children.length) walk(n.children);
    }
  };
  walk(tree);
  return pages;
}

export type PageData = {
  content: string; // raw markdown
  frontmatter: Record<string, unknown>;
  title: string;
};

function parseFrontmatter(raw: string): { frontmatter: Record<string, unknown>; body: string } {
  // Minimal `---` frontmatter parser: key: value pairs (no nested YAML)
  if (raw.startsWith('---\n')) {
    const end = raw.indexOf('\n---');
    if (end !== -1) {
      const fmRaw = raw.slice(4, end).trim();
      const body = raw.slice(end + 4).replace(/^\n+/, '');
      const fm: Record<string, unknown> = {};
      for (const line of fmRaw.split(/\r?\n/)) {
        const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
        if (m) {
          const key = m[1].trim();
          let val: unknown = m[2].trim();
          if (typeof val === 'string') {
            if ((val as string).match(/^\d{4}-\d{2}-\d{2}$/)) {
              val = new Date(val as string).toISOString();
            } else if ((val as string).match(/^(true|false)$/i)) {
              val = /true/i.test(val as string);
            } else {
              val = (val as string).replace(/^\"|\"$/g, '').replace(/^'|'$/g, '');
            }
          }
          fm[key] = val;
        }
      }
      return { frontmatter: fm, body };
    }
  }
  return { frontmatter: {}, body: raw };
}

export function readPage(slug: string[]): PageData | null {
  // Prefer folder/index.md; else loose file.md
  const asDir = path.join(CONTENT_ROOT, ...slug, 'index.md');
  const asFile = path.join(CONTENT_ROOT, ...slug) + '.md';
  let filePath: string | null = null;
  if (fs.existsSync(asDir)) filePath = asDir;
  else if (fs.existsSync(asFile)) filePath = asFile;
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(raw);
  let title = (frontmatter.title as string) || '';
  if (!title) {
    const h1 = body.match(/^#\s+(.+)$/m);
    if (h1) title = h1[1].trim();
    else title = slug[slug.length - 1];
  }
  return { content: body, frontmatter, title };
}

export function toPath(slug: string[]) {
  return '/' + slug.map(encodeURIComponent).join('/');
}

