'use client'

import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent, type RefObject } from 'react'

// Apple-style sheet physics: 1:1 drag, momentum projection, velocity hand-off into a spring,
// and every motion starts from the on-screen (presentation) value so it can be grabbed mid-flight.

type Spring = { damping: number; response: number }
const SETTLE: Spring = { damping: 1, response: 0.35 }
const THROWN: Spring = { damping: 0.8, response: 0.3 }

/** Where a flick comes to rest, using the scroll-deceleration curve (UIScrollView normal rate). */
function project(velocity: number, rate = 0.998) {
  return (velocity / 1000) * rate / (1 - rate)
}

function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

/** Reads the live translate on the drag axis, mid-transition included. */
function presentation(element: HTMLElement, axis: 'x' | 'y') {
  const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform)
  return axis === 'x' ? matrix.m41 : matrix.m42
}

export function useSheet(ref: RefObject<HTMLElement | null>, { open, motion, onDismiss }: { open: boolean; motion: boolean; onDismiss: () => void }) {
  const frame = useRef(0)
  const offset = useRef(0)
  const dismissRef = useRef(onDismiss)
  useEffect(() => { dismissRef.current = onDismiss })

  const axis = () => (matchMedia('(max-width: 760px)').matches ? 'y' : 'x') as 'x' | 'y'
  const write = (element: HTMLElement, value: number, along: 'x' | 'y') => {
    offset.current = value
    element.style.transform = along === 'x' ? `translateX(${value}px)` : `translateY(${value}px)`
  }
  const stop = () => { cancelAnimationFrame(frame.current); frame.current = 0 }

  // Damped harmonic oscillator in Apple's terms (damping ratio + response), unit mass.
  const animate = useCallback((target: number, velocity: number, spring: Spring, done?: () => void) => {
    const element = ref.current
    if (!element) return
    stop()
    const along = axis()
    // Reduced motion: no spring travel, the sheet simply lands.
    if (!motion) { write(element, target, along); done?.(); return }
    const stiffness = (2 * Math.PI / spring.response) ** 2
    const friction = 4 * Math.PI * spring.damping / spring.response
    let value = offset.current, speed = velocity, last = 0
    element.dataset.dragging = 'true'
    const tick = (time: number) => {
      const elapsed = Math.min((time - (last || time - 16)) / 1000, 0.064)
      last = time
      for (let step = 0; step < 4; step++) {
        const dt = elapsed / 4
        speed += (-stiffness * (value - target) - friction * speed) * dt
        value += speed * dt
      }
      if (Math.abs(value - target) < 0.5 && Math.abs(speed) < 5) {
        write(element, target, along)
        frame.current = 0
        done?.()
        return
      }
      write(element, value, along)
      frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
  }, [ref, motion])

  const release = useCallback(() => {
    const element = ref.current
    stop()
    if (!element) return
    element.style.transform = ''
    element.style.opacity = ''
    delete element.dataset.dragging
    offset.current = 0
  }, [ref])

  // Closing leaves along the same path the sheet arrived on.
  const dismiss = useCallback((velocity = 0) => {
    const element = ref.current
    if (!element || element.hidden) { dismissRef.current(); return }
    if (!motion) {
      element.style.transition = 'opacity 150ms ease'
      element.style.opacity = '0'
      setTimeout(() => { element.style.transition = ''; dismissRef.current() }, 150)
      return
    }
    const along = axis()
    if (!frame.current && !element.dataset.dragging) offset.current = presentation(element, along)
    const distance = along === 'x' ? element.offsetWidth : element.offsetHeight
    animate(distance, velocity, velocity > 0 ? THROWN : SETTLE, () => dismissRef.current())
  }, [ref, motion, animate])

  // Clear inline physics once the sheet is gone, so the next open uses its CSS entrance.
  useEffect(() => { if (!open) release() }, [open, release])
  useEffect(() => stop, [])

  // Touch and pen drag the sheet by its head (direct manipulation, so also with motion off); the body keeps its own scrolling.
  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const element = ref.current
    if (!element || event.pointerType === 'mouse' || (event.target as HTMLElement).closest('a,button,input')) return
    const along = axis()
    const handle = event.currentTarget
    const start = along === 'x' ? event.clientX : event.clientY
    const cross = along === 'x' ? event.clientY : event.clientX
    let tracking = false, origin = 0
    const history: { position: number; time: number }[] = []
    const size = along === 'x' ? element.offsetWidth : element.offsetHeight

    const move = (next: PointerEvent) => {
      const position = along === 'x' ? next.clientX : next.clientY
      const delta = position - start
      if (!tracking) {
        const across = Math.abs((along === 'x' ? next.clientY : next.clientX) - cross)
        if (Math.abs(delta) < 10) return
        if (across > Math.abs(delta)) { end(); return }
        tracking = true
        // Grab from where it is now, even mid-animation.
        origin = (frame.current || element.dataset.dragging ? offset.current : presentation(element, along)) - delta
        stop()
        try { handle.setPointerCapture(next.pointerId) } catch {}
        element.dataset.dragging = 'true'
      }
      const raw = origin + delta
      write(element, raw < 0 ? rubberband(raw, size) : raw, along)
      history.push({ position, time: next.timeStamp })
      if (history.length > 6) history.shift()
    }
    const up = (last: PointerEvent) => {
      end()
      if (!tracking) return
      const first = history[0], final = history[history.length - 1]
      const span = first && final ? final.time - first.time : 0
      const velocity = span > 0 && last.timeStamp - final.time < 80 ? ((final.position - first.position) / span) * 1000 : 0
      const resting = offset.current + project(velocity)
      // Decide by where the throw lands, not where the finger let go.
      if (resting > size * 0.5) dismiss(velocity)
      else animate(0, velocity, Math.abs(velocity) > 300 ? THROWN : SETTLE, () => { delete element.dataset.dragging; element.style.transform = '' })
    }
    const end = () => {
      handle.removeEventListener('pointermove', move)
      handle.removeEventListener('pointerup', up)
      handle.removeEventListener('pointercancel', up)
    }
    handle.addEventListener('pointermove', move)
    handle.addEventListener('pointerup', up)
    handle.addEventListener('pointercancel', up)
  }, [ref, motion, animate, dismiss])

  return { dismiss, onPointerDown }
}
