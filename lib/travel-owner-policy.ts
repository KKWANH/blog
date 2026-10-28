import { createHmac, timingSafeEqual } from 'node:crypto'
import { sameOriginJson } from '@/lib/http-input'

export type OwnerClaims = {
  ownerId: string
  githubAccessToken: string
  accessTokenExpires: number
  travelCsrfKey: string
}

export function validOwnerClaims(value: Record<string, unknown> | null, ownerId: string, now = Date.now()): value is OwnerClaims {
  return value?.ownerId === ownerId &&
    typeof value.githubAccessToken === 'string' && value.githubAccessToken.length > 0 &&
    typeof value.accessTokenExpires === 'number' && value.accessTokenExpires > now &&
    typeof value.travelCsrfKey === 'string' && value.travelCsrfKey.length >= 20
}

export function ownerCsrfToken(claims: OwnerClaims, secret: string, purpose = 'travel') {
  return createHmac('sha256', secret).update(`${purpose}:${claims.ownerId}:${claims.travelCsrfKey}`).digest('base64url')
}

export function ownerWriteAllowed(request: Request, expectedOrigin: string, expectedToken: string, headerName = 'x-travel-editor-token') {
  if (!sameOriginJson(request, expectedOrigin)) return false
  const value = request.headers.get(headerName) ?? ''
  if (value.length !== expectedToken.length) return false
  const supplied = Buffer.from(value)
  const expected = Buffer.from(expectedToken)
  return supplied.length === expected.length && timingSafeEqual(supplied, expected)
}
