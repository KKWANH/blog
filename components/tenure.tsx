'use client'

import { useSyncExternalStore } from 'react'
import { currentMonthIndex, formatMonths, formatYearsPlus, monthsBetween } from '@/lib/tenure'
import { experience } from '@/lib/profile'

const noSubscription = () => () => {}

/* The month is read on the client only: the page is prerendered, so a build-time
   date would freeze "Present" roles at the day of the last deploy. */
function useCurrentMonth() {
  return useSyncExternalStore(noSubscription, () => currentMonthIndex(), () => null)
}

export function JobPeriod({ job }: { job: { period: string; start: string; end: string | null } }) {
  const now = useCurrentMonth()
  if (now === null && !job.end) return <>{job.period}</>
  return <>{job.period} · {formatMonths(monthsBetween(job.start, job.end, now ?? 0))}</>
}

/* Software practice counts from starting 42 in September 2020. */
const practiceStart = '2020-09'

export function TenureBadges() {
  const now = useCurrentMonth()
  if (now === null) return null
  const industry = experience.reduce((total, job) => total + monthsBetween(job.start, job.end, now), 0)
  return <>
    <span className="tenure-summary-badge">Industry: {formatYearsPlus(industry)} (KLA · Pickit · Bosch)</span>
    <span className="tenure-summary-badge">Software practice: {formatYearsPlus(monthsBetween(practiceStart, null, now))} (since 2020)</span>
  </>
}
