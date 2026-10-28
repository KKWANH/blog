import { createLocalAdminConfiguration, localAdminSetupAllowed } from '@/lib/admin-config'
import { localEditorToken, travelWriteAllowed } from '@/lib/travel-editor-access'
import { readJsonBody, HttpInputError } from '@/lib/http-input'
import { PrivateStoreError } from '@/lib/private-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex' }
const runtimeState = globalThis as typeof globalThis & { __adminSetupRunning?: boolean }
export function GET(request: Request) {
  if (!localAdminSetupAllowed(request)) return Response.json({ available: false }, { status: 404, headers })
  return Response.json({ available: true, token: localEditorToken('admin-setup') }, { headers })
}
export async function POST(request: Request) {
  if (!localAdminSetupAllowed(request) || !travelWriteAllowed(request, process.env, 'x-admin-setup-token', 'admin-setup')) return Response.json({ error: 'Local owner setup is unavailable.' }, { status: 403, headers })
  if (runtimeState.__adminSetupRunning) return Response.json({ error: 'A setup request is already running.' }, { status: 429, headers })
  runtimeState.__adminSetupRunning = true
  try {
    const body = await readJsonBody(request, 2048) as { password?: unknown; confirmation?: unknown; analyticsEnabled?: unknown }
    if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).some((key) => !['password', 'confirmation', 'analyticsEnabled'].includes(key)) || typeof body.password !== 'string' || body.password !== body.confirmation || typeof body.analyticsEnabled !== 'boolean') throw new HttpInputError('Check the password confirmation and statistics choice.', 422)
    await createLocalAdminConfiguration(body.password, body.analyticsEnabled)
    return Response.json({ configured: true }, { status: 201, headers })
  } catch (error) {
    if (error instanceof HttpInputError || error instanceof PrivateStoreError) return Response.json({ error: error.message }, { status: error.status, headers })
    return Response.json({ error: 'Use a varied passphrase of at least 14 characters. Setup was not completed.' }, { status: 422, headers })
  } finally { runtimeState.__adminSetupRunning = false }
}
