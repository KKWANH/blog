import assert from 'node:assert/strict'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import { fork } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { createSourceLoader } from './source-loader.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const load = createSourceLoader(root)
if (process.argv.includes('--private-race-worker')) {
  const file = process.argv[process.argv.indexOf('--private-race-worker') + 1]
  const { createLocalPrivateStore } = load(path.join(root, 'lib/private-store.ts'))
  const rename = fs.promises.rename
  fs.promises.rename = async (...args) => {
    if (String(args[1]) === file) {
      process.send?.('staged')
      await new Promise((resolve) => process.once('message', resolve))
    }
    return rename(...args)
  }
  await createLocalPrivateStore(file).limit('fixture-background-write', 5, 60)
  process.exit(0)
}
const rounds = []
async function round(number, name, test) {
  const requested = process.argv.find((arg) => arg.startsWith('--round='))?.split('=')[1]
  if (requested && Number(requested) !== number) return
  await test()
  rounds.push({ round: number, name, result: 'pass' })
  console.log(`Security round ${number}: ${name} passed`)
}

await round(1, 'owner origin and bounded request attacks', async () => {
  const { travelEditorToken, localEditorToken, travelWriteAllowed, localDevelopmentRequest } = load(path.join(root, 'lib/travel-editor-access.ts'))
  const { ownerWriteAllowed, validOwnerClaims } = load(path.join(root, 'lib/travel-owner-policy.ts'))
  const { readJsonBody } = load(path.join(root, 'lib/http-input.ts'))
  const token = travelEditorToken(), env = { NODE_ENV: 'development', TRAVEL_EDITOR_ENABLED: '1' }
  const request = (headers = {}) => new Request('http://localhost:3100/api/travel', { method: 'POST', headers: { host: 'localhost:3100', origin: 'http://localhost:3100', 'content-type': 'application/json', 'x-travel-editor-token': token, ...headers } })
  assert.equal(travelWriteAllowed(request(), env), true)
  for (const headers of [
    { origin: 'http://localhost:9999' }, { origin: 'https://attacker.example' },
    { origin: 'null' }, { host: 'localhost:9999' }, { host: 'attacker.example' },
    { 'content-type': 'text/plain' }, { 'content-type': 'application/json-malicious' },
    { 'sec-fetch-site': 'cross-site' }, { 'x-travel-editor-token': '' },
  ]) assert.equal(travelWriteAllowed(request(headers), env), false, JSON.stringify(headers))
  assert.equal(travelWriteAllowed(request(), { ...env, NODE_ENV: 'production' }), false)
  assert.equal(travelWriteAllowed(request(), { ...env, VERCEL: '1' }), false)
  assert.notEqual(localEditorToken('travel'), localEditorToken('skills'))
  assert.equal(travelWriteAllowed(request({ 'x-skills-editor-token': token }), env, 'x-skills-editor-token', 'skills'), false)
  assert.equal(localDevelopmentRequest(new Request('http://127.0.0.1:3100', { headers: { host: 'localhost:3100' } }), env), false)
  assert.equal(ownerWriteAllowed(request({ origin: 'https://www.kwanho.dev', 'x-skills-editor-token': 'fixture' }), 'https://www.kwanho.dev', 'fixture', 'x-skills-editor-token'), true)
  assert.equal(ownerWriteAllowed(request({ origin: 'https://www.kwanho.dev', 'sec-fetch-site': 'cross-site', 'x-skills-editor-token': 'fixture' }), 'https://www.kwanho.dev', 'fixture', 'x-skills-editor-token'), false)
  assert.equal(validOwnerClaims({ ownerId: 'other', githubAccessToken: 'fixture', accessTokenExpires: Date.now() + 60000, travelCsrfKey: 'fixture-session-key-long' }, 'owner'), false)
  assert.equal(validOwnerClaims({ ownerId: 'owner', githubAccessToken: 'fixture', accessTokenExpires: 0, travelCsrfKey: 'fixture-session-key-long' }, 'owner'), false)
  const bodyRequest = (body, headers = {}) => new Request('http://localhost:3100/api/test', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body, duplex: 'half' })
  assert.deepEqual(await readJsonBody(bodyRequest('{"ok":true}'), 100), { ok: true })
  await assert.rejects(readJsonBody(bodyRequest('{"ok":true}', { 'content-type': 'text/plain' }), 100), (error) => error.status === 415)
  await assert.rejects(readJsonBody(bodyRequest('{"x":1}', { 'content-length': '999999999' }), 100), (error) => error.status === 413)
  await assert.rejects(readJsonBody(bodyRequest(JSON.stringify({ value: '\u{1f7e2}'.repeat(80) })), 200), (error) => error.status === 413)
  await assert.rejects(readJsonBody(bodyRequest(new Uint8Array([123,34,120,34,58,34,192,175,34,125])), 100), (error) => error.status === 400)
  let cancelled = false
  const stream = new ReadableStream({ pull(controller) { controller.enqueue(new Uint8Array(128)) }, cancel() { cancelled = true } })
  await assert.rejects(readJsonBody(bodyRequest(stream), 200), (error) => error.status === 413)
  assert.equal(cancelled, true, 'oversize chunked input is cancelled, not accumulated indefinitely')
  let slowCancelled = false
  const stalled = new ReadableStream({ pull() {}, cancel() { slowCancelled = true } })
  await assert.rejects(readJsonBody(bodyRequest(stalled), 200, 20), (error) => error.status === 408)
  assert.equal(slowCancelled, true)
})

