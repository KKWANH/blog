'use client'

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Camera, LockKeyhole, Minus, Plus, RotateCcw, Search, X } from 'lucide-react'
import { MapBoundary } from './map-boundary'
import { globePalette, levelConfig, StayLevel, type MapUnit, type TravelCity } from './travel-types'
import type { GlobeHandle, GlobeInset } from './travel-globe'
import { PhotoGallery } from '@/components/photo-gallery'
import { useMotion } from '@/components/motion-provider'
import { useTheme } from '@/components/theme-provider'
import type { TravelGallery } from '@/lib/travel-galleries'

const TravelGlobe = dynamic(() => import('./travel-globe').then((module) => module.TravelGlobe), {
  ssr: false,
  loading: () => <div className="globe-loading" role="status">Turning the globe…</div>,
})

const normalize = (value: string) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
const byName = (a: TravelCity, b: TravelCity) => a.city.localeCompare(b.city, 'en')
type Selection = { kind: 'place'; id: string } | { kind: 'country'; code: string } | null

function useInset(open: boolean) {
  const [inset, setInset] = useState<GlobeInset>({ right: 0, bottom: 0 })
  useEffect(() => {
    const media = matchMedia('(max-width: 760px)')
    const update = () => {
      const stage = document.querySelector<HTMLElement>('.atlas-stage')
      const height = stage?.clientHeight ?? innerHeight
      setInset(!open ? { right: 0, bottom: 0 } : media.matches ? { right: 0, bottom: Math.round(height * 0.55) } : { right: Math.min(448, innerWidth * 0.42), bottom: 0 })
    }
    update()
    media.addEventListener('change', update)
    addEventListener('resize', update)
    return () => { media.removeEventListener('change', update); removeEventListener('resize', update) }
  }, [open])
  return inset
}

