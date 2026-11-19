import { evidenceLevels } from '../../data/categories'
import type { EvidenceLevel } from '../../types/content'

export default function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const { label, meaning } = evidenceLevels[level]
  return (
    <span className={`badge badge--${level}`} title={meaning}>
      <span className="badge__dot" aria-hidden="true" />
      {label}
    </span>
  )
}
