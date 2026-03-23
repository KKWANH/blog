const FALLBACK_SITE_URL = 'http://localhost:3000'

function normalizeUrl(value: string | undefined) {
  if (!value) {
    return FALLBACK_SITE_URL
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value
  }

  return `https://${value}`
}

export const siteUrl = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL,
)

export function absoluteUrl(path = '/') {
  return new URL(path, siteUrl).toString()
}
