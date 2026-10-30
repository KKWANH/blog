'use client'

import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { project, releaseVelocity, rubberband, SETTLE, springTo, THROWN, type Sample } from '@/lib/physics'

// The photo viewer follows the finger: sideways pages between photographs, downwards
// lets the frame go (the backdrop fades with it). The first 10px decide the axis.

const PAGE: { damping: number; response: number } = { damping: 1, response: 0.28 }

export function usePhotoSwipe({ motion, canPage, onStep, onDismiss }: { motion: boolean; canPage: boolean; onStep: (direction: number) => void; onDismiss: () => void }) {
  const image = useRef<HTMLImageElement>(null)
  const cancel = useRef<(() => void) | null>(null)
  const offset = useRef({ x: 0, y: 0 })
  const latest = useRef({ onStep, onDismiss })
  useEffect(() => { latest.current = { onStep, onDismiss } })
  useEffect(() => () => cancel.current?.(), [])

  const parts = () => {
    const img = image.current
    const content = img?.closest<HTMLElement>('[data-slot="dialog-content"]') ?? null
    const overlay = document.querySelector<HTMLElement>('[data-slot="dialog-overlay"]')
    return { img, content, overlay }
  }
  const writeX = (value: number) => {
    offset.current.x = value
    if (image.current) image.current.style.transform = value ? `translateX(${value}px)` : ''
  }
  const writeY = (value: number) => {
    offset.current.y = value
    const { content, overlay } = parts()
    const progress = Math.min(Math.max(value, 0) / innerHeight, 1)
    if (content) content.style.transform = value ? `translateY(${value}px) scale(${1 - progress * 0.12})` : ''
    if (overlay) overlay.style.opacity = value ? String(1 - Math.min(progress * 1.6, 1)) : ''
  }
  const run = (from: number, to: number, velocity: number, spring: typeof SETTLE, write: (value: number) => void | boolean, done?: () => void) => {
    cancel.current?.()
    if (!motion) { write(to); cancel.current = null; done?.(); return }
    cancel.current = springTo(from, to, velocity, spring, write, () => { cancel.current = null; done?.() })
  }

  /** A new photograph slides in from the side it was asked for, so buttons and keys hint direction too. */
  const enter = useCallback((direction: number, velocity = 0, distance = 56) => {
    if (!motion) return
    run(direction * distance, 0, velocity, PAGE, writeX)
  }, [motion])

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === 'mouse' || !event.isPrimary || (event.target as HTMLElement).closest('a,button')) return
    const surface = event.currentTarget
    const start = { x: event.clientX, y: event.clientY }
    let axis: 'x' | 'y' | null = null, origin = 0
    const history: Sample[] = []
    const width = surface.clientWidth || innerWidth

    const move = (next: PointerEvent) => {
      const dx = next.clientX - start.x, dy = next.clientY - start.y
      if (!axis) {
        if (Math.hypot(dx, dy) < 10) return
        axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
        // Grab from where the frame is now, even mid-spring.
        origin = offset.current[axis] - (axis === 'x' ? dx : dy)
        cancel.current?.(); cancel.current = null
        try { surface.setPointerCapture(next.pointerId) } catch {}
      }
      if (axis === 'x') {
        const raw = origin + dx
        writeX(canPage ? raw : rubberband(raw, width))
        history.push({ position: next.clientX, time: next.timeStamp })
      } else {
        const raw = origin + dy
        writeY(raw >= 0 ? raw : rubberband(raw, innerHeight))
        history.push({ position: next.clientY, time: next.timeStamp })
      }
      if (history.length > 6) history.shift()
    }
    const up = (last: PointerEvent) => {
      end()
      if (!axis) return
      const velocity = releaseVelocity(history, last.timeStamp)
      if (axis === 'x') {
        const x = offset.current.x, resting = x + project(velocity)
        if (canPage && Math.abs(resting) > width * 0.35) {
          // Out the way it was thrown, then the next frame arrives from the opposite side.
          // Aim past the edge and swap the moment it leaves, rather than waiting out the spring's tail.
          const direction = resting < 0 ? 1 : -1
          const arrive = () => {
            latest.current.onStep(direction)
            if (motion) run(direction * width, 0, velocity, PAGE, writeX)
            else writeX(0)
          }
          run(x, -direction * width * 1.3, velocity, PAGE, (value) => {
            if (Math.abs(value) < width) { writeX(value); return }
            arrive()
            return false
          })
        } else run(x, 0, velocity, Math.abs(velocity) > 300 ? THROWN : SETTLE, writeX)
      } else {
        const y = offset.current.y, resting = y + project(velocity)
        if (resting > innerHeight * 0.3) {
          const { content, overlay } = parts()
          run(y, innerHeight, Math.max(velocity, 0), PAGE, writeY, () => {
            // The frame has already left; skip the dialog's own exit animation.
            content?.setAttribute('data-swiped', '')
            overlay?.setAttribute('data-swiped', '')
            latest.current.onDismiss()
          })
        } else run(y, 0, velocity, Math.abs(velocity) > 300 ? THROWN : SETTLE, writeY)
      }
    }
    const end = () => {
      surface.removeEventListener('pointermove', move)
      surface.removeEventListener('pointerup', up)
      surface.removeEventListener('pointercancel', up)
    }
    surface.addEventListener('pointermove', move)
    surface.addEventListener('pointerup', up)
    surface.addEventListener('pointercancel', up)
  }, [canPage, motion])

  return { image, enter, onPointerDown }
}
