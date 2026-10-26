'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Expand, ExternalLink } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { TiltSurface } from '@/components/tilt-surface'
import type { Photograph } from '@/lib/photographs'

export function PhotoGallery({ photographs }: { photographs: Photograph[] }) {
  const [collection, setCollection] = useState('all')
  const [activeId, setActiveId] = useState<string | null>(null)
  const opener = useRef<HTMLAnchorElement | null>(null)
  const collections = [...new Set(photographs.map((photo) => photo.collection))]
  const visible = collection === 'all' ? photographs : photographs.filter((photo) => photo.collection === collection)
  const activeIndex = visible.findIndex((photo) => photo.id === activeId)
  const active = visible[activeIndex] ?? null

  useEffect(() => {
    if (activeId && !visible.some((photo) => photo.id === activeId)) setActiveId(null)
  }, [activeId, visible])

  function step(direction: number) {
    if (visible.length < 2) return
    const next = (activeIndex + direction + visible.length) % visible.length
    setActiveId(visible[next].id)
  }

  return (
    <div className="photographs">
      {collections.length > 1 ? (
        <div className="collection-filters" aria-label="Photo collections">
          <button type="button" aria-pressed={collection === 'all'} onClick={() => setCollection('all')}>All frames</button>
          {collections.map((name) => <button type="button" key={name} aria-pressed={collection === name} onClick={() => setCollection(name)}>{name}</button>)}
        </div>
      ) : null}
      <div className="photo-contact-sheet">
        {visible.map((photo, index) => (
          <figure key={photo.id} className="photo-frame">
            <TiltSurface className="photo-hover" pitch={0} yaw={0} lift={4} scale={1}>
              <a href={photo.src} aria-label={`View ${photo.title}`} onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
                event.preventDefault()
                opener.current = event.currentTarget
                setActiveId(photo.id)
              }}>
                <img src={photo.thumbnail} alt={photo.alt} width={photo.width} height={photo.height} loading={index < 2 ? 'eager' : 'lazy'} />
                <span className="photo-expand"><Expand aria-hidden="true" /><span>View frame</span></span>
              </a>
            </TiltSurface>
            <figcaption><span>{photo.title}</span><small>{photo.location ?? photo.collection}</small></figcaption>
          </figure>
        ))}
      </div>
      <Dialog open={Boolean(active)} onOpenChange={(open) => { if (!open) setActiveId(null) }}>
        {active ? <DialogContent className="photo-dialog" onCloseAutoFocus={(event) => { event.preventDefault(); opener.current?.focus() }} onKeyDown={(event) => {
          if (event.key === 'ArrowRight') { event.preventDefault(); step(1) }
          if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1) }
        }}>
          <div className="photo-dialog-heading">
            <DialogTitle>{active.title}</DialogTitle>
            <DialogDescription>
              {[active.location, active.date, active.credit ? `Photograph by ${active.credit}` : null].filter(Boolean).join(' · ') || active.collection}
            </DialogDescription>
          </div>
          <div className="photo-viewer">
            <img src={active.src} alt={active.alt} width={active.width} height={active.height} />
          </div>
          <div className="photo-viewer-controls">
            <a href={active.src} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" />Open image</a>
            <span>{activeIndex + 1} / {visible.length}</span>
            {visible.length > 1 ? <div>
              <button type="button" aria-label="Previous photograph" onClick={() => step(-1)}><ArrowLeft aria-hidden="true" /></button>
              <button type="button" aria-label="Next photograph" onClick={() => step(1)}><ArrowRight aria-hidden="true" /></button>
            </div> : null}
          </div>
        </DialogContent> : null}
      </Dialog>
    </div>
  )
}
