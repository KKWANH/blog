// A quiet window-photo crop replaces the retired K monogram.
// Run with: node scripts/generate-icons.mjs
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const photo = resolve(root, 'public/window-portrait.webp')

const targets = [
  { out: 'app/icon.png', size: 64 },
  { out: 'app/apple-icon.png', size: 180 },   // iOS home-screen icon
  { out: 'public/icon-32x32.png', size: 32 }, // explicit reference fallback
]

for (const { out, size } of targets) {
  const dest = resolve(root, out)
  await sharp(photo)
    .extract({ left: 110, top: 10, width: 400, height: 400 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(dest)
  console.log(`wrote ${out} (${size}x${size})`)
}
