import type { Metadata } from 'next'
import { BusinessCardFace } from '@/components/business-card'
import { CardToolbar } from '@/components/card-toolbar'

export const metadata: Metadata = {
  title: 'Business card',
  description: 'Kwanho Kim, software engineer in Leuven: printable business card with QR code.',
  alternates: { canonical: '/card' },
  robots: { index: false, follow: true },
}

/** Standalone card: the exact About card face, centred, printable at 85×55 mm. */
export default function CardPage() {
  return (
    <main id="main-content" className="card-page">
      <div className="business-card-holder card-page-holder">
        <BusinessCardFace id="standalone-card-face" headingId="card-name" />
      </div>
      <CardToolbar />
    </main>
  )
}
