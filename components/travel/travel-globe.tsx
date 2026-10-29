'use client'

import { useEffect, useImperativeHandle, useMemo, useRef, useState, type Ref } from 'react'
import countries from 'i18n-iso-countries'
import countryNames from 'i18n-iso-countries/langs/en.json'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import countriesAtlas from 'world-atlas/countries-110m.json'
import { feature, mesh } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import type { FeatureCollection, Point } from 'geojson'
import type { SkySpecification, StyleSpecification } from 'maplibre-gl'
import MapView, { Layer, Source, type MapLayerMouseEvent, type MapRef } from 'react-map-gl/maplibre'
import { StayLevel, globePalette, levelConfig, type MapUnit, type TravelCity } from './travel-types'

countries.registerLocale(countryNames)
maplibregl.setWorkerUrl('/maplibre-worker.mjs')

const worldTopology = countriesAtlas as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>
// Antarctica wraps the pole and leaves a clipped seam on the globe; nobody has visited it here.
const world = (() => {
  const all = feature(worldTopology, worldTopology.objects.countries)
  return { ...all, features: all.features.filter((country) => country.id !== '010').map((country) => ({ ...country, geometry: unwrapGeometry(country.geometry) })) }
})()
// Only shared land borders: polygon outlines would also stroke the antimeridian and polar cuts.
const borders = (() => {
  const lines = mesh(worldTopology, worldTopology.objects.countries, (a, b) => a !== b)
  return { ...lines, coordinates: lines.coordinates.map(unwrapLine) }
})()

/* Rings that cross the antimeridian (Russia, Fiji) jump from 180° to -180°; on the globe
   that edge is drawn the long way round as a band along a parallel. Shifting each point
   by whole turns keeps every edge shorter than half the world. */
function unwrapLine(line: number[][]) {
  let previous: number | null = null
  return line.map(([lon, lat]) => {
    let next = lon
    if (previous !== null) while (next - previous > 180) next -= 360
    if (previous !== null) while (previous - next > 180) next += 360
    previous = next
    return [next, lat]
  })
}
function unwrapGeometry<G extends GeoJSON.Geometry | null>(geometry: G): G {
  if (geometry?.type === 'Polygon') return { ...geometry, coordinates: geometry.coordinates.map(unwrapLine) }
  if (geometry?.type === 'MultiPolygon') return { ...geometry, coordinates: geometry.coordinates.map((polygon) => polygon.map(unwrapLine)) }
  return geometry
}
const glowRadius: Record<StayLevel, number> = {
  [StayLevel.ShortVisit]: 9,
  [StayLevel.TwoPlusDays]: 12,
  [StayLevel.FivePlusDays]: 15,
  [StayLevel.LivedThere]: 20,
}

/* Night-garden surface in the site's greens: unvisited land stays quiet so the warm
   stay ramp (travel-types.ts globePalette) is the only colour that reads as "visited". */
const surface = {
  dark: { ocean: '#0e2a21', land: '#3b5446', border: '#6f8c79', ring: '#fff6dc', sky: '#06120d', horizon: '#3f8f6a' },
  light: { ocean: '#c9dccf', land: '#f8f6ee', border: '#a9bcab', ring: '#14281c', sky: '#f7f6f0', horizon: '#b9d4c1' },
}

function skyFor(theme: 'dark' | 'light'): SkySpecification {
  const colors = surface[theme]
  return {
    'sky-color': colors.sky,
    'horizon-color': colors.horizon,
    'fog-color': colors.sky,
    'sky-horizon-blend': 0.8,
    'horizon-fog-blend': 0.8,
    'fog-ground-blend': 1,
    'atmosphere-blend': ['interpolate', ['linear'], ['zoom'], 0, 0.8, 4, 0.6, 7, 0],
  }
}

/** Zoom at which the whole globe fits the shorter side with a little air around it. */
function fittedZoom(width: number, height: number) {
  const side = Math.min(width, height)
  return Math.max(0, Math.log2((side * 0.6 * Math.PI) / 512))
}

export type GlobeHandle = { zoomIn: () => void; zoomOut: () => void; reset: () => void }
export type GlobeInset = { right: number; bottom: number }

