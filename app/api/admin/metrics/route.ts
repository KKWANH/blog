import { adminConfiguration, adminStore } from '@/lib/admin-config'
import { readAdminSession } from '@/lib/admin-auth'
import { analyticsReport, reportDates } from '@/lib/visit-analytics'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'private, no-store', Vary: 'Cookie', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex', 'Cross-Origin-Resource-Policy': 'same-origin' }
export async function GET(request: Request) {
  try {
    const config = adminConfiguration()
    if (!config) return Response.json({ error: 'Admin access is unavailable.' }, { status: 503, headers })
    const store = adminStore(config), session = await readAdminSession(request, process.env, config, store)
    if (!session) return Response.json({ error: 'Sign in as the administrator.' }, { status: 401, headers })
    const query = new URL(request.url).searchParams
    if ([...query.keys()].some((key) => key !== 'days') || query.getAll('days').length > 1) return Response.json({ error: 'Invalid statistics query.' }, { status: 400, headers })
    const days = Number(query.get('days') ?? '7')
    if (![7, 30, 90].includes(days)) return Response.json({ error: 'Choose 7, 30 or 90 days.' }, { status: 400, headers })
    if (!await store.limit(`metrics:${session.id}`, 60, 60)) return Response.json({ error: 'Too many requests.' }, { status: 429, headers })
    return Response.json({ ...analyticsReport(await store.days(reportDates(days))), analyticsEnabled: config.analyticsEnabled }, { headers })
  } catch { return Response.json({ error: 'Statistics are temporarily unavailable.' }, { status: 503, headers }) }
}
