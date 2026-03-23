import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { Activity, LayoutDashboard, SearchCheck } from 'lucide-react'
import { authOptions } from '@/lib/auth-options'
import { AdminLogoutButton } from '@/components/admin-logout-button'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/observability', label: 'Observability', icon: Activity },
]

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="border-r border-border px-6 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-muted-foreground">
            <SearchCheck className="h-4 w-4" />
            <span>The KKIM Journal</span>
          </Link>

          <div className="mt-10">
            <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">Admin</p>
            <p className="mt-3 text-lg font-semibold">{session.user?.name ?? 'Administrator'}</p>
            <p className="mt-1 text-sm text-muted-foreground">{session.user?.email}</p>
          </div>

          <nav className="mt-10 grid gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-3 border border-transparent px-3 py-3 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="mt-10">
            <AdminLogoutButton />
          </div>
        </aside>

        <div className="min-w-0 px-6 py-8 md:px-8 md:py-10">{children}</div>
      </div>
    </div>
  )
}
