import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/lib/profile'
import { externalLinks } from '@/lib/projects'
import { TiltSurface } from '@/components/tilt-surface'

export function Hero() {
  return (
    <section className="cinema-intro" aria-labelledby="intro-name">
      <div className="cinema-intro-copy">
        <p className="scene-eyebrow">Software Engineer · Leuven</p>
        <h1 id="intro-name">Kwanho<br />{' '}Kim<span>.</span></h1>
        <p className="cinema-intro-role">Currently at KLA · ICOS Division.</p>
        <p className="cinema-intro-note">
          Working on C++ device software, machine interfaces and failure recovery.
        </p>
        <div className="cinema-intro-actions">
          <Link prefetch={false} className="action-button action-primary" href="/about">Meet Kwanho <ArrowUpRight aria-hidden="true" /></Link>
          <a className="text-link" href={externalLinks.cv}>{externalLinks.cvLabel} <ArrowUpRight aria-hidden="true" /></a>
        </div>
        <a href="#work" className="scene-scroll"><span aria-hidden="true">↓</span> Work, notes &amp; the rest</a>
      </div>
      <TiltSurface className="window-stage" pitch={8} yaw={11} lift={10} scale={1.02}>
        <figure className="cinema-window">
          <div className="window-image">
            <img src="/window-portrait.webp" alt="Kwanho looking down beside a sunlit window and green foliage" width="1024" height="576" fetchPriority="high" />
            <div className="window-reflection" aria-hidden="true" />
          </div>
          <figcaption><span>Away from the debugger.</span></figcaption>
        </figure>
      </TiltSurface>
    </section>
  )
}
