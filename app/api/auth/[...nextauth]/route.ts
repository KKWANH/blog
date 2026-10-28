import NextAuth from 'next-auth'
import type { NextRequest } from 'next/server'
import { ownerAuthConfigured, ownerAuthOptions } from '@/lib/owner-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const handler = NextAuth(ownerAuthOptions)

async function configured(request: NextRequest, context: { params: Promise<{ nextauth: string[] }> }) {
  const { nextauth } = await context.params
  if (nextauth[0] === 'signout') return Response.json({ error: 'Use the owner tools to revoke this session before signing out.' }, { status: 405, headers: { 'Cache-Control': 'no-store' } })
  if (!ownerAuthConfigured()) {
    return Response.json({ error: 'Owner sign-in is not configured on this deployment.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
  }
  return handler(request, context)
}

export { configured as GET, configured as POST }
