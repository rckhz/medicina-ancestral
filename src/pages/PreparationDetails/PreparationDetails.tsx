import { useParams } from 'react-router-dom'
import ArticleLayout from '../../components/ArticleLayout/ArticleLayout'
import { getBySlug } from '../../lib/content'
import NotFound from '../NotFound/NotFound'

export default function PreparationDetails() {
  const { slug = '' } = useParams()
  const item = getBySlug('preparation', slug)
  return item ? <ArticleLayout key={slug} item={item} /> : <NotFound />
}