await round(2, 'password setup, encrypted sessions and replay', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'kwanho-admin-security-'))
  const keys = ['NODE_ENV', 'VERCEL', 'TRAVEL_EDITOR_ENABLED', 'PORTFOLIO_ADMIN_CONFIG', 'PORTFOLIO_PRIVATE_STATE', 'ADMIN_PASSWORD_HASH', 'ADMIN_SESSION_SECRET', 'ADMIN_ORIGIN', 'ANALYTICS_ENABLED', 'ANALYTICS_REDIS_REST_URL', 'ANALYTICS_REDIS_REST_TOKEN']
  const backup = Object.fromEntries(keys.map((key) => [key, process.env[key]]))
  try {
    keys.forEach((key) => { delete process.env[key] })
    Object.assign(process.env, { NODE_ENV: 'development', TRAVEL_EDITOR_ENABLED: '1', PORTFOLIO_ADMIN_CONFIG: path.join(directory, 'admin.json'), PORTFOLIO_PRIVATE_STATE: path.join(directory, 'state.json') })
    const { adminConfiguration, adminStore, hashAdminPassword, verifyAdminPassword } = load(path.join(root, 'lib/admin-config.ts'))
    const { openCookie, sealCookie } = load(path.join(root, 'lib/private-cookies.ts'))
    const { readAdminSession, issueAdminSession, clientRateKey } = load(path.join(root, 'lib/admin-auth.ts'))
    const setup = load(path.join(root, 'app/api/admin/setup/route.ts'))
    const sessions = load(path.join(root, 'app/api/admin/session/route.ts'))
    const metrics = load(path.join(root, 'app/api/admin/metrics/route.ts'))
    const req = (route, method = 'GET', body, headers = {}) => new Request(`http://localhost:3100/api/admin/${route}`, { method, headers: { host: 'localhost:3100', origin: 'http://localhost:3100', 'content-type': 'application/json', ...headers }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) })
    assert.equal(adminConfiguration(), null)
    const initial = await (await setup.GET(req('setup'))).json()
    assert.equal(initial.available, true)
    const password = 'Fixture-only passphrase 42!'
    const setupBody = { password, confirmation: password, analyticsEnabled: true }
    assert.equal((await setup.POST(req('setup', 'POST', setupBody, { 'x-admin-setup-token': 'wrong' }))).status, 403)
    assert.equal(fs.existsSync(process.env.PORTFOLIO_ADMIN_CONFIG), false)
    const created = await setup.POST(req('setup', 'POST', setupBody, { 'x-admin-setup-token': initial.token }))
    assert.equal(created.status, 201)
    const storedConfig = fs.readFileSync(process.env.PORTFOLIO_ADMIN_CONFIG, 'utf8')
    assert.ok(!storedConfig.includes(password))
    assert.equal((await setup.GET(req('setup'))).status, 404)
    assert.equal((await setup.POST(req('setup', 'POST', { ...setupBody, password: 'Another fixture passphrase!' }, { 'x-admin-setup-token': initial.token }))).status, 403)
    assert.equal(fs.readFileSync(process.env.PORTFOLIO_ADMIN_CONFIG, 'utf8'), storedConfig)
    const config = adminConfiguration(), store = adminStore(config)
    await store.set('fixture-session-race', { session: 'fixture-only' }, 60)
    const worker = fork(fileURLToPath(import.meta.url), ['--private-race-worker', process.env.PORTFOLIO_PRIVATE_STATE], { stdio: ['ignore', 'ignore', 'inherit', 'ipc'] })
    try {
      await new Promise((resolve, reject) => { worker.once('message', resolve); worker.once('error', reject); worker.once('exit', (code) => { if (code) reject(new Error('Race worker failed')) }) })
      const revoked = store.remove('fixture-session-race')
      await new Promise((resolve) => setTimeout(resolve, 60))
      worker.send('continue')
      await new Promise((resolve, reject) => worker.once('exit', (code) => code === 0 ? resolve() : reject(new Error('Race worker failed'))))
      await revoked
      assert.equal(await store.get('fixture-session-race'), null, 'another process cannot restore a successfully revoked session')
    } finally { if (worker.exitCode === null) worker.kill() }
    assert.equal(await verifyAdminPassword(password, config.passwordHash), true)
    assert.equal(await verifyAdminPassword('Wrong fixture passphrase', config.passwordHash), false)
    assert.equal(await verifyAdminPassword(password, 'scrypt$unbounded-cost'), false)
    const publicStatus = await (await sessions.GET(req('session'))).json()
    assert.equal(publicStatus.authenticated, false)
    assert.ok(!JSON.stringify(publicStatus).includes(config.passwordHash) && !JSON.stringify(publicStatus).includes(config.sessionSecret))
    assert.equal((await metrics.GET(req('metrics'))).status, 401)
    assert.equal((await sessions.POST(req('session', 'POST', { password }, { origin: 'https://attacker.example' }))).status, 403)
    const login = await sessions.POST(req('session', 'POST', { password }))
    assert.equal(login.status, 200)
    const cookieHeader = login.headers.get('set-cookie'), cookie = cookieHeader.split(';')[0]
    const loginBody = await login.json()
    assert.match(cookieHeader, /HttpOnly/); assert.match(cookieHeader, /SameSite=Strict/); assert.match(cookieHeader, /Max-Age=3600/)
    assert.ok(!cookieHeader.includes(password))
    assert.equal((await (await sessions.GET(req('session', 'GET', undefined, { cookie }))).json()).authenticated, true)
    assert.equal((await metrics.GET(req('metrics', 'GET', undefined, { cookie }))).status, 200)
    assert.equal((await sessions.GET(req('session', 'GET', undefined, { cookie: cookie + '; ' + cookie }))).status, 200)
    assert.equal((await (await sessions.GET(req('session', 'GET', undefined, { cookie: cookie + '; ' + cookie }))).json()).authenticated, false)
    const token = cookie.slice(cookie.indexOf('=') + 1), payload = openCookie(token, 'admin', config.sessionSecret)
    assert.equal(openCookie(token, 'visits', config.sessionSecret), null)
    assert.equal(openCookie(token.slice(0, -1) + (token.endsWith('A') ? 'B' : 'A'), 'admin', config.sessionSecret), null)
    const expired = sealCookie({ ...payload, expires: 1 }, 'admin', config.sessionSecret)
    assert.equal(await readAdminSession(req('session', 'GET', undefined, { cookie: `kwanho-admin=${expired}` })), null)
    const wrongPurpose = sealCookie(payload, 'visits', config.sessionSecret)
    assert.equal(await readAdminSession(req('session', 'GET', undefined, { cookie: `kwanho-admin=${wrongPurpose}` })), null)
    const rotated = { ...config, passwordHash: await hashAdminPassword('Rotated fixture passphrase 73!') }
    assert.equal(await readAdminSession(req('session', 'GET', undefined, { cookie }), process.env, rotated, store), null)
    assert.equal((await sessions.DELETE(req('session', 'DELETE', {}, { cookie, 'x-admin-csrf': '\u00e9'.repeat(43) }))).status, 403)
    assert.equal((await sessions.DELETE(req('session', 'DELETE', {}, { cookie, 'x-admin-csrf': loginBody.csrf }))).status, 200)
    assert.equal((await (await sessions.GET(req('session', 'GET', undefined, { cookie }))).json()).authenticated, false, 'logout revokes copied cookies')
    assert.equal((await metrics.GET(req('metrics', 'GET', undefined, { cookie }))).status, 401)
    const secure = await issueAdminSession(new Request('https://www.kwanho.dev/admin'), config, store)
    assert.match(secure.cookie, /^__Host-kwanho-admin=/); assert.match(secure.cookie, /; Secure/); assert.ok(!secure.cookie.includes('Domain='))
    const rejected = []
    for (let index = 0; index < 12; index++) rejected.push((await sessions.POST(req('session', 'POST', { password: 'Wrong fixture passphrase' }, { 'x-vercel-forwarded-for': `1.1.1.${index + 1}` }))).status)
    assert.ok(rejected.includes(401)); assert.equal(rejected.at(-1), 429, 'spoofed proxy headers cannot reset the local rate key')
    assert.equal(clientRateKey(req('session'), config), clientRateKey(req('session', 'GET', undefined, { 'x-vercel-forwarded-for': '8.8.8.8' }), config))
    process.env.NODE_ENV = 'production'; process.env.VERCEL = '1'
    assert.equal(adminConfiguration(), null, 'production ignores local configuration')
    assert.equal((await setup.GET(req('setup'))).status, 404)
    assert.equal((await setup.POST(req('setup', 'POST', setupBody, { 'x-admin-setup-token': initial.token }))).status, 403)
    process.env.ADMIN_PASSWORD_HASH = config.passwordHash; process.env.ADMIN_SESSION_SECRET = config.sessionSecret
    assert.throws(() => adminStore(config), 'production does not fall back to local storage')
    const productionRequest = new Request('https://www.kwanho.dev/api/admin/session', { method: 'POST', headers: { origin: 'https://www.kwanho.dev', 'content-type': 'application/json', 'x-vercel-forwarded-for': '8.8.8.8' }, body: JSON.stringify({ password }) })
    assert.equal((await sessions.POST(productionRequest)).status, 503)
    assert.throws(() => clientRateKey(new Request('https://www.kwanho.dev/admin'), config), 'missing trusted platform identity fails closed')
    const platformRequest = (address) => new Request('https://www.kwanho.dev/admin', { headers: { 'x-vercel-forwarded-for': address } })
    assert.equal(clientRateKey(platformRequest('2001:db8:1:2::1'), config), clientRateKey(platformRequest('2001:0db8:0001:0002:ffff::9'), config), 'IPv6 rotation within a /64 shares a rate bucket')
    assert.equal(clientRateKey(platformRequest('::ffff:192.0.2.1'), config), clientRateKey(platformRequest('192.0.2.1'), config), 'mapped IPv4 representation cannot change the rate bucket')
  } finally {
    for (const [key, value] of Object.entries(backup)) { if (value === undefined) delete process.env[key]; else process.env[key] = value }
    fs.rmSync(directory, { recursive: true, force: true })
  }
})

