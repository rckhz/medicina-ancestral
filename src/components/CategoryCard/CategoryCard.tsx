import { Link } from 'react-router-dom'
import { typeInfo } from '../../data/categories'
import { countByCategory } from '../../lib/content'
import type { Category } from '../../types/content'
import Icon from '../Icon/Icon'

export default function CategoryCard({ category }: { category: Category }) {
  const count = countByCategory(category.type, category.slug)
  return (
    <Link className="category-card" to={`${typeInfo[category.type].basePath}?categoria=${category.slug}`}>
      <span className="category-card__icon">
        <Icon name={category.icon} />
      </span>
      <span className="category-card__body">
        <span className="category-card__name">{category.name}</span>
        <span className="category-card__desc">{category.description}</span>
      </span>
      <span className="category-card__count">
        {count} {count === 1 ? 'artigo' : 'artigos'}
      </span>
    </Link>
  )
}
