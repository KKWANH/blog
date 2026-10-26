'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Search, Pencil, Plus, LocateFixed, Undo2 } from 'lucide-react'
import { MapBoundary } from './map-boundary'
import { StayLevel, levelConfig, type MapUnit, type TravelCity, type TravelEditorAccess, type TravelSnapshot } from './travel-types'

const TravelMap = dynamic(() => import('./travel-map').then((module) => module.TravelMap), {
  ssr: false,
  loading: () => <div className="atlas-map-loading" role="status">Opening the atlas…</div>,
})
const TravelEditor = dynamic(() => import('./travel-editor').then((module) => module.TravelEditor), {
  ssr: false,
  loading: () => <span className="sr-only" role="status">Opening place editor…</span>,
})
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
function matchesFilters(place: TravelCity, query: string, country: string, level: StayLevel | 'all') {
  const term = normalize(query)
  return (country === 'all' || place.countryCode === country) &&
    (level === 'all' || place.level === level) &&
    (!term || normalize(`${place.city} ${place.country} ${place.countryCode}`).includes(term))
}

export function TravelExplorer({ initialSnapshot }: { initialSnapshot: TravelSnapshot }) {
  const [snapshot, setSnapshot] = useState(initialSnapshot)
  const [access, setAccess] = useState<TravelEditorAccess | null>(null)
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('all')
  const [level, setLevel] = useState<StayLevel | 'all'>('all')
  const [mapUnit, setMapUnit] = useState<MapUnit>('city')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [managing, setManaging] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingPlace, setEditingPlace] = useState<TravelCity | null>(null)
  const [notice, setNotice] = useState('')
  const [loadError, setLoadError] = useState('')
  const [undo, setUndo] = useState<TravelCity | null>(null)
  const [undoing, setUndoing] = useState(false)
  const undoBusy = useRef(false)
  const addButton = useRef<HTMLButtonElement>(null)
  const list = useRef<HTMLUListElement>(null)

  const refresh = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch('/api/travel', { cache: 'no-store', signal })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'The atlas could not be refreshed.')
      if (signal?.aborted) return
      setSnapshot((current) => current.revision === data.revision ? current : { places: data.places, revision: data.revision, updatedAt: data.updatedAt })
      setAccess(data.editor)
      setLoadError('')
    } catch (error) {
      if (!signal?.aborted) setLoadError(error instanceof Error ? error.message : 'Could not refresh the atlas.')
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void refresh(controller.signal)
    return () => controller.abort()
  }, [refresh])

  const countries = useMemo(() => [...new Map(snapshot.places.map((place) => [place.countryCode, place.country])).entries()]
    .sort((a, b) => a[1].localeCompare(b[1], 'en')), [snapshot.places])
  const places = useMemo(() => {
    return snapshot.places.filter((place) => matchesFilters(place, query, country, level))
      .sort((a, b) => a.city.localeCompare(b.city, 'en') || a.country.localeCompare(b.country, 'en'))
  }, [snapshot.places, query, country, level])
  const activeCity = places.find((place) => place.id === activeId) ?? null
  const filtered = Boolean(query || country !== 'all' || level !== 'all')
  const lived = snapshot.places.filter((place) => place.level === StayLevel.LivedThere).length

  useEffect(() => {
    if (activeId && !places.some((place) => place.id === activeId)) setActiveId(null)
  }, [places, activeId])

  useEffect(() => {
    const container = list.current
    const row = container?.querySelector<HTMLLIElement>('[data-selected="true"]')
    if (!container || !row) return
    const rowBox = row.getBoundingClientRect(), box = container.getBoundingClientRect()
    if (rowBox.top < box.top) container.scrollTop -= box.top - rowBox.top
    if (rowBox.bottom > box.bottom) container.scrollTop += rowBox.bottom - box.bottom
  }, [activeId])

  function edit(place: TravelCity | null) { setEditingPlace(place); setEditorOpen(true) }
  function saved(next: TravelSnapshot, message: string, removed?: TravelCity) {
    setSnapshot(next)
    setNotice(message)
    if (removed) setUndo(removed)
    else {
      const changed = editingPlace
        ? next.places.find((place) => place.id === editingPlace.id)
        : next.places.find((place) => !snapshot.places.some((old) => old.id === place.id))
      if (changed) {
        if (!matchesFilters(changed, query, country, level)) clearFilters()
        setActiveId(changed.id)
      }
    }
  }
  function clearFilters() { setQuery(''); setCountry('all'); setLevel('all') }

  async function restore() {
    if (!undo || !access || undoBusy.current) return
    undoBusy.current = true
    setUndoing(true)
    try {
      const response = await fetch('/api/travel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-travel-editor-token': access.token },
        body: JSON.stringify({ revision: snapshot.revision, restore: undo }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'The place could not be restored.')
      setSnapshot(data)
      setNotice(`${undo.city} restored.`)
      setUndo(null)
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Could not confirm the restore. Reload the atlas to check.')
    } finally {
      undoBusy.current = false
      setUndoing(false)
    }
  }

  return (
    <div className="atlas">
      <div className="atlas-topline">
        <p className="atlas-counts"><strong>{snapshot.places.length}</strong> places <span>/</span> <strong>{countries.length}</strong> countries <span>/</span> <strong>{lived}</strong> lived in</p>
        {access ? <button type="button" className="action-button" aria-pressed={managing} onClick={() => setManaging(!managing)}><Pencil aria-hidden="true" />{managing ? 'Done editing' : 'Manage places'}</button> : null}
      </div>
      {access && managing ? (
        <div className="atlas-owner-bar">
          <div><strong>Local editor</strong><p>Changes are saved here and included in the next publish.</p></div>
          <button ref={addButton} type="button" className="action-button action-primary" onClick={() => edit(null)}><Plus aria-hidden="true" />Add place</button>
        </div>
      ) : null}
      {loadError ? <div className="atlas-message atlas-error" role="alert"><span>{loadError}</span><button type="button" onClick={() => void refresh()}>Reload atlas</button></div> : null}
      <div className="atlas-live" role="status" aria-live="polite">
        {notice ? <span>{notice} <small>Saved locally.</small></span> : null}
        {undo && access ? <button type="button" onClick={() => void restore()} aria-disabled={undoing}><Undo2 aria-hidden="true" />{undoing ? 'Restoring…' : `Undo removal of ${undo.city}`}</button> : null}
      </div>
      <div className="atlas-filters">
        <label className="atlas-search"><span className="sr-only">Find a city or country</span><Search aria-hidden="true" /><input type="search" placeholder="Find a city or country" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <label><span className="sr-only">Filter by country</span><select aria-label="Filter by country" value={country} onChange={(event) => setCountry(event.target.value)}><option value="all">All countries</option>{countries.map(([code, name]) => <option key={code} value={code}>{name}</option>)}</select></label>
        <label><span className="sr-only">Filter by time spent</span><select aria-label="Filter by time spent" value={level} onChange={(event) => setLevel(event.target.value as StayLevel | 'all')}><option value="all">All stays</option>{Object.entries(levelConfig).map(([value, config]) => <option key={value} value={value}>{config.label}</option>)}</select></label>
      </div>
      <div className="atlas-layout">
        <section className="atlas-map-panel" aria-label="Travel map">
          <div className="atlas-map-toolbar">
            <div className="atlas-view-toggle" aria-label="Map display">
              <button type="button" aria-pressed={mapUnit === 'city'} onClick={() => setMapUnit('city')}>Cities</button>
              <button type="button" aria-pressed={mapUnit === 'country'} onClick={() => setMapUnit('country')}>Countries</button>
            </div>
            <span>{activeCity ? activeCity.city : 'Select a place'}</span>
          </div>
          <div className="atlas-map">
            <MapBoundary><TravelMap activeCity={activeCity} cities={places} mapUnit={mapUnit} onSelectCity={setActiveId} /></MapBoundary>
          </div>
          <ul className="atlas-legend" aria-label="Stay colours">{Object.entries(levelConfig).map(([key, config]) => <li key={key}><span style={{ background: config.color }} aria-hidden="true" />{config.label}</li>)}</ul>
        </section>
        <section className="atlas-index" aria-labelledby="place-index-title">
          <div className="atlas-index-heading"><h2 id="place-index-title">Place index</h2><span>{places.length} shown</span>{filtered ? <button type="button" onClick={clearFilters}>Clear filters</button> : null}</div>
          <ul className="place-list" ref={list}>
            {places.map((place) => (
              <li key={place.id} data-selected={activeCity?.id === place.id}>
                <button type="button" className="place-select" aria-pressed={activeCity?.id === place.id} onClick={() => setActiveId(place.id)}>
                  <span className="place-marker" style={{ background: levelConfig[place.level].color }} aria-hidden="true" />
                  <span className="place-name">{place.city}<small>{place.country}</small></span>
                  <span className="place-stay">{levelConfig[place.level].label}</span>
                  <LocateFixed aria-hidden="true" />
                </button>
                {access && managing ? <button className="place-edit" type="button" aria-label={`Edit ${place.city}, ${place.country}`} onClick={() => edit(place)}><Pencil aria-hidden="true" /><span>Edit</span></button> : null}
              </li>
            ))}
          </ul>
          {places.length === 0 ? <div className="atlas-empty"><p>{filtered ? 'No places match these filters.' : 'The first pin is still to come.'}</p>{filtered ? <button type="button" className="text-link" onClick={clearFilters}>Clear filters</button> : null}</div> : null}
        </section>
      </div>
      <p className="atlas-caption">Country outlines and visited places. The list is there when the pins get crowded.</p>
      {access && editorOpen ? <TravelEditor open={editorOpen} place={editingPlace} revision={snapshot.revision} access={access} onOpenChange={setEditorOpen} onSaved={saved} onReload={() => void refresh()} returnFocus={() => addButton.current?.focus()} /> : null}
    </div>
  )
}
