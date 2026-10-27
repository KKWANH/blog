'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import countries from 'i18n-iso-countries'
import countryNames from 'i18n-iso-countries/langs/en.json'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import countriesAtlas from 'world-atlas/countries-110m.json'
import { feature } from 'topojson-client'
import type { GeometryCollection, Topology } from 'topojson-specification'
import type { FeatureCollection, Point } from 'geojson'
import type { StyleSpecification } from 'maplibre-gl'
import MapView, {
  Layer,
  NavigationControl,
  Popup,
  Source,
  type MapLayerMouseEvent,
  type MapRef,
  type LayerProps,
} from 'react-map-gl/maplibre'
import styles from '@/components/travel/travel-explorer.module.css'
import { StayLevel, levelConfig, type MapUnit, type TravelCity } from '@/components/travel/travel-types'
import { useMotion } from '@/components/motion-provider'

countries.registerLocale(countryNames)
maplibregl.setWorkerUrl('/maplibre-worker.mjs')

const worldTopology = countriesAtlas as unknown as Topology<{
  countries: GeometryCollection<{ name: string }>
}>
const baseCountryFeatures = feature(worldTopology, worldTopology.objects.countries)

function getLevelColor(level?: string | null) {
  if (!level) {
    return 'rgba(148, 163, 184, 0.08)'
  }

  return levelConfig[level as StayLevel]?.color ?? 'rgba(148, 163, 184, 0.12)'
}

function getBlobRadius(level: StayLevel) {
  switch (level) {
    case StayLevel.ShortVisit:
      return 18
    case StayLevel.TwoPlusDays:
      return 28
    case StayLevel.FivePlusDays:
      return 38
    case StayLevel.LivedThere:
      return 52
    default:
      return 24
  }
}

