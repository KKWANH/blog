import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { AdminLoginForm } from '@/components/admin-login-form'
import { authOptions } from '@/lib/auth-options'

export const metadata: Metadata = {
  title: 'Admin Login — The KKIM Journal',
  description: 'Administrator login for The KKIM Journal dashboard.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const session = await getServerSession(authOptions)
  const resolvedSearchParams = await searchParams
  const callbackUrl =
    typeof resolvedSearchParams.callbackUrl === 'string' ? resolvedSearchParams.callbackUrl : '/admin'

  if (session) {
    redirect(callbackUrl)
  }

  const missingEnv = !process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground md:py-16">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Journal</span>
        </Link>

        <section className="mt-12 rounded-2xl border border-border bg-card/80 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-5 w-5" />
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Administrator Access</p>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight">
            Sign in to the dashboard
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            This admin area uses dedicated credentials auth, dark-mode dashboard styling, and basic
            login hardening.
          </p>

          {missingEnv ? (
            <div className="mt-6 border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              Set <code>ADMIN_USERNAME</code>, <code>ADMIN_PASSWORD</code>, and <code>NEXTAUTH_SECRET</code> in Vercel environment variables first.
            </div>
          ) : null}

          <AdminLoginForm />
        </section>
      </div>
    </main>
  )
}
