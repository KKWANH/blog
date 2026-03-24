import { TravelExplorer } from '@/components/travel/travel-explorer'
import { visitedCities } from '@/contents/travel/cities'

export const title = 'Travel Atlas'
export const subtitle = 'A map of environments that influenced how I think, not just places visited.'
export const description =
  'An interactive world map that tracks cities by stay depth and treats them as contexts that shaped decisions rather than simple check-ins.'
export const excerpt =
  'A scrollable, zoomable travel atlas that maps cities as environments that mattered, not just places that were visited.'
export const date = '2026-03-23'
export const category = 'travel'
export const readTime = '4 min'
export const showToc = false
export const bodyClassName = 'font-sans'

export default function TravelPage() {
  return <TravelExplorer cities={[...visitedCities]} />
}
