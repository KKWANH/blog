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
    const request = () => { if (!frame) { last = 0; frame = requestAnimationFrame(draw) } }
    const reset = () => {
      active = false
      gesture = null
      target.x = target.y = target.amount = 0
      element.dataset.active = 'false'
      request()
    }
    const down = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || event.pointerType === 'pen') gesture = { x: event.clientX, y: event.clientY, horizontal: false }
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        if (!gesture) return
        const dx = Math.abs(event.clientX - gesture.x), dy = Math.abs(event.clientY - gesture.y)
        if (!gesture.horizontal && dx > 10 && dx > dy * 1.5) gesture.horizontal = true
        if (!gesture.horizontal) return
      }
      if (element.matches(':focus-within')) return
      const box = element.getBoundingClientRect()
      const limit = event.pointerType === 'mouse' ? 1 : .65
      target.x = Math.max(-limit, Math.min(limit, ((event.clientX - box.left) / box.width - .5) * 2))
      target.y = Math.max(-limit, Math.min(limit, ((event.clientY - box.top) / box.height - .5) * 2))
      target.amount = 1
      active = true
      element.dataset.active = 'true'
      request()
    }
    element.addEventListener('pointerdown', down, { passive: true })
    element.addEventListener('pointermove', move, { passive: true })
    element.addEventListener('pointerleave', reset)
    element.addEventListener('pointerup', reset)
    element.addEventListener('pointercancel', reset)
    element.addEventListener('focusin', reset)
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.inView = String(entry.isIntersecting)
      if (!entry.isIntersecting) reset()
    })
    observer.observe(element)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      element.removeEventListener('pointerdown', down)
      element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerleave', reset)
      element.removeEventListener('pointerup', reset)
      element.removeEventListener('pointercancel', reset)
      element.removeEventListener('focusin', reset)
    }
  }, [enabled, disabled, pitch, yaw, lift, scale, resetKey])

  return <div ref={ref} className={`tilt-surface ${className}`}><div className="tilt-object">{children}</div></div>
}
