import { Link } from 'react-router-dom'
import CategoryCard from '../../components/CategoryCard/CategoryCard'
import ContentCard from '../../components/ContentCard/ContentCard'
import EvidenceBadge from '../../components/EvidenceBadge/EvidenceBadge'
import Icon from '../../components/Icon/Icon'
import Search from '../../components/Search/Search'
import { categories, evidenceLevels } from '../../data/categories'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { countByCategory, getContent } from '../../lib/content'
import type { EvidenceLevel } from '../../types/content'

const suggestions = ['alho', 'alecrim', 'tosse', 'sono', 'digestão']

function SectionHead({ id, eyebrow, title, link }: { id: string; eyebrow: string; title: string; link?: { to: string; label: string } }) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      {link && (
        <Link to={link.to} className="link-arrow">
          {link.label} <Icon name="arrow" />
        </Link>
      )}
    </div>
  )
}

export default function Home() {
  useDocumentTitle()
  const preparations = getContent('preparation')
  const plants = preparations.filter((p) => p.category === 'plantas-medicinais')
  const others = preparations.filter((p) => p.category !== 'plantas-medicinais')

  return (
    <>
      <section className="hero">
        <picture>
          <source srcSet="/images/hero-babosa.webp" type="image/webp" />
          <img className="hero__bg" src="/images/hero-babosa.jpg" alt="" aria-hidden="true" fetchPriority="high" />
        </picture>
        <div className="container hero__inner">
          <p className="eyebrow">Plantas medicinais · Chás · Cuidados naturais</p>
          <h1 className="hero__title">
            Medicina <em>Ancestral</em>
          </h1>
          <p className="hero__tagline">Saberes das plantas, com ciência e cuidado.</p>
          <p className="lead">
            Informações em linguagem simples sobre plantas medicinais, preparações tradicionais e condições de
            saúde — separando o que é uso popular do que a pesquisa científica já confirmou.
          </p>
          <Search variant="hero" />
          <p className="hero__chips">
            <span>Experimente:</span>
            {suggestions.map((s) => (
              <Link key={s} to={`/busca?q=${encodeURIComponent(s)}`} className="chip">
                {s}
              </Link>
            ))}
          </p>
        </div>
      </section>

      <div className="container page home">
        {plants.length > 0 && (
          <section aria-labelledby="h-plantas" className="home__section">
            <SectionHead
              id="h-plantas"
              eyebrow="Herbário"
              title="Plantas medicinais"
              link={{ to: '/preparacoes?categoria=plantas-medicinais', label: 'Ver todas as plantas' }}
            />
            <div className="grid">
              {plants.map((item) => (
                <ContentCard key={item.slug} item={item} />
              ))}
            </div>
          </section>
        )}

        {others.length > 0 && (
          <section aria-labelledby="h-preparacoes" className="home__section">
            <SectionHead
              id="h-preparacoes"
              eyebrow="Receitas tradicionais"
              title="Chás e preparações"
              link={{ to: '/preparacoes', label: 'Ver todas as preparações' }}
            />
            <div className="grid">
              {others.map((item) => (
                <ContentCard key={item.slug} item={item} />
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="h-categorias" className="home__section">
          <SectionHead
            id="h-categorias"
            eyebrow="Para cada necessidade"
            title="Condições por categoria"
            link={{ to: '/categorias', label: 'Ver todas as categorias' }}
          />
          <div className="category-grid">
            {categories
              .filter((c) => c.type === 'condition' && countByCategory(c.type, c.slug) > 0)
              .map((c) => (
                <CategoryCard key={c.slug} category={c} />
              ))}
          </div>
        </section>

        <section aria-labelledby="h-evidencias" className="home__section evidence-panel">
          <div className="evidence-panel__intro">
            <p className="eyebrow">Transparência</p>
            <h2 id="h-evidencias">Como ler as evidências</h2>
            <p>
              Cada uso recebe uma classificação, considerando a finalidade específica — não apenas a planta.
              Assim fica claro o que é tradição e o que já foi confirmado por estudos.
            </p>
            <Link to="/sobre" className="link-arrow">
              Saiba mais sobre o projeto <Icon name="arrow" />
            </Link>
          </div>
          <dl className="evidence-legend">
            {(Object.keys(evidenceLevels) as EvidenceLevel[]).map((level) => (
              <div key={level}>
                <dt>
                  <EvidenceBadge level={level} />
                </dt>
                <dd>{evidenceLevels[level].meaning}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  )
}