export function TravelGlobe({
  ref,
  places,
  theme,
  mapUnit,
  activeId,
  activeCountry,
  photoPlaceIds,
  inset,
  motion,
  onSelectPlace,
  onSelectCountry,
}: {
  ref?: Ref<GlobeHandle>
  places: TravelCity[]
  theme: 'dark' | 'light'
  mapUnit: MapUnit
  activeId: string | null
  activeCountry: string | null
  photoPlaceIds: Set<string>
  inset: GlobeInset
  motion: boolean
  onSelectPlace: (id: string | null) => void
  onSelectCountry: (code: string | null) => void
}) {
  const mapRef = useRef<MapRef | null>(null)
  const [ready, setReady] = useState(false)
  const [touched, setTouched] = useState(false)
  const [hover, setHover] = useState<{ label: string; x: number; y: number } | null>(null)
  const colors = surface[theme]
  const palette = globePalette[theme]
  const [mapStyle] = useState<StyleSpecification>(() => ({
    version: 8,
    projection: { type: 'globe' },
    sky: skyFor(theme),
    // Light from the viewer's side keeps the atmosphere an even halo instead of a lopsided rim.
    light: { anchor: 'viewport', position: [1.5, 0, 0] },
    sources: {
      world: { type: 'geojson', data: world },
      borders: { type: 'geojson', data: borders },
    },
    layers: [
      { id: 'ocean', type: 'background', paint: { 'background-color': colors.ocean } },
      { id: 'land', type: 'fill', source: 'world', paint: { 'fill-color': colors.land } },
      { id: 'borders', type: 'line', source: 'borders', paint: { 'line-color': colors.border, 'line-width': 0.6, 'line-opacity': 0.7 } },
    ],
  }))

  // Recolour in place so a theme switch keeps the camera and sources.
  useEffect(() => {
    const map = mapRef.current?.getMap()
    if (!map || !ready) return
    map.setPaintProperty('ocean', 'background-color', colors.ocean)
    map.setPaintProperty('land', 'fill-color', colors.land)
    map.setPaintProperty('borders', 'line-color', colors.border)
    map.setSky(skyFor(theme))
  }, [colors, theme, ready])

  const placeData = useMemo<FeatureCollection<Point>>(() => ({
    type: 'FeatureCollection',
    features: places.map((place) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [place.lng, place.lat] },
      properties: {
        id: place.id,
        label: `${place.city}, ${place.country}`,
        color: palette[place.level],
        radius: glowRadius[place.level],
        photos: photoPlaceIds.has(place.id),
        priority: levelConfig[place.level].priority,
      },
    })),
  }), [places, palette, photoPlaceIds])

  const countryData = useMemo<FeatureCollection>(() => {
    const strongest = new Map<string, StayLevel>()
    for (const place of places) {
      const current = strongest.get(place.countryCode)
      if (!current || levelConfig[place.level].priority > levelConfig[current].priority) strongest.set(place.countryCode, place.level)
    }
    return {
      type: 'FeatureCollection',
      features: world.features.flatMap((country) => {
        const code = countries.numericToAlpha2(String(country.id ?? '').padStart(3, '0')) ?? ''
        const level = strongest.get(code)
        return level ? [{ ...country, properties: { ...country.properties, countryCode: code, color: palette[level] } }] : []
      }),
    }
  }, [places, palette])

  useImperativeHandle(ref, () => ({
    zoomIn: () => { setTouched(true); mapRef.current?.getMap().zoomIn({ animate: motion }) },
    zoomOut: () => { setTouched(true); mapRef.current?.getMap().zoomOut({ animate: motion }) },
    reset: () => {
      const map = mapRef.current?.getMap()
      if (!map) return
      setTouched(false)
      map.easeTo({ center: [40, 32], zoom: fittedZoom(map.getContainer().clientWidth, map.getContainer().clientHeight), padding: { top: 0, left: 0, ...inset }, duration: motion ? 1100 : 0 })
    },
  }), [motion, inset])

  // A slow eastward drift while nobody is steering; it never runs under reduced motion.
  const spinning = motion && ready && !touched && !activeId && !activeCountry
  useEffect(() => {
    const map = mapRef.current?.getMap()
    if (!map || !spinning) return
    let frame = 0, last = performance.now()
    const turn = (now: number) => {
      const center = map.getCenter()
      map.setCenter([center.lng + Math.min(now - last, 64) * 0.003, center.lat])
      last = now
      frame = requestAnimationFrame(turn)
    }
    frame = requestAnimationFrame(turn)
    return () => cancelAnimationFrame(frame)
  }, [spinning])

  // Bring the selection into view beside the drawer rather than under it.
  useEffect(() => {
    const map = mapRef.current?.getMap()
    if (!map || !ready) return
    const padding = { top: 0, left: 0, ...inset }
    const duration = motion ? 1400 : 0
    const place = places.find((candidate) => candidate.id === activeId)
    if (place) {
      map.flyTo({ center: [place.lng, place.lat], zoom: Math.max(map.getZoom(), 4.2), padding, duration, essential: false })
      return
    }
    if (!activeCountry) return
    const inCountry = places.filter((candidate) => candidate.countryCode === activeCountry)
    if (!inCountry.length) return
    const bounds = inCountry.reduce((box, candidate) => box.extend([candidate.lng, candidate.lat]), new maplibregl.LngLatBounds([inCountry[0].lng, inCountry[0].lat], [inCountry[0].lng, inCountry[0].lat]))
    const side = Math.min(map.getContainer().clientWidth - inset.right, map.getContainer().clientHeight - inset.bottom)
    map.fitBounds(bounds, { padding: { top: side * 0.2, left: side * 0.2, right: inset.right + side * 0.2, bottom: inset.bottom + side * 0.2 }, maxZoom: 5, duration })
  }, [activeId, activeCountry, places, ready, inset, motion])

  function select(event: MapLayerMouseEvent) {
    setTouched(true)
    const hit = event.features?.[0]?.properties
    if (typeof hit?.id === 'string') return onSelectPlace(hit.id)
    if (typeof hit?.countryCode === 'string') return onSelectCountry(hit.countryCode)
    onSelectPlace(null)
  }

  function hovered(event: MapLayerMouseEvent) {
    const hit = event.features?.[0]?.properties
    const label = typeof hit?.label === 'string' ? hit.label
      : typeof hit?.countryCode === 'string' ? countries.getName(hit.countryCode, 'en') ?? hit.countryCode : null
    setHover(label ? { label, x: event.point.x, y: event.point.y } : null)
  }

  const showCities = mapUnit === 'city'
  return (
    <div className="globe-canvas" aria-busy={!ready}>
      <MapView
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={{ longitude: 40, latitude: 32, zoom: fittedZoom(innerWidth, innerHeight - 85) }}
        minZoom={0}
        maxZoom={7}
        maxPitch={0}
        dragRotate={false}
        touchPitch={false}
        renderWorldCopies={false}
        attributionControl={false}
        interactiveLayerIds={showCities ? ['place-core'] : ['country-fill']}
        mapStyle={mapStyle}
        cursor={hover ? 'pointer' : 'grab'}
        onLoad={(event) => {
          const map = event.target
          map.jumpTo({ zoom: fittedZoom(map.getContainer().clientWidth, map.getContainer().clientHeight) })
          map.getCanvas().setAttribute('aria-label', 'Globe of visited places. Drag or use arrow keys to turn it; use the place finder to open a place.')
          setReady(true)
        }}
        onDragStart={() => setTouched(true)}
        onZoomStart={(event) => { if (event.originalEvent) setTouched(true) }}
        onClick={select}
        onMouseMove={hovered}
        onMouseLeave={() => setHover(null)}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Source id="visited-countries" type="geojson" data={countryData}>
          <Layer id="country-fill" type="fill" paint={{
            'fill-color': ['get', 'color'],
            'fill-opacity': showCities ? 0.14 : theme === 'dark' ? 0.78 : 0.62,
          }} />
          <Layer id="country-active" type="line" filter={['==', ['get', 'countryCode'], activeCountry ?? '']} paint={{
            'line-color': colors.ring,
            'line-width': 1.6,
          }} />
        </Source>
        <Source id="places" type="geojson" data={placeData}>
          <Layer id="place-glow" type="circle" layout={{ 'circle-sort-key': ['get', 'priority'] }} paint={{
            'circle-color': ['get', 'color'],
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 0, ['*', ['get', 'radius'], 0.55], 3, ['get', 'radius'], 7, ['*', ['get', 'radius'], 2]],
            'circle-blur': 1,
            'circle-opacity': showCities ? (theme === 'dark' ? 0.6 : 0.42) : 0,
            'circle-pitch-alignment': 'map',
          }} />
          <Layer id="place-photo-ring" type="circle" filter={['==', ['get', 'photos'], true]} paint={{
            'circle-color': 'rgba(0,0,0,0)',
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 0, 5.5, 3, 8, 7, 11.5],
            'circle-stroke-width': 1.2,
            'circle-stroke-color': colors.ring,
            'circle-stroke-opacity': showCities ? 0.85 : 0,
            'circle-pitch-alignment': 'map',
          }} />
          <Layer id="place-core" type="circle" layout={{ 'circle-sort-key': ['get', 'priority'] }} paint={{
            'circle-color': ['get', 'color'],
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 0, 2.8, 3, 4.2, 7, 6.5],
            'circle-stroke-width': ['case', ['==', ['get', 'id'], activeId ?? ''], 2.5, 0],
            'circle-stroke-color': colors.ring,
            'circle-opacity': showCities ? 1 : 0,
            'circle-stroke-opacity': showCities ? 1 : 0,
            'circle-pitch-alignment': 'map',
          }} />
        </Source>
      </MapView>
      {hover ? <span className="globe-tooltip" style={{ transform: `translate(${hover.x}px, ${hover.y}px)` }} aria-hidden="true">{hover.label}</span> : null}
    </div>
  )
}
