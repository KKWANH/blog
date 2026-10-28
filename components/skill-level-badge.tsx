import { familiarityLabel, type FamiliarityLevel } from '@/lib/skill-preferences'

export function SkillLevelBadge({ level, compact = false }: { level: FamiliarityLevel | null; compact?: boolean }) {
  if (!level) return null
  return (
    <span
      className={`skill-level-badge ${compact ? 'skill-level-compact' : ''}`}
      data-level={level}
      aria-label={`Self-assessed familiarity: ${familiarityLabel(level)}`}
    >
      {familiarityLabel(level)}
    </span>
  )
}
