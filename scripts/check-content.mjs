import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(path.join(root, 'package.json'))
const fixtures = fs.mkdtempSync(path.join(os.tmpdir(), 'kwanho-content-'))
const modules = new Map()

// Exercise the actual Markdown loader outside Next's client-component registry.
function loadSource(file) {
  if (modules.has(file)) return modules.get(file).exports
  const module = { exports: {} }
  modules.set(file, module)
  const { outputText } = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: file,
  })
  function resolve(name) {
    if (name === '@/lib/content-paths') return { CONTENT_ROOT: fixtures }
    if (name === '@/lib/content-component-registry') return { getBundledContentModule: () => null }
    if (!name.startsWith('@/')) return require(name)
    const base = path.join(root, name.slice(2))
    if (base.endsWith('.json')) return require(base)
    return loadSource(['.ts', '.tsx'].map((extension) => base + extension).find(fs.existsSync))
  }
  new Function('require', 'module', 'exports', '__filename', '__dirname', outputText)(
    resolve, module, module.exports, file, path.dirname(file),
  )
  return module.exports
}

try {
  const source = [
    '---', 'title: Portable title', 'subtitle: A useful introduction',
    'lang: en', 'date: 2026-10-26', 'showToc: true', 'readTime: 2 min',
    'bodyClassName: reading-example', '---', '', '## A readable heading',
    '', 'The article body stays separate from its metadata.', '',
  ].join('\n')
  const { getContentPage } = loadSource(path.join(root, 'lib/content.ts'))
  for (const [name, text] of [
    ['lf', source],
    ['crlf', source.replaceAll('\n', '\r\n')],
    ['bom-crlf', '\uFEFF' + source.replaceAll('\n', '\r\n')],
  ]) {
    const directory = path.join(fixtures, name)
    fs.mkdirSync(directory)
    fs.writeFileSync(path.join(directory, 'index.md'), text)
    const page = getContentPage([name])
    assert.equal(page.title, 'Portable title', `${name}: title`)
    assert.equal(page.subtitle, 'A useful introduction', `${name}: subtitle`)
    assert.equal(page.lang, 'en')
    assert.equal(page.date, '2026-10-26')
    assert.equal(page.showToc, true)
    assert.equal(page.readTime, '2 min')
    assert.equal(page.bodyClassName, 'reading-example')
    assert.match(page.html, /<h2 id="a-readable-heading">A readable heading<\/h2>/)
    assert.doesNotMatch(page.html, /title:|bodyClassName:/)
    console.log(`${name}: metadata and rendered body passed`)
  }

  const { createTravelStore } = loadSource(path.join(root, 'lib/travel-store.ts'))
  const { localTravelEditor, travelEditorToken, travelWriteAllowed } = loadSource(path.join(root, 'lib/travel-editor-access.ts'))
  const initial = { version: 1, updatedAt: null, places: [] }
  const storePath = path.join(fixtures, 'atlas.json')
  const store = createTravelStore(storePath, initial)
  const place = { city: 'Test Harbour', countryCode: 'NL', level: '2-plus-days', lat: 52.1, lng: 4.3 }
  const first = store.read()
  const added = await store.create(place, first.revision)
  assert.equal(added.places.length, 1)
  const id = added.places[0].id
  assert.deepEqual(createTravelStore(storePath, initial).read(), added, 'saved places survive a new store instance')
  const edited = await store.edit(id, { ...place, level: 'lived-there' }, added.revision)
  assert.equal(edited.places[0].id, id)
  assert.equal(edited.places[0].level, 'lived-there')
  await assert.rejects(store.edit(id, place, first.revision), (error) => error.status === 409)
  await assert.rejects(store.create({ ...place, city: 'Bad pin', lat: 91 }, edited.revision))
  assert.deepEqual(store.read(), edited, 'invalid and stale writes do not change the file')
  await assert.rejects(store.create(place, edited.revision), (error) => error.status === 409)
  const removed = await store.remove(id, edited.revision)
  assert.equal(removed.places.length, 0)
  const restored = await store.restore(edited.places[0], removed.revision)
  assert.deepEqual(restored.places[0], edited.places[0], 'undo preserves the original ID and fields')
  const otherStore = createTravelStore(storePath, initial)
  const race = await Promise.allSettled([
    store.create({ ...place, city: 'First concurrent place' }, restored.revision),
    otherStore.create({ ...place, city: 'Second concurrent place' }, restored.revision),
  ])
  assert.equal(race.filter((result) => result.status === 'fulfilled').length, 1)
  assert.equal(race.filter((result) => result.status === 'rejected' && result.reason.status === 409).length, 1)
  assert.equal(store.read().places.length, 2)
  assert.equal(fs.readdirSync(fixtures).filter((name) => name.endsWith('.tmp')).length, 0)
  fs.writeFileSync(storePath, '{broken JSON')
  assert.throws(() => store.read(), 'corrupt data is not silently replaced by the seed')
  assert.equal(fs.readFileSync(storePath, 'utf8'), '{broken JSON')
  console.log('travel: create/edit/remove/undo, restart, validation, conflict and atomic-file checks passed')

  const env = { NODE_ENV: 'development', TRAVEL_EDITOR_ENABLED: '1' }
  const token = travelEditorToken()
  const request = (overrides = {}) => new Request('http://127.0.0.1:3100/api/travel', {
    method: 'POST',
    headers: { host: '127.0.0.1:3100', origin: 'http://127.0.0.1:3100', 'x-travel-editor-token': token, ...overrides },
  })
  assert.equal(localTravelEditor(request(), env), true)
  assert.equal(travelWriteAllowed(request(), env), true)
  assert.equal(travelWriteAllowed(request({ origin: 'https://elsewhere.example' }), env), false)
  assert.equal(travelWriteAllowed(request({ host: 'public.example' }), env), false)
  assert.equal(travelWriteAllowed(request({ origin: 'null' }), env), false)
  assert.equal(travelWriteAllowed(request({ 'x-travel-editor-token': 'invalid' }), env), false)
  assert.equal(travelWriteAllowed(request(), { ...env, NODE_ENV: 'production' }), false)
  assert.equal(localTravelEditor(request(), { ...env, VERCEL: '1' }), false)
  assert.equal(localTravelEditor(request(), { NODE_ENV: 'development' }), false)
  console.log('travel access: opt-in local development only; origin/token/production guards passed')

  const { localDevelopmentRequest } = loadSource(path.join(root, 'lib/travel-editor-access.ts'))
  const { readStudioFile } = loadSource(path.join(root, 'lib/local-studio.ts'))
  const studioDirectory = path.join(fixtures, 'studio')
  const outsideDirectory = path.join(fixtures, 'outside-studio')
  fs.mkdirSync(studioDirectory); fs.mkdirSync(outsideDirectory)
  fs.writeFileSync(path.join(studioDirectory, 'index.html'), '<h1>Local design fixture</h1>')
  fs.writeFileSync(path.join(outsideDirectory, 'private.html'), 'outside the design root')
  assert.equal((await readStudioFile(studioDirectory, ['index.html'])).type, 'text/html; charset=utf-8')
  assert.equal(await readStudioFile(studioDirectory, ['..', 'outside-studio', 'private.html']), null)
  assert.equal(await readStudioFile(studioDirectory, ['..\\outside-studio', 'private.html']), null)
  assert.equal(await readStudioFile(studioDirectory, ['.env']), null)
  assert.equal(await readStudioFile(studioDirectory, ['C:', 'private.html']), null)
  try {
    fs.symlinkSync(outsideDirectory, path.join(studioDirectory, 'escape'), process.platform === 'win32' ? 'junction' : 'dir')
    assert.equal(await readStudioFile(studioDirectory, ['escape', 'private.html']), null)
  } catch (error) {
    if (!['EPERM', 'ENOTSUP'].includes(error.code)) throw error
    console.log(`studio symlink fixture skipped: ${error.code}; traversal/host/production checks still execute`)
  }
  const localStudioRequest = new Request('http://localhost:3100/studio/index.html', { headers: { host: 'localhost:3100' } })
  assert.equal(localDevelopmentRequest(localStudioRequest, { NODE_ENV: 'development' }), true)
  assert.equal(localDevelopmentRequest(localStudioRequest, { NODE_ENV: 'production' }), false)
  assert.equal(localDevelopmentRequest(localStudioRequest, { NODE_ENV: 'development', VERCEL: '1' }), false)
  assert.equal(localDevelopmentRequest(new Request('http://elsewhere.example/studio', { headers: { host: 'elsewhere.example' } }), { NODE_ENV: 'development' }), false)
  console.log('local studio: localhost-only development access, file types, traversal and real-path containment passed')

  const { travelOwner } = loadSource(path.join(root, 'lib/travel-owner.ts'))
  const { ownerAuthOptions, OWNER_GITHUB_ID } = loadSource(path.join(root, 'lib/owner-auth.ts'))
  const { ownerCsrfToken } = loadSource(path.join(root, 'lib/travel-owner-policy.ts'))
  const { createGitHubTravelStore } = loadSource(path.join(root, 'lib/travel-github-store.ts'))
  const { travelSnapshot } = loadSource(path.join(root, 'lib/travel-data.ts'))
  const { encode } = require('next-auth/jwt')
  const testSecret = 'fixture-only-secret-not-for-deployment-0123456789'
  const authEnv = { NODE_ENV: 'production', NEXTAUTH_URL: 'https://www.kwanho.dev', NEXTAUTH_SECRET: testSecret, GITHUB_ID: 'fixture-client', GITHUB_SECRET: 'fixture-client-secret' }
  const claims = { ownerId: OWNER_GITHUB_ID, githubAccessToken: 'fixture-token-not-a-credential', accessTokenExpires: Date.now() + 60_000, travelCsrfKey: 'fixture-session-csrf-key-0123456789' }
  const encoded = await encode({ token: claims, secret: testSecret, maxAge: 60 })
  const ownerRequest = (changes = {}) => new Request('https://www.kwanho.dev/api/travel', {
    method: 'POST',
    headers: {
      cookie: `__Secure-next-auth.session-token=${encoded}`,
      origin: 'https://www.kwanho.dev',
      'content-type': 'application/json',
      'x-travel-editor-token': ownerCsrfToken(claims, testSecret),
      ...changes,
    },
  })
  const owner = await travelOwner(ownerRequest(), authEnv)
  assert.equal(owner?.mode, 'github')
  assert.equal(owner?.canWrite, true)
  assert.equal((await travelOwner(ownerRequest({ origin: 'https://elsewhere.example' }), authEnv))?.canWrite, false)
  assert.equal((await travelOwner(ownerRequest({ 'x-travel-editor-token': 'invalid' }), authEnv))?.canWrite, false)
  assert.equal((await travelOwner(ownerRequest({ 'content-type': 'text/plain' }), authEnv))?.canWrite, false)
  assert.equal(await travelOwner(ownerRequest({ cookie: '', authorization: `Bearer ${encoded}` }), authEnv), null)
  const stranger = await encode({ token: { ...claims, ownerId: '42' }, secret: testSecret, maxAge: 60 })
  assert.equal(await travelOwner(ownerRequest({ cookie: `__Secure-next-auth.session-token=${stranger}` }), authEnv), null)
  const expired = await encode({ token: { ...claims, accessTokenExpires: 1 }, secret: testSecret, maxAge: 60 })
  assert.equal(await travelOwner(ownerRequest({ cookie: `__Secure-next-auth.session-token=${expired}` }), authEnv), null)
  const expiredSession = await encode({ token: claims, secret: testSecret, maxAge: -60 })
  assert.equal(await travelOwner(ownerRequest({ cookie: `__Secure-next-auth.session-token=${expiredSession}` }), authEnv), null)
  const wrongKey = await encode({ token: claims, secret: 'other-fixture-secret-not-for-deployment-0123456789', maxAge: 60 })
  assert.equal(await travelOwner(ownerRequest({ cookie: `__Secure-next-auth.session-token=${wrongKey}` }), authEnv), null)
  assert.equal(await travelOwner(ownerRequest(), { ...authEnv, NEXTAUTH_URL: '' }), null)
  const publicSession = await ownerAuthOptions.callbacks.session({ session: { user: {}, expires: 'fixture' }, token: claims })
  assert.ok(!JSON.stringify(publicSession).includes(claims.githubAccessToken))
  assert.ok(!JSON.stringify(publicSession).includes(claims.travelCsrfKey))
  assert.equal(await ownerAuthOptions.callbacks.signIn({ account: { provider: 'github' }, profile: { id: Number(OWNER_GITHUB_ID) } }), true)
  assert.equal(await ownerAuthOptions.callbacks.signIn({ account: { provider: 'github' }, profile: { id: 42 } }), false)
  console.log('owner access: encrypted sessions, owner ID, token expiry, origin/CSRF and session redaction passed')

  let remoteDocument = { version: 1, updatedAt: null, places: [] }
  let remoteSha = 'blob-1'
  let puts = 0, collision = false
  const remote = createGitHubTravelStore('fixture-token-not-a-credential', async (url, options) => {
    assert.ok(String(url).startsWith('https://api.github.com/repos/KKWANH/blog/contents/contents/travel/places.json'))
    if (options.method !== 'PUT') return Response.json({ type: 'file', encoding: 'base64', sha: remoteSha, content: Buffer.from(JSON.stringify(remoteDocument)).toString('base64') })
    puts++
    const body = JSON.parse(options.body)
    assert.equal(body.sha, remoteSha)
    assert.equal(body.branch, 'main')
    if (collision) return Response.json({ message: 'conflict' }, { status: 409 })
    remoteDocument = JSON.parse(Buffer.from(body.content, 'base64').toString('utf8'))
    remoteSha = `blob-${puts + 1}`
    return Response.json({ commit: { sha: 'fixture-commit', html_url: 'https://github.com/KKWANH/blog/commit/fixture' } })
  })
  const remoteInitial = await remote.read()
  const remoteSaved = await remote.create(place, remoteInitial.revision)
  assert.equal(remoteSaved.places.length, 1)
  assert.equal(remoteSaved.publication.commit, 'fixture-commit')
  assert.deepEqual((await remote.read()).places, remoteSaved.places)
  const beforePut = puts
  await assert.rejects(remote.create({ ...place, city: 'Stale input' }, remoteInitial.revision), (error) => error.status === 409)
  assert.equal(puts, beforePut, 'stale content must never reach the repository write')
  collision = true
  await assert.rejects(remote.edit(remoteSaved.places[0].id, { ...place, city: 'Concurrent input' }, remoteSaved.revision), (error) => error.status === 409)
  assert.equal((await remote.read()).revision, travelSnapshot(remoteDocument).revision)
  const unavailable = createGitHubTravelStore('fixture-token-not-a-credential', async () => Response.json({}, { status: 403 }))
  await assert.rejects(unavailable.read(), (error) => error.status === 503)
  const corruptRemote = createGitHubTravelStore('fixture-token-not-a-credential', async () => Response.json({ type: 'file', encoding: 'base64', sha: 'fixture', content: Buffer.from('{broken').toString('base64') }))
  await assert.rejects(corruptRemote.read())
  console.log('repository storage: durable payload, fixed target, revision/remote conflicts and failure handling passed (mock HTTP only)')

  const gallery = JSON.parse(fs.readFileSync(path.join(root, 'contents/photography/photos.json'), 'utf8'))
  assert.equal(typeof gallery.published, 'boolean')
  assert.ok(Array.isArray(gallery.items))
  assert.ok(!gallery.published || gallery.items.length > 0, 'a published gallery needs a collection')
  assert.equal(new Set(gallery.items.map((photo) => photo.id)).size, gallery.items.length)
  for (const photo of gallery.items) {
    for (const key of ['id', 'title', 'alt', 'collection']) assert.ok(typeof photo[key] === 'string' && photo[key].trim())
    for (const key of ['width', 'height']) assert.ok(Number.isInteger(photo[key]) && photo[key] > 0)
    for (const key of ['src', 'thumbnail']) {
      assert.match(photo[key], /^\/photography\/[a-z0-9-]+\.webp$/)
      assert.ok(fs.existsSync(path.join(root, 'public', photo[key].slice(1))))
    }
  }
  console.log('photography: manifest, unique IDs and local image references passed')
} finally {
  fs.rmSync(fixtures, { recursive: true, force: true })
}
