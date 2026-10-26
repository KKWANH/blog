import { TravelExplorer } from '@/components/travel/travel-explorer'
import { travelStore } from '@/lib/travel-store'

export const title = "Places I've been"
export const subtitle = 'A map of short visits, longer stays and places I have lived.'
export const description =
  'Cities visited by Kwanho Kim, with filters for short visits, longer stays and places lived.'
export const excerpt =
  'Cities I have visited, from short stops to places I have lived.'
export const showToc = false
export const bodyClassName = 'atlas-page'

export default function TravelPage() {
  return <TravelExplorer initialSnapshot={travelStore().read()} />
}
