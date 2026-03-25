import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import React from 'react'
import ts from 'typescript'
import type { Metadata } from 'next'
import { getBundledContentModule } from '@/lib/content-component-registry'
import { CONTENT_ROOT } from '@/lib/content-paths'
import { markdownToHtml } from '@/lib/markdown'
import type { TocItem } from '@/lib/toc'

export type ContentKind = 'markdown' | 'tsx'
export type TocVariant = 'inline' | 'rail'

export type ContentPage = {
  slug: string[]
  slugPath: string
  href: string
  lang?: string
  kind: ContentKind
  title: string
  subtitle?: string
  description?: string
  excerpt: string
  date?: string
  category?: string
  featured?: boolean
  readTime?: string
  showToc?: boolean
  toc?: TocItem[]
  tocVariant?: TocVariant
  metadata?: Metadata
  bodyClassName?: string
  content?: string
  html?: string
  Component?: React.ComponentType
}

export type ContentTreeNode = {
  type: 'folder' | 'page'
  name: string
  label: string
  lang?: string
  slug: string[]
  href: string
  children?: ContentTreeNode[]
}

type FrontmatterValue = boolean | string

type TsxContentModule = {
  default?: React.ComponentType
  metadata?: Metadata
  lang?: string
  title?: string
  subtitle?: string
  description?: string
  excerpt?: string
  summary?: string
  date?: string
  category?: string
  featured?: boolean
  readTime?: string
  showToc?: boolean
  toc?: TocItem[]
  tocVariant?: TocVariant
  bodyClassName?: string
}

