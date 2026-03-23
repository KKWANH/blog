import { TravelExplorer } from '@/components/travel/travel-explorer'
import { visitedCities } from '@/contents/travel/cities'

export const title = 'Travel Atlas'
export const subtitle = 'A living map of cities visited, stayed in, or briefly passed through.'
export const description =
  'An interactive world map that tracks cities by stay depth, from short visits to places once lived in.'
export const excerpt =
  'A scrollable, zoomable travel atlas that maps cities by how long they mattered rather than by simple check-ins.'
export const date = '2026-03-23'
export const category = 'travel'
export const readTime = '4 min'
export const showToc = false
export const bodyClassName = 'font-sans'

export default function TravelPage() {
  return <TravelExplorer cities={[...visitedCities]} />
}
