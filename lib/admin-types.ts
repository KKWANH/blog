export type AnalyticsDay = {
  date: string
  views: number
  entries: number
  visitors: number
  sessions: number
  pages: Record<string, number>
  referrals: Record<string, number>
  flows: Record<string, number>
  countries: Record<string, number>
}
export type AnalyticsEvent = { date: string; path: string; previous: string | null; referral: string; country: string; visitor: string | null; session: string | null }
export type VisitorConsent = { version: 1; expires: number; generation: number; seenAt: number; startedAt: number }
export type VisitPreference = { version: 1; expires: number; revision: number; allowed: boolean; visitorKey: string | null; visitorCookie: string | null }
export type ConsentProposal = { key: string; record: VisitorConsent; cookie: string }
export type AnalyticsReport = {
  days: AnalyticsDay[]
  totals: { views: number; entries: number; visitors: number; sessions: number }
  pages: Array<{ name: string; count: number }>
  referrals: Array<{ name: string; count: number }>
  flows: Array<{ from: string; to: string; count: number }>
  countries: Array<{ name: string; count: number }>
}
