'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { useMotion } from '@/components/motion-provider'

export function TiltSurface({
  children, className = '', pitch = 9, yaw = 12, lift = 10, scale = 1.025, disabled = false, resetKey,
}: {
  children: ReactNode
  className?: string
  pitch?: number
  yaw?: number
  lift?: number
  scale?: number
  disabled?: boolean
  resetKey?: boolean | string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { enabled } = useMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return
    // Turning flattens the tilt but preserves the last light direction.
    if (enabled && disabled) {
      element.style.setProperty('--rx', '0deg')
      element.style.setProperty('--ry', '0deg')
      element.style.setProperty('--lift', '0px')
      element.style.setProperty('--scale', '1')
      element.dataset.active = 'false'
      return
    }
    let frame = 0, last = 0, active = false
    let bounds: DOMRect | null = null
    let gesture: { x: number; y: number; horizontal: boolean } | null = null
    const current = { x: 0, y: 0, amount: 0 }
    const target = { x: 0, y: 0, amount: 0 }
    function write() {
      element!.style.setProperty('--rx', `${(-current.y * pitch).toFixed(3)}deg`)
      element!.style.setProperty('--ry', `${(current.x * yaw).toFixed(3)}deg`)
      element!.style.setProperty('--mx', `${(50 + current.x * 50).toFixed(2)}%`)
      element!.style.setProperty('--my', `${(50 + current.y * 50).toFixed(2)}%`)
      element!.style.setProperty('--px', current.x.toFixed(3))
      element!.style.setProperty('--py', current.y.toFixed(3))
      element!.style.setProperty('--lift', `${(-current.amount * lift).toFixed(2)}px`)
      element!.style.setProperty('--scale', (1 + current.amount * (scale - 1)).toFixed(4))
      element!.style.setProperty('--shine', current.amount.toFixed(3))
    }
    write()
    element.dataset.active = 'false'
    if (!enabled) return

    function draw(time: number) {
      const delta = Math.min(time - (last || time - 16), 48)
      last = time
      const step = 1 - Math.exp(-delta / (active ? 90 : 140))
      current.x += (target.x - current.x) * step
      current.y += (target.y - current.y) * step
      current.amount += (target.amount - current.amount) * step
      write()
      const remaining = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) + Math.abs(target.amount - current.amount)
      if (remaining > .002) frame = requestAnimationFrame(draw)
      else { current.x = target.x; current.y = target.y; current.amount = target.amount; write(); frame = 0 }
    }
    let resetTimeout: NodeJS.Timeout | null = null
    const request = () => { if (!frame) { last = 0; frame = requestAnimationFrame(draw) } }
    const reset = () => {
      if (resetTimeout) { clearTimeout(resetTimeout); resetTimeout = null }
      active = false
      gesture = null
      target.x = target.y = target.amount = 0
      element.dataset.active = 'false'
      request()
    }
    const locate = (event: PointerEvent, limit: number) => {
      if (resetTimeout) { clearTimeout(resetTimeout); resetTimeout = null }
      const box = bounds ??= element.getBoundingClientRect()
      target.x = Math.max(-limit, Math.min(limit, ((event.clientX - box.left) / box.width - .5) * 2))
      target.y = Math.max(-limit, Math.min(limit, ((event.clientY - box.top) / box.height - .5) * 2))
      target.amount = 1
      active = true; element.dataset.active = 'true'; request()
    }
    const down = (event: PointerEvent) => {
      bounds = element.getBoundingClientRect()
      if ((event.pointerType === 'touch' || event.pointerType === 'pen') && !(event.target as HTMLElement).closest('a,button,input,select,textarea')) {
        gesture = { x: event.clientX, y: event.clientY, horizontal: false }
        locate(event, 1)
        if (Math.abs(target.x) + Math.abs(target.y) < .15) { target.x = .25; target.y = -.2 }
      }
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        if (!gesture) return
        const dx = Math.abs(event.clientX - gesture.x), dy = Math.abs(event.clientY - gesture.y)
        if (dy > 14 && dy > dx * 1.5) { reset(); return }
      }
      if (element.matches(':focus-within')) return
      locate(event, event.pointerType === 'mouse' ? 1 : 1)
    }
    const up = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || event.pointerType === 'pen') {
        // Keep the tactile tilt visible for 600ms after lifting touch before gently settling
        resetTimeout = setTimeout(reset, 600)
      } else {
        reset()
      }
    }
    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma === null || event.beta === null) return
      if (active && gesture) return // Touch interaction takes precedence
      // gamma: left-right tilt [-90, 90], beta: forward-back tilt [-180, 180]
      // Typical holding posture is around 40-50 deg pitch
      const gx = Math.max(-1, Math.min(1, event.gamma / 22))
      const gy = Math.max(-1, Math.min(1, (event.beta - 45) / 25))
      if (Math.abs(gx) > 0.05 || Math.abs(gy) > 0.05) {
        target.x = gx * 0.9
        target.y = gy * 0.8
        target.amount = Math.min(1, Math.hypot(gx, gy) * 1.1)
        active = true
        element.dataset.active = 'true'
        request()
      }
    }
    const invalidate = () => { bounds = null }
    const visibility = () => {
      if (document.visibilityState !== 'hidden') return
      cancelAnimationFrame(frame); frame = 0; active = false; gesture = null
      target.x = target.y = target.amount = current.x = current.y = current.amount = 0
      write(); element.dataset.active = 'false'
    }
    element.addEventListener('pointerdown', down, { passive: true })
    element.addEventListener('pointermove', move, { passive: true })
    element.addEventListener('pointerleave', reset)
    element.addEventListener('pointerup', up)
    element.addEventListener('pointercancel', reset)
    element.addEventListener('focusin', reset)
    window.addEventListener('scroll', invalidate, { passive: true })
    window.addEventListener('resize', invalidate)
    window.addEventListener('deviceorientation', onOrientation, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.inView = String(entry.isIntersecting)
      if (!entry.isIntersecting) reset()
    })
    observer.observe(element)
    return () => {
      cancelAnimationFrame(frame)
      if (resetTimeout) clearTimeout(resetTimeout)
      observer.disconnect()
      element.removeEventListener('pointerdown', down)
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', reset)
      element.removeEventListener('pointerup', up)
      element.removeEventListener('pointercancel', reset)
      element.removeEventListener('focusin', reset)
      window.removeEventListener('scroll', invalidate)
      window.removeEventListener('resize', invalidate)
      window.removeEventListener('deviceorientation', onOrientation)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [enabled, disabled, pitch, yaw, lift, scale, resetKey])

  return <div ref={ref} className={`tilt-surface ${className}`}><div className="tilt-object">{children}</div></div>
}
