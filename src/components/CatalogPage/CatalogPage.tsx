import { useSearchParams } from 'react-router-dom'
import { categories, evidenceLevels, typeInfo } from '../../data/categories'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { getContent, searchContent } from '../../lib/content'
import type { ContentType, EvidenceLevel } from '../../types/content'
import ContentCard from '../ContentCard/ContentCard'
import Icon from '../Icon/Icon'
import PageHead from '../PageHead/PageHead'

interface Props {
  type: ContentType
  title?: string
  eyebrow: string
  intro: string
}

/** Catálogo com filtros (texto, categoria, evidência) guardados na URL. */
export default function CatalogPage({ type, title, eyebrow, intro }: Props) {
  const { plural } = typeInfo[type]
  const heading = title ?? plural
  useDocumentTitle(heading)
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const category = params.get('categoria') ?? ''
  const evidence = params.get('evidencia') ?? ''

  const typeCategories = categories.filter((c) => c.type === type)
  const pool = getContent(type).filter(
    (item) => (!category || item.category === category) && (!evidence || item.evidence === evidence),
  )
  const results = searchContent(q, pool)

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  return (
    <>
      <PageHead eyebrow={eyebrow} title={heading}>
        <p className="lead">{intro}</p>
      </PageHead>

      <div className="container page">
        <div className="pills" role="group" aria-label="Categorias">
          <button type="button" className="pill" aria-pressed={!category} onClick={() => setFilter('categoria', '')}>
            Todas
          </button>
          {typeCategories.map((c) => (
            <button
              key={c.slug}
              type="button"
              className="pill"
              aria-pressed={category === c.slug}
              onClick={() => setFilter('categoria', c.slug)}
            >
              <Icon name={c.icon} /> {c.name}
            </button>
          ))}
        </div>

        <div className="filters" role="group" aria-label="Filtros">
          <label className="filters__search">
            <span>Filtrar por nome</span>
            <span className="filters__field">
              <Icon name="search" />
              <input
                type="search"
                value={q}
                placeholder="Digite para filtrar…"
                onChange={(e) => setFilter('q', e.target.value)}
              />
            </span>
          </label>
          {type === 'preparation' && (
            <label>
              <span>Evidência</span>
              <select value={evidence} onChange={(e) => setFilter('evidencia', e.target.value)}>
                <option value="">Todas</option>
                {(Object.keys(evidenceLevels) as EvidenceLevel[]).map((level) => (
                  <option key={level} value={level}>
                    {evidenceLevels[level].label}
                  </option>
                ))}
              </select>
            </label>
          )}
          <p className="filters__count" aria-live="polite">
            {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid">
            {results.map((item) => (
              <ContentCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <Icon name="leaf" />
            <p>Nenhum conteúdo encontrado com esses filtros.</p>
          </div>
        )}
      </div>
    </>
  )
}
