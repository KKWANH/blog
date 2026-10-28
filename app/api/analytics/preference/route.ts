import { adminWriteOrigin, clientRateKey } from '@/lib/admin-auth'
import { adminConfiguration, adminStore } from '@/lib/admin-config'
import { browserPrivacySignal, consentedVisitor, createVisitPreference, pendingVisitorRevocation, visitPreference } from '@/lib/visit-analytics'
import { readJsonBody, HttpInputError } from '@/lib/http-input'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' }
export async function POST(request: Request) {
  if (!adminWriteOrigin(request)) return Response.json({ error: 'This request is not allowed.' }, { status: 403, headers })
  try {
    const body = await readJsonBody(request, 128)
    if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length) throw new HttpInputError('Send an empty preference request.', 422)
    const config = adminConfiguration(), privacySignal = browserPrivacySignal(request)
    if (!config) return Response.json({ enabled: false, prepared: false, consented: false, privacySignal, revocationPending: false }, { headers })
    const store = adminStore(config), responseHeaders = new Headers(headers)
    let control = await visitPreference(request, config, store)
    if (!control && config.analyticsEnabled && !privacySignal) {
      if (!await store.limit(`preferences:${clientRateKey(request, config)}`, 20, 60) || !await store.limit(`preference-registrations:${new Date().toISOString().slice(0, 10)}`, 5000, 86400)) return Response.json({ error: 'Preference setup is at capacity. Try later.' }, { status: 429, headers })
      const created = await createVisitPreference(request, config, store)
      control = created
      responseHeaders.append('Set-Cookie', created.header)
    }
    return Response.json({ enabled: config.analyticsEnabled, prepared: Boolean(control), preferenceToken: control?.token, consented: !privacySignal && Boolean(await consentedVisitor(request, config, store)), privacySignal, revocationPending: Boolean(pendingVisitorRevocation(request, config) || privacySignal && control?.state.allowed) }, { headers: responseHeaders })
  } catch (error) { return Response.json({ error: error instanceof HttpInputError ? error.message : 'Preferences are temporarily unavailable.' }, { status: error instanceof HttpInputError ? error.status : 503, headers }) }
}
