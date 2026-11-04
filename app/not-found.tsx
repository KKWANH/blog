import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SiteHeader />

      <main id="main-content" className="site-width notebook-error">
        <div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-none">
            Not found.
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            Error 404: this page doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="text-link"
          >
            <ArrowLeft aria-hidden="true" /> Back home
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