await round(3, 'analytics consent, poisoning and retention', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'kwanho-analytics-security-'))
  const keys = ['NODE_ENV', 'VERCEL', 'TRAVEL_EDITOR_ENABLED', 'PORTFOLIO_ADMIN_CONFIG', 'PORTFOLIO_PRIVATE_STATE', 'ADMIN_PASSWORD_HASH', 'ADMIN_SESSION_SECRET', 'ANALYTICS_ENABLED', 'ANALYTICS_REDIS_REST_URL', 'ANALYTICS_REDIS_REST_TOKEN']
  const backup = Object.fromEntries(keys.map((key) => [key, process.env[key]]))
  try {
    keys.forEach((key) => { delete process.env[key] })
    Object.assign(process.env, { NODE_ENV: 'development', TRAVEL_EDITOR_ENABLED: '1', PORTFOLIO_ADMIN_CONFIG: path.join(directory, 'admin.json'), PORTFOLIO_PRIVATE_STATE: path.join(directory, 'state.json') })
    const { createLocalAdminConfiguration, adminConfiguration, adminStore } = load(path.join(root, 'lib/admin-config.ts'))
    const { publicAnalyticsPath, referralHost, visitorCookie, visitorConsentKey, consentedVisitor, analyticsEvent, analyticsReport } = load(path.join(root, 'lib/visit-analytics.ts'))
    const { createLocalPrivateStore, createRedisPrivateStore } = load(path.join(root, 'lib/private-store.ts'))
    const events = load(path.join(root, 'app/api/analytics/event/route.ts'))
    const consent = load(path.join(root, 'app/api/analytics/consent/route.ts'))
    const preference = load(path.join(root, 'app/api/analytics/preference/route.ts'))
    const status = load(path.join(root, 'app/api/analytics/status/route.ts'))
    const metrics = load(path.join(root, 'app/api/admin/metrics/route.ts'))
    await createLocalAdminConfiguration('Fixture-only analytics passphrase 72!', true)
    const config = adminConfiguration(), store = adminStore(config)
    const req = (route, method = 'GET', body, headers = {}) => new Request(`http://localhost:3100/api/${route}`, { method, headers: { host: 'localhost:3100', origin: 'http://localhost:3100', 'content-type': 'application/json', ...headers }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) })
    for (const value of ['/admin', '/about/manage', '/travel/manage', '/studio/index.html', '/api/skills', '/about?email=private@example.com', '/notes/../admin', 'https://attacker.example/']) assert.equal(publicAnalyticsPath(value), null)
    for (const value of ['private@example.com', 'https://google.com/?email=private@example.com', '127.0.0.1', 'localhost', 'intranet', '__proto__', '<script>']) assert.equal(referralHost(value, 'https://www.kwanho.dev'), 'other')
    assert.equal(referralHost('WWW.KWANHO.DEV', 'https://www.kwanho.dev'), 'internal')
    assert.equal(referralHost('Google.com', 'https://www.kwanho.dev'), 'google')
    assert.equal(referralHost('alice-private-123.customer.example.com', 'https://www.kwanho.dev'), 'other')
    const initial = await status.GET(req('analytics/status'))
    assert.equal((await initial.json()).consented, false)
    assert.equal(initial.headers.get('set-cookie'), null)
    const view = { path: '/', previous: null, referral: 'google.com' }
    assert.equal((await events.POST(req('analytics/event', 'POST', view, { origin: 'https://attacker.example' }))).status, 403)
    assert.equal((await events.POST(req('analytics/event', 'POST', { ...view, path: '/about?token=private-value' }))).status, 422)
    assert.equal((await events.POST(req('analytics/event', 'POST', { ...view, visitor: 'injected-id' }))).status, 422)
    const first = await events.POST(req('analytics/event', 'POST', view, { 'x-forwarded-for': '203.0.113.55' }))
    assert.equal(first.status, 204); assert.equal(first.headers.get('set-cookie'), null, 'aggregate views do not create visitor cookies')
    const date = new Date().toISOString().slice(0, 10)
    let [day] = await store.days([date])
    assert.equal(day.views, 1); assert.equal(day.visitors, 0); assert.equal(day.sessions, 0)
    for (const signal of [{ dnt: '1' }, { 'sec-gpc': '1' }]) assert.equal((await events.POST(req('analytics/event', 'POST', view, signal))).status, 204)
    assert.equal((await store.days([date]))[0].views, 1)
    const prepared = await preference.POST(req('analytics/preference', 'POST', {}))
    const controlCookie = prepared.headers.getSetCookie()[0].split(';')[0]
    const preparedBody = await prepared.json()
    const granted = await consent.POST(req('analytics/consent', 'POST', { enabled: true }, { cookie: controlCookie, 'x-visitor-preference': preparedBody.preferenceToken }))
    assert.equal(granted.status, 200)
    const grantedBody = await granted.json()
    const cookieHeader = granted.headers.get('set-cookie'), cookie = cookieHeader.split(';')[0] + '; ' + controlCookie
    assert.match(cookieHeader, /HttpOnly/); assert.match(cookieHeader, /SameSite=Lax/)
    const value = visitorCookie(req('analytics/status', 'GET', undefined, { cookie }), config)
    assert.ok(value)
    assert.equal((await store.days([date]))[0].views, 1, 'consent does not count the page twice')
    assert.equal((await store.days([date]))[0].visitors, 1)
    assert.equal((await metrics.GET(req('admin/metrics', 'GET', undefined, { cookie }))).status, 401)
    assert.equal((await metrics.GET(req('admin/metrics', 'GET', undefined, { cookie: cookie.replace('kwanho-visits', 'kwanho-admin') }))).status, 401)
    assert.equal((await events.POST(req('analytics/event', 'POST', { path: '/about', previous: '/', referral: 'direct' }, { cookie }))).status, 204)
    assert.equal((await events.POST(req('analytics/event', 'POST', { path: '/notes', previous: '/about', referral: 'internal' }, { cookie }))).status, 204)
    ;[day] = await store.days([date])
    assert.equal(day.views, 3); assert.equal(day.visitors, 1); assert.equal(day.sessions, 1)
    assert.equal(day.flows['/\t/about'], 1)
    const consentKey = visitorConsentKey(value.visitor, config), consentRecord = await store.get(consentKey)
    await store.set(consentKey, { ...consentRecord, seenAt: Date.now() - 31 * 60 * 1000 }, 30 * 86400)
    for (let repeat = 0; repeat < 2; repeat++) assert.equal((await consent.POST(req('analytics/consent', 'POST', { enabled: true }, { cookie, 'x-visitor-preference': grantedBody.preferenceToken }))).status, 200)
    assert.equal((await store.days([date]))[0].sessions, 2, 'stale consent cookies cannot create a new session per replay')
    for (let repeat = 0; repeat < 2; repeat++) await events.POST(req('analytics/event', 'POST', { path: '/about', previous: '/', referral: 'direct' }, { cookie }))
    assert.equal((await store.days([date]))[0].sessions, 2)
    const midnight = Date.parse('2026-10-28T00:05:00Z')
    const acrossMidnight = analyticsEvent('/about', '/', 'direct', { cookie: value, record: { ...consentRecord, startedAt: Date.parse('2026-10-27T23:55:00Z'), seenAt: midnight } }, config, midnight)
    assert.equal(acrossMidnight.event.session, null, 'an uninterrupted session is not counted again after UTC midnight')
    const stored = fs.readFileSync(process.env.PORTFOLIO_PRIVATE_STATE, 'utf8')
    for (const secret of [value.visitor, cookie, '203.0.113.55', 'private@example.com', 'private-value']) assert.ok(!stored.includes(secret), 'raw visitor/network/query identifiers must not be stored')
    const jar = new Map(cookie.split(';').map((part) => { const pair = part.trim(), split = pair.indexOf('='); return [pair.slice(0, split), pair.slice(split + 1)] }))
    const cookies = () => [...jar].map(([name, token]) => `${name}=${token}`).join('; ')
    const applyCookies = (response) => {
      for (const header of response.headers.getSetCookie()) {
        const [pair] = header.split(';'), split = pair.indexOf('='), name = pair.slice(0, split)
        if (/Max-Age=0(?:;|$)/.test(header)) jar.delete(name)
        else jar.set(name, pair.slice(split + 1))
      }
    }
    const originalRename = fs.promises.rename
    let failedWithdrawal
    try {
      fs.promises.rename = async (...args) => {
        if (String(args[1]) === process.env.PORTFOLIO_PRIVATE_STATE) throw Object.assign(new Error('Fixture storage outage'), { code: 'EACCES' })
        return originalRename(...args)
      }
      failedWithdrawal = await consent.POST(req('analytics/consent', 'POST', { enabled: false }, { cookie }))
    } finally { fs.promises.rename = originalRename }
    const failedBody = await failedWithdrawal.json()
    assert.equal(failedBody.revocationConfirmed, false); assert.equal(failedBody.revocationPending, true)
    applyCookies(failedWithdrawal)
    assert.ok(jar.has('kwanho-visitor-revoke'), 'a failed withdrawal retains a revocation-only retry capability')
    assert.ok(!jar.has('kwanho-visits'))
    assert.equal(await consentedVisitor(req('analytics/event', 'GET', undefined, { cookie: cookies() }), config, store), null, 'identification is suppressed immediately')
    const withdrawn = await consent.POST(req('analytics/consent', 'POST', { enabled: false }, { cookie: cookies() }))
    assert.equal((await withdrawn.json()).revocationConfirmed, true); assert.match(withdrawn.headers.get('set-cookie'), /Max-Age=0/)
    applyCookies(withdrawn); assert.ok(!jar.has('kwanho-visitor-revoke'))
    assert.equal(await consentedVisitor(req('analytics/event', 'GET', undefined, { cookie }), config, store), null)
    assert.equal((await (await status.GET(req('analytics/status', 'GET', undefined, { cookie }))).json()).consented, false)
    const replay = await events.POST(req('analytics/event', 'POST', { path: '/about', previous: '/', referral: 'direct' }, { cookie }))
    assert.equal(replay.headers.get('set-cookie'), null, 'withdrawn cookies cannot renew visitor counting')
    assert.equal((await store.days([date]))[0].visitors, 1)
    const reopened = await preference.POST(req('analytics/preference', 'POST', {}, { cookie: cookies() }))
    const reopenedBody = await reopened.json()
    const optedAgain = await consent.POST(req('analytics/consent', 'POST', { enabled: true }, { cookie: cookies(), 'x-visitor-preference': reopenedBody.preferenceToken }))
    assert.equal(optedAgain.status, 200)
    applyCookies(optedAgain)
    const privacyCookie = cookies()
    await events.POST(req('analytics/event', 'POST', view, { cookie: privacyCookie, 'sec-gpc': '1' }))
    assert.equal((await (await status.GET(req('analytics/status', 'GET', undefined, { cookie: privacyCookie }))).json()).consented, false, 'privacy-driven deletion also revokes server consent')
    // Delay a grant from another tab after reading its revision, then withdraw.
    // Test both a first grant and an already-consented identity.
    const racePrepared = await preference.POST(req('analytics/preference', 'POST', {}))
    let raceCookie = racePrepared.headers.getSetCookie()[0].split(';')[0]
    let raceProof = (await racePrepared.json()).preferenceToken
    for (const existing of [false, true]) {
      if (existing) {
        const reopenedRace = await preference.POST(req('analytics/preference', 'POST', {}, { cookie: raceCookie }))
        raceProof = (await reopenedRace.json()).preferenceToken
        const freshGrant = await consent.POST(req('analytics/consent', 'POST', { enabled: true }, { cookie: raceCookie, 'x-visitor-preference': raceProof }))
        assert.equal(freshGrant.status, 200)
        raceProof = (await freshGrant.json()).preferenceToken
        raceCookie = freshGrant.headers.getSetCookie()[0].split(';')[0] + '; ' + raceCookie
      }
      let resume, paused
      const wait = new Promise((resolve) => { resume = resolve }), reached = new Promise((resolve) => { paused = resolve })
      const proxy = { ...store, async changePreference(...args) { if (args[2]) { paused(); await wait } return store.changePreference(...args) } }
      const alternate = createSourceLoader(root, { '@/lib/admin-config': { ...load(path.join(root, 'lib/admin-config.ts')), adminStore: () => proxy } })
      const racingConsent = alternate(path.join(root, 'app/api/analytics/consent/route.ts'))
      const pendingGrant = racingConsent.POST(req('analytics/consent', 'POST', { enabled: true }, { cookie: raceCookie, 'x-visitor-preference': raceProof }))
      await reached
      const withdrawal = await consent.POST(req('analytics/consent', 'POST', { enabled: false }, { cookie: raceCookie }))
      assert.equal((await withdrawal.json()).revocationConfirmed, true)
      resume()
      const lateGrant = await pendingGrant
      assert.equal(lateGrant.status, 409, 'a stale grant cannot recreate identity after confirmed withdrawal')
      assert.equal(lateGrant.headers.get('set-cookie'), null)
      assert.equal((await (await status.GET(req('analytics/status', 'GET', undefined, { cookie: raceCookie }))).json()).consented, false)
    }
    for (let index = 0; index < 80; index++) await store.record({ date, path: '/', previous: null, referral: `host${index}.example.com`, visitor: null, session: null })
    const capped = (await store.days([date]))[0]
    assert.ok(Object.keys(capped.referrals).length <= 65); assert.ok(capped.referrals.other > 0)
    assert.ok(!fs.readFileSync(process.env.PORTFOLIO_PRIVATE_STATE, 'utf8').includes('host79.example.com'))
    const poison = createLocalPrivateStore(path.join(directory, 'poison.json'))
    for (let index = 0; index < 64; index++) await poison.record({ date, path: '/', previous: null, referral: `seed${index}.example.com`, visitor: null, session: null })
    await poison.record({ date, path: '/', previous: null, referral: 'google.com', visitor: null, session: null })
    assert.equal((await poison.days([date]))[0].referrals.google, 1, 'unknown sources cannot exhaust recognized referral buckets')
    const report = analyticsReport([capped])
    assert.ok(!JSON.stringify(report).includes(value.visitor) && !JSON.stringify(report).includes('seenVisitors'))
    let clock = Date.now() - 100 * 86400000
    const retained = createLocalPrivateStore(path.join(directory, 'retention.json'), () => clock)
    const oldDate = new Date(clock).toISOString().slice(0, 10)
    await retained.record({ date: oldDate, path: '/', previous: null, referral: 'direct', visitor: 'fixture-digest', session: 'fixture-session-digest' })
    clock = Date.now()
    assert.equal((await retained.days([oldDate]))[0].views, 0, 'retention is enforced on read without another collection event')
    await retained.record({ date, path: '/', previous: null, referral: 'direct', visitor: null, session: null })
    assert.equal((await retained.days([oldDate]))[0].views, 0, 'old daily records are pruned')
    for (const url of ['http://example.upstash.io', 'https://127.0.0.1', 'https://example.upstash.io/other', 'https://user:pass@example.upstash.io']) assert.throws(() => createRedisPrivateStore(url, 'fixture'))
    const calls = []
    const remote = createRedisPrivateStore('https://fixture.upstash.io', 'fixture-not-a-real-token', async (url, options) => {
      assert.equal(options.redirect, 'error'); assert.equal(options.cache, 'no-store')
      const commands = JSON.parse(options.body); calls.push({ url: String(url), commands })
      if (String(url).endsWith('/pipeline')) return Response.json(commands.map(() => ({ result: ['views', '2', 'visitors', '1', 'p|/', '2'] })))
      return Response.json({ result: 1 })
    })
    await remote.record({ date, path: '/', previous: null, referral: 'example.com', visitor: null, session: null })
    const remoteDays = await remote.days([date, '2026-10-26'])
    assert.equal(remoteDays[0].views, 2); assert.equal(calls.length, 2, 'metrics use one bounded pipeline request')
    assert.equal(calls[0].commands[0], 'EVAL'); assert.equal(calls[1].commands.length, 2)
  } finally {
    for (const [key, value] of Object.entries(backup)) { if (value === undefined) delete process.env[key]; else process.env[key] = value }
    fs.rmSync(directory, { recursive: true, force: true })
  }
})

