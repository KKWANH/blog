import { startLocalServer } from './local-server.mjs'

startLocalServer({ editor: true }).catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
