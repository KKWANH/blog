import fs from 'node:fs'
import path from 'node:path'
import { createHash, randomUUID } from 'node:crypto'
import type { AnalyticsDay, AnalyticsEvent, VisitorConsent, VisitPreference, ConsentProposal } from '@/lib/admin-types'
import { acquireLocalFileLock } from '@/lib/local-file-lock'
import { coarseReferral } from '@/lib/analytics-model'

export class PrivateStoreError extends Error {
  constructor(message = 'Private storage is unavailable.', public status = 503) { super(message) }
}
export interface PrivateStore {
  get<T>(key: string): Promise<T | null>
  set(key: string, value: unknown, seconds: number): Promise<void>
  remove(key: string): Promise<void>
  limit(key: string, maximum: number, seconds: number): Promise<boolean>
  touchConsent(key: string, now: number): Promise<VisitorConsent | null>
  changePreference(key: string, revision: number | null, enabled: boolean, proposal?: ConsentProposal): Promise<VisitPreference | null>
  cleanup(): Promise<void>
  record(event: AnalyticsEvent, consent?: { key: string; generation: number }): Promise<void>
  days(dates: string[]): Promise<AnalyticsDay[]>
}
type LocalDay = AnalyticsDay & { seenVisitors: string[]; seenSessions: string[] }
type State = { version: 1; records: Record<string, { expires: number; value: unknown }>; days: Record<string, LocalDay> }
const shared = globalThis as typeof globalThis & { __portfolioPrivateWrites?: Map<string, Promise<void>> }
const writes = shared.__portfolioPrivateWrites ??= new Map()
const DAY = 86_400_000
const digest = (text: string) => createHash('sha256').update(text).digest('hex')
const emptyDay = (date: string): AnalyticsDay => ({ date, views: 0, entries: 0, visitors: 0, sessions: 0, pages: {}, referrals: {}, flows: {} })
function publicDay(day: LocalDay): AnalyticsDay {
  const { seenVisitors: _visitors, seenSessions: _sessions, ...result } = day
  return result
}
function validConsent(value: unknown, now: number): value is VisitorConsent {
  const record = value as VisitorConsent | null
  return Boolean(record && record.version === 1 && Number.isSafeInteger(record.generation) && record.generation >= 0 &&
    record.generation < 1_000_000 && Number.isFinite(record.expires) && record.expires > now &&
    Number.isFinite(record.seenAt) && record.seenAt >= 0 && Number.isFinite(record.startedAt) && record.startedAt >= 0)
}

