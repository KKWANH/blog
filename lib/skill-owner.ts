import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { OWNER_GITHUB_ID, ownerAuthConfigured, ownerOrigin } from '@/lib/owner-auth'
import { localTravelEditor, travelEditorToken, travelWriteAllowed } from '@/lib/travel-editor-access'
import { ownerCsrfToken, ownerWriteAllowed, validOwnerClaims } from '@/lib/travel-owner-policy'
import { skillStore } from '@/lib/skill-store'
import { createGitHubSkillStore } from '@/lib/skill-github-store'

export async function skillOwner(request: Request, env: NodeJS.ProcessEnv = process.env) {
  if (localTravelEditor(request, env)) return {
    mode: 'local' as const, token: travelEditorToken(), store: skillStore(),
    canWrite: travelWriteAllowed(request, env, 'x-skills-editor-token') &&
      request.headers.get('origin') === new URL(request.url).origin &&
      Boolean(request.headers.get('content-type')?.toLowerCase().startsWith('application/json')),
  }
  if (!ownerAuthConfigured(env)) return null
  const origin = ownerOrigin(env)!
  const sessionRequest = new NextRequest(request.url, { headers: { cookie: request.headers.get('cookie') ?? '' } })
  const claims = await getToken({ req: sessionRequest, secret: env.NEXTAUTH_SECRET, secureCookie: origin.startsWith('https://') })
  if (!validOwnerClaims(claims, OWNER_GITHUB_ID)) return null
  const token = ownerCsrfToken(claims, env.NEXTAUTH_SECRET!, 'skills')
  return { mode: 'github' as const, token, store: createGitHubSkillStore(claims.githubAccessToken), canWrite: ownerWriteAllowed(request, origin, token, 'x-skills-editor-token') }
}
