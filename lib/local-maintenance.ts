import { existsSync } from 'node:fs'
import { adminConfiguration, adminStore } from '@/lib/admin-config'
import { ownerSessionFilePath, ownerSessionStore } from '@/lib/owner-session'

export async function startLocalMaintenance() {
  if (process.env.NODE_ENV !== 'development' || process.env.VERCEL) return
  const tasks = [
    async () => { const config = adminConfiguration(); if (config) await adminStore(config).cleanup() },
    async () => { if (existsSync(ownerSessionFilePath())) await ownerSessionStore().cleanup() },
  ]
  const state = globalThis as typeof globalThis & { __portfolioMaintenance?: ReturnType<typeof setInterval> }
  const clean = async () => {
    for (const task of tasks) {
      try { await task() }
      catch { console.warn('Local private-state maintenance is unavailable.') }
    }
  }
  await clean()
  if (!state.__portfolioMaintenance) {
    state.__portfolioMaintenance = setInterval(() => { void clean() }, 60 * 60 * 1000)
    state.__portfolioMaintenance.unref()
  }
}