export function createLocalPrivateStore(filePath: string, clock = () => Date.now()): PrivateStore {
  const file = path.resolve(filePath)
  function read() {
    let raw: string
    try { raw = fs.readFileSync(file, 'utf8') }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { raw: null, state: { version: 1, records: {}, days: {} } as State }
      throw new PrivateStoreError()
    }
    try {
      if (Buffer.byteLength(raw) > 32_000_000) throw new Error()
      const state = JSON.parse(raw) as State
      if (state.version !== 1 || !state.records || !state.days || Array.isArray(state.records) || Array.isArray(state.days)) throw new Error()
      return { raw, state }
    } catch { throw new PrivateStoreError('The private data file is invalid. It was not replaced.') }
  }
  async function update<T>(change: (state: State) => T) {
    const previous = writes.get(file) ?? Promise.resolve()
    const result = previous.then(async () => {
      await fs.promises.mkdir(path.dirname(file), { recursive: true, mode: 0o700 })
      const release = await acquireLocalFileLock(file)
      try {
      const before = read(), now = clock()
      const today = Date.parse(new Date(now).toISOString().slice(0, 10))
      for (const [key, record] of Object.entries(before.state.records)) if (record.expires <= now) delete before.state.records[key]
      for (const [date, day] of Object.entries(before.state.days)) {
        if (Date.parse(date) < today - 89 * DAY) delete before.state.days[date]
        else {
          if (Date.parse(date) < now - 2 * DAY) { day.seenVisitors = []; day.seenSessions = [] }
          const referrals: Record<string, number> = {}
          for (const [name, count] of Object.entries(day.referrals)) {
            const category = coarseReferral(name)
            referrals[category] = (referrals[category] ?? 0) + count
          }
          day.referrals = referrals
        }
      }
      const value = change(before.state)
      if (Object.keys(before.state.records).length > 8192) throw new PrivateStoreError('Private store capacity reached.', 429)
      const contents = JSON.stringify(before.state)
      if (Buffer.byteLength(contents) > 32_000_000) throw new PrivateStoreError('Private store capacity reached.', 429)
      if (contents === before.raw) return value
      const temporary = `${file}.${randomUUID()}.tmp`
      try {
        await fs.promises.writeFile(temporary, contents, { flag: 'wx', mode: 0o600 })
        const current = read()
        if (current.raw !== before.raw) throw new PrivateStoreError('The private data changed during saving.', 409)
        await fs.promises.rename(temporary, file)
      } finally { await fs.promises.unlink(temporary).catch((error: NodeJS.ErrnoException) => { if (error.code !== 'ENOENT') throw error }) }
      return value
      } finally { await release() }
    })
    const tail = result.then(() => undefined, () => undefined)
    writes.set(file, tail)
    void tail.then(() => { if (writes.get(file) === tail) writes.delete(file) })
    return result
  }
  return {
    async get<T>(key: string) {
      const record = read().state.records[key]
      return record && record.expires > clock() ? record.value as T : null
    },
    async set(key, value, seconds) { await update((state) => { state.records[key] = { value, expires: clock() + seconds * 1000 } }) },
    async remove(key) { await update((state) => { delete state.records[key] }) },
    async limit(key, maximum, seconds) {
      return update((state) => {
        const record = state.records[key]
        const count = record && typeof record.value === 'number' ? record.value + 1 : 1
        state.records[key] = { value: count, expires: record?.expires ?? clock() + seconds * 1000 }
        return count <= maximum
      })
    },
    async touchConsent(key, now) {
      return update((state) => {
        const record = state.records[key]
        if (!record || record.expires <= now || !validConsent(record.value, now)) return null
        const value = { ...record.value }
        if (now - value.seenAt > 30 * 60 * 1000) { value.generation++; value.startedAt = now }
        value.seenAt = now
        state.records[key] = { expires: value.expires, value }
        return value
      })
    },
    async changePreference(key, revision, enabled, proposal) {
      return update((state) => {
        const saved = state.records[key]
        const value = saved?.value as VisitPreference | undefined
        if (!saved || saved.expires <= clock() || !value || value.version !== 1 || value.expires <= clock() || !Number.isSafeInteger(value.revision) || value.revision >= 1_000_000) return null
        if (enabled && value.revision !== revision) return null
        if (enabled && value.allowed && value.visitorKey && (state.records[value.visitorKey]?.expires ?? 0) > clock()) return value
        if (enabled && !proposal) return null
        const next = { ...value, revision: value.revision + 1, allowed: enabled }
        if (value.visitorKey) delete state.records[value.visitorKey]
        if (enabled) {
          if (!proposal) return null
          state.records[proposal.key] = { expires: proposal.record.expires, value: proposal.record }
          next.visitorKey = proposal.key; next.visitorCookie = proposal.cookie
        } else { next.visitorKey = null; next.visitorCookie = null }
        state.records[key] = { expires: value.expires, value: next }
        return next
      })
    },
    async cleanup() { await update(() => undefined) },
    async record(input, consent) {
      await update((state) => {
        const event = { ...input }
        if (consent) {
          const value = state.records[consent.key]?.value
          if (!validConsent(value, clock())) { event.visitor = null; event.session = null }
          else if (value.generation !== consent.generation) event.session = null
        }
        const day = state.days[event.date] ??= { ...emptyDay(event.date), seenVisitors: [], seenSessions: [] }
        if (event.path) {
          day.views++; day.pages[event.path] = (day.pages[event.path] ?? 0) + 1
          if (!event.previous) {
            day.entries++
            const source = coarseReferral(event.referral)
            day.referrals[source] = (Object.hasOwn(day.referrals, source) ? day.referrals[source] : 0) + 1
          } else if (event.previous !== event.path) {
            const flow = `${event.previous}\t${event.path}`
            if (Object.hasOwn(day.flows, flow) || Object.keys(day.flows).length < 1000) day.flows[flow] = (day.flows[flow] ?? 0) + 1
          }
        }
        if (event.visitor && !day.seenVisitors.includes(event.visitor) && day.seenVisitors.length < 50_000) { day.seenVisitors.push(event.visitor); day.visitors++ }
        if (event.session && !day.seenSessions.includes(event.session) && day.seenSessions.length < 50_000) { day.seenSessions.push(event.session); day.sessions++ }
      })
    },
    async days(dates) {
      await update(() => undefined)
      const state = read().state
      return dates.map((date) => state.days[date] ? publicDay(state.days[date]) : emptyDay(date))
    },
  }
}

