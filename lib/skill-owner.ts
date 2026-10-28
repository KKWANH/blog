import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ownerAuthConfigured, ownerOrigin } from '@/lib/owner-auth'
import { localTravelEditor, localEditorToken, travelWriteAllowed } from '@/lib/travel-editor-access'
import { ownerCsrfToken, ownerWriteAllowed } from '@/lib/travel-owner-policy'
import { resolveOwnerSession } from '@/lib/owner-session'
import type { PrivateStore } from '@/lib/private-store'
import { skillStore } from '@/lib/skill-store'
import { createGitHubSkillStore } from '@/lib/skill-github-store'

export async function skillOwner(request: Request, env: NodeJS.ProcessEnv = process.env, sessions?: PrivateStore) {
  if (localTravelEditor(request, env)) return {
    mode: 'local' as const, token: localEditorToken('skills'), store: skillStore(),
    canWrite: travelWriteAllowed(request, env, 'x-skills-editor-token', 'skills'),
  }
  if (!ownerAuthConfigured(env)) return null
  const origin = ownerOrigin(env)!
  if (new URL(request.url).origin !== origin) return null
  const sessionRequest = new NextRequest(request.url, { headers: { cookie: request.headers.get('cookie') ?? '' } })
  const tokenClaims = await getToken({ req: sessionRequest, secret: env.NEXTAUTH_SECRET, secureCookie: origin.startsWith('https://') })
  const claims = await resolveOwnerSession(tokenClaims, env, sessions)
  if (!claims) return null
  const token = ownerCsrfToken(claims, env.NEXTAUTH_SECRET!, 'skills')
  return { mode: 'github' as const, token, store: createGitHubSkillStore(claims.githubAccessToken), canWrite: ownerWriteAllowed(request, origin, token, 'x-skills-editor-token') }
}
