'use client'

import { useRef, useState } from 'react'
import { ArrowDown, ArrowDownToLine, ArrowUpRight, ContactRound, Mail, ArrowLeft, ArrowRight, Expand } from 'lucide-react'
import { TiltSurface } from '@/components/tilt-surface'
import { CopyText } from '@/components/copy-email'
import { profile, recruiterBrief } from '@/lib/profile'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'

const portraits = [
  { id: 'camera', src: '/portraits/camera-print.webp', full: '/photography-preview-camera.webp', width: 480, height: 320, alt: 'Kwanho photographing his reflection with a camera', label: 'Open the camera portrait' },
  { id: 'professional', src: '/portraits/professional-print.webp', full: '/contact-portrait.webp', width: 480, height: 480, alt: 'Kwanho Kim against a green background', label: 'Open the professional portrait' },
  { id: 'window', src: '/portraits/window-print.webp', full: '/window-portrait.webp', width: 480, height: 270, alt: 'Kwanho looking down beside a green window', label: 'Open the window portrait' },
] as const

export function PaperIntroduction() {
  const [mailbox, domain] = profile.contact.split('@')
  const [activePortrait, setActivePortrait] = useState<number | null>(null)
  const opener = useRef<HTMLAnchorElement | null>(null)
  const portraitStrip = useRef<HTMLElement | null>(null)
  const active = activePortrait === null ? null : portraits[activePortrait]
  function step(direction: number) {
    setActivePortrait((current) => current === null ? null : (current + direction + portraits.length) % portraits.length)
  }
  return (
    <header className="paper-introduction" aria-labelledby="profile-name">
      <div className="paper-introduction-main">
        <div className="business-card-holder">
          <TiltSurface className="business-card-tilt" pitch={3} yaw={4} lift={3} scale={1.004}>
            <div className="paper-business-card">
              <div className="paper-card-topline"><p className="paper-card-role">{profile.role}</p><span className="paper-cpp-impression" aria-hidden="true" /></div>
              <h1 id="profile-name">{profile.name}</h1>
              <p className="paper-card-location">{profile.location}</p>
              <div className="paper-card-footer">
                <a className="paper-contact-link" href={`mailto:${profile.contact}`} aria-label={`Email ${profile.contact}`}><span>{mailbox}@<wbr />{domain}</span></a>
                <a className="paper-contact-link paper-site-link" href="/" aria-label="Kwanho website home">kwanho.dev<ArrowUpRight aria-hidden="true" /></a>
              </div>
            </div>
          </TiltSurface>
        </div>
        <div className="paper-card-actions">
          <a className="action-button action-primary" href="/CV.pdf"><ArrowDownToLine aria-hidden="true" />Read the CV</a>
          <a className="action-button" href={`mailto:${profile.contact}`}><Mail aria-hidden="true" />Email Kwanho</a>
        </div>
        <div className="paper-card-links">
          <a href="/contact.vcf" download="Kwanho_Kim.vcf"><ContactRound aria-hidden="true" />Save contact</a>
          <a href={profile.linkedin}>LinkedIn <ArrowUpRight aria-hidden="true" /></a>
          <a href="#experience-kla">Current work at KLA <ArrowDown aria-hidden="true" /></a>
        </div>
        <CopyText text={recruiterBrief} label="Copy profile summary" success="Profile summary copied." />
      </div>
      <div className="portrait-companion">
      <aside ref={portraitStrip} className="portrait-contact-sheet" aria-label="Portraits of Kwanho">
        {portraits.map((image, index) => <a href={image.full} key={image.src} data-portrait={image.id} target="_blank" rel="noopener noreferrer" aria-label={image.label} onFocus={(event) => {
          const strip = portraitStrip.current
          if (!strip || strip.scrollWidth <= strip.clientWidth + 20) return
          const area = strip.getBoundingClientRect(), frame = event.currentTarget.getBoundingClientRect()
          if (frame.left < area.left + 4 || frame.right > area.right - 4) {
            event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' })
          }
        }} onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
          event.preventDefault()
          opener.current = event.currentTarget
          setActivePortrait(index)
        }}>
          <img src={image.src} width={image.width} height={image.height} alt={image.alt} loading={index ? 'lazy' : 'eager'} />
          <span className="portrait-open"><Expand aria-hidden="true" /><span>View portrait</span></span>
        </a>)}
      </aside>
      <p className="portrait-strip-hint">Scroll the portraits · Tap to expand</p>
      </div>
      <Dialog open={Boolean(active)} onOpenChange={(open) => { if (!open) setActivePortrait(null) }}>
        {active ? <DialogContent className="photo-dialog portrait-dialog" onCloseAutoFocus={(event) => { event.preventDefault(); opener.current?.focus({ preventScroll: true }) }} onKeyDown={(event) => {
          if (event.key === 'ArrowRight') { event.preventDefault(); step(1) }
          if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1) }
        }}>
          <div className="photo-dialog-heading"><DialogTitle>Portraits</DialogTitle><DialogDescription>{active.alt}</DialogDescription></div>
          <div className="photo-viewer"><img src={active.full} width={active.width} height={active.height} alt={active.alt} /></div>
          <div className="photo-viewer-controls">
            <a href={active.full} target="_blank" rel="noopener noreferrer">Open full image <ArrowUpRight aria-hidden="true" /></a>
            <span role="status">{activePortrait! + 1} / {portraits.length}</span>
            <div><button type="button" aria-label="Previous portrait" onClick={() => step(-1)}><ArrowLeft aria-hidden="true" /></button><button type="button" aria-label="Next portrait" onClick={() => step(1)}><ArrowRight aria-hidden="true" /></button></div>
          </div>
        </DialogContent> : null}
      </Dialog>
    </header>
  )
}
