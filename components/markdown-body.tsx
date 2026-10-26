export function MarkdownBody({ html, className = '' }: { html: string; className?: string }) {
  return <div className={`markdown-body ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
}
