import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const port = process.env.TRAVEL_EDITOR_PORT ?? '3100'
if (!/^\d+$/.test(port) || Number(port) < 1024 || Number(port) > 65535) throw new Error('Choose a local editor port between 1024 and 65535.')
const child = spawn(process.execPath, [
  path.join(root, 'node_modules/next/dist/bin/next'), 'dev',
  '--hostname', '127.0.0.1', '--port', port,
], {
  cwd: root,
  env: { ...process.env, TRAVEL_EDITOR_ENABLED: '1' },
  stdio: 'inherit',
})
child.on('exit', (code) => { process.exitCode = code ?? 0 })
child.on('error', (error) => { console.error(error.message); process.exitCode = 1 })
process.on('SIGINT', () => child.kill('SIGINT'))
process.on('SIGTERM', () => child.kill('SIGTERM'))
