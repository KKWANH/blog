import fs from 'node:fs'
import type { FileHandle } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'

export class LocalFileLockError extends Error {
  status = 503
  constructor() { super('Private storage is busy. No stale lock was removed automatically.') }
}

// Every local private-state writer holds this interprocess lock from read through
// replacement. A crash leaves a fail-closed lock for explicit owner recovery.
export async function acquireLocalFileLock(file: string, waitMilliseconds = 3000) {
  const lock = `${file}.lock`, token = randomUUID(), deadline = Date.now() + waitMilliseconds
  while (true) {
    let handle: FileHandle
    try { handle = await fs.promises.open(lock, 'wx', 0o600) }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error
      if (Date.now() >= deadline) throw new LocalFileLockError()
      await new Promise((resolve) => setTimeout(resolve, 20))
      continue
    }
    const content = JSON.stringify({ pid: process.pid, token, createdAt: new Date().toISOString() })
    try { await handle.writeFile(content) }
    catch (error) { await handle.close(); await fs.promises.unlink(lock).catch(() => {}); throw error }
    let released = false
    return async () => {
      if (released) return
      released = true
      await handle.close()
      const current = await fs.promises.readFile(lock, 'utf8').catch(() => null)
      if (current !== content) throw new LocalFileLockError()
      await fs.promises.unlink(lock)
    }
  }
}
