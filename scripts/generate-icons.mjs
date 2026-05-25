// Generate PNG icon variants from app/icon.svg using sharp.
// Run with: node scripts/generate-icons.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const svgPath = resolve(root, 'app/icon.svg')
const svg = readFileSync(svgPath)

const targets = [
  { out: 'app/icon.png', size: 64 },          // PNG fallback for browsers that don't pick up icon.svg
  { out: 'app/apple-icon.png', size: 180 },   // iOS home-screen icon
  { out: 'public/icon-32x32.png', size: 32 }, // explicit reference fallback
]

for (const { out, size } of targets) {
  const dest = resolve(root, out)
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(dest)
  console.log(`wrote ${out} (${size}x${size})`)
}
