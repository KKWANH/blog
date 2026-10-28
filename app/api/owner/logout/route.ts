import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ownerAuthConfigured, ownerOrigin } from '@/lib/owner-auth'
import { resolveOwnerSession, revokeOwnerSession } from '@/lib/owner-session'
import { ownerCsrfToken, ownerWriteAllowed } from '@/lib/travel-owner-policy'
import { HttpInputError, readJsonBody, sameOriginJson } from '@/lib/http-input'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' }
export async function POST(request: Request) {
  const origin = ownerOrigin()
  if (!origin || new URL(request.url).origin !== origin || !sameOriginJson(request, origin)) return Response.json({ error: 'This request is not allowed.' }, { status: 403, headers })
  if (!ownerAuthConfigured()) return Response.json({ error: 'Owner session revocation is unavailable. Try again when configured.' }, { status: 503, headers })
  try {
    const body = await readJsonBody(request, 128) as { purpose?: unknown }
    if (!body || typeof body !== 'object' || Array.isArray(body) || Object.keys(body).length !== 1 || typeof body.purpose !== 'string' || !['travel', 'skills'].includes(body.purpose)) throw new HttpInputError('Choose a valid owner session purpose.', 422)
    const claims = await getToken({ req: new NextRequest(request.url, { headers: { cookie: request.headers.get('cookie') ?? '' } }), secret: process.env.NEXTAUTH_SECRET, secureCookie: origin.startsWith('https:') })
    const owner = await resolveOwnerSession(claims)
    if (owner && !ownerWriteAllowed(request, origin, ownerCsrfToken(owner, process.env.NEXTAUTH_SECRET!, String(body.purpose)), 'x-owner-csrf')) return Response.json({ error: 'Refresh owner access before signing out.' }, { status: 403, headers })
    await revokeOwnerSession(claims)
    const responseHeaders = new Headers(headers)
    const cookieNames = new Set(['next-auth.session-token', '__Secure-next-auth.session-token'])
    for (const part of (request.headers.get('cookie') ?? '').split(';')) {
      const name = part.trim().split('=')[0]
      if (/^(?:__Secure-)?next-auth\.session-token(?:\.\d{1,2})?$/.test(name) && cookieNames.size < 18) cookieNames.add(name)
    }
    for (const name of cookieNames) responseHeaders.append('Set-Cookie', `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${name.startsWith('__Secure-') ? '; Secure' : ''}`)
    return Response.json({ signedOut: true }, { headers: responseHeaders })
  } catch (error) {
    return Response.json({ error: error instanceof HttpInputError ? error.message : 'Sign-out could not be confirmed. Your cookie was kept so you can retry.' }, { status: error instanceof HttpInputError ? error.status : 503, headers })
  }
}
