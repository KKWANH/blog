import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MotionProvider } from '@/components/motion-provider'
import { Atmosphere } from '@/components/atmosphere'
import { siteUrl } from '@/lib/site'
import './globals.css'
import '../styles/notebook.css'
import '../styles/fieldbook.css'
import '../styles/cinema.css'
import '../styles/profile.css'
import '../styles/stationery.css'

const figtree = localFont({
  src: '../public/font/Figtree.woff2',
  variable: '--font-figtree',
  weight: '300 900',
  display: 'swap',
})

const caveat = localFont({
  src: '../public/font/Caveat-500.woff2',
  variable: '--font-hand',
  weight: '500',
  preload: false,
  display: 'swap',
})

const description =
  'Kwanho Kim, C++ Software Engineer at KLA in Leuven. Experience, education, projects and technical notes.'

export const metadata: Metadata = {
  title: {
    default: 'Kwanho Kim — kwanho.dev',
    template: '%s · kwanho.dev',
  },
  description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'kwanho.dev',
    title: 'Kwanho Kim — kwanho.dev',
    description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Kwanho Kim, software engineer at KLA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kwanho Kim — kwanho.dev',
    description,
    images: ['/og-image.png'],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  // Photo-crop favicon/apple-touch variants use Next.js file conventions.
}

export const viewport: Viewport = {
  themeColor: '#071b13',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" data-motion="off">
      <body className={`${figtree.variable} ${caveat.variable} font-sans antialiased`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <MotionProvider>
          <Atmosphere />
          {children}
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
