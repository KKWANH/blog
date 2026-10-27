'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import seed from '@/contents/about/skill-profile.json'
import { skillProfileSchema, preferenceFor, type SkillProfile } from '@/lib/skill-preferences'
import { mapTechnologies } from '@/lib/repository-catalogue'

const initial = skillProfileSchema.parse(seed)
const ProfileContext = createContext<{ profile: SkillProfile; refresh: () => Promise<void> }>({ profile: initial, refresh: async () => {} })

export function SkillProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<SkillProfile>(initial)
  const pending = useRef<AbortController | null>(null)
  const refresh = useCallback(async () => {
    pending.current?.abort()
    const controller = new AbortController()
    pending.current = controller
    try {
      const response = await fetch('/api/skills', { cache: 'no-store', signal: controller.signal })
      if (!response.ok) return
      const data = await response.json()
      const parsed = skillProfileSchema.safeParse(data.profile)
      if (parsed.success && !controller.signal.aborted) setProfile(parsed.data)
    } catch { /* Keep the known published snapshot when a refresh is unavailable. */ }
    finally { if (pending.current === controller) pending.current = null }
  }, [])
  useEffect(() => {
    void refresh()
    const update = () => { void refresh() }
    window.addEventListener('focus', update)
    window.addEventListener('skill-profile-updated', update)
    const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('kwanho-skill-profile') : null
    if (channel) channel.onmessage = update
    return () => {
      window.removeEventListener('focus', update)
      window.removeEventListener('skill-profile-updated', update)
      channel?.close()
      pending.current?.abort()
    }
  }, [refresh])
  const value = useMemo(() => ({ profile, refresh }), [profile, refresh])
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export function useSkillPreferences() {
  const context = useContext(ProfileContext)
  const preference = useCallback((id: string) => preferenceFor(context.profile, id, Boolean(mapTechnologies.find((tech) => tech.id === id)?.personal)), [context.profile])
  return { ...context, preference }
}
