'use client'

import { useEffect, useRef } from 'react'
import { useMotion } from '@/components/motion-provider'

export function Atmosphere() {
  const ref = useRef<HTMLDivElement>(null)
  const { enabled } = useMotion()

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (!enabled) {
      element.style.setProperty('--room-x', '0px')
      element.style.setProperty('--room-y', '0px')
      element.style.setProperty('--light-x', '0px')
      element.style.setProperty('--pointer-x', '50vw')
      element.style.setProperty('--pointer-y', '40vh')
      element.style.setProperty('--room-opacity', '.2')
      return
    }
    let frame = 0, last = 0
    let isDragging = false
    const dragOrigin = { x: 0, y: 0 }
    const dragWarp = { x: 0, y: 0 }
    const dragTarget = { x: 0, y: 0 }
    const current = { x: 0, y: 0, scroll: 0 }
    const target = { x: 0, y: 0, scroll: Math.min(scrollY / 600, 1) }

    function draw(time: number) {
      const delta = Math.min(time - (last || time - 16), 48)
      const step = 1 - Math.exp(-delta / 260)
      last = time
      current.x += (target.x - current.x) * step
      current.y += (target.y - current.y) * step
      current.scroll += (target.scroll - current.scroll) * step
      dragWarp.x += (dragTarget.x - dragWarp.x) * (isDragging ? step * 1.4 : step * 0.8)
      dragWarp.y += (dragTarget.y - dragWarp.y) * (isDragging ? step * 1.4 : step * 0.8)

      element!.style.setProperty('--room-x', `${(current.x * 22).toFixed(2)}px`)
      element!.style.setProperty('--room-y', `${(current.y * 15 - current.scroll * 24).toFixed(2)}px`)
      element!.style.setProperty('--light-x', `${(current.x * 75).toFixed(2)}px`)
      element!.style.setProperty('--light-y', `${(current.y * 38).toFixed(2)}px`)
      element!.style.setProperty('--drag-warp-x', `${dragWarp.x.toFixed(2)}px`)
      element!.style.setProperty('--drag-warp-y', `${dragWarp.y.toFixed(2)}px`)
      element!.style.setProperty('--drag-rot', `${(dragWarp.x * 0.035).toFixed(3)}deg`)
      element!.style.setProperty('--room-opacity', (0.34 - current.scroll * 0.18).toFixed(3))
      element!.style.setProperty('--pointer-x', `${((.5 + current.x * .5) * innerWidth + dragWarp.x * 0.5).toFixed(1)}px`)
      element!.style.setProperty('--pointer-y', `${((.5 + current.y * .5) * innerHeight + dragWarp.y * 0.5).toFixed(1)}px`)

      const remaining = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) + Math.abs(target.scroll - current.scroll) + Math.abs(dragTarget.x - dragWarp.x) + Math.abs(dragTarget.y - dragWarp.y)
      frame = remaining > .002 ? requestAnimationFrame(draw) : 0
    }
    const request = () => { if (!frame) { last = 0; frame = requestAnimationFrame(draw) } }
    const down = (event: PointerEvent) => {
      const targetEl = event.target as HTMLElement | null
      if (targetEl && targetEl.closest('a, button, input, select, textarea, [tabindex="0"], .paper-business-card')) return
      isDragging = true
      dragOrigin.x = event.clientX
      dragOrigin.y = event.clientY
    }
    const move = (event: PointerEvent) => {
      target.x = (event.clientX / innerWidth - .5) * 2
      target.y = (event.clientY / innerHeight - .5) * 2
      if (isDragging) {
        const rawDx = event.clientX - dragOrigin.x
        const rawDy = event.clientY - dragOrigin.y
        dragTarget.x = Math.sign(rawDx) * Math.min(90, Math.sqrt(Math.abs(rawDx)) * 8.5)
        dragTarget.y = Math.sign(rawDy) * Math.min(70, Math.sqrt(Math.abs(rawDy)) * 7)
      }
      request()
    }
    const up = () => {
      if (isDragging) {
        isDragging = false
        dragTarget.x = 0
        dragTarget.y = 0
        request()
      }
    }
    const scroll = () => { target.scroll = Math.min(scrollY / 600, 1); request() }
    window.addEventListener('pointerdown', down, { passive: true })
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerup', up, { passive: true })
    window.addEventListener('pointercancel', up, { passive: true })
    window.addEventListener('scroll', scroll, { passive: true })
    request()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      window.removeEventListener('scroll', scroll)
    }
  }, [enabled])

  return (
    <div ref={ref} className="site-atmosphere" aria-hidden="true">
      <div className="atmosphere-photo" />
      <div className="atmosphere-window" />
      <div className="atmosphere-warmth" />
      <div className="atmosphere-pointer" />
      <div className="atmosphere-grain" />
      <div className="atmosphere-shade" />
    </div>
  )
}
