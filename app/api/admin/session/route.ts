import { adminConfiguration, adminStore, localAdminSetupAllowed, verifyAdminPassword } from '@/lib/admin-config'
import { adminCsrfAllowed, adminWriteOrigin, clientRateKey, issueAdminSession, readAdminSession, revokeAdminSession } from '@/lib/admin-auth'
import { cookieHeader, privateCookieName } from '@/lib/private-cookies'
import { HttpInputError, readJsonBody } from '@/lib/http-input'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'private, no-store', Vary: 'Cookie', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex', 'Cross-Origin-Resource-Policy': 'same-origin' }
const json = (value: unknown, status = 200, additional: Record<string, string> = {}) => Response.json(value, { status, headers: { ...headers, ...additional } })

export async function GET(request: Request) {
  try {
    const config = adminConfiguration()
    if (!config) return json({ configured: false, authenticated: false, setupAvailable: localAdminSetupAllowed(request) })
    const store = adminStore(config), session = await readAdminSession(request, process.env, config, store)
    return json({ configured: true, authenticated: Boolean(session), setupAvailable: false, csrf: session?.csrf, expires: session?.expires, analyticsEnabled: config.analyticsEnabled })
  } catch { return json({ configured: false, authenticated: false, setupAvailable: false, error: 'Admin configuration or private storage is unavailable.' }, 503) }
}
export async function POST(request: Request) {
  if (!adminWriteOrigin(request)) return json({ error: 'This request is not allowed.' }, 403)
  try {
    const config = adminConfiguration()
    if (!config) return json({ error: 'Admin sign-in is not configured.' }, 503)
    const store = adminStore(config), client = clientRateKey(request, config)
    if (!await store.limit(`login-source:${client}`, 10, 900) || !await store.limit('login-global', 180, 60)) return json({ error: 'Too many sign-in attempts. Try later.' }, 429, { 'Retry-After': '900' })
    const body = await readJsonBody(request, 2048) as { password?: unknown }
    if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some((key) => key !== 'password') || typeof body.password !== 'string' || body.password.length > 256) throw new HttpInputError('Send a valid password request.', 422)
    if (!await verifyAdminPassword(body.password, config.passwordHash)) return json({ error: 'Sign-in did not succeed.' }, 401)
    const issued = await issueAdminSession(request, config, store)
    return json({ authenticated: true, csrf: issued.session.csrf, expires: issued.session.expires }, 200, { 'Set-Cookie': issued.cookie })
  } catch (error) {
    if (error instanceof HttpInputError) return json({ error: error.message }, error.status)
    return json({ error: 'Sign-in is temporarily unavailable.' }, 503)
  }
}
export async function DELETE(request: Request) {
  if (!adminWriteOrigin(request)) return json({ error: 'This request is not allowed.' }, 403)
  try {
    const body = await readJsonBody(request, 128)
    if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length) throw new HttpInputError('Send an empty sign-out request.', 422)
    const config = adminConfiguration()
    if (config) {
      const store = adminStore(config), session = await readAdminSession(request, process.env, config, store)
      if (session) {
        if (!adminCsrfAllowed(request, session)) return json({ error: 'Refresh the admin session before signing out.' }, 403)
        await revokeAdminSession(session, store)
      }
    }
    const secure = new URL(request.url).protocol === 'https:'
    return json({ authenticated: false }, 200, { 'Set-Cookie': cookieHeader(privateCookieName('admin', secure), '', 0, secure) })
  } catch (error) { return json({ error: error instanceof HttpInputError ? error.message : 'Sign-out could not be confirmed. Try again.' }, error instanceof HttpInputError ? error.status : 503) }
}
