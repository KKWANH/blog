import { parseArgs } from 'node:util'
import { readFile, writeFile, mkdir, rename, unlink, open } from 'node:fs/promises'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'
import sharp from 'sharp'

const { values } = parseArgs({
  options: Object.fromEntries(['file', 'title', 'alt', 'collection', 'date', 'location', 'credit'].map((name) => [name, { type: 'string' }])),
})
if (!values.file || !values.title?.trim() || !values.alt?.trim()) {
  console.error('Usage: npm run photos:add -- --file "photo.jpg" --title "Frame title" --alt "What the photograph shows" --collection "Collection name"')
  process.exitCode = 1
} else {
  const root = resolve(process.env.PHOTO_IMPORT_ROOT ?? join(dirname(fileURLToPath(import.meta.url)), '..'))
  const manifestPath = join(root, 'contents/photography/photos.json')
  const output = join(root, 'public/photography')
  const lockPath = `${manifestPath}.lock`
  const id = `${values.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 42) || 'frame'}-${randomUUID().slice(0, 8)}`
  const largePath = join(output, `${id}.webp`)
  const thumbPath = join(output, `${id}-thumb.webp`)
  const temporary = `${manifestPath}.${id}.tmp`
  let lock, committed = false
  const created = []
  try {
    if (values.title.length > 120 || values.alt.length > 500 || (values.collection?.length ?? 0) > 80) throw new Error('Keep title/collection concise and alt text below 500 characters.')
    if (values.date && (!/^\d{4}-\d{2}-\d{2}$/.test(values.date) || new Date(values.date).toISOString().slice(0, 10) !== values.date)) throw new Error('Use a valid YYYY-MM-DD date.')
    lock = await open(lockPath, 'wx')
    const manifest = JSON.parse((await readFile(manifestPath, 'utf8')).replace(/^\uFEFF/, ''))
    if (!Array.isArray(manifest.items)) throw new Error('The photography manifest must contain an items array.')
    await mkdir(output, { recursive: true })
    const image = sharp(resolve(values.file), { limitInputPixels: 120_000_000 }).rotate().toColourspace('srgb')
    // No keepMetadata(): GPS and other embedded metadata stay out of public derivatives.
    const large = await image.clone().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).webp({ quality: 90 }).toBuffer({ resolveWithObject: true })
    const thumbnail = await image.clone().resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 84 }).toBuffer()
    await writeFile(largePath, large.data, { flag: 'wx' })
    created.push(largePath)
    await writeFile(thumbPath, thumbnail, { flag: 'wx' })
    created.push(thumbPath)
    const photo = {
      id,
      src: `/photography/${id}.webp`,
      thumbnail: `/photography/${id}-thumb.webp`,
      width: large.info.width,
      height: large.info.height,
      title: values.title.trim(),
      alt: values.alt.trim(),
      collection: values.collection?.trim() || 'Photographs',
      ...(values.date ? { date: values.date } : {}),
      ...(values.location?.trim() ? { location: values.location.trim() } : {}),
      ...(values.credit?.trim() ? { credit: values.credit.trim() } : {}),
    }
    const next = { published: true, items: [...manifest.items, photo] }
    await writeFile(temporary, JSON.stringify(next, null, 2) + '\n', { flag: 'wx' })
    created.push(temporary)
    await rename(temporary, manifestPath)
    committed = true
    console.log(`Added ${photo.title}: ${photo.width} × ${photo.height}. Local files are ready for the next publish.`)
  } catch (error) {
    console.error(error?.code === 'EEXIST' ? 'Another photo import may be running. Check the import lock before retrying.' : error.message)
    process.exitCode = 1
  } finally {
    if (!committed) await Promise.all(created.map((file) => unlink(file).catch(() => {})))
    if (lock) { await lock.close(); await unlink(lockPath) }
  }
}
