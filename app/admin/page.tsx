import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { ArrowUpRight, FileText, FolderTree, Gauge, Globe, Search } from 'lucide-react'
import { AdminShell } from '@/components/admin-shell'
import { authOptions } from '@/lib/auth-options'
import { getAdminDashboardData } from '@/lib/admin'

export const metadata: Metadata = {
  title: 'Admin Dashboard — The KKIM Journal',
  description: 'Protected administrator dashboard for The KKIM Journal.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const data = getAdminDashboardData()

  const summaryCards = [
    { label: 'Total Pages', value: data.counts.pages, icon: FileText },
    { label: 'Articles', value: data.counts.articles, icon: Search },
    { label: 'Featured', value: data.counts.featured, icon: Gauge },
    { label: 'Tree Depth', value: data.counts.treeDepth, icon: FolderTree },
  ]

  return (
    <AdminShell user={session.user}>
      <main>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Protected Dashboard</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight font-serif dark:font-sans">Admin Overview</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              A single place to inspect content scale, search readiness, and observability setup.
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            Latest article:{' '}
            <span className="text-foreground">
              {data.latestArticle ? data.latestArticle.title : 'No articles yet'}
            </span>
          </div>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon
            return (
              <article key={card.label} className="border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">{card.label}</p>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-5 text-4xl font-semibold">{card.value}</p>
              </article>
            )
          })}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="border border-border bg-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">Recent Content</p>
                <h2 className="mt-3 text-2xl font-semibold font-serif dark:font-sans">Recently published articles</h2>
              </div>
              <Link href="/archive" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <span>Open archive</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 divide-y divide-border">
              {data.recentArticles.map((article) => (
                <Link key={article.href} href={article.href} className="group block py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
                        {article.category} · {article.date}
                      </p>
                      <h3 className="mt-2 text-lg font-medium group-hover:text-muted-foreground">{article.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{article.excerpt}</p>
                    </div>
                    <ArrowUpRight className="mt-1 h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </article>

          <div className="grid gap-6">
            <article className="border border-border bg-card p-6">
              <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">Search Readiness</p>
              <div className="mt-5 grid gap-4 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-muted-foreground">Site URL</span>
                  <span className="text-right">{data.seo.siteUrlConfigured ? data.seo.siteUrl : 'Set NEXT_PUBLIC_SITE_URL'}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-muted-foreground">Sitemap</span>
                  <Link href="/sitemap.xml" className="text-right hover:underline">{data.seo.sitemap}</Link>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-muted-foreground">Robots</span>
                  <Link href="/robots.txt" className="text-right hover:underline">{data.seo.robots}</Link>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-muted-foreground">Google Verification</span>
                  <span>{data.seo.googleVerificationConfigured ? 'Configured' : 'Missing'}</span>
                </div>
              </div>
            </article>

            <article className="border border-border bg-card p-6">
              <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">Observability</p>
              <h2 className="mt-3 text-2xl font-semibold font-serif dark:font-sans">Analytics & performance</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Web Analytics and Speed Insights are mounted in the app. Use the observability section for setup notes, and Vercel for actual traffic dashboards.
              </p>
              <Link
                href="/admin/observability"
                className="mt-5 inline-flex items-center gap-2 border border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Globe className="h-4 w-4" />
                <span>Open observability page</span>
              </Link>
            </article>
          </div>
        </section>
      </main>
    </AdminShell>
  )
}
