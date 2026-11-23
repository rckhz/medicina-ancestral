import { Link } from 'react-router-dom'
import { typeInfo } from '../../data/categories'
import type { ContentItem } from '../../types/content'
import EvidenceBadge from '../EvidenceBadge/EvidenceBadge'
import Icon from '../Icon/Icon'

/** Nome científico (em itálico no cartão), se houver um entre os nomes da planta. */
function scientificName(item: ContentItem): string | undefined {
  return item.plantNames.find((n) => /^[A-Z][a-z]+ [a-z]+/.test(n))
}

/** Cartão resumido de uma condição ou preparação. */
export default function ContentCard({ item }: { item: ContentItem }) {
  const latin = scientificName(item)
  return (
    <article className="card">
      <h3>
        <Link to={`${typeInfo[item.type].basePath}/${item.slug}`} className="card__link">
          {item.title}
        </Link>
      </h3>
      {latin && <p className="card__latin">{latin}</p>}
      <p className="card__desc">{item.description}</p>
      {item.evidence && (
        <div className="card__foot">
          <EvidenceBadge level={item.evidence} />
        </div>
      )}
      <Icon name="arrow" className="card__arrow" />
    </article>
  )
}
