import { createCipheriv, createDecipheriv, createHmac, randomBytes } from 'node:crypto'

function key(secret: string, purpose: string) {
  return createHmac('sha256', Buffer.from(secret, 'base64url')).update(`kwanho-cookie-v1:${purpose}`).digest()
}
export function sealCookie(value: unknown, purpose: string, secret: string) {
  const iv = randomBytes(12), cipher = createCipheriv('aes-256-gcm', key(secret, purpose), iv)
  cipher.setAAD(Buffer.from(`kwanho:${purpose}:v1`))
  const data = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()])
  return ['1', iv.toString('base64url'), data.toString('base64url'), cipher.getAuthTag().toString('base64url')].join('.')
}
export function openCookie(value: string | null, purpose: string, secret: string): unknown | null {
  if (!value || value.length > 4096) return null
  const parts = value.split('.')
  if (parts.length !== 4 || parts[0] !== '1' || parts.slice(1).some((part) => !/^[A-Za-z0-9_-]+$/.test(part))) return null
  try {
    const iv = Buffer.from(parts[1], 'base64url'), data = Buffer.from(parts[2], 'base64url'), tag = Buffer.from(parts[3], 'base64url')
    if (iv.length !== 12 || tag.length !== 16 || [iv, data, tag].some((part, index) => part.toString('base64url') !== parts[index + 1])) return null
    const decipher = createDecipheriv('aes-256-gcm', key(secret, purpose), iv)
    decipher.setAAD(Buffer.from(`kwanho:${purpose}:v1`)); decipher.setAuthTag(tag)
    return JSON.parse(Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8'))
  } catch { return null }
}
export function requestCookie(request: Request, name: string) {
  const values = (request.headers.get('cookie') ?? '').split(';').map((item) => item.trim()).filter((item) => item.startsWith(`${name}=`))
  return values.length === 1 ? values[0].slice(name.length + 1) : null
}
export function privateCookieName(purpose: 'admin' | 'visits' | 'visitor-choice' | 'visitor-revoke' | 'visit-control', secure: boolean) {
  return `${secure ? '__Host-' : ''}kwanho-${purpose}`
}
export function cookieHeader(name: string, value: string, seconds: number, secure: boolean, sameSite: 'Strict' | 'Lax' = 'Strict') {
  return `${name}=${value}; Path=/; HttpOnly; SameSite=${sameSite}; Max-Age=${seconds}${secure ? '; Secure' : ''}`
}
