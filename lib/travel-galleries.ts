import manifest from '@/contents/photography/travel-galleries.json'
import type { Photograph } from '@/lib/photographs'

/** One folder of travel photographs, linked to a travel place by id. Built by scripts/build-travel-galleries.mjs. */
export type TravelGallery = {
  id: string
  place: string
  title: string
  date?: string
  summary?: string
  cover: string
  photos: Photograph[]
}

export const travelGalleries = (manifest.galleries ?? []) as TravelGallery[]

export function galleriesByPlace(galleries: TravelGallery[] = travelGalleries) {
  const byPlace: Record<string, TravelGallery[]> = {}
  for (const gallery of galleries) (byPlace[gallery.place] ??= []).push(gallery)
  return byPlace
}
