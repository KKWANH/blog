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
    let velocity = 0
    let lastX = 0, lastY = 0
    const current = { x: 0, y: 0, scroll: 0 }
    const target = { x: 0, y: 0, scroll: Math.min(scrollY / 600, 1) }

    function draw(time: number) {
      const delta = Math.min(time - (last || time - 16), 48)
      const step = 1 - Math.exp(-delta / 90)
      last = time
      current.x += (target.x - current.x) * step
      current.y += (target.y - current.y) * step
      current.scroll += (target.scroll - current.scroll) * step
      velocity *= Math.exp(-delta / 160)

      const scale = 1 + velocity * 0.16
      const opacity = Math.min(1, 0.9 + velocity * 0.25)

      element!.style.setProperty('--room-x', `${(current.x * 24).toFixed(2)}px`)
      element!.style.setProperty('--room-y', `${(current.y * 16 - current.scroll * 24).toFixed(2)}px`)
      element!.style.setProperty('--light-x', `${(current.x * 80).toFixed(2)}px`)
      element!.style.setProperty('--light-y', `${(current.y * 42).toFixed(2)}px`)
      element!.style.setProperty('--room-opacity', (0.36 - current.scroll * 0.18).toFixed(3))
      element!.style.setProperty('--pointer-x', `${((.5 + current.x * .5) * innerWidth).toFixed(1)}px`)
      element!.style.setProperty('--pointer-y', `${((.5 + current.y * .5) * innerHeight).toFixed(1)}px`)
      element!.style.setProperty('--pointer-scale', scale.toFixed(3))
      element!.style.setProperty('--pointer-opacity', opacity.toFixed(3))

      const remaining = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) + Math.abs(target.scroll - current.scroll) + velocity
      frame = remaining > .002 ? requestAnimationFrame(draw) : 0
    }
    const request = () => { if (!frame) { last = 0; frame = requestAnimationFrame(draw) } }
    const move = (event: PointerEvent) => {
      target.x = (event.clientX / innerWidth - .5) * 2
      target.y = (event.clientY / innerHeight - .5) * 2
      const vx = event.clientX - lastX
      const vy = event.clientY - lastY
      lastX = event.clientX
      lastY = event.clientY
      velocity = Math.min(1, velocity * 0.7 + Math.hypot(vx, vy) * 0.015)
      request()
    }
    const scroll = () => { target.scroll = Math.min(scrollY / 600, 1); request() }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', scroll, { passive: true })
    request()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
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
