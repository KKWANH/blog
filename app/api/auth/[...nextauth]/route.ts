import NextAuth from 'next-auth'
import type { NextRequest } from 'next/server'
import { ownerAuthConfigured, ownerAuthOptions } from '@/lib/owner-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const handler = NextAuth(ownerAuthOptions)

function configured(request: NextRequest, context: { params: Promise<{ nextauth: string[] }> }) {
  if (!ownerAuthConfigured()) {
    return Response.json({ error: 'Owner sign-in is not configured on this deployment.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
  return handler(request, context)
}

export { configured as GET, configured as POST }
