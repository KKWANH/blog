import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AdminShell } from '@/components/admin-shell'
import { AdminSetup } from '@/components/admin-setup'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Local admin setup', robots: { index: false, follow: false } }
export default function AdminSetupPage() {
  if (process.env.NODE_ENV !== 'development' || process.env.VERCEL || process.env.TRAVEL_EDITOR_ENABLED !== '1') notFound()
  return <AdminShell><AdminSetup /></AdminShell>
}
