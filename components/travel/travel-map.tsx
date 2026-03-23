'use client'

import { useEffect, useMemo, useRef } from 'react'
import countries from 'i18n-iso-countries'
import countryNames from 'i18n-iso-countries/langs/en.json'
import maplibregl from 'maplibre-gl'
import countriesAtlas from 'world-atlas/countries-110m.json'
import { feature } from 'topojson-client'
import MapView, {
  Layer,
  NavigationControl,
  Popup,
  Source,
  type MapLayerMouseEvent,
  type MapRef,
} from 'react-map-gl/maplibre'
import styles from '@/components/travel/travel-explorer.module.css'
import { StayLevel, levelConfig, type MapUnit, type TravelCity } from '@/components/travel/travel-types'
import { useTheme } from '@/components/theme-provider'

countries.registerLocale(countryNames)

const baseCountryFeatures = feature(
  countriesAtlas as never,
  (countriesAtlas as typeof countriesAtlas).objects.countries,
)

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
  onSelectCity: (cityId: string) => void
}) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const mapRef = useRef<MapRef | null>(null)
  const tileVariant = isDark ? 'dark_all' : 'light_all'
  const mapStyle = useMemo(
    () => ({
      version: 8,
      glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
      sources: {
        carto: {
          type: 'raster',
          tiles: ['a', 'b', 'c', 'd'].map(
            (subdomain) => `https://${subdomain}.basemaps.cartocdn.com/${tileVariant}/{z}/{x}/{y}.png`,
          ),
          tileSize: 256,
          attribution:
            '&copy; OpenStreetMap contributors &copy; CARTO',
        },
      },
      layers: [
        {
          id: 'carto-base',
          type: 'raster',
          source: 'carto',
        },
      ],
    }),
    [tileVariant],
  )

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

  const countryGeoJson = useMemo(() => {
    return {
      type: 'FeatureCollection',
      features: baseCountryFeatures.features.map((countryFeature) => {
        const numericId = String(countryFeature.id ?? '').padStart(3, '0')
        const countryCode = countries.numericToAlpha2(numericId) ?? ''
        const aggregate = countryAggregates.get(countryCode)

        return {
          ...countryFeature,
          properties: {
            ...countryFeature.properties,
            countryCode,
            level: aggregate?.level ?? null,
            count: aggregate?.count ?? 0,
            fillColor: getLevelColor(aggregate?.level),
          },
        }
      }),
    }
  }, [countryAggregates])

  const cityGeoJson = useMemo(() => {
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

  const countryFillLayer = useMemo(
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

  const countryOutlineLayer = useMemo(
    () => ({
      id: 'country-outline',
      type: 'line',
      paint: {
        'line-color': isDark ? 'rgba(226, 232, 240, 0.28)' : 'rgba(15, 23, 42, 0.18)',
        'line-width': mapUnit === 'country' ? 1 : 0.8,
      },
    }),
    [isDark, mapUnit],
  )

  const cityBlobGlowLayer = useMemo(
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

  const cityBlobCoreLayer = useMemo(
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

  const cityLabelLayer = useMemo(
    () => ({
      id: 'city-labels',
      type: 'symbol',
      layout: {
        'text-field': ['get', 'label'],
        'text-font': ['Inter Regular'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 2.5, 0, 4.5, 11, 7, 14],
        'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
        'text-radial-offset': 0.9,
        'text-allow-overlap': false,
      },
      paint: {
        'text-color': isDark ? '#f8fafc' : '#111827',
        'text-halo-color': isDark ? 'rgba(2, 6, 23, 0.92)' : 'rgba(255, 255, 255, 0.94)',
        'text-halo-width': 1.2,
        'text-opacity': mapUnit === 'city' ? ['interpolate', ['linear'], ['zoom'], 3.5, 0, 5.5, 0.78, 7.5, 1] : 0,
      },
    }),
    [isDark, mapUnit],
  )

  useEffect(() => {
    const map = mapRef.current?.getMap()
    if (!map) {
      return
    }

    if (activeCity) {
      map.flyTo({
        center: [activeCity.lng, activeCity.lat],
        zoom: Math.max(map.getZoom(), 5.5),
        duration: 1200,
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
      padding: 72,
      duration: 1000,
      maxZoom: 4.8,
    })
  }, [activeCity, cities])

  function handleMapClick(event: MapLayerMouseEvent) {
    const clickedFeature = event.features?.[0]
    if (!clickedFeature) {
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
      }
    }
  }

  return (
    <div className={`${styles.mapWrap} ${isDark ? styles.mapThemeDark : styles.mapThemeLight}`}>
      <MapView
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={{
          longitude: 15,
          latitude: 30,
          zoom: 1.8,
        }}
        minZoom={1.6}
        maxZoom={11}
        dragRotate={false}
        doubleClickZoom
        interactiveLayerIds={['country-fill', 'city-blob-core']}
        mapStyle={mapStyle as never}
        onClick={handleMapClick}
        className={styles.map}
      >
        <NavigationControl position="top-right" />

        <Source id="countries" type="geojson" data={countryGeoJson as never}>
          <Layer {...(countryFillLayer as never)} />
          <Layer {...(countryOutlineLayer as never)} />
        </Source>

        <Source id="cities" type="geojson" data={cityGeoJson as never}>
          <Layer {...(cityBlobGlowLayer as never)} />
          <Layer {...(cityBlobCoreLayer as never)} />
          <Layer {...(cityLabelLayer as never)} />
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
