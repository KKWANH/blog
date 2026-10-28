import { applySkillPatch, skillSnapshot, SkillStoreError } from '@/lib/skill-data'
import { skillProfileSchema } from '@/lib/skill-validation'
import type { SkillPatch } from '@/lib/skill-preferences'

const endpoint = 'https://api.github.com/repos/KKWANH/blog/contents/contents/about/skill-profile.json'
const branch = 'main'

export function createGitHubSkillStore(accessToken: string, request: typeof fetch = fetch) {
  const headers = { Authorization: `Bearer ${accessToken}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'kwanho-skill-editor' }
  async function current() {
    const response = await request(`${endpoint}?ref=${branch}`, { headers, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(12_000) })
    if (!response.ok) throw new SkillStoreError('GitHub could not read the skill settings. Check app installation and repository access.', 503)
    const data = await response.json()
    if (data.type !== 'file' || data.encoding !== 'base64' || typeof data.sha !== 'string' || typeof data.content !== 'string') throw new SkillStoreError('The saved skill settings could not be read. No changes were made.', 503)
    return { profile: skillProfileSchema.parse(JSON.parse(Buffer.from(data.content, 'base64').toString('utf8').replace(/^\uFEFF/, ''))), sha: data.sha }
  }
  async function save(revision: string, patch: SkillPatch) {
    const before = await current(), profile = applySkillPatch(before.profile, revision, patch)
    if (profile === before.profile) return skillSnapshot(profile)
    const content = JSON.stringify(profile, null, 2) + '\n'
    if (Buffer.byteLength(content) > 128_000) throw new SkillStoreError('The skill settings are too large.', 413)
    const response = await request(endpoint, {
      method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' }, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({ message: 'Update skill familiarity and visibility', content: Buffer.from(content).toString('base64'), sha: before.sha, branch }),
    })
    if (response.status === 409 || response.status === 422) throw new SkillStoreError('Skill settings changed while saving. Reload before continuing.', 409)
    if (response.status === 401 || response.status === 403) throw new SkillStoreError('GitHub did not allow this change. Check Contents permission and sign in again.', 403)
    if (!response.ok) throw new SkillStoreError('The save could not be confirmed. Reload before retrying.', 503)
    const saved = await response.json()
    return { ...skillSnapshot(profile), publication: { commit: saved.commit?.sha, url: saved.commit?.html_url } }
  }
  return { read: async () => skillSnapshot((await current()).profile), save }
}
