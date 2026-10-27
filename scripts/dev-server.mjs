import { startLocalServer } from './local-server.mjs'

startLocalServer({ production: process.argv.includes('--production') }).catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
