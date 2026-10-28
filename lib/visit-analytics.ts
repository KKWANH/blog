import { createHmac, randomBytes } from 'node:crypto'
import routes from '@/contents/public-routes.generated.json'
import { adminConfiguration, adminStore, type AdminConfiguration } from '@/lib/admin-config'
import { cookieHeader, openCookie, privateCookieName, requestCookie, sealCookie } from '@/lib/private-cookies'
import type { AnalyticsDay, AnalyticsEvent, AnalyticsReport, VisitorConsent, VisitPreference } from '@/lib/admin-types'
import type { PrivateStore } from '@/lib/private-store'
import { coarseReferral, referralLabels } from '@/lib/analytics-model'

const allowedPaths = new Set(routes.paths)
const MONTH = 30 * 24 * 60 * 60
export type VisitorCookie = { version: 3; visitor: string; preference: string; generation: number; expires: number }
type VisitorContext = { cookie: VisitorCookie; record: VisitorConsent }
type RevocationCookie = { version: 1; visitor?: string; preference?: string; expires: number }
type ControlCookie = { version: 1; id: string; expires: number }
export const preferenceKey = (id: string, config: AdminConfiguration) => 'visit-preference:' + createHmac('sha256', Buffer.from(config.sessionSecret, 'base64url')).update(id).digest('hex')
export const preferenceToken = (id: string, state: VisitPreference, config: AdminConfiguration) => createHmac('sha256', Buffer.from(config.sessionSecret, 'base64url')).update(`preference:${id}:${state.revision}`).digest('base64url')
export function browserPrivacySignal(request: Request) {
  return request.headers.get('dnt') === '1' || request.headers.get('sec-gpc') === '1'
}
export function publicAnalyticsPath(value: unknown): string | null {
  return typeof value === 'string' && value.length <= 240 && allowedPaths.has(value) ? value : null
}
export function referralHost(value: unknown, siteOrigin: string) {
  return coarseReferral(value, new URL(siteOrigin).hostname)
}
export function visitorCookie(request: Request, config: AdminConfiguration, now = Date.now()): VisitorCookie | null {
  const secure = new URL(request.url).protocol === 'https:'
  const value = openCookie(requestCookie(request, privateCookieName('visits', secure)), 'visits', config.sessionSecret) as VisitorCookie | null
  if (!value || value.version !== 3 || !/^[A-Za-z0-9_-]{22}$/.test(value.visitor ?? '') || !/^[A-Za-z0-9_-]{22}$/.test(value.preference ?? '') || !Number.isSafeInteger(value.generation) || value.generation < 0 || value.generation >= 1_000_000 ||
    typeof value.expires !== 'number' || value.expires <= now || value.expires > now + MONTH * 1000 + 5000) return null
  return value
}
export function newVisitorCookie(preference: string, expires: number): VisitorCookie {
  return { version: 3, visitor: randomBytes(16).toString('base64url'), preference, generation: 0, expires }
}
export function visitorCookieHeader(request: Request, value: VisitorCookie | null, config?: AdminConfiguration) {
  const secure = new URL(request.url).protocol === 'https:'
  return cookieHeader(privateCookieName('visits', secure), value && config ? sealCookie(value, 'visits', config.sessionSecret) : '', value ? Math.max(0, Math.ceil((value.expires - Date.now()) / 1000)) : 0, secure, 'Lax')
}
export function visitorConsentKey(visitor: string, config: AdminConfiguration) {
  return 'visitor-consent:' + createHmac('sha256', Buffer.from(config.sessionSecret, 'base64url')).update(visitor).digest('hex')
}
export function visitControlCookie(request: Request, config: AdminConfiguration, now = Date.now()) {
  const value = openCookie(requestCookie(request, privateCookieName('visit-control', new URL(request.url).protocol === 'https:')), 'visit-control', config.sessionSecret) as ControlCookie | null
  return value && value.version === 1 && /^[A-Za-z0-9_-]{22}$/.test(value.id ?? '') && Number.isFinite(value.expires) && value.expires > now && value.expires <= now + MONTH * 1000 + 5000 ? value : null
}
export async function visitPreference(request: Request, config: AdminConfiguration, store: PrivateStore) {
  const cookie = visitControlCookie(request, config)
  if (!cookie) return null
  const state = await store.get<VisitPreference>(preferenceKey(cookie.id, config))
  if (!state || state.version !== 1 || state.expires !== cookie.expires || state.expires <= Date.now() || !Number.isSafeInteger(state.revision)) return null
  return { cookie, state, token: preferenceToken(cookie.id, state, config) }
}
export async function createVisitPreference(request: Request, config: AdminConfiguration, store: PrivateStore) {
  const cookie: ControlCookie = { version: 1, id: randomBytes(16).toString('base64url'), expires: Date.now() + MONTH * 1000 }
  const state: VisitPreference = { version: 1, expires: cookie.expires, revision: 0, allowed: false, visitorKey: null, visitorCookie: null }
  await store.set(preferenceKey(cookie.id, config), state, MONTH)
  const secure = new URL(request.url).protocol === 'https:'
  return { cookie, state, token: preferenceToken(cookie.id, state, config), header: cookieHeader(privateCookieName('visit-control', secure), sealCookie(cookie, 'visit-control', config.sessionSecret), MONTH, secure, 'Lax') }
}
export function visitorOptedOut(request: Request) {
  const name = privateCookieName('visitor-choice', new URL(request.url).protocol === 'https:')
  return (request.headers.get('cookie') ?? '').split(';').some((part) => part.trim().startsWith(name + '='))
}
export function pendingVisitorRevocation(request: Request, config: AdminConfiguration, now = Date.now()) {
  const secure = new URL(request.url).protocol === 'https:'
  const token = requestCookie(request, privateCookieName('visitor-revoke', secure))
  const value = (openCookie(token, 'visitor-revoke', config.sessionSecret) ?? openCookie(token, 'visits', config.sessionSecret) ?? openCookie(token, 'visit-control', config.sessionSecret)) as (RevocationCookie & { id?: string }) | VisitorCookie | null
  const preference = value && ('id' in value ? value.id : value.preference)
  return value && (value.visitor ? /^[A-Za-z0-9_-]{22}$/.test(value.visitor) : preference && /^[A-Za-z0-9_-]{22}$/.test(preference)) && typeof value.expires === 'number' && value.expires > now && value.expires <= now + MONTH * 1000 + 5000 ? { version: 1 as const, visitor: value.visitor, preference, expires: value.expires } : null
}
export async function withdrawVisitor(request: Request, config: AdminConfiguration | null, store?: PrivateStore, rememberChoice = true) {
  const secure = new URL(request.url).protocol === 'https:'
  const value = config ? pendingVisitorRevocation(request, config) ?? visitorCookie(request, config) : null
  const control = config ? visitControlCookie(request, config) : null
  const preference = control?.id ?? value?.preference
  const expiry = control?.expires ?? value?.expires
  const raw = requestCookie(request, privateCookieName('visitor-revoke', secure)) ?? requestCookie(request, privateCookieName('visits', secure)) ?? requestCookie(request, privateCookieName('visit-control', secure))
  const opaque = raw && raw.length <= 4096 && /^1\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(raw) ? raw : null
  if (!value && !preference && !opaque && !rememberChoice) return { confirmed: true, cookies: [] as string[] }
  let confirmed = !opaque || Boolean(config)
  if (value || preference) {
    try {
      if (!store || !config) throw new Error()
      if (preference) await store.changePreference(preferenceKey(preference, config), null, false)
      if (value?.visitor) await store.remove(visitorConsentKey(value.visitor, config))
    }
    catch { confirmed = false }
  }
  const cookies = [visitorCookieHeader(request, null), cookieHeader(privateCookieName('visitor-choice', secure), 'off', 365 * 86400, secure, 'Lax')]
  const pending = !confirmed ? config && expiry ? sealCookie({ version: 1, visitor: value?.visitor, preference, expires: expiry }, 'visitor-revoke', config.sessionSecret) : opaque ?? '' : ''
  cookies.push(cookieHeader(privateCookieName('visitor-revoke', secure), pending, pending ? expiry ? Math.max(0, Math.ceil((expiry - Date.now()) / 1000)) : MONTH : 0, secure, 'Lax'))
  return { confirmed, cookies }
}
export async function consentedVisitor(request: Request, config: AdminConfiguration, store: PrivateStore, touch = false, ignoreChoice = false): Promise<VisitorContext | null> {
  if (!ignoreChoice && visitorOptedOut(request)) return null
  const value = visitorCookie(request, config)
  if (!value) return null
  const control = await visitPreference(request, config, store)
  if (!control?.state.allowed || control.cookie.id !== value.preference || control.state.visitorKey !== visitorConsentKey(value.visitor, config)) return null
  const key = visitorConsentKey(value.visitor, config)
  const record = touch ? await store.touchConsent(key, Date.now()) : await store.get<VisitorConsent>(key)
  if (!record || record.version !== 1 || record.expires !== value.expires || record.expires <= Date.now() || !Number.isSafeInteger(record.generation) || record.generation < value.generation || record.generation >= 1_000_000) return null
  return { cookie: { ...value, generation: record.generation }, record }
}
export function analyticsConfiguration() {
  const config = adminConfiguration()
  if (!config?.analyticsEnabled) return null
  return { config, store: adminStore(config) }
}
export function analyticsEvent(path: string, previous: string | null, referral: string, visitor: VisitorContext | null, config: AdminConfiguration, now = Date.now(), country = 'ZZ'): { event: AnalyticsEvent; cookie: VisitorCookie | null } {
  const date = new Date(now).toISOString().slice(0, 10)
  const digest = (purpose: string, id: string) => createHmac('sha256', Buffer.from(config.sessionSecret, 'base64url')).update(`${purpose}:${date}:${id}`).digest('hex')
  return { event: {
    date, path, previous, referral, country,
    visitor: visitor ? digest('visitor', visitor.cookie.visitor) : null,
    session: visitor && new Date(visitor.record.startedAt).toISOString().slice(0, 10) === date ? digest('session', `${visitor.cookie.visitor}:${visitor.record.generation}`) : null,
  }, cookie: visitor?.cookie ?? null }
}
export function reportDates(count: number, now = Date.now()) {
  return Array.from({ length: count }, (_, index) => new Date(now - (count - index - 1) * 86_400_000).toISOString().slice(0, 10))
}
export function analyticsReport(days: AnalyticsDay[]): AnalyticsReport {
  const totals = { views: 0, entries: 0, visitors: 0, sessions: 0 }, pages = new Map<string, number>(), referrals = new Map<string, number>(), flows = new Map<string, number>(), countries = new Map<string, number>()
  for (const day of days) {
    for (const key of ['views', 'entries', 'visitors', 'sessions'] as const) totals[key] += day[key]
    for (const [key, value] of Object.entries(day.pages)) pages.set(key, (pages.get(key) ?? 0) + value)
    for (const [key, value] of Object.entries(day.referrals)) { const category = coarseReferral(key); referrals.set(category, (referrals.get(category) ?? 0) + value) }
    for (const [key, value] of Object.entries(day.flows)) flows.set(key, (flows.get(key) ?? 0) + value)
    for (const [key, value] of Object.entries(day.countries || {})) countries.set(key, (countries.get(key) ?? 0) + value)
  }
  const ranked = (value: Map<string, number>) => [...value].sort((a, b) => b[1] - a[1]).slice(0, 50).map(([name, count]) => ({ name, count }))
  const safeDays = days.map((day) => {
    const referrals: Record<string, number> = {}
    for (const [key, count] of Object.entries(day.referrals)) { const category = coarseReferral(key); referrals[category] = (referrals[category] ?? 0) + count }
    return { ...day, referrals }
  })
  return {
    days: safeDays,
    totals,
    pages: ranked(pages),
    referrals: ranked(referrals).map((row) => ({ ...row, name: referralLabels[row.name] ?? 'Other external' })),
    flows: ranked(flows).map(({ name, count }) => ({ from: name.split('\t')[0], to: name.split('\t')[1], count })),
    countries: ranked(countries),
  }
}
