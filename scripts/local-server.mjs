import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { existsSync, realpathSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import nextEnv from '@next/env'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const localUrl = 'http://localhost:3100'
const port = 3100

async function checkPort(host) {
  await new Promise((resolve, reject) => {
    const probe = createServer()
    probe.once('error', (error) => {
      if (host === '::1' && ['EAFNOSUPPORT', 'EADDRNOTAVAIL'].includes(error.code)) resolve()
      else reject(error)
    })
    probe.listen({ host, port }, () => probe.close(resolve))
  })
}

export async function startLocalServer({ editor = false, production = false } = {}) {
  nextEnv.loadEnvConfig(root, !production)
  try {
    await checkPort('127.0.0.1')
    await checkPort('::1')
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      throw new Error(`${localUrl} is already in use. Reuse or stop that server first; this launcher never chooses another port.`)
    }
    throw error
  }
  await import('./prepare-map-worker.mjs')
  const { ensureRepositoryIndex } = await import('./build-repository-index.mjs')
  ensureRepositoryIndex()
  const { ensurePublicRoutes } = await import('./build-public-routes.mjs')
  ensurePublicRoutes()
  const { ensureBuildMeta } = await import('./build-meta.mjs')
  ensureBuildMeta()
  const { ensureTravelGalleries } = await import('./build-travel-galleries.mjs')
  await ensureTravelGalleries().catch((error) => console.warn(`travel galleries: ${error.message}`))
  const env = { ...process.env, NODE_ENV: production ? 'production' : 'development', TRAVEL_EDITOR_ENABLED: editor && !production ? '1' : '0' }
  const internalStudio = path.resolve(root, 'career-refresh-2026-10/design')
  const defaultStudio = existsSync(internalStudio) ? internalStudio : '../career-refresh-2026-10/design'
  const studio = path.resolve(root, process.env.DEV_STUDIO_DIR ?? defaultStudio)
  if (!production && existsSync(studio)) env.DEV_STUDIO_DIR = realpathSync(studio)
  else delete env.DEV_STUDIO_DIR

  console.log(`Local site: ${localUrl}`)
  console.log(`Profile: ${localUrl}/about`)
  if (env.DEV_STUDIO_DIR) console.log(`Design studio: ${localUrl}/studio/`)
  if (editor) console.log(`Local atlas editor: ${localUrl}/travel/manage`)
  if (editor) console.log(`Local skill editor: ${localUrl}/about/manage`)

  const child = spawn(process.execPath, [
    path.join(root, 'node_modules/next/dist/bin/next'), production ? 'start' : 'dev',
    '--hostname', 'localhost', '--port', String(port),
  ], { cwd: root, env, stdio: 'inherit' })
  child.on('exit', (code) => { process.exitCode = code ?? 0 })
  child.on('error', (error) => { console.error(error.message); process.exitCode = 1 })
  process.on('SIGINT', () => child.kill('SIGINT'))
  process.on('SIGTERM', () => child.kill('SIGTERM'))
}
