import type { Metadata, Viewport } from 'next'
import { EB_Garamond, Inter, Playfair_Display, Geist_Mono, Noto_Serif_KR, Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ThemeProvider } from '@/components/theme-provider'
import { siteUrl } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif-kr',
  display: 'swap',
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
})

const description =
  'Kwanho Kim — systems engineer working on robotics, computer vision, and automotive software. Index page for the demos that live on *.kwanho.dev.'

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kwanho Kim — kwanho.dev',
    description,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  // Favicon + apple-touch are auto-resolved from app/icon.svg, app/icon.png,
  // and app/apple-icon.png via Next.js file conventions — no manual `icons`
  // entries needed.
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0c14' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${ebGaramond.variable} ${geistMono.variable} ${notoSerifKR.variable} ${notoSansKR.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
