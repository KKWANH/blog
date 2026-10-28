import os from 'node:os'
import path from 'node:path'
import { createHash, randomBytes } from 'node:crypto'
import { createLocalPrivateStore, createRedisPrivateStore, PrivateStoreError, type PrivateStore } from '@/lib/private-store'
import { privateStoragePath } from '@/lib/admin-config'
import { openCookie, sealCookie } from '@/lib/private-cookies'
import { validOwnerClaims, type OwnerClaims } from '@/lib/travel-owner-policy'

const OWNER = '35485904'
type OwnerRecord = { ownerId: string; encryptedToken: string; accessTokenExpires: number; expires: number; travelCsrfKey: string }
export const ownerSessionKey = (id: string) => 'owner-session:' + createHash('sha256').update(id).digest('hex')
const encryptionSecret = (secret: string) => createHash('sha256').update(secret).digest('base64url')
export const ownerSessionFilePath = (env: NodeJS.ProcessEnv = process.env) => privateStoragePath(env.OWNER_SESSION_STATE_PATH ?? path.join(os.homedir(), '.kwanho-portfolio/owner-sessions.json'), env)
export function ownerSessionStorageConfigured(env: NodeJS.ProcessEnv = process.env) {
  if (env.NODE_ENV !== 'production' && !env.VERCEL) return true
  try {
    const url = new URL(env.ANALYTICS_REDIS_REST_URL ?? '')
    return url.protocol === 'https:' && url.hostname.endsWith('.upstash.io') && url.pathname === '/' && !url.username && !url.password && !url.search && !url.hash && Boolean(env.ANALYTICS_REDIS_REST_TOKEN?.trim())
  } catch { return false }
}
export function ownerSessionStore(env: NodeJS.ProcessEnv = process.env): PrivateStore {
  if (env.NODE_ENV === 'production' || env.VERCEL) {
    if (!ownerSessionStorageConfigured(env)) throw new PrivateStoreError('Owner session storage is unavailable.')
    return createRedisPrivateStore(env.ANALYTICS_REDIS_REST_URL!, env.ANALYTICS_REDIS_REST_TOKEN!)
  }
  return createLocalPrivateStore(ownerSessionFilePath(env))
}
export async function issueOwnerSession(accessToken: string, accessTokenExpires: number, env: NodeJS.ProcessEnv = process.env, storage = ownerSessionStore(env)) {
  const now = Date.now(), expires = Math.min(now + 3600_000, accessTokenExpires)
  if (!env.NEXTAUTH_SECRET || !accessToken || expires <= now) throw new PrivateStoreError('Owner access is unavailable.')
  const id = randomBytes(32).toString('base64url')
  const record: OwnerRecord = { ownerId: OWNER, encryptedToken: sealCookie({ token: accessToken }, 'github-access', encryptionSecret(env.NEXTAUTH_SECRET)), accessTokenExpires, expires, travelCsrfKey: randomBytes(32).toString('base64url') }
  await storage.set(ownerSessionKey(id), record, Math.ceil((expires - now) / 1000))
  return { id, claims: { ownerId: OWNER, githubAccessToken: accessToken, accessTokenExpires, travelCsrfKey: record.travelCsrfKey } satisfies OwnerClaims }
}
export async function resolveOwnerSession(token: Record<string, unknown> | null, env: NodeJS.ProcessEnv = process.env, storage?: PrivateStore): Promise<OwnerClaims | null> {
  if (!env.NEXTAUTH_SECRET || token?.ownerId !== OWNER || typeof token.ownerSessionId !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(token.ownerSessionId)) return null
  const record = await (storage ?? ownerSessionStore(env)).get<OwnerRecord>(ownerSessionKey(token.ownerSessionId))
  if (!record || record.ownerId !== OWNER || record.expires <= Date.now() || record.accessTokenExpires <= Date.now()) return null
  const value = openCookie(record.encryptedToken, 'github-access', encryptionSecret(env.NEXTAUTH_SECRET)) as { token?: unknown } | null
  const claims = { ownerId: record.ownerId, githubAccessToken: value?.token, accessTokenExpires: record.accessTokenExpires, travelCsrfKey: record.travelCsrfKey }
  return validOwnerClaims(claims, OWNER) ? claims : null
}
export async function revokeOwnerSession(token: Record<string, unknown> | null, env: NodeJS.ProcessEnv = process.env, storage?: PrivateStore) {
  if (token?.ownerId === OWNER && typeof token.ownerSessionId === 'string' && /^[A-Za-z0-9_-]{43}$/.test(token.ownerSessionId)) await (storage ?? ownerSessionStore(env)).remove(ownerSessionKey(token.ownerSessionId))
}