export function TravelAtlas({ places, galleries }: { places: TravelCity[]; galleries: Record<string, TravelGallery[]> }) {
  const theme = useTheme().theme === 'light' ? 'light' : 'dark'
  const { enabled: motion } = useMotion()
  const [selection, setSelection] = useState<Selection>(null)
  const [mapUnit, setMapUnit] = useState<MapUnit>('country')
  const [query, setQuery] = useState('')
  const [finderOpen, setFinderOpen] = useState(false)
  const [cursor, setCursor] = useState(0)
  const globe = useRef<GlobeHandle>(null)
  const drawerHeading = useRef<HTMLHeadingElement>(null)
  const finderInput = useRef<HTMLInputElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const listId = useId()

  const sorted = useMemo(() => [...places].sort(byName), [places])
  // Stepping runs west to east, so "next" follows the globe's own turn.
  const journey = useMemo(() => [...places].sort((a, b) => a.lng - b.lng), [places])
  const photoPlaceIds = useMemo(() => new Set(Object.keys(galleries).filter((id) => galleries[id]?.length)), [galleries])
  const countryCount = useMemo(() => new Set(places.map((place) => place.countryCode)).size, [places])
  const lived = places.filter((place) => place.level === StayLevel.LivedThere).length
  const matches = useMemo(() => {
    const term = normalize(query)
    const pool = term ? sorted.filter((place) => normalize(`${place.city} ${place.country}`).includes(term)) : sorted.filter((place) => photoPlaceIds.has(place.id))
    return pool.slice(0, 8)
  }, [query, sorted, photoPlaceIds])

  const place = selection?.kind === 'place' ? places.find((candidate) => candidate.id === selection.id) ?? null : null
  const countryCode = selection?.kind === 'country' ? selection.code : null
  const countryPlaces = countryCode ? sorted.filter((candidate) => candidate.countryCode === countryCode) : []
  const placeGalleries = place ? galleries[place.id] ?? [] : []
  const open = Boolean(place || countryPlaces.length)
  const inset = useInset(open)

  // Deep links: /travel?place=<id> opens that place, as /photography links do.
  useEffect(() => {
    const id = new URLSearchParams(location.search).get('place')
    if (id && places.some((candidate) => candidate.id === id)) setSelection({ kind: 'place', id })
  }, [places])

  useEffect(() => {
    const url = new URL(location.href)
    if (place) url.searchParams.set('place', place.id)
    else url.searchParams.delete('place')
    if (url.href !== location.href) history.replaceState(history.state, '', url)
  }, [place])

  useEffect(() => { setCursor(0) }, [query])

  // Escape closes the drawer from anywhere except a field or an open photo viewer, which handle it themselves.
  const closeRef = useRef(close)
  useEffect(() => { closeRef.current = close })
  useEffect(() => {
    if (!open) return
    const onKey = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (event.key !== 'Escape' || target instanceof HTMLInputElement || document.querySelector('[role="dialog"]')) return
      closeRef.current()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  function choose(next: Selection, focusDrawer = false) {
    if (!selection) returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setSelection(next)
    if (focusDrawer) requestAnimationFrame(() => drawerHeading.current?.focus({ preventScroll: true }))
  }

  function close() {
    setSelection(null)
    const target = returnFocus.current
    returnFocus.current = null
    if (target?.isConnected) target.focus({ preventScroll: true })
  }

  function step(direction: number) {
    if (!place) return
    const index = journey.findIndex((candidate) => candidate.id === place.id)
    choose({ kind: 'place', id: journey[(index + direction + journey.length) % journey.length].id }, true)
  }

  function pick(target: TravelCity) {
    setQuery('')
    setFinderOpen(false)
    returnFocus.current = finderInput.current
    choose({ kind: 'place', id: target.id }, true)
  }

  function finderKeys(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      setFinderOpen(true)
      if (matches.length) setCursor((current) => (current + (event.key === 'ArrowDown' ? 1 : -1) + matches.length) % matches.length)
    } else if (event.key === 'Enter' && finderOpen && matches[cursor]) {
      event.preventDefault()
      pick(matches[cursor])
    } else if (event.key === 'Escape') {
      if (query) setQuery('')
      else setFinderOpen(false)
    }
  }

  const palette = globePalette[theme]
  const showFinder = finderOpen && matches.length > 0
  return (
    <div className="atlas-stage" data-drawer={open ? 'open' : 'closed'}>
      <MapBoundary>
        <TravelGlobe
          ref={globe}
          places={places}
          theme={theme}
          mapUnit={mapUnit}
          activeId={place?.id ?? null}
          activeCountry={countryCode ?? place?.countryCode ?? null}
          photoPlaceIds={photoPlaceIds}
          inset={inset}
          motion={motion}
          onSelectPlace={(id) => id ? choose({ kind: 'place', id }) : close()}
          onSelectCountry={(code) => code ? choose({ kind: 'country', code }) : close()}
        />
      </MapBoundary>

      <header className="atlas-title">
        <h1>Places I&apos;ve been</h1>
        <p><strong>{places.length}</strong> places <span aria-hidden="true">·</span> <strong>{countryCount}</strong> countries <span aria-hidden="true">·</span> <strong>{lived}</strong> lived in</p>
      </header>

      <div className="atlas-finder" role="search">
        <label htmlFor={`${listId}-input`} className="sr-only">Find a place</label>
        <Search aria-hidden="true" />
        <input
          ref={finderInput}
          id={`${listId}-input`}
          type="search"
          role="combobox"
          aria-expanded={showFinder}
          aria-controls={`${listId}-list`}
          aria-autocomplete="list"
          aria-activedescendant={showFinder ? `${listId}-${cursor}` : undefined}
          placeholder="Find a place"
          autoComplete="off"
          value={query}
          onChange={(event) => { setQuery(event.target.value); setFinderOpen(true) }}
          onFocus={() => setFinderOpen(true)}
          onBlur={() => setFinderOpen(false)}
          onKeyDown={finderKeys}
        />
        <ul id={`${listId}-list`} role="listbox" aria-label={query ? 'Matching places' : 'Places with photographs'} hidden={!showFinder}>
          {!query ? <li className="atlas-finder-hint" role="presentation">With photographs</li> : null}
          {matches.map((candidate, index) => (
            <li
              key={candidate.id}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === cursor}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => pick(candidate)}
              onMouseEnter={() => setCursor(index)}
            >
              <span className="atlas-dot" style={{ background: palette[candidate.level] }} aria-hidden="true" />
              <span>{candidate.city}<small>{candidate.country}</small></span>
              {photoPlaceIds.has(candidate.id) ? <Camera role="img" aria-label="Has photographs" /> : null}
            </li>
          ))}
        </ul>
        <span className="sr-only" role="status" aria-live="polite">{finderOpen && query ? `${matches.length} place${matches.length === 1 ? '' : 's'} found` : ''}</span>
      </div>

      <div className="atlas-key">
        <div className="atlas-unit" role="group" aria-label="Show on the globe">
          <button type="button" aria-pressed={mapUnit === 'city'} onClick={() => setMapUnit('city')}>Cities</button>
          <button type="button" aria-pressed={mapUnit === 'country'} onClick={() => setMapUnit('country')}>Countries</button>
        </div>
        <ul aria-label="Time spent">
          {Object.values(StayLevel).map((level) => <li key={level}><span className="atlas-dot" style={{ background: palette[level] }} aria-hidden="true" />{levelConfig[level].label}</li>)}
          {photoPlaceIds.size ? <li><span className="atlas-dot atlas-dot-ring" aria-hidden="true" />Photographs</li> : null}
        </ul>
      </div>

      <div className="atlas-controls" role="group" aria-label="Globe view">
        <button type="button" aria-label="Zoom in" onClick={() => globe.current?.zoomIn()}><Plus aria-hidden="true" /></button>
        <button type="button" aria-label="Zoom out" onClick={() => globe.current?.zoomOut()}><Minus aria-hidden="true" /></button>
        <button type="button" aria-label="Show the whole globe" onClick={() => { if (open) close(); globe.current?.reset() }}><RotateCcw aria-hidden="true" /></button>
        <Link href="/travel/manage" aria-label="Edit atlas (owner)" title="Edit atlas"><LockKeyhole aria-hidden="true" /></Link>
      </div>

      <aside className="atlas-drawer" aria-label={place ? `${place.city}, ${place.country}` : 'Selected country'} hidden={!open}>
        {place ? <>
          <div className="atlas-drawer-head">
            <p className="atlas-drawer-kicker"><span className="atlas-dot" style={{ background: palette[place.level] }} aria-hidden="true" />{levelConfig[place.level].label}</p>
            <h2 ref={drawerHeading} tabIndex={-1}>{place.city}</h2>
            <button type="button" className="atlas-drawer-country" onClick={() => choose({ kind: 'country', code: place.countryCode }, true)}>{place.country}</button>
            <button type="button" className="atlas-drawer-close" aria-label="Close" onClick={close}><X aria-hidden="true" /></button>
          </div>
          <div className="atlas-drawer-body">
            {placeGalleries.length ? placeGalleries.map((gallery) => (
              <section key={gallery.id} className="atlas-gallery" aria-label={gallery.title}>
                <header>
                  <h3>{gallery.title}</h3>
                  <p>{[gallery.date, `${gallery.photos.length} photograph${gallery.photos.length === 1 ? '' : 's'}`].filter(Boolean).join(' · ')}</p>
                  {gallery.summary ? <p className="atlas-gallery-summary">{gallery.summary}</p> : null}
                </header>
                <PhotoGallery photographs={gallery.photos} />
              </section>
            )) : <p className="atlas-drawer-empty">No photographs from {place.city} yet.</p>}
          </div>
          <nav className="atlas-drawer-steps" aria-label="Neighbouring places">
            <button type="button" onClick={() => step(-1)}><ArrowLeft aria-hidden="true" />West</button>
            <button type="button" onClick={() => step(1)}>East<ArrowRight aria-hidden="true" /></button>
          </nav>
        </> : countryPlaces.length ? <>
          <div className="atlas-drawer-head">
            <p className="atlas-drawer-kicker">{countryPlaces.length} place{countryPlaces.length === 1 ? '' : 's'}</p>
            <h2 ref={drawerHeading} tabIndex={-1}>{countryPlaces[0].country}</h2>
            <button type="button" className="atlas-drawer-close" aria-label="Close" onClick={close}><X aria-hidden="true" /></button>
          </div>
          <ul className="atlas-drawer-places">
            {countryPlaces.map((candidate) => (
              <li key={candidate.id}>
                <button type="button" onClick={() => choose({ kind: 'place', id: candidate.id }, true)}>
                  <span className="atlas-dot" style={{ background: palette[candidate.level] }} aria-hidden="true" />
                  <span>{candidate.city}<small>{levelConfig[candidate.level].label}</small></span>
                  {photoPlaceIds.has(candidate.id) ? <Camera role="img" aria-label="Has photographs" /> : null}
                </button>
              </li>
            ))}
          </ul>
        </> : null}
      </aside>
    </div>
  )
}