await round(4, 'content boundaries and admin document policy', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'kwanho-content-security-'))
  const content = path.join(directory, 'content'), sibling = content + '-private'
  fs.mkdirSync(path.join(content, 'about'), { recursive: true }); fs.mkdirSync(sibling)
  fs.writeFileSync(path.join(content, 'about/index.md'), '# Public fixture')
  fs.writeFileSync(path.join(content, 'about/index.tsx'), 'fixture-source')
  fs.writeFileSync(path.join(content, 'about/image.png'), Buffer.from([137,80,78,71,13,10,26,10]))
  fs.writeFileSync(path.join(content, 'about/image.svg'), '<svg xmlns="http://www.w3.org/2000/svg"><script>fixture()</script></svg>')
  fs.writeFileSync(path.join(sibling, 'proof.txt'), 'fixture-private')
  fs.writeFileSync(path.join(sibling, 'index.md'), '# Private fixture')
  const fixtureLoad = createSourceLoader(root, {
    '@/lib/content-paths': { CONTENT_ROOT: content },
    '@/lib/content-component-registry': { getBundledContentModule: () => null },
    '@/contents/public-routes.generated.json': { version: 1, paths: ['/about'] },
  })
  try {
    const media = fixtureLoad(path.join(root, 'app/media/[...path]/route.ts'))
    const pages = fixtureLoad(path.join(root, 'lib/content.ts'))
    const callMedia = (segments, headers = {}) => media.GET(new Request('http://localhost/media/fixture', { headers }), { params: Promise.resolve({ path: segments }) })
    for (const segments of [
      ['..', 'content-private', 'proof.txt'], ['../content-private/proof.txt'],
      ['about', '..\\..\\content-private\\proof.txt'], ['about', 'index.tsx'],
      ['about', 'index.md'], ['about', '.env'], ['_draft', 'image.png'],
    ]) assert.notEqual((await callMedia(segments)).status, 200)
    assert.equal(pages.getContentPage(['..', 'content-private']), null)
    assert.equal(pages.getContentPage(['..%2fcontent-private']), null)
    assert.equal(pages.getContentPage(['_draft']), null)
    const image = await callMedia(['about', 'image.png'])
    assert.equal(image.status, 200); assert.equal(image.headers.get('x-content-type-options'), 'nosniff')
    assert.ok(!image.headers.get('cache-control').includes('immutable'))
    assert.equal((await callMedia(['about', 'image.png'], { 'if-none-match': image.headers.get('etag') })).status, 304)
    const svg = await callMedia(['about', 'image.svg'])
    assert.match(svg.headers.get('content-security-policy'), /sandbox/); assert.match(svg.headers.get('content-security-policy'), /default-src 'none'/)
    const { adminConfigPath, adminStore } = load(path.join(root, 'lib/admin-config.ts'))
    for (const location of ['public/secret.json', 'contents/secret.json', 'app/secret.json']) assert.throws(() => adminConfigPath({ NODE_ENV: 'development', PORTFOLIO_ADMIN_CONFIG: path.join(root, location) }))
    assert.throws(() => adminStore({}, { NODE_ENV: 'development', PORTFOLIO_PRIVATE_STATE: path.join(root, 'public/state.json') }))
    try {
      fs.symlinkSync(sibling, path.join(content, 'about/escape'), process.platform === 'win32' ? 'junction' : 'dir')
      fs.writeFileSync(path.join(sibling, 'proof.png'), Buffer.from([137,80,78,71]))
      assert.notEqual((await callMedia(['about', 'escape', 'proof.png'])).status, 200)
      assert.equal(pages.getContentPage(['about', 'escape']), null)
      const alias = path.join(directory, 'studio-alias')
      fs.symlinkSync(sibling, alias, process.platform === 'win32' ? 'junction' : 'dir')
      assert.throws(() => adminConfigPath({ NODE_ENV: 'development', DEV_STUDIO_DIR: alias, PORTFOLIO_ADMIN_CONFIG: path.join(sibling, 'admin.json') }))
      assert.throws(() => adminConfigPath({ NODE_ENV: 'development', DEV_STUDIO_DIR: path.join(alias, 'not-created'), PORTFOLIO_ADMIN_CONFIG: path.join(sibling, 'not-created/admin.json') }))
    } catch (error) { if (!['EPERM', 'ENOTSUP'].includes(error.code)) throw error; console.log(`Junction fixture unavailable: ${error.code}`) }
    const { markdownToHtml } = load(path.join(root, 'lib/markdown.ts'))
    assert.ok(!markdownToHtml('[unsafe](javascript:alert(1))').includes('href="javascript:'))
    assert.ok(!markdownToHtml('![unsafe](data:text/html,fixture)').includes('src="data:'))
    assert.ok(markdownToHtml('[valid](https://example.com)').includes('href="https://example.com"'))
    const previousEnv = process.env.NODE_ENV
    try {
      process.env.NODE_ENV = 'production'
      const { proxy } = load(path.join(root, 'proxy.ts'))
      const { NextRequest } = await import('next/server.js')
      const one = proxy(new NextRequest('https://www.kwanho.dev/admin', { headers: { 'x-nonce': 'attacker', 'content-security-policy': 'script-src *' } }))
      const two = proxy(new NextRequest('https://www.kwanho.dev/admin'))
      assert.notEqual(one.headers.get('content-security-policy'), two.headers.get('content-security-policy'))
      assert.match(one.headers.get('content-security-policy'), /script-src.*nonce-/)
      assert.ok(!one.headers.get('content-security-policy').includes('attacker'))
      assert.ok(!one.headers.get('content-security-policy').includes('unsafe-eval'))
      assert.equal(one.headers.get('x-frame-options'), 'DENY')
      assert.equal(one.headers.get('cache-control'), 'private, no-store')
    } finally { if (previousEnv === undefined) delete process.env.NODE_ENV; else process.env.NODE_ENV = previousEnv }
    const footer = fs.readFileSync(path.join(root, 'components/site-footer.tsx'), 'utf8')
    assert.match(footer, /<a href="\/admin">/, 'entry into nonce-protected admin must navigate a document')
  } finally { fs.rmSync(directory, { recursive: true, force: true }) }
})

