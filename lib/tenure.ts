/* Durations are counted in whole calendar months, inclusive, the way LinkedIn and
   CVs count them: Aug 2025–Mar 2026 is 8 months. Months are 'YYYY-MM'. */
export function monthIndex(value: string) {
  const [year, month] = value.split('-').map(Number)
  return year * 12 + month - 1
}

export function currentMonthIndex(now = new Date()) {
  return now.getFullYear() * 12 + now.getMonth()
}

export function monthsBetween(start: string, end: string | null, now: number) {
  return Math.max(1, (end ? monthIndex(end) : now) - monthIndex(start) + 1)
}

export function formatMonths(months: number) {
  const years = Math.floor(months / 12)
  const rest = months % 12
  const parts = [years ? `${years} yr${years > 1 ? 's' : ''}` : '', rest ? `${rest} mo${rest > 1 ? 's' : ''}` : '']
  return parts.filter(Boolean).join(' ')
}

/* Rounded down to the half year, so a summary never overstates: 17 months is "1+". */
export function formatYearsPlus(months: number) {
  return `${Math.floor(months / 6) / 2}+ yrs`
}
