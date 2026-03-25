import styled, { css } from 'styled-components'

export const PageShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const PageMain = styled.main`
  flex: 1;
`

export const BackRow = styled.div`
  padding: 2rem 1.5rem 0;
`

export const BackInner = styled.div`
  width: min(100%, 90rem);
  margin: 0 auto;
`

export const BreadcrumbsNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  color: var(--muted-foreground);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

export const BreadcrumbCurrent = styled.span`
  color: var(--foreground);
`

export const ContentGrid = styled.div<{ $withToc: boolean }>`
  width: min(100%, 90rem);
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
  display: grid;
  gap: 2.5rem;
  ${({ $withToc }) =>
    $withToc
      ? css`
          grid-template-columns:
            minmax(0, 1fr)
            13rem
            minmax(0, 60rem)
            13rem
            minmax(0, 1fr);
          align-items: start;
        `
      : css`
          grid-template-columns: minmax(0, 1fr) minmax(0, 60rem) minmax(0, 1fr);
        `}

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
    padding: 2.25rem 1.25rem 3rem;
  }
`

export const ArticleColumn = styled.article<{ $withToc: boolean }>`
  min-width: 0;
  width: 100%;
  grid-column: ${({ $withToc }) => ($withToc ? 3 : 2)};

  @media (max-width: 1024px) {
    grid-column: 1;
  }
`

export const ArticleMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  align-items: center;
  color: var(--muted-foreground);
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`

export const ArticleTitle = styled.h1`
  margin-top: 1.25rem;
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 4.4vw, 4.75rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
  text-wrap: balance;

  .dark & {
    font-family: var(--font-sans);
    letter-spacing: -0.035em;
  }
`

export const ArticleSubtitle = styled.p`
  max-width: 48rem;
  margin-top: 1.35rem;
  color: var(--muted-foreground);
  font-size: 1.12rem;
  line-height: 1.85;
`

export const ArticleRule = styled.div`
  width: 100%;
  margin: 2rem 0 0;
  border-top: 2px solid var(--foreground);
`

export const MarkdownBody = styled.div`
  margin-top: 2rem;
  color: color-mix(in srgb, var(--foreground) 84%, transparent);
  font-size: 1.04rem;
  line-height: 1.95;

  h1,
  h2,
  h3,
  h4 {
    margin-top: 2.8rem;
    margin-bottom: 0.9rem;
    color: var(--foreground);
    font-family: var(--font-serif);
    letter-spacing: -0.03em;
    line-height: 1.15;
  }

  h1 {
    font-size: clamp(2.2rem, 3.6vw, 3.4rem);
    letter-spacing: -0.045em;
  }

  h2 {
    font-size: clamp(1.9rem, 3vw, 2.5rem);
  }

  h3 {
    font-size: 1.4rem;
  }

  .dark & {
    h1,
    h2,
    h3,
    h4 {
      font-family: var(--font-sans);
      letter-spacing: -0.025em;
    }
  }

  p,
  ul,
  ol,
  blockquote,
  pre,
  figure {
    margin-top: 1rem;
  }

  p:first-child {
    margin-top: 0;
  }

  h1:first-child,
  h2:first-child,
  h3:first-child,
  h4:first-child {
    margin-top: 0;
  }

  a {
    color: var(--foreground);
    text-decoration: underline;
    text-underline-offset: 0.22em;
  }

  strong {
    color: var(--foreground);
  }

  code {
    padding: 0.12rem 0.35rem;
    background: color-mix(in srgb, var(--muted) 85%, transparent);
    font-size: 0.92em;
  }

  pre {
    overflow-x: auto;
    padding: 1rem 1.15rem;
    border: 1px solid var(--border);
    background: color-mix(in srgb, var(--muted) 72%, transparent);
  }

  blockquote {
    padding-left: 1.1rem;
    border-left: 2px solid var(--foreground);
    color: var(--foreground);
    font-style: italic;
  }

  img,
  video,
  iframe {
    width: 100%;
    height: auto;
  }

  ul,
  ol {
    padding-left: 1.2rem;
  }

  li + li {
    margin-top: 0.4rem;
  }
`

export const ComponentBody = styled.div`
  margin-top: 2rem;
`

export const TocWrap = styled.div<{ $mobileOnly?: boolean }>`
  ${({ $mobileOnly }) =>
    $mobileOnly
      ? css`
          display: none;

          @media (max-width: 1024px) {
            display: block;
            margin-top: 1.35rem;
          }
        `
      : css`
          grid-column: 4;
          position: sticky;
          top: 1.75rem;
          align-self: start;

          @media (max-width: 1024px) {
            display: none;
          }
        `}
`

export const TocNav = styled.nav<{ $inline?: boolean }>`
  ${({ $inline }) =>
    $inline
      ? css`
          margin: 1.5rem 0 0;
        `
      : css`
          margin-top: 0.25rem;
        `}
`

export const TocEyebrow = styled.p`
  color: var(--muted-foreground);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

export const TocList = styled.ul`
  margin-top: 0.8rem;
  display: grid;
  gap: 0.45rem;
`

export const TocLink = styled.a<{ $nested?: boolean }>`
  display: block;
  padding-left: ${({ $nested }) => ($nested ? '0.85rem' : '0')};
  color: var(--muted-foreground);
  font-size: 0.84rem;
  line-height: 1.45;
  transition: color 160ms ease;

  &:hover {
    color: var(--foreground);
  }
`

export const FooterMeta = styled.footer`
  margin-top: 2.5rem;
  padding-top: 1.15rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  color: var(--muted-foreground);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`
