import { adminWriteOrigin, clientRateKey } from '@/lib/admin-auth'
import { analyticsConfiguration, analyticsEvent, browserPrivacySignal, newVisitorCookie, visitorCookieHeader, visitorConsentKey, pendingVisitorRevocation, withdrawVisitor, visitPreference, preferenceKey, preferenceToken, type VisitorCookie } from '@/lib/visit-analytics'
import { adminConfiguration, adminStore } from '@/lib/admin-config'
import { HttpInputError, readJsonBody } from '@/lib/http-input'
import { cookieHeader, privateCookieName, openCookie, sealCookie } from '@/lib/private-cookies'
import type { VisitorConsent } from '@/lib/admin-types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' }
function json(value: unknown, cookies: string[] = [], status = 200) {
  const responseHeaders = new Headers(headers)
  cookies.forEach((cookie) => responseHeaders.append('Set-Cookie', cookie))
  return Response.json(value, { status, headers: responseHeaders })
}
export async function POST(request: Request) {
  if (!adminWriteOrigin(request)) return Response.json({ error: 'This request is not allowed.' }, { status: 403, headers })
  try {
    const body = await readJsonBody(request, 128) as { enabled?: unknown }
    if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length !== 1 || typeof body.enabled !== 'boolean') throw new HttpInputError('Choose whether to allow visitor statistics.', 422)
    if (!body.enabled || browserPrivacySignal(request)) {
      let config = null, store
      try {
        config = adminConfiguration()
        if (config) store = adminStore(config)
      } catch { /* A sealed retry capability is retained if configuration/storage is down. */ }
      const result = await withdrawVisitor(request, config, store)
      return json({ consented: false, revocationConfirmed: result.confirmed, revocationPending: !result.confirmed, warning: result.confirmed ? undefined : 'Visitor counting is off. Server withdrawal is pending; retry when available.' }, result.cookies)
    }
    const service = analyticsConfiguration()
    if (!service) return Response.json({ error: 'Optional visitor statistics are unavailable.' }, { status: 503, headers })
    if (!await service.store.limit(`consent:${clientRateKey(request, service.config)}`, 20, 60) || !await service.store.limit('consent-global', 1200, 60)) return Response.json({ error: 'Too many preference requests. Try shortly.' }, { status: 429, headers })
    if (pendingVisitorRevocation(request, service.config)) return json({ error: 'Finish the pending withdrawal before opting in again.' }, [], 409)
    const control = await visitPreference(request, service.config, service.store)
    if (!control || request.headers.get('x-visitor-preference') !== control.token) return json({ error: 'Preferences changed. Reopen this panel before opting in.' }, [], 409)
    if (!control.state.allowed) {
      if (!await service.store.limit(`visitor-registrations:${new Date().toISOString().slice(0, 10)}`, 5000, 86400)) return Response.json({ error: 'Optional visitor counting is at capacity today.' }, { status: 429, headers })
    }
    const proposedCookie = newVisitorCookie(control.cookie.id, control.state.expires), now = Date.now()
    const proposedRecord: VisitorConsent = { version: 1, generation: 0, expires: proposedCookie.expires, seenAt: now, startedAt: now }
    const changed = await service.store.changePreference(preferenceKey(control.cookie.id, service.config), control.state.revision, true, { key: visitorConsentKey(proposedCookie.visitor, service.config), record: proposedRecord, cookie: sealCookie(proposedCookie, 'visits', service.config.sessionSecret) })
    if (!changed?.allowed || !changed.visitorKey || !changed.visitorCookie) return json({ error: 'Another tab changed this preference. Reopen the panel and choose again.' }, [], 409)
    const cookie = openCookie(changed.visitorCookie, 'visits', service.config.sessionSecret) as VisitorCookie | null
    const record = await service.store.touchConsent(changed.visitorKey, now)
    if (!cookie || !record) return json({ error: 'The preference changed while saving. Reopen the panel.' }, [], 409)
    const visitor = { cookie: { ...cookie, generation: record.generation }, record }
    // Count an opted-in browser/session once without counting the current page twice.
    const collected = analyticsEvent('', null, 'direct', visitor, service.config)
    await service.store.record(collected.event, { key: visitorConsentKey(visitor.cookie.visitor, service.config), generation: visitor.record.generation })
    const secure = new URL(request.url).protocol === 'https:'
    return json({ consented: true, revocationPending: false, prepared: true, preferenceToken: preferenceToken(control.cookie.id, changed, service.config) }, [
      visitorCookieHeader(request, collected.cookie, service.config),
      cookieHeader(privateCookieName('visitor-choice', secure), '', 0, secure, 'Lax'),
      cookieHeader(privateCookieName('visitor-revoke', secure), '', 0, secure, 'Lax'),
    ])
  } catch (error) {
    return Response.json({ error: error instanceof HttpInputError ? error.message : 'The preference could not be saved.' }, { status: error instanceof HttpInputError ? error.status : 503, headers })
  }
}
