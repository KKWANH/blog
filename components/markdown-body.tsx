/**
 * Markdown-rendered content body. Used by `[...slug]/page.tsx` when a
 * content tree entry is a plain `index.md`. The styles below are kept
 * close to default Tailwind typography but keyed to the kwanho.dev
 * tokens so light and dark mode both feel right.
 *
 * No /editor or /travel page hits this code today (both are TSX), but
 * we leave it in place because the content loader supports `.md` and a
 * future article would land here.
 */
export function MarkdownBody({
  html,
  className = '',
}: {
  html: string
  className?: string
}) {
  return (
    <div
      className={[
        'markdown-body',
        'mt-2 max-w-3xl text-[1.04rem] leading-[1.9] text-foreground/85',
        '[&_h1]:mt-12 [&_h1]:font-display [&_h1]:text-4xl [&_h1]:tracking-tight [&_h1]:text-foreground',
        '[&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:tracking-tight [&_h2]:text-foreground',
        '[&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:tracking-tight [&_h3]:text-foreground',
        '[&_h4]:mt-6 [&_h4]:text-lg [&_h4]:font-medium [&_h4]:text-foreground',
        '[&_p]:mt-4 [&_ul]:mt-4 [&_ol]:mt-4 [&_blockquote]:mt-4',
        '[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5',
        '[&_li+li]:mt-1',
        '[&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_a:hover]:decoration-foreground',
        '[&_strong]:text-foreground',
        '[&_code]:rounded [&_code]:bg-muted/70 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.92em]',
        '[&_pre]:mt-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/40 [&_pre]:p-4 [&_pre]:text-sm',
        '[&_pre_code]:bg-transparent [&_pre_code]:px-0',
        '[&_blockquote]:border-l-2 [&_blockquote]:border-foreground [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-foreground',
        '[&_img]:rounded-lg [&_img]:border [&_img]:border-border',
        className,
      ].join(' ')}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