const recordScript = `
local metrics, visitors, sessions, sources = KEYS[1], KEYS[2], KEYS[3], KEYS[4]
local visitor, session = ARGV[4], ARGV[5]
if ARGV[6] ~= '' then
  local raw = redis.call('GET',KEYS[5])
  if not raw then visitor='';session=''
  else
    local consent = cjson.decode(raw)
    if type(consent)~='table' or consent.expires<=tonumber(ARGV[7]) then visitor='';session=''
    elseif consent.generation~=tonumber(ARGV[6]) then session='' end
  end
end
if ARGV[1] ~= '' then
redis.call('HINCRBY', metrics, 'views', 1)
redis.call('HINCRBY', metrics, 'p|' .. ARGV[1], 1)
if ARGV[2] == '' then
  redis.call('HINCRBY', metrics, 'entries', 1)
  local source = ARGV[3]
  if redis.call('SISMEMBER', sources, source) == 0 and redis.call('SCARD', sources) >= 64 then source = 'other' end
  redis.call('SADD', sources, source)
  redis.call('HINCRBY', metrics, 'r|' .. source, 1)
elseif ARGV[2] ~= ARGV[1] then
  local field = 'f|' .. ARGV[2] .. '\\t' .. ARGV[1]
  if redis.call('HEXISTS', metrics, field) == 1 or redis.call('HLEN', metrics) < 1500 then redis.call('HINCRBY', metrics, field, 1) end
end
end
if visitor ~= '' and redis.call('SCARD', visitors) < 50000 and redis.call('SADD', visitors, visitor) == 1 then redis.call('HINCRBY', metrics, 'visitors', 1) end
if session ~= '' and redis.call('SCARD', sessions) < 50000 and redis.call('SADD', sessions, session) == 1 then redis.call('HINCRBY', metrics, 'sessions', 1) end
redis.call('EXPIRE', metrics, tonumber(ARGV[8]))
redis.call('EXPIRE', sources, tonumber(ARGV[8]))
redis.call('EXPIRE', visitors, tonumber(ARGV[9]))
redis.call('EXPIRE', sessions, tonumber(ARGV[9]))
return 1`

