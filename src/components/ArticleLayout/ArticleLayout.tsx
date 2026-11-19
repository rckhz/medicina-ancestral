import { Link } from 'react-router-dom'
import { getCategory, typeInfo } from '../../data/categories'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { getRelated } from '../../lib/content'
import { getHeadings } from '../../lib/markdown'
import type { ContentItem } from '../../types/content'
import ContentCard from '../ContentCard/ContentCard'
import EvidenceBadge from '../EvidenceBadge/EvidenceBadge'
import Icon from '../Icon/Icon'
import MarkdownContent from '../MarkdownContent/MarkdownContent'
import ReferenceList from '../ReferenceList/ReferenceList'
import SafetyNotice from '../SafetyNotice/SafetyNotice'

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ArticleLayout({ item }: { item: ContentItem }) {
  useDocumentTitle(item.title)
  const info = typeInfo[item.type]
  const category = getCategory(item.type, item.category)
  const related = getRelated(item)
  const relatedTitle = item.type === 'condition' ? 'Preparações relacionadas' : 'Condições relacionadas'
  const latin = item.plantNames.find((n) => /^[A-Z][a-z]+ [a-z]+/.test(n))

  const toc = [
    ...getHeadings(item.body),
    ...(related.length > 0 ? [{ id: 'relacionados', text: relatedTitle }] : []),
    { id: 'referencias', text: 'Referências' },
  ]

  return (
    <article className="article">
      <header className="article-hero">
        <div className="ma-wrap">
          <nav aria-label="Trilha de navegação" className="breadcrumb">
            <ol>
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to={info.basePath}>{info.plural}</Link>
              </li>
              {category && (
                <li>
                  <Link to={`${info.basePath}?categoria=${category.slug}`}>{category.name}</Link>
                </li>
              )}
            </ol>
          </nav>

          <div className="article-hero__inner">
            <span className="article-hero__icon">
              <Icon name={category?.icon ?? 'leaf'} />
            </span>
            <div>
              <h1>{item.title}</h1>
              {latin && <p className="article-hero__latin">{latin}</p>}
              <p className="lead">{item.description}</p>
              <div className="article__meta">
                {item.evidence && <EvidenceBadge level={item.evidence} />}
                {item.lastUpdated && (
                  <span>
                    Atualizado em <time dateTime={item.lastUpdated}>{formatDate(item.lastUpdated)}</time>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="ma-wrap article-body">
        <div className="article-main">
          {!item.reviewed && (
            <p className="notice notice--warning" role="note">
              <Icon name="alert" className="notice__icon" />
              <span>
                <strong>Em revisão:</strong> este conteúdo ainda não foi revisado por um profissional de saúde.
              </span>
            </p>
          )}

          {item.image && (
            <img className="article__image" src={item.image} alt={item.imageAlt ?? ''} loading="lazy" />
          )}

          {item.safetyNotice && <SafetyNotice />}

          <MarkdownContent>{item.body}</MarkdownContent>

          {related.length > 0 && (
            <section aria-labelledby="relacionados" className="article__section">
              <h2 id="relacionados">{relatedTitle}</h2>
              <div className="entry-grid">
                {related.map((r) => (
                  <ContentCard key={`${r.type}:${r.slug}`} item={r} />
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="referencias" className="article__section article__refs">
            <h2 id="referencias">
              <Icon name="book" /> Referências
            </h2>
            <ReferenceList references={item.references} />
          </section>
        </div>

        <aside className="article-aside">
          <div className="article-aside__sticky">
            <nav aria-label="Nesta página" className="toc">
              <p className="toc__title">Nesta página</p>
              <ol>
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
            <Link className="toc__back" to={`${info.basePath}${category ? `?categoria=${category.slug}` : ''}`}>
              ← Ver mais em {category?.name ?? info.plural}
            </Link>
          </div>
        </aside>
      </div>
    </article>
  )
}
