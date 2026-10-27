import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { OWNER_GITHUB_ID, ownerAuthConfigured, ownerOrigin } from '@/lib/owner-auth'
import { localTravelEditor, travelEditorToken, travelWriteAllowed } from '@/lib/travel-editor-access'
import { ownerCsrfToken, ownerWriteAllowed, validOwnerClaims } from '@/lib/travel-owner-policy'
import { createGitHubTravelStore } from '@/lib/travel-github-store'
import { travelStore } from '@/lib/travel-store'

export async function travelOwner(request: Request, env: NodeJS.ProcessEnv = process.env) {
  if (localTravelEditor(request, env)) {
    return { mode: 'local' as const, token: travelEditorToken(), store: travelStore(), canWrite: travelWriteAllowed(request, env) }
  }
  if (!ownerAuthConfigured(env)) return null
  const origin = ownerOrigin(env)!
  // Cookie sessions only; do not silently add a separate bearer-token API.
  const sessionRequest = new NextRequest(request.url, { headers: { cookie: request.headers.get('cookie') ?? '' } })
  const claims = await getToken({
    req: sessionRequest,
    secret: env.NEXTAUTH_SECRET,
    secureCookie: origin.startsWith('https://'),
  })
  if (!validOwnerClaims(claims, OWNER_GITHUB_ID)) return null
  const token = ownerCsrfToken(claims, env.NEXTAUTH_SECRET!)
  return {
    mode: 'github' as const,
    token,
    store: createGitHubTravelStore(claims.githubAccessToken),
    canWrite: ownerWriteAllowed(request, origin, token),
  }
}
