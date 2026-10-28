import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ownerAuthConfigured, ownerOrigin } from '@/lib/owner-auth'
import { localTravelEditor, travelEditorToken, travelWriteAllowed } from '@/lib/travel-editor-access'
import { ownerCsrfToken, ownerWriteAllowed } from '@/lib/travel-owner-policy'
import { resolveOwnerSession } from '@/lib/owner-session'
import type { PrivateStore } from '@/lib/private-store'
import { createGitHubTravelStore } from '@/lib/travel-github-store'
import { travelStore } from '@/lib/travel-store'

export async function travelOwner(request: Request, env: NodeJS.ProcessEnv = process.env, sessions?: PrivateStore) {
  if (localTravelEditor(request, env)) {
    return { mode: 'local' as const, token: travelEditorToken(), store: travelStore(), canWrite: travelWriteAllowed(request, env) }
  }
  if (!ownerAuthConfigured(env)) return null
  const origin = ownerOrigin(env)!
  if (new URL(request.url).origin !== origin) return null
  // Cookie sessions only; do not silently add a separate bearer-token API.
  const sessionRequest = new NextRequest(request.url, { headers: { cookie: request.headers.get('cookie') ?? '' } })
  const tokenClaims = await getToken({
    req: sessionRequest,
    secret: env.NEXTAUTH_SECRET,
    secureCookie: origin.startsWith('https://'),
  })
  const claims = await resolveOwnerSession(tokenClaims, env, sessions)
  if (!claims) return null
  const token = ownerCsrfToken(claims, env.NEXTAUTH_SECRET!)
  return {
    mode: 'github' as const,
    token,
    store: createGitHubTravelStore(claims.githubAccessToken),
    canWrite: ownerWriteAllowed(request, origin, token),
  }
}
