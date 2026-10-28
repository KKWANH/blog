import { browserPrivacySignal, consentedVisitor, pendingVisitorRevocation, visitorCookie, visitPreference } from '@/lib/visit-analytics'
import { adminConfiguration, adminStore } from '@/lib/admin-config'
import { privateCookieName, requestCookie } from '@/lib/private-cookies'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
  const headers = { 'Cache-Control': 'private, no-store', Vary: 'Cookie', 'X-Content-Type-Options': 'nosniff' }
  const blocked = browserPrivacySignal(request), secure = new URL(request.url).protocol === 'https:'
  const pending = Boolean(requestCookie(request, privateCookieName('visitor-revoke', secure)) || blocked && requestCookie(request, privateCookieName('visits', secure)))
  try {
    const config = adminConfiguration(), store = config ? adminStore(config) : null
    const control = config && store ? await visitPreference(request, config, store) : null
    return Response.json({ enabled: Boolean(config?.analyticsEnabled && store), prepared: Boolean(control), preferenceToken: control?.token, consented: Boolean(config && store && !blocked && await consentedVisitor(request, config, store)), privacySignal: blocked, revocationPending: Boolean(config ? pendingVisitorRevocation(request, config) || blocked && (visitorCookie(request, config) || control?.state.allowed) : pending) }, { headers })
  } catch { return Response.json({ enabled: false, consented: false, privacySignal: blocked, revocationPending: pending }, { headers }) }
}
