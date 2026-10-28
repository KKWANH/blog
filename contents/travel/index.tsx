import { TravelAtlas } from '@/components/travel/travel-atlas'
import { travelStore } from '@/lib/travel-store'
import { galleriesByPlace } from '@/lib/travel-galleries'

export const title = "Places I've been"
export const description =
  'A globe of the cities Kwanho Kim has visited, from short stops to places lived, with photographs where there are some.'
export const excerpt =
  'Cities I have visited, from short stops to places I have lived.'
export const showToc = false
// Rendered full-bleed by app/[...slug]/page.tsx: no hero, no reading column, no footer.
export const bodyClassName = 'atlas-page'

export default function TravelPage() {
  return <TravelAtlas places={travelStore().read().places} galleries={galleriesByPlace()} />
}