export function TravelMap({
  activeCity,
  cities,
  mapUnit,
  onSelectCity,
}: {
  activeCity: TravelCity | null
  cities: TravelCity[]
  mapUnit: MapUnit
  onSelectCity: (cityId: string | null) => void
}) {
  const isDark = true
  const { enabled: motionEnabled } = useMotion()
  const mapRef = useRef<MapRef | null>(null)
  const [ready, setReady] = useState(false)
  const [mapStyle] = useState<StyleSpecification>(
    () => ({
      version: 8,
      sources: {
        world: {
          type: 'geojson',
          data: baseCountryFeatures,
          attribution: '<a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Natural Earth</a>',
        },
      },
      layers: [
        {
          id: 'paper',
          type: 'background',
          paint: { 'background-color': isDark ? '#111d17' : '#e8eddf' },
        },
        {
          id: 'land',
          type: 'fill',
          source: 'world',
          paint: { 'fill-color': isDark ? '#23382b' : '#f4f5ee' },
        },
        {
          id: 'boundaries',
          type: 'line',
          source: 'world',
          paint: {
            'line-color': isDark ? '#526a59' : '#aebda7',
            'line-width': 0.7,
          },
        },
      ],
    }),
  )

  // Keep source identity stable while filters and the editor update their data.
  // Recolouring a loaded style avoids rebuilding its sources on a theme change.
  useEffect(() => {
    const map = mapRef.current?.getMap()
    if (!map || !ready || !map.getLayer('paper')) return
    map.setPaintProperty('paper', 'background-color', isDark ? '#111d17' : '#e8eddf')
    map.setPaintProperty('land', 'fill-color', isDark ? '#23382b' : '#f4f5ee')
    map.setPaintProperty('boundaries', 'line-color', isDark ? '#526a59' : '#aebda7')
  }, [isDark, ready])

  const countryAggregates = useMemo(() => {
    const aggregates = new globalThis.Map<string, { level: StayLevel; count: number; cities: TravelCity[] }>()

    for (const city of cities) {
      const current = aggregates.get(city.countryCode)
      if (!current) {
        aggregates.set(city.countryCode, {
          level: city.level,
          count: 1,
          cities: [city],
        })
        continue
      }

      const nextLevel =
        levelConfig[city.level].priority > levelConfig[current.level].priority ? city.level : current.level

      aggregates.set(city.countryCode, {
        level: nextLevel,
        count: current.count + 1,
        cities: [...current.cities, city],
      })
    }

    return aggregates
  }, [cities])

  const countryGeoJson = useMemo<FeatureCollection>(() => {
    return {
      type: 'FeatureCollection',
      features: baseCountryFeatures.features.flatMap((countryFeature) => {
        const numericId = String(countryFeature.id ?? '').padStart(3, '0')
        const countryCode = countries.numericToAlpha2(numericId) ?? ''
        const aggregate = countryAggregates.get(countryCode)

        if (!aggregate) {
          return []
        }

        return [{
          ...countryFeature,
          properties: {
            ...countryFeature.properties,
            countryCode,
            level: aggregate.level,
            count: aggregate.count,
            fillColor: getLevelColor(aggregate.level),
          },
        }]
      }),
    }
  }, [countryAggregates])

  const cityGeoJson = useMemo<FeatureCollection<Point>>(() => {
    return {
      type: 'FeatureCollection',
      features: cities.map((city) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [city.lng, city.lat],
        },
        properties: {
          id: city.id,
          city: city.city,
          country: city.country,
          countryCode: city.countryCode,
          level: city.level,
          fillColor: getLevelColor(city.level),
          blobRadius: getBlobRadius(city.level),
          coreRadius: Math.max(6, Math.round(getBlobRadius(city.level) * 0.28)),
          label: city.city,
        },
      })),
    }
  }, [cities])

  const countryFillLayer = useMemo<LayerProps>(
    () => ({
      id: 'country-fill',
      type: 'fill',
      paint: {
        'fill-color': ['coalesce', ['get', 'fillColor'], 'rgba(148, 163, 184, 0.08)'],
        'fill-opacity': mapUnit === 'country' ? 0.42 : 0.08,
      },
    }),
    [mapUnit],
  )

  const countryOutlineLayer = useMemo<LayerProps>(
    () => ({
      id: 'country-outline',
      type: 'line',
      paint: {
        'line-color': isDark ? 'rgba(237, 240, 243, 0.65)' : 'rgba(35, 41, 44, 0.65)',
        'line-width': mapUnit === 'country' ? 1.3 : 0.8,
      },
    }),
    [isDark, mapUnit],
  )

  const cityBlobGlowLayer = useMemo<LayerProps>(
    () => ({
      id: 'city-blob-glow',
      type: 'circle',
      paint: {
        'circle-color': ['get', 'fillColor'],
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          1.6,
          ['*', ['get', 'blobRadius'], 0.5],
          4,
          ['get', 'blobRadius'],
          8,
          ['*', ['get', 'blobRadius'], 1.7],
        ],
        'circle-blur': 0.9,
        'circle-opacity': mapUnit === 'city' ? (isDark ? 0.42 : 0.26) : 0,
      },
    }),
    [isDark, mapUnit],
  )

  const cityBlobCoreLayer = useMemo<LayerProps>(
    () => ({
      id: 'city-blob-core',
      type: 'circle',
      paint: {
        'circle-color': ['get', 'fillColor'],
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          1.6,
          ['*', ['get', 'coreRadius'], 0.75],
          4,
          ['get', 'coreRadius'],
          8,
          ['*', ['get', 'coreRadius'], 1.35],
        ],
        'circle-blur': 0.25,
        'circle-stroke-width': [
          'case',
          ['==', ['get', 'id'], activeCity?.id ?? ''],
          1.5,
          0,
        ],
        'circle-stroke-color': isDark ? 'rgba(248, 250, 252, 0.92)' : 'rgba(15, 23, 42, 0.82)',
        'circle-opacity': mapUnit === 'city' ? 0.88 : 0,
      },
    }),
    [activeCity?.id, isDark, mapUnit],
  )

  useEffect(() => {
    const map = mapRef.current?.getMap()
    if (!map || !ready) {
      return
    }

    if (activeCity) {
      map.flyTo({
        center: [activeCity.lng, activeCity.lat],
        zoom: Math.max(map.getZoom(), 5.5),
        duration: motionEnabled ? 900 : 0,
      })
      return
    }

    if (!cities.length) {
      return
    }

    const bounds = cities.reduce(
      (accumulator, city) => accumulator.extend([city.lng, city.lat]),
      new maplibregl.LngLatBounds([cities[0].lng, cities[0].lat], [cities[0].lng, cities[0].lat]),
    )

    map.fitBounds(bounds, {
      padding: Math.min(56, map.getContainer().clientWidth * 0.1),
      duration: 0,
      maxZoom: 4.8,
    })
  }, [activeCity, cities, ready, motionEnabled])

  function handleMapClick(event: MapLayerMouseEvent) {
    const clickedFeature = event.features?.[0]
    if (!clickedFeature) {
      onSelectCity(null)
      return
    }

    const clickedId = clickedFeature.properties?.id
    if (typeof clickedId === 'string') {
      onSelectCity(clickedId)
      return
    }

    const clickedCountryCode = clickedFeature.properties?.countryCode
    if (typeof clickedCountryCode === 'string') {
      const firstCity = cities.find((city) => city.countryCode === clickedCountryCode)
      if (firstCity) {
        onSelectCity(firstCity.id)
        return
      }
    }

    onSelectCity(null)
  }

  return (
    <div className={`${styles.mapWrap} ${isDark ? styles.mapThemeDark : styles.mapThemeLight}`} role="group" aria-label="Visited places map" aria-busy={!ready}>
      <MapView
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={{
          longitude: 15,
          latitude: 30,
          zoom: 1.8,
        }}
        minZoom={0}
        maxZoom={7}
        dragRotate={false}
        cooperativeGestures
        doubleClickZoom
        interactiveLayerIds={mapUnit === 'country' ? ['country-fill'] : ['city-blob-core']}
        mapStyle={mapStyle}
        onClick={handleMapClick}
        onIdle={() => setReady(true)}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" />

        <Source id="countries" type="geojson" data={countryGeoJson}>
          <Layer {...countryFillLayer} />
          <Layer {...countryOutlineLayer} />
        </Source>

        <Source id="cities" type="geojson" data={cityGeoJson}>
          <Layer {...cityBlobGlowLayer} />
          <Layer {...cityBlobCoreLayer} />
        </Source>

        {activeCity ? (
          <Popup
            longitude={activeCity.lng}
            latitude={activeCity.lat}
            closeButton={false}
            closeOnClick={false}
            offset={20}
          >
            <div className={styles.popup}>
              <div>
                <p className={styles.popupName}>{activeCity.city}</p>
                <p className={styles.cityCountry}>{activeCity.country}</p>
              </div>
              <p className={styles.popupMeta}>{levelConfig[activeCity.level].label}</p>
            </div>
          </Popup>
        ) : null}
      </MapView>
    </div>
  )
}
