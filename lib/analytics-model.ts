export const referralLabels: Record<string, string> = {
  direct: 'Direct', internal: 'Internal', google: 'Google', bing: 'Bing',
  duckduckgo: 'DuckDuckGo', yahoo: 'Yahoo', linkedin: 'LinkedIn', github: 'GitHub',
  instagram: 'Instagram', facebook: 'Facebook', reddit: 'Reddit', x: 'X / Twitter', other: 'Other external',
}
const domains: Record<string, string[]> = {
  google: ['google.com', 'google.be', 'google.nl', 'google.de', 'google.co.uk', 'google.co.kr'],
  bing: ['bing.com'], duckduckgo: ['duckduckgo.com'], yahoo: ['yahoo.com'],
  linkedin: ['linkedin.com', 'lnkd.in'], github: ['github.com'],
  instagram: ['instagram.com'], facebook: ['facebook.com', 'fb.com'],
  reddit: ['reddit.com', 'redd.it'], x: ['x.com', 'twitter.com', 't.co'],
}
export function coarseReferral(value: unknown, ownHost = 'www.kwanho.dev') {
  if (value === '' || value === null || value === undefined) return 'direct'
  if (typeof value !== 'string' || value.length > 253 || !/^[a-z0-9.-]+$/i.test(value)) return 'other'
  const host = value.toLowerCase().replace(/\.$/, '')
  if (Object.hasOwn(referralLabels, host)) return host
  if ([ownHost, 'kwanho.dev', 'www.kwanho.dev'].includes(host)) return 'internal'
  for (const [category, values] of Object.entries(domains)) if (values.some((domain) => host === domain || host.endsWith('.' + domain))) return category
  return 'other'
}
