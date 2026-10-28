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
    const current = { x: 0, y: 0, scroll: 0 }
    const target = { x: 0, y: 0, scroll: Math.min(scrollY / 600, 1) }
    function draw(time: number) {
      const step = 1 - Math.exp(-Math.min(time - (last || time - 16), 48) / 260)
      last = time
      current.x += (target.x - current.x) * step
      current.y += (target.y - current.y) * step
      current.scroll += (target.scroll - current.scroll) * step
      element!.style.setProperty('--room-x', `${(current.x * 12).toFixed(2)}px`)
      element!.style.setProperty('--room-y', `${(current.y * 8 - current.scroll * 24).toFixed(2)}px`)
      element!.style.setProperty('--light-x', `${(current.x * 48).toFixed(2)}px`)
      element!.style.setProperty('--light-y', `${(current.y * 24).toFixed(2)}px`)
      element!.style.setProperty('--room-opacity', (0.28 - current.scroll * 0.18).toFixed(3))
      element!.style.setProperty('--pointer-x', `${((.5 + current.x * .5) * innerWidth).toFixed(1)}px`)
      element!.style.setProperty('--pointer-y', `${((.5 + current.y * .5) * innerHeight).toFixed(1)}px`)
      const remaining = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) + Math.abs(target.scroll - current.scroll)
      frame = remaining > .002 ? requestAnimationFrame(draw) : 0
    }
    const request = () => { if (!frame) { last = 0; frame = requestAnimationFrame(draw) } }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      target.x = (event.clientX / innerWidth - .5) * 2
      target.y = (event.clientY / innerHeight - .5) * 2
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
