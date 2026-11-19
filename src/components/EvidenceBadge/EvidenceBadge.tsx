import { evidenceLevels } from '../../data/categories'
import type { EvidenceLevel } from '../../types/content'

export default function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const { label, meaning } = evidenceLevels[level]
  return (
    <span className={`ev-badge ev-badge--${level}`} title={meaning}>
      <span className="ev-badge__dot" aria-hidden="true" />
      {label}
    </span>
  )
}
