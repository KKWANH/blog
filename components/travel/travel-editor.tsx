'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { StayLevel, levelConfig, type LocationSuggestion, type TravelCity, type TravelEditorAccess, type TravelSnapshot } from './travel-types'

type FormValues = { city: string; countryCode: string; level: StayLevel; lat: string; lng: string }
const empty: FormValues = { city: '', countryCode: '', level: StayLevel.ShortVisit, lat: '', lng: '' }

export function TravelEditor({
  open, place, revision, access, onOpenChange, onSaved, onReload, returnFocus,
}: {
  open: boolean
  place: TravelCity | null
  revision: string
  access: TravelEditorAccess
  onOpenChange: (open: boolean) => void
  onSaved: (snapshot: TravelSnapshot, message: string, removed?: TravelCity) => void
  onReload: () => void
  returnFocus: () => void
}) {
  const [values, setValues] = useState<FormValues>(empty)
  const [query, setQuery] = useState('')
  const [locations, setLocations] = useState<LocationSuggestion[]>([])
  const [lookupState, setLookupState] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [reloadNeeded, setReloadNeeded] = useState(false)
  const [confirmRemoval, setConfirmRemoval] = useState(false)
  const version = useRef(revision)
  const inFlight = useRef(false)
  const removed = useRef(false)
  const nameInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    version.current = revision
    removed.current = false
    setValues(place ? { city: place.city, countryCode: place.countryCode, level: place.level, lat: String(place.lat), lng: String(place.lng) } : empty)
    setQuery('')
    setLocations([])
    setLookupState('')
    setError('')
    setReloadNeeded(false)
    setConfirmRemoval(false)
    // Revision is captured when this form opens, not silently refreshed while editing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, place])

  useEffect(() => {
    if (!open || query.trim().length < 2) { setLocations([]); setLookupState(''); return }
    const controller = new AbortController()
    let current = true
    const timer = setTimeout(async () => {
      setLookupState('Looking up places…')
      try {
        const response = await fetch(`/api/travel?q=${encodeURIComponent(query.trim())}`, { signal: controller.signal, cache: 'no-store' })
        const data = await response.json()
        if (!response.ok) throw new Error(data.error ?? 'Location lookup is unavailable.')
        if (current) {
          setLocations(data.locations)
          setLookupState(data.locations.length ? 'Choose a match to fill the fields.' : 'No match. You can enter a place and its coordinates below.')
        }
      } catch (cause) {
        if (current && !controller.signal.aborted) setLookupState(cause instanceof Error ? cause.message : 'Location lookup is unavailable.')
      }
    }, 250)
    return () => { current = false; clearTimeout(timer); controller.abort() }
  }, [query, open])

  function choose(location: LocationSuggestion) {
    setValues((old) => ({ ...old, city: location.city, countryCode: location.countryCode, lat: String(location.lat), lng: String(location.lng) }))
    setQuery('')
    setLocations([])
    nameInput.current?.focus()
  }

  async function save(remove = false) {
    if (inFlight.current || reloadNeeded) return
    if (!remove && !values.city.trim()) { setError('Enter a place name.'); nameInput.current?.focus(); return }
    if (remove && !place) return
    inFlight.current = true
    setBusy(true)
    setError('')
    setReloadNeeded(false)
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 12_000)
    try {
      const payload = remove
        ? { id: place!.id, revision: version.current }
        : {
            ...(place ? { id: place.id } : {}),
            revision: version.current,
            place: { city: values.city.trim(), countryCode: values.countryCode, level: values.level, lat: Number(values.lat), lng: Number(values.lng) },
          }
      const response = await fetch('/api/travel', {
        method: remove ? 'DELETE' : place ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json', 'x-travel-editor-token': access.token },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error ?? 'The change could not be saved.')
        setReloadNeeded([403, 404, 409].includes(response.status))
        return
      }
      removed.current = remove
      onSaved(data, remove ? `${place!.city} removed.` : `${values.city.trim()} saved.`, remove ? place! : undefined)
      onOpenChange(false)
    } catch {
      setError('The save could not be confirmed. Reload the atlas before trying again.')
      setReloadNeeded(true)
    } finally {
      clearTimeout(timeout)
      inFlight.current = false
      setBusy(false)
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void save() }

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!busy) onOpenChange(next) }}>
      <DialogContent className="place-dialog" onCloseAutoFocus={(event) => {
        if (removed.current) { event.preventDefault(); returnFocus() }
      }}>
        <DialogTitle>{place ? `Edit ${place.city}` : 'Add a place'}</DialogTitle>
        <DialogDescription>Saved locally and included in the next publish.</DialogDescription>
        {confirmRemoval ? (
          <div className="place-remove-confirm">
            <h3>Remove {place?.city}?</h3>
            <p>This removes the entry from the atlas. You can undo the removal after saving.</p>
            <div className="form-actions">
              <button type="button" className="action-button" onClick={() => { if (!busy) setConfirmRemoval(false) }} aria-disabled={busy}>Keep place</button>
              <button type="button" className="action-button action-danger" onClick={() => void save(true)} aria-disabled={busy}>{busy ? 'Removing…' : 'Remove place'}</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="place-form">
            <div className="location-lookup">
              <label htmlFor="location-search">Find a location <span>(optional)</span></label>
              <input id="location-search" type="search" value={query} onChange={(event) => { if (!busy) setQuery(event.target.value) }} placeholder="Start with a city name…" maxLength={80} readOnly={busy} autoComplete="off" />
              <p className="field-hint" role="status">{lookupState || 'Pick a match to fill the pin, or enter the fields below.'}</p>
              {locations.length > 0 ? <ul className="location-results" aria-label="Location matches">
                {locations.map((location, index) => (
                  <li key={`${location.city}-${location.countryCode}-${index}`}>
                    <button type="button" onClick={() => choose(location)} disabled={busy}>
                      <span>{location.city}<small>{location.country}</small></span>
                      <span>{location.lat.toFixed(2)}, {location.lng.toFixed(2)}</span>
                    </button>
                  </li>
                ))}
              </ul> : null}
            </div>
            <div className="place-form-grid">
              <label>Place name<input ref={nameInput} name="city" value={values.city} onChange={(event) => setValues({ ...values, city: event.target.value })} required maxLength={100} readOnly={busy} /></label>
              <div><label htmlFor="place-country">Country</label><select id="place-country" name="countryCode" value={values.countryCode} onChange={(event) => { if (!busy) setValues({ ...values, countryCode: event.target.value }) }} required aria-disabled={busy}>
                <option value="">Choose a country</option>
                {access.countries.map((country) => <option value={country.code} key={country.code}>{country.name}</option>)}
              </select></div>
              <div className="form-full"><label htmlFor="place-level">Time spent</label><select id="place-level" name="level" value={values.level} onChange={(event) => { if (!busy) setValues({ ...values, level: event.target.value as StayLevel }) }} aria-disabled={busy}>
                {Object.entries(levelConfig).map(([level, config]) => <option value={level} key={level}>{config.label}</option>)}
              </select></div>
              <label>Latitude<input name="lat" type="number" min="-90" max="90" step="any" value={values.lat} onChange={(event) => setValues({ ...values, lat: event.target.value })} required readOnly={busy} /></label>
              <label>Longitude<input name="lng" type="number" min="-180" max="180" step="any" value={values.lng} onChange={(event) => setValues({ ...values, lng: event.target.value })} required readOnly={busy} /></label>
            </div>
            <div className="form-actions">
              <button type="submit" className="action-button action-primary" aria-disabled={busy || reloadNeeded}>{busy ? 'Saving…' : 'Save place'}</button>
              <button type="button" className="action-button" onClick={() => { if (!busy) onOpenChange(false) }} aria-disabled={busy}>Cancel</button>
              {place ? <button type="button" className="remove-link" onClick={() => { if (!busy && !reloadNeeded) setConfirmRemoval(true) }} aria-disabled={busy || reloadNeeded}>Remove this place</button> : null}
            </div>
          </form>
        )}
        {error ? <div className="form-error" role="alert"><p>{error}</p>{reloadNeeded ? <button type="button" className="text-link" onClick={() => { onOpenChange(false); onReload() }}>Close form &amp; reload atlas</button> : null}</div> : null}
      </DialogContent>
    </Dialog>
  )
}
