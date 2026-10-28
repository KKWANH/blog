import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { localTravelEditor } from '@/lib/travel-editor-access'
import { createLocalPrivateStore, createRedisPrivateStore, PrivateStoreError, type PrivateStore } from '@/lib/private-store'

const scrypt = promisify(scryptCallback)
export type AdminConfiguration = { version: 1; passwordHash: string; sessionSecret: string; analyticsEnabled: boolean; createdAt: string }
const localDirectory = () => path.join(os.homedir(), '.kwanho-portfolio')
function inside(base: string, file: string) {
  const relative = path.relative(base, file)
  return relative === '' || (!relative.startsWith('..' + path.sep) && relative !== '..' && !path.isAbsolute(relative))
}
function canonicalPath(value: string) {
  const resolved = path.resolve(value)
  let current = resolved, suffix: string[] = []
  while (!fs.existsSync(current)) {
    const parent = path.dirname(current)
    if (parent === current) break
    suffix.unshift(path.basename(current)); current = parent
  }
  return path.join(fs.realpathSync(current), ...suffix)
}
export function privateStoragePath(value: string, env: NodeJS.ProcessEnv = process.env) {
  const canonical = canonicalPath(value)
  const root = fs.realpathSync(process.cwd())
  if (inside(root, canonical) && !inside(path.join(root, '.private'), canonical) && !inside(path.join(root, '.local'), canonical)) throw new PrivateStoreError('Private configuration must not be stored with public or source assets.')
  if (env.DEV_STUDIO_DIR) {
    const studio = canonicalPath(env.DEV_STUDIO_DIR)
    if (inside(studio, canonical)) throw new PrivateStoreError('Private configuration must not be stored in the design preview.')
  }
  return canonical
}
export const adminConfigPath = (env: NodeJS.ProcessEnv = process.env) => privateStoragePath(env.PORTFOLIO_ADMIN_CONFIG ?? path.join(localDirectory(), 'admin-config.json'), env)
const hashPattern = /^scrypt\$1\$([A-Za-z0-9_-]{43})\$([A-Za-z0-9_-]{86})$/

export async function hashAdminPassword(password: string) {
  if (typeof password !== 'string' || password.length < 14 || password.length > 256 || new Set(password).size < 5) throw new Error('Use a password or passphrase of at least 14 characters with varied characters.')
  const salt = randomBytes(32)
  const derived = await scrypt(password, salt, 64) as Buffer
  return `scrypt$1$${salt.toString('base64url')}$${derived.toString('base64url')}`
}
export async function verifyAdminPassword(password: string, stored: string) {
  if (typeof password !== 'string' || password.length > 256) return false
  const match = hashPattern.exec(stored)
  if (!match) return false
  const expected = Buffer.from(match[2], 'base64url')
  const actual = await scrypt(password, Buffer.from(match[1], 'base64url'), 64) as Buffer
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}
export function adminConfiguration(env: NodeJS.ProcessEnv = process.env): AdminConfiguration | null {
  let value: unknown
  if (env.ADMIN_PASSWORD_HASH || env.ADMIN_SESSION_SECRET) {
    value = { version: 1, passwordHash: env.ADMIN_PASSWORD_HASH, sessionSecret: env.ADMIN_SESSION_SECRET, analyticsEnabled: env.ANALYTICS_ENABLED === '1', createdAt: 'environment' }
  } else {
    if (env.NODE_ENV === 'production' || env.VERCEL) return null
    try { value = JSON.parse(fs.readFileSync(adminConfigPath(env), 'utf8')) }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null
      throw new PrivateStoreError('Admin configuration is invalid.')
    }
  }
  const config = value as AdminConfiguration
  if (!config || config.version !== 1 || !hashPattern.test(config.passwordHash ?? '') ||
    !/^[A-Za-z0-9_-]{43}$/.test(config.sessionSecret ?? '') || Buffer.from(config.sessionSecret, 'base64url').length !== 32 ||
    typeof config.analyticsEnabled !== 'boolean') throw new PrivateStoreError('Admin configuration is invalid.')
  return config
}
export function adminStore(config: AdminConfiguration, env: NodeJS.ProcessEnv = process.env): PrivateStore {
  if (env.NODE_ENV === 'production' || env.VERCEL) {
    const url = env.ANALYTICS_REDIS_REST_URL || env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL
    const token = env.ANALYTICS_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN
    if (!url || !token) throw new PrivateStoreError('Private storage is not configured.')
    return createRedisPrivateStore(url, token)
  }
  return createLocalPrivateStore(privateStoragePath(env.PORTFOLIO_PRIVATE_STATE ?? path.join(path.dirname(adminConfigPath(env)), 'private-state.json'), env))
}
export function localAdminSetupAllowed(request: Request, env: NodeJS.ProcessEnv = process.env) {
  return localTravelEditor(request, env) && !env.ADMIN_PASSWORD_HASH && !env.ADMIN_SESSION_SECRET && !fs.existsSync(adminConfigPath(env))
}
export async function createLocalAdminConfiguration(password: string, analyticsEnabled: boolean, env: NodeJS.ProcessEnv = process.env) {
  if (env.NODE_ENV !== 'development' || env.VERCEL || env.ADMIN_PASSWORD_HASH || env.ADMIN_SESSION_SECRET) throw new PrivateStoreError('Local setup is unavailable.', 403)
  const file = adminConfigPath(env)
  const config: AdminConfiguration = { version: 1, passwordHash: await hashAdminPassword(password), sessionSecret: randomBytes(32).toString('base64url'), analyticsEnabled, createdAt: new Date().toISOString() }
  await fs.promises.mkdir(path.dirname(file), { recursive: true, mode: 0o700 })
  try { await fs.promises.writeFile(file, JSON.stringify(config, null, 2) + '\n', { flag: 'wx', mode: 0o600 }) }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EEXIST') throw new PrivateStoreError('Admin setup has already been completed.', 409)
    throw new PrivateStoreError('Local configuration could not be saved.')
  }
}
