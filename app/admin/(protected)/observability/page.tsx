import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, BarChart3, Gauge, Search, ShieldCheck } from 'lucide-react'
import { absoluteUrl, siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Observability Setup — The KKIM Journal',
  description: 'Internal setup notes for Vercel Analytics, Speed Insights, and search indexing.',
  robots: {
    index: false,
    follow: false,
  },
}

const checks = [
  {
    title: 'Web Analytics',
    icon: BarChart3,
    items: [
      'The Analytics script is mounted in the root layout.',
      'Enable Web Analytics in the Vercel project dashboard.',
      'Real pageview data appears only after deployed traffic reaches the project.',
    ],
  },
  {
    title: 'Speed Insights',
    icon: Gauge,
    items: [
      'The SpeedInsights component is mounted in the root layout.',
      'Enable Speed Insights in the Vercel project dashboard.',
      'Core Web Vitals populate from real-user visits after deployment.',
    ],
  },
  {
    title: 'Search Indexing',
    icon: Search,
    items: [
      `Sitemap is available at ${absoluteUrl('/sitemap.xml')}.`,
      `Robots file is available at ${absoluteUrl('/robots.txt')}.`,
      'Canonical URLs rely on NEXT_PUBLIC_SITE_URL being set to the production domain.',
    ],
  },
  {
    title: 'Google Search Console',
    icon: ShieldCheck,
    items: [
      'Add the production domain as a property in Google Search Console.',
      'Submit the sitemap once the production domain is final.',
      'Set GOOGLE_SITE_VERIFICATION if you want HTML-based verification metadata.',
    ],
  },
]

export default function ObservabilityPage() {
  return (
    <main>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground">Admin / Observability</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight dark:font-sans font-serif">
            Analytics, Performance, Search
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            Operational notes for Vercel Analytics, Speed Insights, and search engine indexing.
          </p>
        </div>

        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <span>Back to dashboard</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <section className="mt-8 border border-border bg-card p-6">
        <div className="grid gap-3 md:grid-cols-2 text-sm">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">Resolved Site URL</p>
            <p className="mt-2 font-medium break-all">{siteUrl}</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-muted-foreground">Environment Variables</p>
            <p className="mt-2 font-medium">
              <code>NEXT_PUBLIC_SITE_URL</code>, optional <code>GOOGLE_SITE_VERIFICATION</code>, plus Auth.js secrets
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {checks.map((check) => {
          const Icon = check.icon

          return (
            <article key={check.title} className="border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5" />
                <h2 className="text-xl font-semibold dark:font-sans font-serif">{check.title}</h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                {check.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          )
        })}
      </section>
    </main>
  )
}
