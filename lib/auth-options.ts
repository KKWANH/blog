import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { timingSafeEqual } from 'node:crypto'

const adminUsername = process.env.ADMIN_USERNAME
const adminPassword = process.env.ADMIN_PASSWORD
const MAX_ATTEMPTS = 5
const LOCK_WINDOW_MS = 10 * 60 * 1000
const loginAttempts = new Map<string, { count: number; lockedUntil?: number }>()

function safeEqual(expected: string, actual: string) {
  const expectedBuffer = Buffer.from(expected)
  const actualBuffer = Buffer.from(actual)

  if (expectedBuffer.length !== actualBuffer.length) {
    return false
  }

  return timingSafeEqual(expectedBuffer, actualBuffer)
}

function getAttemptKey(username: string, request: unknown) {
  const headers = typeof request === 'object' && request !== null && 'headers' in request
    ? ((request as { headers?: Record<string, string | string[] | undefined> }).headers ?? {})
    : {}
  const forwardedFor = typeof headers['x-forwarded-for'] === 'string'
    ? headers['x-forwarded-for'].split(',')[0]?.trim()
    : 'unknown'

  return `${forwardedFor}:${username || 'anonymous'}`
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, request) {
        if (!adminUsername || !adminPassword) {
          return null
        }

        const username = typeof credentials?.username === 'string' ? credentials.username : ''
        const password = typeof credentials?.password === 'string' ? credentials.password : ''
        const key = getAttemptKey(username, request)
        const attempt = loginAttempts.get(key)
        const now = Date.now()

        if (attempt?.lockedUntil && attempt.lockedUntil > now) {
          return null
        }

        if (username.length < 3 || username.length > 64 || password.length < 8 || password.length > 128) {
          return null
        }

        if (!safeEqual(adminUsername, username) || !safeEqual(adminPassword, password)) {
          const nextCount = (attempt?.count ?? 0) + 1
          loginAttempts.set(key, {
            count: nextCount,
            lockedUntil: nextCount >= MAX_ATTEMPTS ? now + LOCK_WINDOW_MS : undefined,
          })
          return null
        }

        loginAttempts.delete(key)

        return {
          id: 'admin',
          name: process.env.ADMIN_NAME ?? 'Administrator',
          email: process.env.ADMIN_EMAIL ?? `${adminUsername}@local.admin`,
        }
      },
    }),
  ],
}
