import { SiteHeader } from '@/components/site-header'

export default function ContentLoading() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="site-width loading-page" aria-busy="true">
        <p role="status">Loading page…</p>
        <div className="loading-lines" aria-hidden="true">
          <div />
          <div />
          <div />
          <div />
        </div>
      </main>
    </>
  )
}
