'use client'

import { useEffect, useRef, useState } from 'react'
import { Rotate3d } from 'lucide-react'
import Link from 'next/link'
import { TiltSurface } from '@/components/tilt-surface'
import { useMotion } from '@/components/motion-provider'
import { profile } from '@/lib/profile'

export function CollectibleCard({ staticTilt = false }: { staticTilt?: boolean }) {
  const [flipped, setFlipped] = useState(false)
  const [turning, setTurning] = useState(false)
  const { enabled } = useMotion()
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const control = useRef<HTMLButtonElement>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  useEffect(() => {
    if (!enabled && timer.current) { clearTimeout(timer.current); setTurning(false) }
  }, [enabled])

  function turn(next = !flipped) {
    if (turning || next === flipped) return
    setFlipped(next)
    if (enabled) {
      setTurning(true)
      timer.current = setTimeout(() => setTurning(false), 640)
    }
  }

  return (
    <div className="collectible-stage" onKeyDown={(event) => {
      if (event.key === 'Escape' && flipped && !turning) {
        event.preventDefault()
        turn(false)
        control.current?.focus()
      }
    }}>
      <div className="card-turn-controls">
        <button ref={control} type="button" onClick={() => turn()} aria-pressed={flipped} aria-disabled={turning} className="card-turn-button">
          <Rotate3d aria-hidden="true" />
          {flipped ? 'Back to portrait' : 'Turn the card'}
        </button>
        <span>Move or drag to tilt.</span>
      </div>
      <TiltSurface className="portrait-tilt" disabled={turning || staticTilt} resetKey={flipped}>
        <div className="identity-object" data-flipped={flipped} data-turning={turning}>
          <section className="identity-face identity-front" aria-hidden={flipped} inert={flipped} aria-label="Portrait side">
            <div className="identity-topline"><span>Software / Systems</span><span>C++</span></div>
            <div className="identity-photo">
              <img src="/contact-portrait.webp" width="800" height="800" alt="Portrait of Kwanho Kim" />
              <div className="portrait-reflection" aria-hidden="true" />
            </div>
            <div className="identity-caption">
              <h2>{profile.name}</h2>
              <p>{profile.role}</p>
              <div><span>KLA · Leuven</span><span className="identity-line" aria-hidden="true" /></div>
            </div>
            <div className="identity-foil" aria-hidden="true" />
            <div className="identity-edge" aria-hidden="true" />
          </section>
          <section className="identity-face identity-back" aria-hidden={!flipped} inert={!flipped} aria-label="Engineering note side">
            <div className="identity-topline"><span>{profile.name}</span><span>One field note</span></div>
            <h2>A setting is<br />not a readback.</h2>
            <div className="readback-path" aria-label="Set, read, then show the device state">
              <span>Set</span><i aria-hidden="true">→</i><span>Read</span><i aria-hidden="true">→</i><span>Show</span>
            </div>
            <p className="identity-scope">The value requested and the value reported can differ. That difference belongs in the interface.</p>
            <Link href="/notes/device-readback" className="identity-note-link">Read the field note <span aria-hidden="true">↗</span></Link>
            <p className="identity-footnote">Career details stay in the recruiter brief.</p>
            <div className="identity-foil" aria-hidden="true" />
            <div className="identity-edge" aria-hidden="true" />
          </section>
          <span className="identity-spine" aria-hidden="true" />
        </div>
      </TiltSurface>
      <span className="sr-only" role="status" aria-live="polite">{flipped ? 'Engineering note side displayed.' : 'Portrait side displayed.'}</span>
    </div>
  )
}
