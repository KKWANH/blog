'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet'
import styles from '@/components/travel/travel-explorer.module.css'
import { levelConfig, type TravelCity } from '@/components/travel/travel-types'
import { useTheme } from '@/components/theme-provider'

function MapEffects({
  activeCity,
  cities,
}: {
  activeCity: TravelCity | null
  cities: TravelCity[]
}) {
  const map = useMap()

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      map.invalidateSize()
    }, 50)

    return () => window.clearTimeout(timeout)
  }, [map])

  useEffect(() => {
    if (activeCity) {
      map.flyTo([activeCity.lat, activeCity.lng], Math.max(map.getZoom(), 6), {
        duration: 1.2,
      })
      return
    }

    if (!cities.length) {
      return
    }

    const bounds = L.latLngBounds(cities.map((city) => [city.lat, city.lng] as [number, number]))
    map.fitBounds(bounds.pad(0.2), { animate: true, duration: 1 })
  }, [activeCity, cities, map])

  return null
}

export function TravelMap({
  activeCity,
  cities,
  onSelectCity,
}: {
  activeCity: TravelCity | null
  cities: TravelCity[]
  onSelectCity: (cityId: string) => void
}) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
  const tileAttribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

  return (
    <div className={`${styles.mapWrap} ${isDark ? styles.mapThemeDark : styles.mapThemeLight}`}>
      <MapContainer
        center={[30, 15]}
        zoom={2}
        minZoom={2}
        scrollWheelZoom
        className={styles.map}
        worldCopyJump
        preferCanvas
      >
        <TileLayer
          attribution={tileAttribution}
          url={tileUrl}
          subdomains={['a', 'b', 'c', 'd']}
        />

        <MapEffects activeCity={activeCity} cities={cities} />

        {cities.map((city) => {
          const config = levelConfig[city.level]
          const isActive = city.id === activeCity?.id

          return (
            <CircleMarker
              key={city.id}
              center={[city.lat, city.lng]}
              pathOptions={{
                color: '#111827',
                fillColor: config.color,
                fillOpacity: isActive ? 0.92 : 0.72,
                weight: isActive ? 2 : 1,
              }}
              radius={isActive ? config.radius + 3 : config.radius}
              eventHandlers={{
                click: () => onSelectCity(city.id),
              }}
            >
              <Popup>
                <div className={styles.popup}>
                  <div>
                    <p className={styles.popupName}>{city.city}</p>
                    <p className={styles.cityCountry}>{city.country}</p>
                  </div>
                  <p className={styles.popupMeta}>{config.label}</p>
                </div>
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}
