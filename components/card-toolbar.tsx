'use client'

import Link from 'next/link'
import { ArrowLeft, Printer } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-provider'

export function CardToolbar() {
  return (
    <nav className="card-page-toolbar" aria-label="Card actions">
      <ThemeToggle />
      <button type="button" className="action-button" onClick={() => window.print()}><Printer aria-hidden="true" />Print / save PDF</button>
      <Link prefetch={false} className="action-button" href="/about"><ArrowLeft aria-hidden="true" />Back to profile</Link>
    </nav>
  )
}
