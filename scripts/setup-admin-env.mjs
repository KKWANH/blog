import { randomBytes, scrypt as scryptCallback } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCallback)

async function hashPassword(password) {
  if (!password || password.length < 14) {
    throw new Error('Please choose a passphrase of at least 14 characters.')
  }
  const salt = randomBytes(32)
  const derived = await scrypt(password, salt, 64)
  return `scrypt$1$${salt.toString('base64url')}$${derived.toString('base64url')}`
}

async function main() {
  const passphrase = process.argv[2]
  if (!passphrase) {
    console.log('Usage: node scripts/setup-admin-env.mjs "YourChosenPassphraseHere"')
    console.log('Example: node scripts/setup-admin-env.mjs "Kwanho-Portfolio-2026-Secret!"')
    process.exit(1)
  }

  const hash = await hashPassword(passphrase)
  const secret = randomBytes(32).toString('base64url')

  console.log('\n===================================================================')
  console.log('  Vercel Environment Variables for Multi-Device Admin Access')
  console.log('  Paste these into Vercel Dashboard -> Settings -> Environment Variables')
  console.log('===================================================================\n')
  console.log(`ADMIN_PASSWORD_HASH=${hash}`)
  console.log(`ADMIN_SESSION_SECRET=${secret}`)
  console.log(`ADMIN_ORIGIN=https://www.kwanho.dev`)
  console.log(`ANALYTICS_ENABLED=1`)
  console.log('\n-------------------------------------------------------------------')
  console.log('Also make sure to enable free Upstash Redis storage:')
  console.log('Vercel Dashboard -> Storage -> Create Database -> KV / Upstash')
  console.log('Vercel will automatically connect KV_REST_API_URL and KV_REST_API_TOKEN.')
  console.log('-------------------------------------------------------------------\n')
}

main().catch(console.error)
