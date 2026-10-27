import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import countriesAtlas from 'world-atlas/countries-110m.json'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import { visitedCities } from '@/contents/travel/cities'

const topology = countriesAtlas as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>
const land = feature(topology, topology.objects.countries)
const project = ([longitude, latitude]: number[]) => [((longitude + 180) / 360) * 720, ((90 - latitude) / 180) * 360]
function ringPath(ring: number[][]) {
  let previous: number | null = null, crossed = false
  const parts = ring.map((point, index) => {
    const jump = previous !== null && Math.abs(point[0] - previous) > 180
    crossed ||= jump
    previous = point[0]
    const [x, y] = project(point)
    return `${!index || jump ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
  })
  return parts.join(' ') + (crossed ? '' : ' Z')
}

export function TravelPreview() {
  const countryCount = new Set(visitedCities.map((city) => city.countryCode)).size
  const homes = visitedCities.filter((city) => city.level === 'lived-there').length
  return (
    <Link className="travel-preview" href="/travel" aria-label={`Open the travel atlas: ${countryCount} countries and ${homes} places lived`}>
      <div className="travel-preview-copy"><span className="evidence-kicker">Away from work</span><h2>Places I&apos;ve been.</h2><p><strong>{countryCount}</strong> countries <span>·</span> <strong>{homes}</strong> places lived</p><span className="text-link">Explore the atlas <ArrowUpRight aria-hidden="true" /></span></div>
      <svg viewBox="0 0 720 360" className="travel-preview-map" aria-hidden="true" focusable="false">
        <g className="preview-land">
          {land.features.map((country, index) => {
            const geometry = country.geometry
            const rings = geometry.type === 'Polygon' ? geometry.coordinates : geometry.type === 'MultiPolygon' ? geometry.coordinates.flat() : []
            return <path key={`${country.id ?? 'country'}-${index}`} d={rings.map(ringPath).join(' ')} />
          })}
        </g>
        <g>{visitedCities.map((city) => {
          const [x, y] = project([city.lng, city.lat])
          return <circle key={city.id} cx={x} cy={y} r={city.level === 'lived-there' ? 3.3 : 2} className={city.level === 'lived-there' ? 'preview-home' : 'preview-visit'} />
        })}</g>
      </svg>
    </Link>
  )
}
