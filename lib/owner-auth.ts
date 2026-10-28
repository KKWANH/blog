import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { siteUrl } from '@/lib/site'
import { issueOwnerSession, ownerSessionStorageConfigured, revokeOwnerSession } from '@/lib/owner-session'

export const OWNER_GITHUB_ID = '35485904'
export const OWNER_GITHUB_LOGIN = 'KKWANH'

export function ownerOrigin(env: NodeJS.ProcessEnv = process.env) {
  try { return new URL(env.NEXTAUTH_URL ?? siteUrl).origin } catch { return null }
}

export function ownerAuthConfigured(env: NodeJS.ProcessEnv = process.env) {
  const origin = ownerOrigin(env)
  return Boolean(
    env.GITHUB_ID?.trim() && env.GITHUB_SECRET?.trim() && env.NEXTAUTH_URL?.trim() &&
    env.NEXTAUTH_SECRET && env.NEXTAUTH_SECRET.trim().length >= 32 &&
    origin && (env.NODE_ENV !== 'production' || origin.startsWith('https://')) && ownerSessionStorageConfigured(env),
  )
}

export const ownerAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 60 * 60 },
  jwt: { maxAge: 60 * 60 },
  useSecureCookies: ownerOrigin()?.startsWith('https://') ?? true,
  pages: { signIn: '/travel/manage', error: '/travel/manage' },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      // A GitHub App's installed repository permissions govern access, not broad OAuth repo scopes.
      authorization: { url: 'https://github.com/login/oauth/authorize', params: { scope: '' } },
      checks: ['pkce', 'state'],
      userinfo: {
        url: 'https://api.github.com/user',
        async request({ tokens }) {
          const response = await fetch('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${tokens.access_token}`, Accept: 'application/vnd.github+json' },
            cache: 'no-store',
            signal: AbortSignal.timeout(12_000),
          })
          if (!response.ok) throw new Error('GitHub identity could not be verified.')
          return response.json()
        },
      },
    }),
  ],
  events: { async signOut(message) { if ('token' in message) await revokeOwnerSession(message.token ?? null) } },
  callbacks: {
    async signIn({ account, profile }) {
      return account?.provider === 'github' && String((profile as { id?: number } | undefined)?.id) === OWNER_GITHUB_ID
    },
    async jwt({ token, account, profile }) {
      if (account) {
        if (String((profile as { id?: number } | undefined)?.id) !== OWNER_GITHUB_ID || !account.access_token) {
          throw new Error('Owner access is required.')
        }
        const session = await issueOwnerSession(account.access_token, account.expires_at ? account.expires_at * 1000 : Date.now() + 60 * 60 * 1000)
        token.ownerId = OWNER_GITHUB_ID
        token.ownerSessionId = session.id
        delete token.githubAccessToken; delete token.accessTokenExpires; delete token.travelCsrfKey
      }
      return token
    },
    async session({ session, token }) {
      // Never expose the GitHub token or CSRF key through /api/auth/session.
      return {
        expires: session.expires,
        user: { name: token.name ?? OWNER_GITHUB_LOGIN, image: token.picture ?? undefined },
      }
    },
  },
}
