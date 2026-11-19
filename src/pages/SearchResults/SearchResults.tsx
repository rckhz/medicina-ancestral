import { useSearchParams } from 'react-router-dom'
import ContentCard from '../../components/ContentCard/ContentCard'
import Icon from '../../components/Icon/Icon'
import PageHead from '../../components/PageHead/PageHead'
import Search from '../../components/Search/Search'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { searchContent } from '../../lib/content'

export default function SearchResults() {
  const [params] = useSearchParams()
  const q = params.get('q')?.trim() ?? ''
  useDocumentTitle(q ? `Busca: ${q}` : 'Busca')
  const results = q ? searchContent(q) : []

  return (
    <>
      <PageHead eyebrow="Busca" title={q ? `Resultados para “${q}”` : 'Pesquisar'}>
        <Search defaultValue={q} variant="hero" />
      </PageHead>

      <div className="container page">
        {q && (
          <>
            <p className="muted" aria-live="polite">
              {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </p>
            {results.length > 0 ? (
              <div className="grid">
                {results.map((item) => (
                  <ContentCard key={`${item.type}:${item.slug}`} item={item} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <Icon name="leaf" />
                <p>Nada encontrado. Tente outro termo, como o nome popular de uma planta.</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
