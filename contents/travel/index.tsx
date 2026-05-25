import { TravelExplorer } from '@/components/travel/travel-explorer'
import { visitedCities } from '@/contents/travel/cities'

export const title = 'Travel Atlas'
export const subtitle = 'Cities are contexts. What a place teaches you depends on how long you stay.'
export const description =
  'An interactive world map that tracks cities by stay depth and treats them as contexts that shaped decisions rather than simple check-ins.'
export const excerpt =
  'Cities mapped by depth of stay — short transits, multi-day adjustments, and the places that actually rewired how I think.'
export const date = '2026-03-23'
export const category = 'travel'
export const readTime = '4 min'
export const showToc = false
export const bodyClassName = 'font-sans'

export default function TravelPage() {
  return <TravelExplorer cities={[...visitedCities]} />
}
