export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) return
    const { startLocalMaintenance } = await import('@/lib/local-maintenance')
    await startLocalMaintenance()
  }
}
