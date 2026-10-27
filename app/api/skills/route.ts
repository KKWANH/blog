import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { skillOwner } from '@/lib/skill-owner'
import { skillStore } from '@/lib/skill-store'
import { SkillStoreError } from '@/lib/skill-data'
import { skillPatchSchema } from '@/lib/skill-preferences'
import { ownerAuthConfigured } from '@/lib/owner-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }
const json = (body: unknown, status = 200) => Response.json(body, { status, headers })
const saveSchema = z.object({ revision: z.string().regex(/^[a-f0-9]{64}$/), changes: skillPatchSchema }).strict()

export async function GET(request: Request) {
  try {
    const owner = await skillOwner(request)
    return json({
      ...(owner ? await owner.store.read() : skillStore().read()),
      editor: owner ? { mode: owner.mode, token: owner.token } : null,
      ownerSignInAvailable: ownerAuthConfigured(),
    })
  } catch {
    return json({ error: 'Skill settings could not be loaded. The saved file was not replaced.', editor: null, ownerSignInAvailable: ownerAuthConfigured() }, 500)
  }
}

export async function POST(request: Request) {
  const owner = await skillOwner(request)
  if (!owner?.canWrite) return json({ error: 'Owner access is required. Sign in again if your session expired.' }, 403)
  try {
    const raw = await request.text()
    if (raw.length > 65_536) return json({ error: 'This request is too large.' }, 413)
    let body: unknown
    try { body = JSON.parse(raw) } catch { return json({ error: 'Send valid JSON skill settings.' }, 400) }
    const input = saveSchema.parse(body)
    const saved = await owner.store.save(input.revision, input.changes)
    try { revalidatePath('/about') } catch { /* The saved snapshot is authoritative even if revalidation is unavailable. */ }
    return json(saved)
  } catch (error) {
    if (error instanceof z.ZodError) return json({ error: 'Check the skill IDs, familiarity levels and visibility values.' }, 422)
    if (error instanceof SkillStoreError) return json({ error: error.message }, error.status)
    return json({ error: 'The save could not be confirmed. Reload before trying again.' }, 500)
  }
}
