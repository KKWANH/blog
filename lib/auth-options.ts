import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const adminUsername = process.env.ADMIN_USERNAME
const adminPassword = process.env.ADMIN_PASSWORD

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
      async authorize(credentials) {
        if (!adminUsername || !adminPassword) {
          return null
        }

        const username = typeof credentials?.username === 'string' ? credentials.username : ''
        const password = typeof credentials?.password === 'string' ? credentials.password : ''

        if (username !== adminUsername || password !== adminPassword) {
          return null
        }

        return {
          id: 'admin',
          name: process.env.ADMIN_NAME ?? 'Administrator',
          email: process.env.ADMIN_EMAIL ?? `${adminUsername}@local.admin`,
        }
      },
    }),
  ],
}
