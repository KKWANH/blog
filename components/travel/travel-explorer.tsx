'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from '@/components/travel/travel-explorer.module.css'
import { levelConfig, type StayLevel, type TravelCity } from '@/components/travel/travel-types'

const TravelMap = dynamic(
  () => import('@/components/travel/travel-map').then((module) => module.TravelMap),
  {
    ssr: false,
    loading: () => <div className={styles.mapLoading}>Loading map...</div>,
  },
)

export function TravelExplorer({ cities }: { cities: TravelCity[] }) {
  const [selectedLevel, setSelectedLevel] = useState<StayLevel | 'all'>('all')
  const [activeCityId, setActiveCityId] = useState<string | null>(cities[0]?.id ?? null)

  const filteredCities = useMemo(() => {
    const visible = selectedLevel === 'all'
      ? cities
      : cities.filter((city) => city.level === selectedLevel)

    return [...visible].sort((left, right) => {
      const levelDiff = levelConfig[right.level].priority - levelConfig[left.level].priority
      if (levelDiff !== 0) {
        return levelDiff
      }

      return left.city.localeCompare(right.city)
    })
  }, [cities, selectedLevel])

  const activeCity = filteredCities.find((city) => city.id === activeCityId) ?? filteredCities[0] ?? null

  useEffect(() => {
    if (!filteredCities.some((city) => city.id === activeCityId)) {
      setActiveCityId(filteredCities[0]?.id ?? null)
    }
  }, [activeCityId, filteredCities])

  const livedCount = cities.filter((city) => city.level === 'lived-there').length
  const countries = new Set(cities.map((city) => city.country)).size
  const levelOptions = Object.values(levelConfig)

  return (
    <div className={styles.shell}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Travel Atlas</p>
        <div className={styles.heroGrid}>
          <div>
            <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-6xl">
              A personal geography of places that stayed long enough to matter.
            </h2>
            <p className={styles.heroText}>
              This map is not a generic pins-on-a-globe tracker. It distinguishes between places
              passed through quickly, places that required a few days of living rhythm, and places
              that became actual base layers in memory. Use the filters, click a city card, or pan
              and zoom directly on the map.
            </p>
          </div>

          <div className={styles.stats}>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Cities</p>
              <p className={styles.statValue}>{cities.length}</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Countries</p>
              <p className={styles.statValue}>{countries}</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Lived There</p>
              <p className={styles.statValue}>{livedCount}</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statLabel}>Current Focus</p>
              <p className={styles.statValue}>{selectedLevel === 'all' ? 'All' : levelConfig[selectedLevel].label}</p>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.grid}>
        <div className={styles.mapCard}>
          <TravelMap
            activeCity={activeCity}
            cities={filteredCities}
            onSelectCity={setActiveCityId}
          />

          <div className={styles.mapLegend}>
            <p className={styles.mapLegendTitle}>Stay Level</p>
            {levelOptions.map((config) => (
              <div key={config.label} className={styles.legendRow}>
                <span className={styles.dot} style={{ backgroundColor: config.color }} />
                <span>{config.label}</span>
              </div>
            ))}
            <p className={styles.legendHint}>Scroll to zoom, drag to pan, or click a city from the list to jump.</p>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <section className={styles.panel}>
            <p className={styles.panelTitle}>Filter</p>
            <div className={styles.levelFilters}>
              <button
                type="button"
                onClick={() => setSelectedLevel('all')}
                className={`${styles.levelButton}${selectedLevel === 'all' ? ` ${styles.levelButtonActive}` : ''}`}
              >
                <span>All stays</span>
              </button>
              {Object.entries(levelConfig).map(([level, config]) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedLevel(level as StayLevel)}
                  className={`${styles.levelButton}${selectedLevel === level ? ` ${styles.levelButtonActive}` : ''}`}
                >
                  <span className={styles.dot} style={{ backgroundColor: config.color }} />
                  <span>{config.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.panel}>
            <p className={styles.panelTitle}>Visited Cities</p>
            {filteredCities.length ? (
              <div className={styles.cityList}>
                {filteredCities.map((city) => {
                  const config = levelConfig[city.level]
                  const isActive = city.id === activeCity?.id

                  return (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => setActiveCityId(city.id)}
                      className={`${styles.cityCard}${isActive ? ` ${styles.cityCardActive}` : ''}`}
                    >
                      <div className={styles.cityHeader}>
                        <div>
                          <p className={styles.cityName}>{city.city}</p>
                          <p className={styles.cityCountry}>{city.country}</p>
                        </div>
                        <span className={styles.dot} style={{ backgroundColor: config.color }} />
                      </div>
                  <div className={styles.cityMeta}>
                        <span>{config.label}</span>
                        <span>·</span>
                        <span>{city.lat.toFixed(1)}, {city.lng.toFixed(1)}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <p className={styles.empty}>No cities match the current level filter.</p>
            )}
          </section>
        </aside>
      </div>
    </div>
  )
}
