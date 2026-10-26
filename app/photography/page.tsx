import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PhotoGallery } from '@/components/photo-gallery'
import { photographPreview, photographs, photographyPublished } from '@/lib/photographs'
import { absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Photographs',
  description: 'Photographs and collections by Kwanho Kim.',
  alternates: { canonical: absoluteUrl('/photography') },
  robots: { index: photographyPublished, follow: photographyPublished },
}

export default function PhotographyPage() {
  const preview = !photographyPublished
  if (preview && process.env.NODE_ENV !== 'development') notFound()
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="site-width photography-page">
        <header className="photography-intro">
          <p className="scene-eyebrow">Off screen</p>
          <h1>Frames to keep.</h1>
          <p>Photographs, collected along the way.</p>
        </header>
        {preview ? <aside className="gallery-preview-note">Local gallery preview using supplied portraits. Add a photograph collection to publish this page; photographer credits are not inferred.</aside> : null}
        <PhotoGallery photographs={preview ? photographPreview : photographs} />
      </main>
      <SiteFooter />
    </>
  )
}
