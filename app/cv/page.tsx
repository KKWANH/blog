import type { Metadata } from 'next'
import { HtmlCv } from '@/components/html-cv'

export const metadata: Metadata = {
  title: 'CV — Kwanho Kim',
  description: 'Software Engineer CV: experience at KLA, Pickit 3D and Bosch, education and technical skills.',
}

export default function CvPage() {
  return (
    <main id="main-content" className="cv-route-page">
      <HtmlCv />
    </main>
  )
}
