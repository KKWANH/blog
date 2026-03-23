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

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/admin')
  }

  const missingEnv = !process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD

  return (
    <main className="min-h-screen bg-background px-6 py-10 md:py-16">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Journal</span>
        </Link>

        <section className="mt-12 border border-border bg-card p-8">
          <div className="flex items-center gap-3">
            <LockKeyhole className="h-5 w-5" />
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Administrator Access</p>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight dark:font-sans font-serif">
            Sign in to the dashboard
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            This admin area is protected by Auth.js credentials authentication.
          </p>

          {missingEnv ? (
            <div className="mt-6 border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              Set <code>ADMIN_USERNAME</code>, <code>ADMIN_PASSWORD</code>, and preferably <code>AUTH_SECRET</code> in your environment first.
            </div>
          ) : null}

          <AdminLoginForm />
        </section>
      </div>
    </main>
  )
}
