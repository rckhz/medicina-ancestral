import CategoryCard from '../../components/CategoryCard/CategoryCard'
import PageHead from '../../components/PageHead/PageHead'
import { categories } from '../../data/categories'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export default function Categories() {
  useDocumentTitle('Categorias')
  return (
    <>
      <PageHead title="Categorias">
        <p className="lead">Navegue pelos temas de saúde e pelos tipos de preparação.</p>
      </PageHead>

      <div className="container page">
        <section aria-labelledby="h-prep" className="home__section">
          <h2 id="h-prep">Plantas e preparações</h2>
          <div className="category-grid">
            {categories
              .filter((c) => c.type === 'preparation')
              .map((c) => (
                <CategoryCard key={c.slug} category={c} />
              ))}
          </div>
        </section>

        <section aria-labelledby="h-cond" className="home__section">
          <h2 id="h-cond">Condições de saúde</h2>
          <div className="category-grid">
            {categories
              .filter((c) => c.type === 'condition')
              .map((c) => (
                <CategoryCard key={c.slug} category={c} />
              ))}
          </div>
        </section>
      </div>
    </>
  )
}
