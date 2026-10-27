const marks = {
  kla: { src: '/brands/kla.svg', width: 167, height: 57 },
  pickit: { src: '/brands/pickit.png', width: 1001, height: 457 },
  bosch: { src: '/brands/bosch.svg', width: 433, height: 97 },
} as const

export function CompanyMark({ company, compact = false }: { company: keyof typeof marks; compact?: boolean }) {
  const mark = marks[company]
  return <span className={`company-mark ${compact ? 'company-mark-compact' : ''}`} data-company={company} aria-hidden="true">
    <img src={mark.src} width={mark.width} height={mark.height} alt="" />
  </span>
}
