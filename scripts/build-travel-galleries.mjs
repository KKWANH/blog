import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Travel galleries are folders of originals: contents/photography/travel/<place-id>/.
// Originals stay out of git (they can carry GPS metadata); only metadata-free WebP
// derivatives in public/photography/travel/<place-id>/ and the manifest are published.
const root = path.resolve(process.env.PHOTO_IMPORT_ROOT ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'))
const sourceRoot = path.join(root, 'contents/photography/travel')
const outputRoot = path.join(root, 'public/photography/travel')
const manifestPath = path.join(root, 'contents/photography/travel-galleries.json')
const placesPath = path.join(root, 'contents/travel/places.json')
const IMAGE = /\.(?:jpe?g|png|webp|avif|tiff?|heic|heif)$/i
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const slugify = (value) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'frame'
const readJson = (file, fallback) => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8').replace(/^﻿/, '')) : fallback
const text = (value, max) => typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : undefined
const dateText = (value) => typeof value === 'string' && /^\d{4}(?:-\d{2}){0,2}$/.test(value) ? value : undefined
const isStale = (source, target) => !fs.existsSync(target) || fs.statSync(source).mtimeMs > fs.statSync(target).mtimeMs

async function buildFolder(sharp, folder, places, warn) {
  const directory = path.join(sourceRoot, folder)
  const meta = readJson(path.join(directory, 'gallery.json'), {})
  const placeId = text(meta.place, 120) ?? folder
  const place = places.get(placeId)
  if (!place) warn(`${folder}: no travel place "${placeId}" — the gallery shows on /photography but not on the map.`)
  const location = place ? `${place.city}, ${place.country}` : undefined
  const title = text(meta.title, 120) ?? location ?? folder
  const date = dateText(meta.date)
  const captions = meta.photos && typeof meta.photos === 'object' ? meta.photos : {}
  const originals = fs.readdirSync(directory).filter((name) => IMAGE.test(name) && !name.startsWith('.'))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
  if (!originals.length) return null

  const output = path.join(outputRoot, folder)
  fs.mkdirSync(output, { recursive: true })
  const used = new Set(), keep = new Set(), photos = []
  for (const name of originals) {
    let base = slugify(name.replace(/\.[^.]+$/, ''))
    while (used.has(base)) base = `${base}-${used.size}`
    used.add(base)
    const source = path.join(directory, name), large = path.join(output, `${base}.webp`), thumb = path.join(output, `${base}-thumb.webp`)
    keep.add(path.basename(large)).add(path.basename(thumb))
    if (isStale(source, large) || isStale(source, thumb)) {
      // No keepMetadata(): EXIF, GPS and camera serials never reach the public derivatives.
      const image = sharp(source, { limitInputPixels: 120_000_000 }).rotate().toColourspace('srgb')
      await image.clone().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).webp({ quality: 86 }).toFile(large)
      await image.clone().resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(thumb)
    }
    const { width, height } = await sharp(large).metadata()
    const caption = captions[name] && typeof captions[name] === 'object' ? captions[name] : {}
    const alt = text(caption.alt, 500)
    if (!alt) warn(`${folder}/${name}: add "alt" in gallery.json — using a generic description for now.`)
    photos.push({
      id: `${folder}-${base}`,
      src: `/photography/travel/${folder}/${base}.webp`,
      thumbnail: `/photography/travel/${folder}/${base}-thumb.webp`,
      width, height,
      title: text(caption.title, 120) ?? `${title}, frame ${photos.length + 1}`,
      alt: alt ?? `Photograph from ${location ?? title}`,
      collection: title,
      ...(dateText(caption.date) ?? date ? { date: dateText(caption.date) ?? date } : {}),
      ...(location ? { location } : {}),
    })
  }
  for (const name of fs.readdirSync(output)) if (!keep.has(name)) fs.rmSync(path.join(output, name), { force: true })
  const cover = photos.find((photo) => photo.id === `${folder}-${slugify(String(meta.cover ?? '').replace(/\.[^.]+$/, ''))}`) ?? photos[0]
  return { id: folder, place: placeId, title, ...(date ? { date } : {}), ...(text(meta.summary, 280) ? { summary: text(meta.summary, 280) } : {}), cover: cover.id, photos }
}

export async function ensureTravelGalleries({ warn = (message) => console.warn(`travel galleries: ${message}`) } = {}) {
  const folders = fs.existsSync(sourceRoot)
    ? fs.readdirSync(sourceRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory() && !/^[._]/.test(entry.name)).map((entry) => entry.name)
    : []
  const previous = readJson(manifestPath, { version: 1, galleries: [] })
  const places = new Map(readJson(placesPath, { places: [] }).places.map((place) => [place.id, place]))
  const galleries = new Map()
  // A clone without the git-ignored originals keeps the published galleries as they are.
  for (const gallery of previous.galleries ?? []) {
    if (gallery.photos?.every((photo) => fs.existsSync(path.join(root, 'public', photo.src.slice(1))))) galleries.set(gallery.id, gallery)
  }
  const pending = folders.filter((folder) => {
    if (SLUG.test(folder)) return true
    warn(`${folder}: rename the folder to lowercase letters, digits and hyphens (for example the travel place id).`)
    return false
  })
  if (pending.length) {
    let sharp
    try { sharp = (await import('sharp')).default } catch {
      warn('sharp is unavailable, so new photos were not converted.')
      return false
    }
    for (const folder of pending) {
      const gallery = await buildFolder(sharp, folder, places, warn)
      if (gallery) galleries.set(folder, gallery)
    }
  }
  const sorted = [...galleries.values()].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '') || a.title.localeCompare(b.title, 'en'))
  const output = JSON.stringify({ version: 1, galleries: sorted }, null, 2) + '\n'
  if (fs.existsSync(manifestPath) && fs.readFileSync(manifestPath, 'utf8') === output) return false
  const temporary = `${manifestPath}.${process.pid}.tmp`
  fs.writeFileSync(temporary, output)
  fs.renameSync(temporary, manifestPath)
  return true
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  ensureTravelGalleries().then((changed) => {
    const { galleries } = readJson(manifestPath, { galleries: [] })
    console.log(`${changed ? 'Travel galleries updated' : 'Travel galleries current'}: ${galleries.length} folder${galleries.length === 1 ? '' : 's'}, ${galleries.reduce((sum, gallery) => sum + gallery.photos.length, 0)} photographs.`)
  }).catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
