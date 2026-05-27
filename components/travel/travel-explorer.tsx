'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { StayLevel, type MapUnit, levelConfig, type TravelCity } from '@/components/travel/travel-types'

// Map theme classes (maplibregl popup, ctrl group, etc.) live in the css
// module, which is imported separately by TravelMap.

const TravelMap = dynamic(
  () => import('@/components/travel/travel-map').then((module) => module.TravelMap),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 overflow-hidden">
        {/* Shimmer base */}
        <div className="skeleton-shimmer absolute inset-0 rounded-none border-0" />
        {/* Faint grid lines to suggest a map */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.06]"
          aria-hidden
        >
          <defs>
            <pattern id="map-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
        </svg>
        {/* Label */}
        <div className="absolute inset-0 flex items-end justify-start p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
            Loading map
            <span className="inline-flex gap-0.5 ml-1.5">
              <span className="animate-[bounce_1s_ease-in-out_0s_infinite] inline-block">·</span>
              <span className="animate-[bounce_1s_ease-in-out_0.2s_infinite] inline-block">·</span>
              <span className="animate-[bounce_1s_ease-in-out_0.4s_infinite] inline-block">·</span>
            </span>
          </p>
        </div>
      </div>
    ),
  },
)

export function TravelExplorer({ cities }: { cities: TravelCity[] }) {
  const [selectedLevel, setSelectedLevel] = useState<StayLevel | 'all'>('all')
  const [activeCityId, setActiveCityId] = useState<string | null>(null)
  const [mapUnit, setMapUnit] = useState<MapUnit>('city')

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

  const activeCity = activeCityId
    ? filteredCities.find((city) => city.id === activeCityId) ?? null
    : null

  useEffect(() => {
    if (activeCityId && !filteredCities.some((city) => city.id === activeCityId)) {
      setActiveCityId(null)
    }
  }, [activeCityId, filteredCities])

  const livedCount = cities.filter((city) => city.level === StayLevel.LivedThere).length
  const countries = new Set(cities.map((city) => city.country)).size
  const levelOptions = Object.entries(levelConfig)

  return (
    <div className="space-y-10">
      {/* ===== Intro + stats ===== */}
      <section className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:items-start">
        <div className="space-y-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Depth over distance
          </p>
          <p className="max-w-2xl text-base md:text-lg leading-8 text-muted-foreground">
            A place shapes you differently at 24 hours than at 24 days. The
            distinction matters — between passing through, adjusting, and
            actually living somewhere. This map tracks which.
          </p>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            Filter by stay depth, click any city, or pan directly on the map.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Stat label="Cities" value={cities.length} />
          <Stat label="Countries" value={countries} />
          <Stat label="Lived in" value={livedCount} />
          <Stat
            label="Filter"
            value={selectedLevel === 'all' ? 'All' : levelConfig[selectedLevel].label}
          />
        </div>
      </section>

      {/* ===== Map + controls ===== */}
      <section className="grid gap-5 lg:grid-cols-[1fr_15rem] lg:items-start">
        <div className="relative min-h-[28rem] overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm md:min-h-[34rem]">
          <TravelMap
            activeCity={activeCity}
            cities={filteredCities}
            mapUnit={mapUnit}
            onSelectCity={setActiveCityId}
          />
        </div>

        <aside className="grid gap-4 lg:sticky lg:top-20">
          <Panel title="Map mode">
            <div className="grid grid-cols-2 gap-2">
              <ToggleButton active={mapUnit === 'country'} onClick={() => setMapUnit('country')}>
                Country fill
              </ToggleButton>
              <ToggleButton active={mapUnit === 'city'} onClick={() => setMapUnit('city')}>
                City blobs
              </ToggleButton>
            </div>
          </Panel>

          <Panel title="Stay level">
            <div className="flex flex-col gap-1.5">
              <ToggleButton
                active={selectedLevel === 'all'}
                onClick={() => setSelectedLevel('all')}
              >
                All stays
              </ToggleButton>
              {levelOptions.map(([level, config]) => (
                <ToggleButton
                  key={level}
                  active={selectedLevel === level}
                  onClick={() => setSelectedLevel(level as StayLevel)}
                >
                  <span
                    className="inline-block h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                  <span>{config.label}</span>
                </ToggleButton>
              ))}
            </div>
          </Panel>
        </aside>
      </section>

      {/* ===== City list ===== */}
      <section className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-5 md:p-6">
        <header className="flex flex-wrap items-baseline justify-between gap-3 pb-3 border-b border-border/40">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Visited cities
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {filteredCities.length} visible
          </p>
        </header>

        {filteredCities.length ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCities.map((city) => {
              const config = levelConfig[city.level]
              const isActive = city.id === activeCity?.id

              return (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => setActiveCityId(city.id)}
                  className={`group rounded-xl border bg-card/30 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-foreground/40 ${
                    isActive
                      ? 'border-foreground/50 bg-card/60'
                      : 'border-border/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-base font-medium tracking-tight text-foreground">
                        {city.city}
                      </p>
                      <p className="mt-0.5 truncate text-sm text-muted-foreground">
                        {city.country}
                      </p>
                    </div>
                    <span
                      className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-x-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span>{config.label}</span>
                    <span>·</span>
                    <span>
                      {city.lat.toFixed(1)}, {city.lng.toFixed(1)}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            No cities match the current level filter.
          </p>
        )}
      </section>

    </div>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl tracking-tight md:text-3xl">{value}</p>
    </div>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-colors ${
        active
          ? 'border-foreground/40 bg-foreground/10 text-foreground'
          : 'border-border/50 bg-background/30 text-muted-foreground hover:border-foreground/30 hover:text-foreground'
      }`}
    >
      {children}
    </button>
  )
}