function rewriteRelativeAssetLiteralsInTsx(source: string, slug: string[]) {
  return source.replace(
    /\b(src|href|poster)=("|\')(\.\.?\/[^"']+)\2/g,
    (_match, attribute, quote, value) => `${attribute}=${quote}${resolveContentAsset(slug, value)}${quote}`,
  )
}

function isIgnoredDir(name: string) {
  return name.startsWith('_')
}

function getHref(slug: string[]) {
  return `/${slug.map(encodeURIComponent).join('/')}`
}

function normalizeRouteSlug(slug: string[]) {
  return slug.map((segment) => {
    try {
      return decodeURIComponent(segment)
    } catch {
      return segment
    }
  })
}

function getPageFiles(dir: string) {
  const markdownPath = path.join(dir, 'index.md')
  if (fs.existsSync(markdownPath)) {
    return {
      filePath: markdownPath,
      kind: 'markdown' as const,
    }
  }

  const tsxPath = path.join(dir, 'index.tsx')
  if (fs.existsSync(tsxPath)) {
    return {
      filePath: tsxPath,
      kind: 'tsx' as const,
    }
  }

  return null
}

function formatTitleFromSlug(value: string) {
  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ')
}

function parseFrontmatter(raw: string): { frontmatter: Record<string, FrontmatterValue>; body: string } {
  if (!raw.startsWith('---\n')) {
    return { body: raw, frontmatter: {} }
  }

  const end = raw.indexOf('\n---', 4)
  if (end === -1) {
    return { body: raw, frontmatter: {} }
  }

  const frontmatterBlock = raw.slice(4, end).trim()
  const body = raw.slice(end + 4).replace(/^\n+/, '')
  const frontmatter: Record<string, FrontmatterValue> = {}

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
    if (!match) {
      continue
    }

    const key = match[1].trim()
    const value = match[2].trim()
    if (/^(true|false)$/i.test(value)) {
      frontmatter[key] = /^true$/i.test(value)
    } else {
      frontmatter[key] = value.replace(/^['"]|['"]$/g, '')
    }
  }

  return { body, frontmatter }
}

function getBodyExcerpt(body: string) {
  const excerpt = body
    .split(/\r?\n\r?\n/)
    .map((chunk) => chunk.replace(/^#+\s+/gm, '').trim())
    .find((chunk) => chunk.length > 0 && !chunk.startsWith('!') && !chunk.startsWith('<'))

  if (!excerpt) {
    return ''
  }

  return excerpt.slice(0, 220)
}

function inferContentLanguage(...values: Array<string | undefined>) {
  const sample = values.filter(Boolean).join(' ')

  if (/[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(sample)) {
    return 'ko'
  }

  return 'en'
}

function buildMarkdownPage(slug: string[], filePath: string): ContentPage {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { body, frontmatter } = parseFrontmatter(raw)
  const h1 = body.match(/^#\s+(.+)$/m)?.[1]?.trim()
  const title = typeof frontmatter.title === 'string' ? frontmatter.title : h1 ?? formatTitleFromSlug(slug.at(-1) ?? 'untitled')
  const description = typeof frontmatter.description === 'string' ? frontmatter.description : undefined
  const excerptSource =
    typeof frontmatter.excerpt === 'string'
      ? frontmatter.excerpt
      : typeof frontmatter.summary === 'string'
        ? frontmatter.summary
        : getBodyExcerpt(body)

  return {
    slug,
    slugPath: slug.join('/'),
    href: getHref(slug),
    lang: typeof frontmatter.lang === 'string' ? frontmatter.lang : inferContentLanguage(title, frontmatter.subtitle as string | undefined, body),
    kind: 'markdown',
    title,
    subtitle: typeof frontmatter.subtitle === 'string' ? frontmatter.subtitle : undefined,
    description,
    excerpt: excerptSource,
    date: typeof frontmatter.date === 'string' ? frontmatter.date : undefined,
    category: typeof frontmatter.category === 'string' ? frontmatter.category : undefined,
    featured: typeof frontmatter.featured === 'boolean' ? frontmatter.featured : undefined,
    readTime: typeof frontmatter.readTime === 'string' ? frontmatter.readTime : undefined,
    showToc: typeof frontmatter.showToc === 'boolean' ? frontmatter.showToc : undefined,
    tocVariant: frontmatter.tocVariant === 'inline' ? 'inline' : 'rail',
    bodyClassName: typeof frontmatter.bodyClassName === 'string' ? frontmatter.bodyClassName : undefined,
    content: body,
    html: markdownToHtml(body),
    metadata: {
      title,
      description: description ?? excerptSource,
    },
  }
}

function transpileTsx(source: string, filePath: string) {
  return ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: filePath,
  })
}

function loadTsxModule(filePath: string, slug: string[]): TsxContentModule {
  const rawSource = fs.readFileSync(filePath, 'utf8')
  const source = rewriteRelativeAssetLiteralsInTsx(rawSource, slug)
  const transpiled = transpileTsx(source, filePath)
  const projectRequire = createRequire(filePath)
  const module = { exports: {} as TsxContentModule }

  const evaluator = new Function(
    'exports',
    'require',
    'module',
    '__filename',
    '__dirname',
    transpiled.outputText,
  )

  evaluator(module.exports, projectRequire, module, filePath, path.dirname(filePath))
  return module.exports
}

function buildTsxPage(slug: string[], filePath: string): ContentPage {
  const module = getBundledContentModule(slug) ?? loadTsxModule(filePath, slug)
  const title = module.title ?? formatTitleFromSlug(slug.at(-1) ?? 'untitled')
  const excerpt = module.excerpt ?? module.summary ?? module.description ?? ''

  return {
    slug,
    slugPath: slug.join('/'),
    href: getHref(slug),
    lang: module.lang ?? inferContentLanguage(title, module.subtitle, module.description, excerpt),
    kind: 'tsx',
    title,
    subtitle: module.subtitle,
    description: module.description,
    excerpt,
    date: module.date,
    category: module.category,
    featured: module.featured,
    readTime: module.readTime,
    showToc: module.showToc,
    toc: module.toc,
    tocVariant: module.tocVariant ?? 'rail',
    metadata: module.metadata ?? {
      title,
      description: module.description ?? excerpt,
    },
    bodyClassName: module.bodyClassName,
    Component: module.default,
  }
}

export function resolveContentAsset(slug: string[], relativePath: string) {
  if (!relativePath.startsWith('.')) {
    return relativePath
  }

  const normalized = path.posix.normalize(path.posix.join('/', ...slug, relativePath)).replace(/^\/+/, '')
  if (normalized.startsWith('..')) {
    return relativePath
  }

  return `/media/${normalized}`
}

export function rewriteRelativeMedia(html: string, slug: string[]) {
  return html.replace(/\b(src|href|poster)=["'](\.\.?\/[^"']+)["']/g, (_match, attribute, value) => {
    return `${attribute}="${resolveContentAsset(slug, value)}"`
  })
}

export function rewriteRelativeMediaInReactNode(node: React.ReactNode, slug: string[]): React.ReactNode {
  if (!React.isValidElement(node)) {
    return node
  }

  const props = { ...node.props } as Record<string, unknown>

  for (const key of ['src', 'href', 'poster']) {
    const value = props[key]
    if (typeof value === 'string' && value.startsWith('.')) {
      props[key] = resolveContentAsset(slug, value)
    }
  }

  if (props.children) {
    props.children = React.Children.map(props.children as React.ReactNode, (child) =>
      rewriteRelativeMediaInReactNode(child, slug),
    )
  }

  return React.cloneElement(node, props)
}

export function getContentPage(slug: string[]): ContentPage | null {
  const normalizedSlug = normalizeRouteSlug(slug)
  const dir = path.join(CONTENT_ROOT, ...normalizedSlug)
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    return null
  }

  const pageFile = getPageFiles(dir)
  if (!pageFile) {
    return null
  }

  return pageFile.kind === 'markdown'
    ? buildMarkdownPage(normalizedSlug, pageFile.filePath)
    : buildTsxPage(normalizedSlug, pageFile.filePath)
}

function collectPages(dir: string, slug: string[] = []): ContentPage[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const pages: ContentPage[] = []

  for (const entry of entries) {
    if (!entry.isDirectory() || isIgnoredDir(entry.name)) {
      continue
    }

    const nextSlug = [...slug, entry.name]
    const childDir = path.join(dir, entry.name)
    const page = getContentPage(nextSlug)
    if (page) {
      pages.push(page)
    }
    pages.push(...collectPages(childDir, nextSlug))
  }

  return pages.sort((left, right) => {
    const leftTime = left.date ? new Date(left.date).getTime() : 0
    const rightTime = right.date ? new Date(right.date).getTime() : 0
    if (leftTime !== rightTime) {
      return rightTime - leftTime
    }

    return left.slugPath.localeCompare(right.slugPath)
  })
}

export function getAllContentPages() {
  return collectPages(CONTENT_ROOT)
}

export function getContentTree(dir = CONTENT_ROOT, slug: string[] = []): ContentTreeNode[] {
  if (!fs.existsSync(dir)) {
    return []
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const nodes: ContentTreeNode[] = []

  for (const entry of entries) {
    if (!entry.isDirectory() || isIgnoredDir(entry.name)) {
      continue
    }

    const nextSlug = [...slug, entry.name]
    const childDir = path.join(dir, entry.name)
    const children = getContentTree(childDir, nextSlug)
    const page = getContentPage(nextSlug)

    nodes.push({
      type: page ? 'page' : 'folder',
      name: entry.name,
      label: page?.title ?? formatTitleFromSlug(entry.name),
      lang: page?.lang,
      slug: nextSlug,
      href: getHref(nextSlug),
      children,
    })
  }

  return nodes.sort((left, right) => {
    if (left.type !== right.type) {
      return left.type === 'folder' ? -1 : 1
    }

    return left.label.localeCompare(right.label)
  })
}

export function formatContentDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatContentDateShort(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
