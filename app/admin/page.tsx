import type { Metadata } from 'next'
import { AdminShell } from '@/components/admin-shell'
import { AdminDashboard } from '@/components/admin-dashboard'

export const metadata: Metadata = { title: 'Owner workspace', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'
export default function AdminPage() {
  return <AdminShell><header className="management-heading"><h1>Owner workspace.</h1><p>Private statistics and content tools.</p></header><AdminDashboard /></AdminShell>
}
