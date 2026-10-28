import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { isIP } from 'node:net'
import { adminConfiguration, adminStore, type AdminConfiguration } from '@/lib/admin-config'
import { cookieHeader, openCookie, privateCookieName, requestCookie, sealCookie } from '@/lib/private-cookies'
import { localDevelopmentRequest } from '@/lib/travel-editor-access'
import { sameOriginJson } from '@/lib/http-input'
import { PrivateStoreError, type PrivateStore } from '@/lib/private-store'
import { siteUrl } from '@/lib/site'

export type AdminSession = { id: string; csrf: string; expires: number; passwordVersion: string }
const SESSION_SECONDS = 3600
const sessionKey = (id: string) => `admin-session:${createHash('sha256').update(id).digest('hex')}`
const passwordVersion = (config: AdminConfiguration) => createHash('sha256').update(config.passwordHash).digest('hex').slice(0, 24)
function rateAddress(address: string) {
  if (isIP(address) === 4) return address
  const normalized = new URL(`http://[${address}]`).hostname.slice(1, -1)
  const [left, right = ''] = normalized.split('::'), start = left ? left.split(':') : [], end = right ? right.split(':') : []
  const groups = [...start, ...Array(8 - start.length - end.length).fill('0'), ...end].map((part) => parseInt(part, 16))
  if (groups.slice(0, 5).every((part) => part === 0) && groups[5] === 65535) return [groups[6] >> 8, groups[6] & 255, groups[7] >> 8, groups[7] & 255].join('.')
  return groups.slice(0, 4).map((part) => part.toString(16)).join(':') + '::/64'
}
export function adminOrigin(request: Request, env: NodeJS.ProcessEnv = process.env) {
  if (localDevelopmentRequest(request, env)) return new URL(request.url).origin
  try {
    const origin = new URL(env.ADMIN_ORIGIN ?? siteUrl)
    return origin.protocol === 'https:' ? origin.origin : null
  } catch { return null }
}
export function adminWriteOrigin(request: Request, env: NodeJS.ProcessEnv = process.env) {
  const origin = adminOrigin(request, env)
  return Boolean(origin && new URL(request.url).origin === origin && sameOriginJson(request, origin))
}
export function clientRateKey(request: Request, config: AdminConfiguration, env: NodeJS.ProcessEnv = process.env) {
  let address: string
  if (localDevelopmentRequest(request, env)) address = 'local'
  else {
    if (env.VERCEL !== '1') throw new PrivateStoreError('Trusted request identity is unavailable.')
    address = (request.headers.get('x-vercel-forwarded-for') ?? '').split(',')[0].trim()
    if (!isIP(address)) throw new PrivateStoreError('Trusted request identity is unavailable.')
    try { address = rateAddress(address) } catch { throw new PrivateStoreError('Trusted request identity is unavailable.') }
  }
  return createHmac('sha256', Buffer.from(config.sessionSecret, 'base64url')).update(`rate:${address}`).digest('hex')
}
export async function readAdminSession(request: Request, env: NodeJS.ProcessEnv = process.env, config = adminConfiguration(env), store?: PrivateStore) {
  if (!config) return null
  const secure = new URL(request.url).protocol === 'https:'
  if ((env.NODE_ENV === 'production' || env.VERCEL) && !secure) return null
  if (adminOrigin(request, env) !== new URL(request.url).origin) return null
  const payload = openCookie(requestCookie(request, privateCookieName('admin', secure)), 'admin', config.sessionSecret) as { id?: unknown; expires?: unknown } | null
  if (!payload || typeof payload.id !== 'string' || !/^[A-Za-z0-9_-]{43}$/.test(payload.id) || typeof payload.expires !== 'number' || payload.expires <= Date.now() || payload.expires > Date.now() + SESSION_SECONDS * 1000 + 5000) return null
  const session = await (store ?? adminStore(config, env)).get<AdminSession>(sessionKey(payload.id))
  if (!session || session.id !== payload.id || session.expires !== payload.expires || session.expires <= Date.now() || session.passwordVersion !== passwordVersion(config) || !/^[A-Za-z0-9_-]{43}$/.test(session.csrf ?? '')) return null
  return session
}
export async function issueAdminSession(request: Request, config: AdminConfiguration, store: PrivateStore) {
  const session: AdminSession = { id: randomBytes(32).toString('base64url'), csrf: randomBytes(32).toString('base64url'), expires: Date.now() + SESSION_SECONDS * 1000, passwordVersion: passwordVersion(config) }
  await store.set(sessionKey(session.id), session, SESSION_SECONDS)
  const secure = new URL(request.url).protocol === 'https:'
  return { session, cookie: cookieHeader(privateCookieName('admin', secure), sealCookie({ id: session.id, expires: session.expires }, 'admin', config.sessionSecret), SESSION_SECONDS, secure) }
}
export async function revokeAdminSession(session: AdminSession, store: PrivateStore) {
  await store.remove(sessionKey(session.id))
}
export function adminCsrfAllowed(request: Request, session: AdminSession, env: NodeJS.ProcessEnv = process.env) {
  if (!adminWriteOrigin(request, env)) return false
  const supplied = request.headers.get('x-admin-csrf') ?? ''
  return /^[A-Za-z0-9_-]{43}$/.test(supplied) && supplied.length === session.csrf.length && timingSafeEqual(Buffer.from(supplied), Buffer.from(session.csrf))
}
