import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TravelExplorer } from '@/components/travel/travel-explorer'
import { travelStore } from '@/lib/travel-store'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Manage travel',
  robots: { index: false, follow: false },
}

export default async function ManageTravelPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return <>
    <SiteHeader />
    <main id="main-content" className="site-width travel-management-page">
      <header className="management-heading">
        <Link href="/travel" className="text-link">← Public atlas</Link>
        <h1>Edit your atlas.</h1>
        <p>Add a place, change a stay or correct a pin.</p>
      </header>
      {error ? <p className="owner-auth-error" role="alert">Sign-in did not complete. Use the site owner&apos;s GitHub account and check the app configuration.</p> : null}
      <TravelExplorer initialSnapshot={travelStore().read()} ownerMode />
    </main>
    <SiteFooter />
  </>
}
