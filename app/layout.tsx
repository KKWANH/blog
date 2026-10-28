import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { MotionProvider } from '@/components/motion-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Atmosphere } from '@/components/atmosphere'
import { VisitStatisticsProvider } from '@/components/visit-statistics'
import { siteUrl } from '@/lib/site'
import './globals.css'
import '../styles/notebook.css'
import '../styles/fieldbook.css'
import '../styles/cinema.css'
import '../styles/profile.css'
import '../styles/mind-map.css'
import '../styles/skill-editor.css'
import '../styles/stationery.css'
import '../styles/admin.css'
import '../styles/light.css'

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

const bastliga = localFont({
  src: '../public/font/Bastliga-One.woff',
  variable: '--font-signature',
  weight: '400',
  display: 'swap',
})

const description =
  'Kwanho Kim, Software Engineer at KLA in Leuven. C++ device software, machine interfaces, projects and technical notes.'

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
  // The original green-window favicon uses Next.js file conventions.
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
    <html lang="en" className="dark" data-theme="dark" data-motion="off" suppressHydrationWarning>
      <head>
        {/* The site ships its own dark and light themes; stop extension dark-mode generators
            (Dark Reader) from re-tinting them and the printed business card. */}
        <meta name="darkreader-lock" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('kwanho-theme')||'dark';document.documentElement.dataset.theme=t;if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}else{document.documentElement.classList.add('dark');document.documentElement.classList.remove('light')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${figtree.variable} ${caveat.variable} ${bastliga.variable} font-sans antialiased`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <ThemeProvider>
          <MotionProvider>
            <VisitStatisticsProvider possible={process.env.NODE_ENV !== 'production' || process.env.ANALYTICS_ENABLED === '1'}>
              <Atmosphere />
              {children}
            </VisitStatisticsProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
