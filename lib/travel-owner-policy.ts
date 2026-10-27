import { createHmac, timingSafeEqual } from 'node:crypto'

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

export function ownerCsrfToken(claims: OwnerClaims, secret: string) {
  return createHmac('sha256', secret).update(`travel:${claims.ownerId}:${claims.travelCsrfKey}`).digest('base64url')
}

export function ownerWriteAllowed(request: Request, expectedOrigin: string, expectedToken: string) {
  if (request.headers.get('origin') !== expectedOrigin) return false
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return false
  const supplied = Buffer.from(request.headers.get('x-travel-editor-token') ?? '')
  const expected = Buffer.from(expectedToken)
  return supplied.length === expected.length && timingSafeEqual(supplied, expected)
}
