import { randomBytes, timingSafeEqual } from 'node:crypto'

const runtime = globalThis as typeof globalThis & { __kwanhoTravelEditorToken?: string }
const loopback = new Set(['localhost', '127.0.0.1', '[::1]', '::1'])

function localHost(value: string | null) {
  if (!value) return false
  try { return loopback.has(new URL(value.includes('://') ? value : `http://${value}`).hostname) } catch { return false }
}

export function localDevelopmentRequest(request: Request, env: NodeJS.ProcessEnv = process.env) {
  return env.NODE_ENV === 'development' && !env.VERCEL &&
    localHost(request.url) && localHost(request.headers.get('host'))
}

export function localTravelEditor(request: Request, env: NodeJS.ProcessEnv = process.env) {
  return env.TRAVEL_EDITOR_ENABLED === '1' && localDevelopmentRequest(request, env)
}

export function travelEditorToken() {
  return runtime.__kwanhoTravelEditorToken ??= randomBytes(32).toString('base64url')
}

export function travelWriteAllowed(request: Request, env: NodeJS.ProcessEnv = process.env, headerName = 'x-travel-editor-token') {
  if (!localTravelEditor(request, env) || !localHost(request.headers.get('origin'))) return false
  const supplied = request.headers.get(headerName) ?? ''
  const expected = travelEditorToken()
  const left = Buffer.from(supplied), right = Buffer.from(expected)
  return left.length === right.length && timingSafeEqual(left, right)
}
