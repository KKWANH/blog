import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PhotoGallery } from '@/components/photo-gallery'
import { photographPreview, photographs, photographyPublished, portraitsPublished } from '@/lib/photographs'
import { travelGalleries } from '@/lib/travel-galleries'
import { visitedCities } from '@/contents/travel/cities'
import { absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Photographs',
  description: 'Photographs and travel collections by Kwanho Kim.',
  alternates: { canonical: absoluteUrl('/photography') },
  robots: { index: photographyPublished, follow: photographyPublished },
}

export default function PhotographyPage() {
  const preview = !photographyPublished
  if (preview && process.env.NODE_ENV !== 'development') notFound()
  const portraits = portraitsPublished ? photographs : preview ? photographPreview : []
  const places = new Set(visitedCities.map((place) => place.id))
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="site-width photography-page">
        <header className="photography-intro">
          <p className="scene-eyebrow">Off screen</p>
          <h1>Frames to keep.</h1>
          <p>Photographs, collected along the way.</p>
        </header>
        {preview ? <aside className="gallery-preview-note">Local gallery preview using supplied portraits. Add a photograph collection or a travel folder to publish this page; photographer credits are not inferred.</aside> : null}
        {portraits.length ? <PhotoGallery photographs={portraits} /> : null}
        {travelGalleries.length ? (
          <section className="travel-galleries" aria-labelledby="travel-galleries-title">
            <h2 id="travel-galleries-title">Travel</h2>
            {travelGalleries.map((gallery) => (
              <section key={gallery.id} className="travel-gallery" aria-labelledby={`gallery-${gallery.id}`}>
                <header>
                  <h3 id={`gallery-${gallery.id}`}>{gallery.title}</h3>
                  <p>{[gallery.date, `${gallery.photos.length} photograph${gallery.photos.length === 1 ? '' : 's'}`].filter(Boolean).join(' · ')}</p>
                  {places.has(gallery.place) ? <Link className="text-link" href={`/travel?place=${encodeURIComponent(gallery.place)}`}><MapPin aria-hidden="true" />On the map</Link> : null}
                </header>
                {gallery.summary ? <p className="travel-gallery-summary">{gallery.summary}</p> : null}
                <PhotoGallery photographs={gallery.photos} />
              </section>
            ))}
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  )
}