export function createRedisPrivateStore(url: string, token: string, request: typeof fetch = fetch): PrivateStore {
  const target = new URL(url)
  if (target.protocol !== 'https:' || target.username || target.password || !target.hostname.endsWith('.upstash.io') || target.pathname !== '/' || target.search || target.hash || !token) throw new PrivateStoreError('Private storage configuration is invalid.')
  const prefix = 'kwanho:{portfolio}:v1:'
  async function command(args: Array<string | number>) {
    const response = await request(target.origin, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(args), cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(5000) })
    if (!response.ok) throw new PrivateStoreError()
    const data = await response.json()
    if (data.error) throw new PrivateStoreError()
    return data.result
  }
  return {
    async get<T>(key: string) { const value = await command(['GET', prefix + key]); return value === null ? null : JSON.parse(value) as T },
    async set(key, value, seconds) { await command(['SET', prefix + key, JSON.stringify(value), 'EX', seconds]) },
    async remove(key) { await command(['DEL', prefix + key]) },
    async limit(key, maximum, seconds) {
      const count = await command(['EVAL', "local n=redis.call('INCR',KEYS[1]);if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end;return n", 1, prefix + key, seconds])
      return typeof count === 'number' && count <= maximum
    },
    async touchConsent(key, now) {
      const result = await command(['EVAL', "local raw=redis.call('GET',KEYS[1]);if not raw then return false end;local v=cjson.decode(raw);if type(v)~='table' or v.version~=1 or not v.expires or v.expires<=tonumber(ARGV[1]) then return false end;if tonumber(ARGV[1])-v.seenAt>1800000 then v.generation=v.generation+1;v.startedAt=tonumber(ARGV[1]) end;v.seenAt=tonumber(ARGV[1]);local encoded=cjson.encode(v);redis.call('SET',KEYS[1],encoded,'PX',math.max(1,v.expires-tonumber(ARGV[1])));return encoded", 1, prefix + key, now])
      const value = typeof result === 'string' ? JSON.parse(result) : null
      return validConsent(value, now) ? value : null
    },
    async changePreference(key, revision, enabled, proposal) {
      const script = "local raw=redis.call('GET',KEYS[1]);if not raw then return false end;local v=cjson.decode(raw);local now=tonumber(ARGV[1]);if type(v)~='table' or v.version~=1 or v.expires<=now or v.revision>=1000000 then return false end;local enabled=ARGV[3]=='1';if enabled and v.revision~=tonumber(ARGV[2]) then return false end;if enabled and v.allowed and v.visitorKey~=cjson.null and redis.call('EXISTS',ARGV[7]..v.visitorKey)==1 then return raw end;if v.visitorKey~=cjson.null then redis.call('DEL',ARGV[7]..v.visitorKey) end;v.revision=v.revision+1;v.allowed=enabled;if enabled then local p=cjson.decode(ARGV[4]);redis.call('SET',KEYS[2],ARGV[4],'PX',math.max(1,p.expires-now));v.visitorKey=ARGV[5];v.visitorCookie=ARGV[6] else v.visitorKey=cjson.null;v.visitorCookie=cjson.null end;local out=cjson.encode(v);redis.call('SET',KEYS[1],out,'PX',math.max(1,v.expires-now));return out"
      const result = await command(['EVAL', script, 2, prefix + key, prefix + (proposal?.key ?? 'no-consent'), Date.now(), revision ?? -1, enabled ? '1' : '0', JSON.stringify(proposal?.record ?? {}), proposal?.key ?? '', proposal?.cookie ?? '', prefix])
      return typeof result === 'string' ? JSON.parse(result) as VisitPreference : null
    },
    async cleanup() { /* Redis owns independent TTL expiry; no collection activity is required. */ },
    async record(event, consent) {
      const key = prefix + 'day:' + event.date
      const now = Date.now(), start = Date.parse(event.date)
      const retention = Math.max(1, Math.ceil((start + 90 * DAY - now) / 1000)), dedupe = Math.max(1, Math.ceil((start + 2 * DAY - now) / 1000))
      await command(['EVAL', recordScript, 5, key, key + ':visitors', key + ':sessions', key + ':sources', prefix + (consent?.key ?? 'no-consent'), event.path, event.previous ?? '', coarseReferral(event.referral), event.visitor ?? '', event.session ?? '', consent ? String(consent.generation) : '', now, retention, dedupe])
    },
    async days(dates) {
      const response = await request(target.origin + '/pipeline', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(dates.map((date) => ['HGETALL', prefix + 'day:' + date])), cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(5000) })
      if (!response.ok) throw new PrivateStoreError()
      const results = await response.json()
      if (!Array.isArray(results) || results.length !== dates.length || results.some((result) => result.error)) throw new PrivateStoreError()
      return dates.map((date, index) => {
        const raw = results[index].result
        const fields: Record<string, string> = Array.isArray(raw) ? Object.fromEntries(Array.from({ length: raw.length / 2 }, (_, index) => [raw[index * 2], raw[index * 2 + 1]])) : raw ?? {}
        const day = emptyDay(date)
        for (const [key, value] of Object.entries(fields)) {
          const count = Number(value)
          if (!Number.isSafeInteger(count) || count < 0) continue
          if (['views', 'entries', 'visitors', 'sessions'].includes(key)) day[key as 'views' | 'entries' | 'visitors' | 'sessions'] = count
          else if (key.startsWith('p|')) day.pages[key.slice(2)] = count
          else if (key.startsWith('r|')) day.referrals[key.slice(2)] = count
          else if (key.startsWith('f|')) day.flows[key.slice(2)] = count
        }
        return day
      })
    },
  }
}

export const privateKey = (purpose: string, value: string) => `${purpose}:${digest(value)}`
