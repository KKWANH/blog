import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { sameOriginJson } from '@/lib/http-input'

const runtime = globalThis as typeof globalThis & { __kwanhoTravelEditorToken?: string }
const loopback = new Set(['localhost', '127.0.0.1', '[::1]', '::1'])

function localHost(value: string | null) {
  if (!value) return false
  try { return loopback.has(new URL(value.includes('://') ? value : `http://${value}`).hostname) } catch { return false }
}

export function localDevelopmentRequest(request: Request, env: NodeJS.ProcessEnv = process.env) {
  return env.NODE_ENV === 'development' && !env.VERCEL &&
    localHost(request.url) && localHost(request.headers.get('host')) &&
    new URL(request.url).host === request.headers.get('host')
}

export function localTravelEditor(request: Request, env: NodeJS.ProcessEnv = process.env) {
  return env.TRAVEL_EDITOR_ENABLED === '1' && localDevelopmentRequest(request, env)
}

export function travelEditorToken() {
  return localEditorToken('travel')
}
export function localEditorToken(purpose: 'travel' | 'skills' | 'admin-setup') {
  const secret = runtime.__kwanhoTravelEditorToken ??= randomBytes(32).toString('base64url')
  return createHmac('sha256', secret).update(purpose).digest('base64url')
}

export function travelWriteAllowed(request: Request, env: NodeJS.ProcessEnv = process.env, headerName = 'x-travel-editor-token', purpose: 'travel' | 'skills' | 'admin-setup' = 'travel') {
  if (!localTravelEditor(request, env) || !sameOriginJson(request, new URL(request.url).origin)) return false
  const supplied = request.headers.get(headerName) ?? ''
  const expected = localEditorToken(purpose)
  if (supplied.length !== expected.length) return false
  const left = Buffer.from(supplied), right = Buffer.from(expected)
  return left.length === right.length && timingSafeEqual(left, right)
}
