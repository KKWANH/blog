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
