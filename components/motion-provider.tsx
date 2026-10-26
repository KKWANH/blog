'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Pause, Play } from 'lucide-react'

type MotionContextValue = { enabled: boolean; reduced: boolean; paused: boolean; toggle: () => void }
const MotionContext = createContext<MotionContextValue | null>(null)

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(true)
  const [paused, setPaused] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    const visibility = () => setHidden(document.hidden)
    update()
    visibility()
    try { setPaused(localStorage.getItem('kwanho-motion') === 'off') } catch {}
    setReady(true)
    media.addEventListener('change', update)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      media.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    try { localStorage.setItem('kwanho-motion', paused ? 'off' : 'on') } catch {}
  }, [paused, ready])

  const enabled = !reduced && !paused && !hidden
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? 'on' : 'off'
  }, [enabled])

  const value = useMemo(() => ({
    enabled, reduced, paused,
    toggle: () => setPaused((current) => !current),
  }), [enabled, reduced, paused])

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}

export function useMotion() {
  const value = useContext(MotionContext)
  if (!value) throw new Error('Motion components require MotionProvider.')
  return value
}

export function MotionControl({ compact = false }: { compact?: boolean }) {
  const { reduced, paused, toggle } = useMotion()
  if (reduced) return <span className={`motion-preference ${compact ? 'motion-compact' : ''}`} title="Reduced motion">
    {compact ? <Pause aria-hidden="true" /> : null}<span className={compact ? 'sr-only' : undefined}>Reduced motion</span>
  </span>
  const label = paused ? 'Enable motion' : 'Pause motion'
  return (
    <button type="button" className={`motion-control ${compact ? 'motion-compact' : ''}`} onClick={toggle} aria-pressed={paused} aria-label={label} title={compact ? label : undefined}>
      {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      <span className={compact ? 'sr-only' : undefined}>{label}</span>
    </button>
  )
}
