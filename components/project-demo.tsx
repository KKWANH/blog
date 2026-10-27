'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import { useMotion } from '@/components/motion-provider'

export function ProjectDemo() {
  const [requested, setRequested] = useState(false)
  const [error, setError] = useState(false)
  const player = useRef<HTMLVideoElement>(null)
  const description = useId()
  const { paused } = useMotion()

  useEffect(() => {
    const video = player.current
    if (!requested || !video) return
    video.focus({ preventScroll: true })
    void video.play().catch(() => {
      // Native controls remain available if the browser requires another tap.
    })
    const visibility = () => { if (document.hidden) video.pause() }
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) video.pause() })
    observer.observe(video)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      video.pause()
      video.removeAttribute('src')
      video.load()
    }
  }, [requested])

  useEffect(() => { if (paused) player.current?.pause() }, [paused])

  return (
    <figure className="project-film">
      <div className="film-screen">
        {requested ? <video
          ref={player}
          data-project-demo
          controls
          playsInline
          muted
          preload="none"
          tabIndex={0}
          aria-label="Color Saves Life team prototype demo"
          aria-describedby={description}
          poster="/project-media/bcx-demo-poster.webp"
          src="/project-media/bcx-team-demo.mp4"
          onError={() => setError(true)}
          onPlay={(event) => {
            const current = event.currentTarget
            document.querySelectorAll<HTMLVideoElement>('video[data-project-demo]').forEach((other) => { if (other !== current) other.pause() })
          }}
        /> : <button type="button" className="film-start" onClick={() => setRequested(true)} aria-label="Play the 16-second team demo" aria-describedby={description}>
          <img src="/project-media/bcx-demo-poster.webp" width="1600" height="920" alt="" loading="lazy" />
          <span className="film-play"><Play aria-hidden="true" fill="currentColor" /><span>Play demo<small>16 seconds · Silent</small></span></span>
        </button>}
      </div>
      <figcaption>
        <p id={description}>A team recording of webcam tracking beside the Gazebo driver view. The camera perspective shifts while the traffic light changes from red through yellow to green.</p>
        <a href="https://github.com/KKWANH/ColorSavesLife/blob/main/assets/presentation/demo.mp4" target="_blank" rel="noopener noreferrer">Original team recording <ArrowUpRight aria-hidden="true" /></a>
        {error ? <p role="alert">This browser could not play the clip. Open the original recording above.</p> : null}
      </figcaption>
    </figure>
  )
}
