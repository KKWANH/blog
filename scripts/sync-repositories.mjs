import fs from 'node:fs'
import path from 'node:path'
import { createHash, randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'
import { ensureRepositoryIndex } from './build-repository-index.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const owner = 'KKWANH'
const generatedFile = path.join(root, 'contents/about/repositories.generated.json')
const preferenceFile = path.join(root, 'contents/about/skill-profile.json')
const definitionFile = path.join(root, 'contents/about/skill-definitions.json')
const overrideFile = path.join(root, 'contents/about/repository-overrides.json')
const hash = (value) => createHash('sha256').update(value).digest('hex')
const aliases = { qml: 'qt', sockets: 'http', posix: 'processes', pthreads: 'threads' }
const definitions = {
  c: ['C', 'languages'], cpp: ['C++', 'languages'], python: ['Python', 'languages'],
  javascript: ['JavaScript', 'web'], typescript: ['TypeScript', 'web'], csharp: ['C#', 'languages'],
  java: ['Java', 'languages'], shell: ['Shell', 'languages'], asm: ['x86-64 ASM', 'languages'],
  rust: ['Rust', 'languages'], go: ['Go', 'languages'], html: ['HTML', 'web'], css: ['CSS', 'web'],
  php: ['PHP', 'web'], react: ['React', 'web'], nextjs: ['Next.js', 'web'],
  vue: ['Vue', 'web'], svelte: ['Svelte', 'web'], angular: ['Angular', 'web'],
  django: ['Django', 'web'], flask: ['Flask', 'web'], fastify: ['Fastify', 'web'],
  express: ['Express', 'web'], nestjs: ['NestJS', 'web'], tailwind: ['Tailwind CSS', 'web'],
  vite: ['Vite', 'tools'], motion: ['Motion', 'web'], threejs: ['Three.js', 'web'],
  supabase: ['Supabase', 'tools'], postgres: ['PostgreSQL', 'tools'], sqlite: ['SQLite', 'tools'],
  prisma: ['Prisma', 'tools'], redis: ['Redis', 'tools'], qt: ['Qt / QML', 'web'],
  unity: ['Unity', 'design'], docker: ['Docker', 'tools'], compose: ['Docker Compose', 'tools'],
  nginx: ['NGINX', 'tools'], mariadb: ['MariaDB', 'tools'], mysql: ['MySQL', 'tools'],
  wordpress: ['WordPress', 'web'], linux: ['Linux', 'tools'], make: ['Make', 'tools'],
  qmake: ['qmake', 'tools'], cmake: ['CMake', 'tools'], git: ['Git', 'tools'],
  'github-actions': ['GitHub Actions', 'tools'], azure: ['Azure', 'tools'], bicep: ['Bicep', 'tools'],
  numpy: ['NumPy', 'data'], pandas: ['Pandas', 'data'], matplotlib: ['Matplotlib', 'data'],
  sklearn: ['scikit-learn', 'data'], mne: ['MNE', 'data'], scipy: ['SciPy', 'data'],
  torch: ['PyTorch', 'data'], tensorflow: ['TensorFlow', 'data'], opencv: ['OpenCV', 'data'],
  pillow: ['Pillow', 'data'], jupyter: ['Jupyter', 'data'], pygame: ['Pygame', 'design'],
  playwright: ['Playwright', 'tools'], vitest: ['Vitest', 'tools'], jest: ['Jest', 'tools'],
  dbus: ['D-Bus', 'systems'], can: ['CAN bus', 'systems'], ros: ['ROS', 'systems'],
  carla: ['CARLA', 'systems'], gazebo: ['Gazebo', 'systems'], websocket: ['WebSocket', 'systems'],
  rest: ['REST', 'systems'], http: ['HTTP / sockets', 'systems'], threads: ['Threads & mutexes', 'systems'],
  processes: ['Unix processes', 'systems'], raspberrypi: ['Raspberry Pi', 'systems'],
  arduino: ['Arduino', 'systems'], bootstrap: ['Bootstrap', 'web'], zod: ['Zod', 'web'],
  zustand: ['Zustand', 'web'], electron: ['Electron', 'tools'], ollama: ['Ollama', 'tools'],
  maplibre: ['MapLibre', 'web'], gunicorn: ['Gunicorn', 'tools'],
}
const extensions = {
  '.c': 'c', '.cpp': 'cpp', '.cc': 'cpp', '.cxx': 'cpp', '.hpp': 'cpp', '.py': 'python',
  '.js': 'javascript', '.jsx': 'javascript', '.ts': 'typescript', '.tsx': 'typescript',
  '.cs': 'csharp', '.java': 'java', '.sh': 'shell', '.s': 'asm', '.asm': 'asm',
  '.rs': 'rust', '.go': 'go', '.html': 'html', '.css': 'css', '.php': 'php',
  '.qml': 'qt', '.bicep': 'bicep', '.ipynb': 'jupyter',
}
const packages = {
  react: 'react', 'react-dom': 'react', next: 'nextjs', typescript: 'typescript', vue: 'vue', svelte: 'svelte',
  express: 'express', fastify: 'fastify', django: 'django', flask: 'flask', vite: 'vite',
  tailwindcss: 'tailwind', 'framer-motion': 'motion', motion: 'motion', three: 'threejs',
  pg: 'postgres', postgres: 'postgres', 'psycopg2-binary': 'postgres', psycopg2: 'postgres',
  'better-sqlite3': 'sqlite', sqlite3: 'sqlite', prisma: 'prisma', '@prisma/client': 'prisma',
  redis: 'redis', ioredis: 'redis', numpy: 'numpy', pandas: 'pandas', matplotlib: 'matplotlib',
  'scikit-learn': 'sklearn', sklearn: 'sklearn', mne: 'mne', scipy: 'scipy',
  torch: 'torch', torchvision: 'torch', tensorflow: 'tensorflow', 'opencv-python': 'opencv',
  pillow: 'pillow', pygame: 'pygame', 'python-can': 'can', 'dbus-python': 'dbus',
  pyqt5: 'qt', pyqt6: 'qt', pyside6: 'qt', playwright: 'playwright', '@playwright/test': 'playwright',
  vitest: 'vitest', jest: 'jest', bootstrap: 'bootstrap', 'django-bootstrap3': 'bootstrap',
  'django-bootstrap4': 'bootstrap', zod: 'zod', zustand: 'zustand', electron: 'electron',
  'maplibre-gl': 'maplibre', gunicorn: 'gunicorn',
}
const signals = {
  qt: /\bQt(?:Quick|Widgets|Gui|Qml|5|6)?\b|QGuiApplication|QQmlApplication/,
  dbus: /\bD-?Bus\b|QDBus/i, can: /\bCAN\b|socketcan|python-can/,
  ros: /\bROS\s*[12]?\b|\brospy\b|\brclpy\b/, carla: /\bCARLA\b/, gazebo: /\bGazebo\b/i,
  websocket: /\bWebSockets?\b/i, rest: /\bREST(?:ful)?\b/,
  http: /\bsocket\s*\(|\bSOCK_STREAM\b/, threads: /\bpthread_(?:create|mutex|join)/,
  processes: /\b(?:fork|execve|dup2|pipe)\s*\(/, unity: /\bUnityEngine\b|\bUnity\s*3D\b/,
  docker: /\bDocker\b/i, compose: /docker[- ]compose/i, nginx: /\bNGINX\b/i,
  mariadb: /\bMariaDB\b/i, mysql: /\bMySQL\b/i, wordpress: /\bWordPress\b/i,
  linux: /\b(?:Linux|Ubuntu|Debian|Alpine)\b/, qmake: /\bqmake\b/, cmake: /\bCMake\b/i,
  azure: /\bAzure\b|Microsoft\.(?:Web|Storage|Sql|Resources)/,
  raspberrypi: /\bRaspberry\s*Pi\b|\bRPi\b/, arduino: /\bArduino\b/,
  numpy: /\bnumpy\b/i, pandas: /\bpandas\b/i, matplotlib: /\bmatplotlib\b/i,
  sklearn: /\bscikit-learn\b|\bsklearn\b/i, mne: /\bMNE\b/,
  torch: /\bPyTorch\b|\bimport\s+torch\b/, tensorflow: /\bTensorFlow\b/,
  opencv: /\bOpenCV\b|\bimport\s+cv2\b/, ollama: /\bOllama\b/i,
}
const excluded = (file) => /(?:^|\/)(?:node_modules|vendor|Library|PackageCache|obj|bin|dist|build|cgiBinary|\.git)(?:\/|$)/i.test(file) || /(?:^|\/)(?:\.env|credentials|secrets|private\.key)/i.test(file)
const encodedPath = (value) => value.split('/').map(encodeURIComponent).join('/')
const overrideSchema = z.object({
  version: z.literal(1),
  repositories: z.record(z.string().regex(/^[A-Za-z0-9_.-]+$/), z.object({
    scope: z.enum(['project', 'learning', 'reference', 'ai-directed', 'profile', 'empty']).optional(),
    scopeNote: z.string().max(500).optional(),
    reviewedCommit: z.string().regex(/^[a-f0-9]{40}$/).optional(),
    technologies: z.array(z.object({
      id: z.string().regex(/^[a-z][a-z0-9-]{0,63}$/), label: z.string().min(1).max(80),
      group: z.string().regex(/^[a-z][a-z0-9-]{0,63}$/),
      evidence: z.array(z.object({ path: z.string().min(1).max(500), basis: z.string().min(1).max(250) }).strict()).max(10),
    }).strict()).max(200).optional(),
  }).strict()),
}).strict()

export function validateRepositoryOverrides(value) {
  return overrideSchema.parse(value)
}

export function detectRepositoryTechnologies(files, sources, known = {}) {
  const found = new Map()
  function add(rawId, file, basis) {
    const id = aliases[rawId] ?? rawId, definition = definitions[id] ?? known[id]
    if (!definition) return
    const item = found.get(id) ?? { id, label: definition[0], group: definition[1], evidence: [] }
    if (item.evidence.length < 3 && !item.evidence.some((entry) => entry.path === file && entry.basis === basis)) item.evidence.push({ path: file, basis })
    found.set(id, item)
  }
  for (const file of files.filter((entry) => !excluded(entry))) {
    const extension = path.posix.extname(file).toLowerCase(), name = path.posix.basename(file).toLowerCase()
    if (extensions[extension]) add(extensions[extension], file, 'source-file presence')
    if (name === 'makefile') add('make', file, 'build file')
    if (name === 'cmakelists.txt') add('cmake', file, 'build file')
    if (extension === '.pro') add('qmake', file, 'build file')
    if (name === 'dockerfile') add('docker', file, 'container configuration')
    if (/^(?:docker-compose|compose)\.ya?ml$/.test(name)) add('compose', file, 'service configuration')
    if (file.startsWith('.github/workflows/')) add('github-actions', file, 'workflow file')
  }
  for (const source of sources) {
    const name = path.posix.basename(source.path).toLowerCase(), text = source.text
    if (name === 'package.json') {
      try {
        const manifest = JSON.parse(text)
        for (const dependency of [...Object.keys(manifest.dependencies ?? {}), ...Object.keys(manifest.devDependencies ?? {})]) {
          if (packages[dependency]) add(packages[dependency], source.path, 'direct dependency')
          if (dependency.startsWith('@supabase/')) add('supabase', source.path, 'direct dependency')
          if (dependency.startsWith('@nestjs/')) add('nestjs', source.path, 'direct dependency')
          if (dependency.startsWith('@angular/')) add('angular', source.path, 'direct dependency')
        }
      } catch { /* A malformed manifest is reported by the source review, not executed. */ }
    }
    if (/requir|pyproject|pipfile|setup\.cfg|environment\.ya?ml|(?:setup|install)\.sh/.test(name)) {
      for (const [dependency, id] of Object.entries(packages)) {
        const escaped = dependency.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        if (new RegExp(`(?<![a-z0-9_-])${escaped}(?![a-z0-9_-])`, 'i').test(text)) add(id, source.path, 'declared dependency')
      }
    }
    for (const [id, pattern] of Object.entries(signals)) if (pattern.test(text)) add(id, source.path, name.startsWith('readme') ? 'README declaration' : 'inspected configuration/source')
  }
  return [...found.values()].sort((a, b) => a.label.localeCompare(b.label))
}

function sourceCandidates(files) {
  const clean = files.filter((file) => !excluded(file))
  const depth = (a, b) => a.split('/').length - b.split('/').length || a.length - b.length
  const readme = clean.filter((file) => /(?:^|\/)readme(?:\.md|\.rst|\.txt)?$/i.test(file)).sort(depth).slice(0, 1)
  const manifests = clean.filter((file) => /(?:^|\/)(?:package\.json|requir[^/]*|pyproject\.toml|pipfile|setup\.cfg|environment\.ya?ml|CMakeLists\.txt|Makefile|Dockerfile|(?:docker-compose|compose)\.ya?ml|(?:setup|install)\.sh)$/i.test(file) || /\.pro$/.test(file)).sort(depth).slice(0, 12)
  const code = clean.filter((file) => /\.(?:c|cpp|hpp|cs|java|qml|s)$/.test(file) && !/test|example/i.test(file)).sort(depth).slice(0, 2)
  return [...new Set([...readme, ...manifests, ...code])]
}

export async function synchronizeRepositories({ previous, overrides, request = fetch, token, now = new Date().toISOString(), force = false }) {
  const apiHeaders = { Accept: 'application/vnd.github+json', 'User-Agent': 'kwanho-repository-sync', ...(token ? { Authorization: `Bearer ${token}` } : {}) }
  async function api(url) {
    const response = await request(url, { headers: apiHeaders, redirect: 'error', signal: AbortSignal.timeout(20_000) })
    if (!response.ok) {
      const reset = response.headers.get('x-ratelimit-reset')
      throw new Error(`GitHub read failed (${response.status})${reset ? `; rate-limit reset ${reset}` : ''}. Generated data was not written.`)
    }
    return response.json()
  }
  const inventory = []
  for (let page = 1; page <= 50; page++) {
    const batch = await api(`https://api.github.com/users/${owner}/repos?type=owner&sort=updated&per_page=100&page=${page}`)
    if (!Array.isArray(batch)) throw new Error('Unexpected repository inventory response.')
    inventory.push(...batch)
    if (batch.length < 100) break
    if (page === 50) throw new Error('Repository pagination limit reached; no partial inventory will be written.')
  }
  const known = Object.fromEntries(previous.repositories.flatMap((repo) => repo.technologies.map((tech) => [tech.id, [tech.label, tech.group]])))
  const report = { added: [], changed: [], removed: [], reused: [], annotationChanges: [], needsReview: [] }
  const repositories = []
  for (const repo of inventory) {
    if (!/^[A-Za-z0-9_.-]+$/.test(repo.name) || repo.owner?.login?.toLowerCase() !== owner.toLowerCase()) throw new Error('Unexpected repository identity.')
    const old = previous.repositories.find((entry) => entry.name === repo.name)
    const override = overrides.repositories?.[repo.name] ?? {}
    if (old && !force && old.updatedAt === repo.pushed_at) {
      const technologies = new Map(old.technologies.map((tech) => [tech.id, tech]))
      for (const tech of override.technologies ?? []) technologies.set(tech.id, tech)
      const merged = { ...old, scope: override.scope ?? old.scope, scopeNote: override.scopeNote ?? old.scopeNote, technologies: [...technologies.values()], status: override.reviewedCommit === old.commit ? 'reviewed' : old.status, defaultBranch: repo.default_branch }
      if (JSON.stringify({ ...old, defaultBranch: repo.default_branch }) !== JSON.stringify(merged)) report.annotationChanges.push(repo.name)
      repositories.push(merged)
      report.reused.push(repo.name)
      continue
    }
    const scope = override.scope ?? old?.scope ?? (repo.fork ? 'reference' : repo.size === 0 ? 'empty' : /^(?:42|SEAME|DES|CPP_|azure-)/.test(repo.name) ? 'learning' : 'project')
    if (repo.size === 0) {
      repositories.push({ name: repo.name, url: repo.html_url, description: repo.description ?? '', scope: 'empty', scopeNote: 'Empty repository.', status: 'empty', commit: null, updatedAt: repo.pushed_at, defaultBranch: repo.default_branch, sources: [], limitations: [], technologies: [] })
      ;(old ? report.changed : report.added).push(repo.name)
      continue
    }
    const commit = await api(`https://api.github.com/repos/${owner}/${repo.name}/commits/${encodeURIComponent(repo.default_branch)}`)
    if (!/^[a-f0-9]{40}$/.test(commit.sha)) throw new Error('GitHub did not provide a pinned commit.')
    const recursive = !(repo.fork && repo.size > 10_000)
    const tree = await api(`https://api.github.com/repos/${owner}/${repo.name}/git/trees/${commit.sha}${recursive ? '?recursive=1' : ''}`)
    const files = (tree.tree ?? []).filter((entry) => entry.type === 'blob' && !entry.path.split('/').includes('..')).map((entry) => entry.path)
    const sources = [], limitations = ['Automatically synchronized source; contribution/technology changes need review.']
    if (tree.truncated) limitations.push('GitHub returned a truncated tree.')
    if (files.some((file) => file.endsWith('.py'))) limitations.push('Raw Python source is not downloaded by this sync; accessible manifests and documentation provide dependency evidence.')
    for (const file of sourceCandidates(files)) {
      const url = `https://raw.githubusercontent.com/${owner}/${repo.name}/${commit.sha}/${encodedPath(file)}`
      const response = await request(url, { headers: { 'User-Agent': 'kwanho-repository-sync' }, redirect: 'error', signal: AbortSignal.timeout(15_000) })
      if (response.status === 429 || response.status >= 500) throw new Error(`Source service unavailable (${response.status}). Generated data was not written.`)
      if (!response.ok) { limitations.push(`${file}: source unavailable (${response.status}).`); continue }
      const text = await response.text()
      if (text.length > 350_000) { limitations.push(`${file}: omitted from the bounded text review.`); continue }
      sources.push({ path: file, url: `https://github.com/${owner}/${repo.name}/blob/${commit.sha}/${encodedPath(file)}`, text })
    }
    const technologies = detectRepositoryTechnologies(files, sources, known)
    const merged = new Map(technologies.map((tech) => [tech.id, tech]))
    for (const tech of override.technologies ?? []) merged.set(tech.id, tech)
    repositories.push({
      name: repo.name, url: repo.html_url, description: repo.description ?? '', scope,
      scopeNote: override.scopeNote ?? old?.scopeNote ?? 'Repository stack; personal implementation/proficiency is not inferred.',
      status: override.reviewedCommit === commit.sha ? 'reviewed' : 'needs-review',
      commit: commit.sha, lastReviewedCommit: old?.status !== 'needs-review' ? old?.commit ?? null : old.lastReviewedCommit ?? null,
      updatedAt: repo.pushed_at, defaultBranch: repo.default_branch,
      sources: sources.map(({ path, url }) => ({ path, url })), limitations, technologies: [...merged.values()],
    })
    ;(old ? report.changed : report.added).push(repo.name)
    if (override.reviewedCommit !== commit.sha) report.needsReview.push(repo.name)
  }
  const names = new Set(repositories.map((repo) => repo.name))
  report.removed = previous.repositories.filter((repo) => !names.has(repo.name)).map((repo) => repo.name)
  const next = { reviewedAt: previous.reviewedAt, syncedAt: now, count: repositories.length, inspectedFiles: repositories.reduce((count, repo) => count + repo.sources.length, 0), repositories }
  return { catalogue: next, report }
}

export async function writeCatalogueAtomically(file, contents, expectedHash) {
  if (hash(await fs.promises.readFile(file)) !== expectedHash) throw new Error('The generated catalogue changed during sync. No file was overwritten.')
  const temporary = `${file}.${randomUUID()}.tmp`
  try {
    await fs.promises.writeFile(temporary, contents, { flag: 'wx' })
    if (hash(await fs.promises.readFile(file)) !== expectedHash) throw new Error('The generated catalogue changed during sync. No file was overwritten.')
    await fs.promises.rename(temporary, file)
  } finally {
    await fs.promises.unlink(temporary).catch((error) => { if (error.code !== 'ENOENT') throw error })
  }
}

async function main() {
  const args = new Set(process.argv.slice(2)), check = args.has('--check'), dry = check || args.has('--dry-run')
  const original = fs.readFileSync(generatedFile), previous = JSON.parse(original.toString('utf8'))
  const stale = [...args].find((arg) => arg.startsWith('--if-stale='))
  if (stale) {
    const hours = Number(stale.split('=')[1])
    if (!Number.isFinite(hours) || hours < 0) throw new Error('Use --if-stale=<hours>.')
    if (Date.now() - Date.parse(previous.syncedAt ?? previous.reviewedAt) < hours * 3_600_000) {
      console.log(JSON.stringify({ skipped: 'recent snapshot', syncedAt: previous.syncedAt ?? previous.reviewedAt }))
      return
    }
  }
  const preserved = new Map([preferenceFile, definitionFile, overrideFile].map((file) => [file, hash(fs.readFileSync(file))]))
  const overrides = validateRepositoryOverrides(JSON.parse(fs.readFileSync(overrideFile, 'utf8')))
  const { catalogue, report } = await synchronizeRepositories({ previous, overrides, token: process.env.GITHUB_READ_TOKEN, force: args.has('--force') })
  for (const [file, digest] of preserved) if (hash(fs.readFileSync(file)) !== digest) throw new Error('Owner/curated files changed during sync. Review the concurrent edit before publishing.')
  const changed = report.added.length + report.changed.length + report.removed.length + report.annotationChanges.length
  if (!dry) {
    await writeCatalogueAtomically(generatedFile, JSON.stringify(catalogue, null, 2) + '\n', hash(original))
    ensureRepositoryIndex()
  }
  console.log(JSON.stringify({ ...report, repositoryCount: catalogue.count, changeCount: changed, written: !dry, preferencesPreserved: true }, null, 2))
  if (check && changed) process.exitCode = 1
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : 'Repository sync failed.')
    console.error('No familiarity/visibility settings are written by sync. TLS verification remains enabled.')
    process.exitCode = 1
  })
}
