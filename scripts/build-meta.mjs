import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export function getBuildMeta() {
  let commit = 'HEAD'
  let dateStr = new Date().toISOString()
  try {
    commit = execSync('git rev-parse --short HEAD', { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    dateStr = execSync('git log -1 --format=%cI', { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    // Fallback if git is not accessible in environment
  }
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const formattedDate = `${year}. ${month}. ${day}`
  const formattedDateTime = `${year}. ${month}. ${day} ${hours}:${minutes}`
  return {
    commit,
    timestamp: dateStr,
    lastUpdated: formattedDate,
    lastUpdatedTime: formattedDateTime,
  }
}

export function ensureBuildMeta() {
  const meta = getBuildMeta()
  const file = path.join(root, 'contents/build-meta.json')
  const content = JSON.stringify(meta, null, 2) + '\n'
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === content) return false
  fs.writeFileSync(file, content, 'utf8')
  return true
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  ensureBuildMeta()
  console.log('Build metadata updated.')
}
