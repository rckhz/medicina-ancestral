import type { Reference } from '../../types/content'

export default function ReferenceList({ references }: { references: Reference[] }) {
  if (references.length === 0) {
    return <p className="muted">Referências ainda não informadas.</p>
  }
  return (
    <ol className="references">
      {references.map((ref, i) => (
        <li key={i}>
          {ref.author && <>{ref.author}. </>}
          {ref.url ? (
            <a href={ref.url} target="_blank" rel="noopener noreferrer">
              {ref.title}
              <span className="visually-hidden"> (abre em nova aba)</span>
            </a>
          ) : (
            <cite>{ref.title}</cite>
          )}
          {ref.year && <>. {ref.year}</>}.
        </li>
      ))}
    </ol>
  )
}