await round(5, 'cross-authentication and fail-closed retargeting', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'kwanho-final-security-'))
  const keys = ['NODE_ENV', 'VERCEL', 'TRAVEL_EDITOR_ENABLED', 'PORTFOLIO_ADMIN_CONFIG', 'PORTFOLIO_PRIVATE_STATE', 'OWNER_SESSION_STATE_PATH', 'NEXTAUTH_URL', 'NEXTAUTH_SECRET', 'GITHUB_ID', 'GITHUB_SECRET', 'ADMIN_PASSWORD_HASH', 'ADMIN_SESSION_SECRET', 'ANALYTICS_ENABLED', 'ANALYTICS_REDIS_REST_URL', 'ANALYTICS_REDIS_REST_TOKEN']
  const backup = Object.fromEntries(keys.map((key) => [key, process.env[key]]))
  try {
    keys.forEach((key) => { delete process.env[key] })
    Object.assign(process.env, { NODE_ENV: 'development', TRAVEL_EDITOR_ENABLED: '1', PORTFOLIO_ADMIN_CONFIG: path.join(directory, 'admin.json'), PORTFOLIO_PRIVATE_STATE: path.join(directory, 'state.json') })
    const { createLocalAdminConfiguration, adminConfiguration, adminStore } = load(path.join(root, 'lib/admin-config.ts'))
    const { issueAdminSession, readAdminSession } = load(path.join(root, 'lib/admin-auth.ts'))
    const { skillOwner } = load(path.join(root, 'lib/skill-owner.ts'))
    const { travelOwner } = load(path.join(root, 'lib/travel-owner.ts'))
    const { OWNER_GITHUB_ID } = load(path.join(root, 'lib/owner-auth.ts'))
    const { ownerCsrfToken } = load(path.join(root, 'lib/travel-owner-policy.ts'))
    const { issueOwnerSession } = load(path.join(root, 'lib/owner-session.ts'))
    const { acquireLocalFileLock } = load(path.join(root, 'lib/local-file-lock.ts'))
    const { encode } = require('next-auth/jwt')
    await createLocalAdminConfiguration('Final fixture-only passphrase 86!', false)
    const config = adminConfiguration(), store = adminStore(config)
    const issued = await issueAdminSession(new Request('https://www.kwanho.dev/admin'), config, store)
    const adminCookie = issued.cookie.split(';')[0]
    const nextSecret = 'fixture-only-nextauth-key-not-a-real-secret-123456'
    const env = { NODE_ENV: 'production', VERCEL: '1', NEXTAUTH_URL: 'https://www.kwanho.dev', NEXTAUTH_SECRET: nextSecret, GITHUB_ID: 'fixture-client', GITHUB_SECRET: 'fixture-secret', ANALYTICS_REDIS_REST_URL: 'https://fixture.upstash.io', ANALYTICS_REDIS_REST_TOKEN: 'fixture' }
    const owner = await issueOwnerSession('fixture-token-not-a-credential', Date.now() + 60_000, env, store)
    const claims = owner.claims, identity = { ownerId: OWNER_GITHUB_ID, ownerSessionId: owner.id }
    const encoded = await encode({ token: identity, secret: nextSecret, maxAge: 60 })
    const githubCookie = `__Secure-next-auth.session-token=${encoded}`
    const req = (route, cookie, tokenHeader = {}) => new Request(`https://www.kwanho.dev/api/${route}`, { method: 'POST', headers: { cookie, origin: 'https://www.kwanho.dev', 'content-type': 'application/json', ...tokenHeader } })
    assert.equal(await skillOwner(req('skills', adminCookie, { 'x-skills-editor-token': issued.session.csrf }), env, store), null, 'password admin does not grant repository write credentials')
    assert.equal(await travelOwner(req('travel', adminCookie, { 'x-travel-editor-token': issued.session.csrf }), env, store), null)
    assert.equal(await readAdminSession(req('admin/metrics', githubCookie), env, config, store), null, 'GitHub publication login alone does not unlock private analytics')
    assert.equal((await skillOwner(req('skills', githubCookie, { 'x-skills-editor-token': ownerCsrfToken(claims, nextSecret, 'skills') }), env, store))?.canWrite, true)
    assert.equal((await skillOwner(req('skills', githubCookie, { 'x-skills-editor-token': ownerCsrfToken(claims, nextSecret, 'travel') }), env, store))?.canWrite, false)
    Object.assign(process.env, { OWNER_SESSION_STATE_PATH: process.env.PORTFOLIO_PRIVATE_STATE, NEXTAUTH_URL: env.NEXTAUTH_URL, NEXTAUTH_SECRET: nextSecret, GITHUB_ID: env.GITHUB_ID, GITHUB_SECRET: env.GITHUB_SECRET, TRAVEL_EDITOR_ENABLED: '0' })
    const ownerLogout = load(path.join(root, 'app/api/owner/logout/route.ts'))
    const logoutRequest = (proof) => new Request('https://www.kwanho.dev/api/owner/logout', { method: 'POST', headers: { cookie: githubCookie, origin: 'https://www.kwanho.dev', 'content-type': 'application/json', 'x-owner-csrf': proof }, body: JSON.stringify({ purpose: 'skills' }) })
    assert.equal((await ownerLogout.POST(logoutRequest('wrong'))).status, 403)
    const originalRename = fs.promises.rename
    try {
      fs.promises.rename = async (...args) => {
        if (String(args[1]) === process.env.PORTFOLIO_PRIVATE_STATE) throw Object.assign(new Error('Fixture outage'), { code: 'EACCES' })
        return originalRename(...args)
      }
      const failed = await ownerLogout.POST(logoutRequest(ownerCsrfToken(claims, nextSecret, 'skills')))
      assert.equal(failed.status, 503); assert.equal(failed.headers.get('set-cookie'), null, 'failed revocation keeps the retry credential')
    } finally { fs.promises.rename = originalRename }
    const signedOut = await ownerLogout.POST(logoutRequest(ownerCsrfToken(claims, nextSecret, 'skills')))
    assert.equal(signedOut.status, 200)
    assert.match(signedOut.headers.get('set-cookie'), /Max-Age=0/)
    assert.equal(await skillOwner(req('skills', githubCookie, { 'x-skills-editor-token': ownerCsrfToken(claims, nextSecret, 'skills') }), env, store), null, 'copied publication cookies lose authority after sign-out')
    const authRoute = load(path.join(root, 'app/api/auth/[...nextauth]/route.ts'))
    const { NextRequest } = require('next/server')
    assert.equal((await authRoute.POST(new NextRequest('https://www.kwanho.dev/api/auth/signout', { method: 'POST' }), { params: Promise.resolve({ nextauth: ['signout'] }) })).status, 405, 'framework cookie-only logout cannot bypass authoritative revocation')
    process.env.TRAVEL_EDITOR_ENABLED = '1'
    const lockFile = path.join(directory, 'held-state.json.lock')
    fs.writeFileSync(lockFile, JSON.stringify({ pid: process.pid, token: 'fixture-held-lock' }))
    const beforeLock = fs.readFileSync(lockFile, 'utf8')
    await assert.rejects(acquireLocalFileLock(path.join(directory, 'held-state.json'), 20), (error) => error.status === 503)
    assert.equal(fs.readFileSync(lockFile, 'utf8'), beforeLock, 'stale/unknown locks are not removed by elapsed time')
    const originalConfig = fs.readFileSync(process.env.PORTFOLIO_ADMIN_CONFIG, 'utf8')
    fs.writeFileSync(process.env.PORTFOLIO_ADMIN_CONFIG, '{broken')
    assert.throws(() => adminConfiguration())
    const setup = load(path.join(root, 'app/api/admin/setup/route.ts'))
    assert.equal((await setup.GET(new Request('http://localhost:3100/api/admin/setup', { headers: { host: 'localhost:3100' } }))).status, 404, 'corrupt existing credentials do not reopen setup')
    assert.equal(fs.readFileSync(process.env.PORTFOLIO_ADMIN_CONFIG, 'utf8'), '{broken')
    fs.writeFileSync(process.env.PORTFOLIO_ADMIN_CONFIG, originalConfig)
    const repository = load(path.join(root, 'app/api/repositories/[name]/route.ts'))
    for (const name of ['../../.env', 'constructor', 'a'.repeat(101), 'webserv\r\nx-header: value']) assert.equal((await repository.GET(new Request('http://localhost:3100/api/repositories/fixture'), { params: Promise.resolve({ name }) })).status, 404)
    const valid = await repository.GET(new Request('http://localhost:3100/api/repositories/webserv'), { params: Promise.resolve({ name: 'webserv' }) })
    assert.equal(valid.status, 200)
    assert.equal(valid.headers.get('x-content-type-options'), 'nosniff')
    const result = await valid.json()
    assert.equal(result.repository.name, 'webserv')
    assert.ok(result.repository.sources.every((source) => { const url = new URL(source.url); return url.protocol === 'https:' && url.hostname === 'github.com' }))
    assert.equal((await repository.GET(new Request('http://localhost:3100/api/repositories/webserv?revision=stale'), { params: Promise.resolve({ name: 'webserv' }) })).status, 409)
  } finally {
    for (const [key, value] of Object.entries(backup)) { if (value === undefined) delete process.env[key]; else process.env[key] = value }
    fs.rmSync(directory, { recursive: true, force: true })
  }
})

console.log(JSON.stringify({ rounds, passed: true }, null, 2))
