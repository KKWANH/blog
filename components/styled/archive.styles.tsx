import styled from 'styled-components'

export const ArchiveGrid = styled.div`
  width: min(100%, 90rem);
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
  display: grid;
  gap: 2.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 18rem minmax(0, 1fr);
    align-items: start;
  }
`

export const ArchiveSidebar = styled.aside`
  border-top: 1px solid var(--border);
  padding-top: 1rem;

  @media (min-width: 1024px) {
    position: sticky;
    top: 1.75rem;
  }
`

export const ArchiveSidebarTitle = styled.p`
  color: var(--muted-foreground);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

export const ArchiveTreeWrap = styled.div`
  margin-top: 1rem;
  display: grid;
  gap: 0.85rem;
`

export const ArchiveBranch = styled.div`
  display: grid;
  gap: 0.5rem;
`

export const ArchiveFolder = styled.div`
  color: var(--muted-foreground);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`

export const ArchiveChildren = styled.div`
  display: grid;
  gap: 0.55rem;
  padding-left: 0.95rem;
  border-left: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
`

export const ArchivePageLink = styled.a`
  color: var(--foreground);
  font-family: var(--font-serif);
  font-size: 0.92rem;
  line-height: 1.45;
  transition: color 160ms ease;

  .dark & {
    font-family: var(--font-sans);
  }

  &:hover {
    color: var(--muted-foreground);
  }
`
