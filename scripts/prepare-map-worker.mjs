import { copyFileSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(resolve(root, 'package.json'))
const output = resolve(root, 'public')
mkdirSync(output, { recursive: true })
copyFileSync(require.resolve('maplibre-gl/dist/maplibre-gl-worker.mjs'), resolve(output, 'maplibre-worker.mjs'))
copyFileSync(resolve(dirname(require.resolve('maplibre-gl/package.json')), 'LICENSE.txt'), resolve(output, 'maplibre-LICENSE.txt'))
