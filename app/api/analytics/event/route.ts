import { adminOrigin, adminWriteOrigin, clientRateKey, readAdminSession } from '@/lib/admin-auth'
import { analyticsConfiguration, analyticsEvent, browserPrivacySignal, publicAnalyticsPath, referralHost, consentedVisitor, withdrawVisitor, visitorConsentKey } from '@/lib/visit-analytics'
import { HttpInputError, readJsonBody } from '@/lib/http-input'
import { adminConfiguration, adminStore } from '@/lib/admin-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
export async function POST(request: Request) {
  if (!adminWriteOrigin(request)) return new Response(null, { status: 403, headers })
  if (browserPrivacySignal(request)) {
    let config = null, store
    try { config = adminConfiguration(); if (config) store = adminStore(config) } catch { /* No collection while unavailable. */ }
    const result = await withdrawVisitor(request, config, store, false), responseHeaders = new Headers(headers)
    result.cookies.forEach((cookie) => responseHeaders.append('Set-Cookie', cookie))
    return new Response(null, { status: 204, headers: responseHeaders })
  }
  try {
    const service = analyticsConfiguration()
    if (!service) return new Response(null, { status: 204, headers })
    const { config, store } = service
    const client = clientRateKey(request, config)
    if (!await store.limit(`events-source:${client}`, 120, 60) || !await store.limit('events-global', 5000, 60)) return new Response(null, { status: 429, headers: { ...headers, 'Retry-After': '60' } })
    const body = await readJsonBody(request, 1024) as { path?: unknown; previous?: unknown; referral?: unknown; action?: unknown }
    if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some((key) => !['path', 'previous', 'referral', 'action'].includes(key))) throw new HttpInputError('Invalid event.', 422)
    const path = publicAnalyticsPath(body.path), previous = body.previous === null ? null : publicAnalyticsPath(body.previous)
    if (!path || (body.previous !== null && !previous)) throw new HttpInputError('Unknown public path.', 422)
    const cookieHeader = request.headers.get('cookie') || ''
    if (cookieHeader.includes('kwanho-admin-device=1') || cookieHeader.includes('admin-session')) {
      return new Response(null, { status: 204, headers })
    }
    if (await readAdminSession(request, process.env, config, store)) return new Response(null, { status: 204, headers })
    const visitor = await consentedVisitor(request, config, store, true)
    const rawCountry = (request.headers.get('x-vercel-ip-country') || 'ZZ').toUpperCase()
    const country = /^[A-Z]{2}$/.test(rawCountry) ? rawCountry : 'ZZ'
    const userAgent = request.headers.get('user-agent') || ''
    const secChUaMobile = request.headers.get('sec-ch-ua-mobile')
    const isMobile = secChUaMobile === '?1' || /mobile|iphone|android/i.test(userAgent)
    const isTablet = /ipad|tablet/i.test(userAgent)
    const device = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop'

    let browser = 'Other'
    if (/edg\//i.test(userAgent)) browser = 'Edge'
    else if (/chrome|crios/i.test(userAgent)) browser = 'Chrome'
    else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox'
    else if (/safari/i.test(userAgent)) browser = 'Safari'

    const hour = new Date().getUTCHours().toString().padStart(2, '0')
    const action = typeof body.action === 'string' && /^[a-z0-9_-]{1,32}$/i.test(body.action) ? body.action : null
    // A click is recorded as a click only: no extra view, entrance or arrival, and the
    // view's own country/device/browser/hour already counted that page.
    const collected = action
      ? analyticsEvent('', null, '', visitor, config, Date.now(), '', '', '', '', action)
      : analyticsEvent(path, previous, referralHost(body.referral, adminOrigin(request)!), visitor, config, Date.now(), country, device, browser, hour, null)
    await store.record(collected.event, visitor ? { key: visitorConsentKey(visitor.cookie.visitor, config), generation: visitor.record.generation } : undefined)
    // Routine events never renew identity cookies, so an in-flight view cannot
    // restore a tracking cookie after a later withdrawal response.
    return new Response(null, { status: 204, headers })
  } catch (error) {
    return new Response(null, { status: error instanceof HttpInputError ? error.status : 503, headers })
  }
}
