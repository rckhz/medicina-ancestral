import { useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { evidenceLevels } from '../../data/categories'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import type { EvidenceLevel } from '../../types/content'

/* Plano da página (design-taste-frontend, serviço):
   hero split (1 tela) · #herbario carrossel de plantas (rolagem horizontal, sem travar a página)
   · #chas split com a foto da camomila, fundo de superfície (1 tela) · #evidencias os cinco níveis (1 tela)
   · footer.closing (1 tela). Movimento: entrada do hero e o hover do kit. */

const arrow = (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
)

function srcSet(id: string, big = false) {
  const set = `/assets/img/photo-${id}-500.webp 500w, /assets/img/photo-${id}-960.webp 960w, /assets/img/photo-${id}.webp 1280w`
  return big ? `${set}, /assets/img/photo-${id}-1920.webp 1920w` : set
}

const chapters = [
  {
    id: 'f18122750',
    slug: 'alho',
    name: 'Alho',
    latin: 'Allium sativum',
    text: 'Estudado como coadjuvante no controle do colesterol e da pressão arterial leve. A evidência ainda é limitada.',
    alt: 'Cabeça de alho aberta ao lado de um dente descascado, sobre fundo branco',
    h: 962,
  },
  {
    id: 'f113392846',
    slug: 'alecrim',
    name: 'Alecrim',
    latin: 'Rosmarinus officinalis',
    text: 'A Farmacopeia Brasileira indica o chá das folhas para má digestão. É uso tradicional, sem confirmação clínica.',
    alt: 'Ramo de alecrim fresco com folhas finas, sobre fundo branco',
    h: 960,
  },
  {
    id: 'f132411089',
    slug: 'cravo-da-india',
    name: 'Cravo-da-índia',
    latin: 'Syzygium aromaticum',
    text: 'Botões florais secos do craveiro, usados na cozinha e em chás caseiros. Uso tradicional documentado.',
    alt: 'Cravos-da-índia secos espalhados sobre fundo branco',
    h: 889,
  },
]

const teas = [
  {
    slug: 'cha-de-camomila',
    name: 'Chá de camomila',
    use: 'Flores secas, para relaxar e para desconfortos digestivos leves',
    level: 'limited',
    photo: 'f34783411',
    alt: 'Flor de camomila com miolo amarelo e pétalas brancas entre folhas finas',
  },
  {
    slug: 'cha-de-alecrim',
    name: 'Chá de alecrim',
    use: 'Folhas secas em infusão, para má digestão',
    level: 'traditional',
    photo: 'f195540995',
    alt: 'Chá de ervas cor de âmbar numa tigela de vidro sobre fundo branco',
  },
] as const

export default function Home() {
  useDocumentTitle()
  const track = useRef<HTMLOListElement>(null)
  const go = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const step = (el.querySelector('li')?.clientWidth ?? el.clientWidth) + 24
    el.scrollBy({ left: dir * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <>
      <section className="hero hero--split ground-inverse" data-enter aria-labelledby="hero-h">
        <div className="wrap">
          <div className="hero-text grid hero__grid">
            <div className="hero__text span-5">
              <p className="hero__kicker">Conteúdo educativo. Em emergência, ligue 192.</p>
              <h1 id="hero-h">Guia de plantas medicinais e chás caseiros</h1>
              <p className="hero__lead">
                6 fichas revisadas, com preparo, contraindicações e referências. Um selo em cada uso separa a tradição
                do que os estudos já confirmaram.
              </p>
              <div className="btn-row">
                <a className="btn btn--primary" href="/preparacoes?categoria=plantas-medicinais">
                  Ver as plantas
                  {arrow}
                </a>
                <a className="btn btn--secondary" href="#evidencias">
                  Ler os níveis de evidência
                </a>
              </div>
            </div>
            <figure className="hero__figure span-6 start-7">
            <div className="hero__media">
              <picture>
                <source srcSet="/images/hero-babosa.webp" type="image/webp" />
                <img
                  src="/images/hero-babosa.jpg"
                  alt="Folhas grossas de babosa com bordas serrilhadas e gotas de água"
                  width="2400"
                  height="1600"
                  style={{ '--ly-pos': '40% 50%' } as CSSProperties}
                  fetchPriority="high"
                  data-source="client"
                  data-subject="babosa"
                />
              </picture>
            </div>
            <figcaption className="hero__caption">
              <i>Aloe vera</i> (L.) Burm.f., babosa
            </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section" id="herbario" aria-labelledby="herbario-h">
        <div className="wrap">
          <div className="herb__head">
            <div>
              <h2 id="herbario-h">Plantas do herbário</h2>
              <p>Cada ficha traz o nome científico, as partes usadas, o modo de preparo e quem deve evitar a planta.</p>
            </div>
            <div className="herb__nav">
              <button type="button" className="herb__btn" onClick={() => go(-1)} aria-label="Planta anterior">
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" className="herb__btn" onClick={() => go(1)} aria-label="Próxima planta">
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
          <ol className="herb__track" ref={track} tabIndex={0} aria-label="Plantas do herbário">
            {chapters.map((c) => (
              <li className="herb__slide" key={c.slug}>
                <figure className="herb__pic">
                  <img
                    src={`/assets/img/photo-${c.id}.webp`}
                    srcSet={srcSet(c.id)}
                    sizes="(max-width: 639px) 86vw, (max-width: 1023px) 60vw, 700px"
                    width="1280"
                    height={c.h}
                    alt={c.alt}
                    loading="lazy"
                    decoding="async"
                    data-source="stand-in"
                    data-subject={c.name}
                  />
                </figure>
                <h3>
                  <Link to={`/preparacoes/${c.slug}`}>{c.name}</Link>
                </h3>
                <p className="herb__latin">{c.latin}</p>
                <p>{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section ground-surface" id="chas" aria-labelledby="chas-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="chas-h">
              Chás e infusões. <span className="muted">Com quantidade, água e tempo de infusão.</span>
            </h2>
          </div>
          <div className="grid">
            {teas.map((t) => (
              <Link className="tile span-6 tea" to={`/preparacoes/${t.slug}`} key={t.slug}>
                <div className="tile__media">
                  <img
                    src={`/assets/img/photo-${t.photo}.webp`}
                    srcSet={srcSet(t.photo)}
                    sizes="(max-width: 1023px) 100vw, 628px"
                    width="1280"
                    height="960"
                    alt={t.alt}
                    loading="lazy"
                    decoding="async"
                    data-source="stand-in"
                    data-subject={t.name}
                  />
                </div>
                <div className="tile__head">
                  <h3>{t.name}</h3>
                  <span className="tile__price">{evidenceLevels[t.level].label}</span>
                </div>
                <p className="tile__facts">{t.use}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="evidencias" aria-labelledby="evidencias-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="evidencias-h">
              Cinco níveis de evidência. <span className="muted">O nível vale para um uso, não para a planta toda.</span>
            </h2>
          </div>
          <div className="grid">
            <div className="span-6">
          <dl className="levels">
            {(Object.keys(evidenceLevels) as EvidenceLevel[]).map((level) => (
              <div className="levels__row" key={level}>
                <dt>
                  {evidenceLevels[level].label}
                  <span className={`level-dot level-dot--${level}`} aria-hidden="true" />
                </dt>
                <dd>{evidenceLevels[level].meaning}</dd>
              </div>
            ))}
          </dl>
          <p className="levels__more">
            <Link className="link" to="/sobre">
              Ler sobre as fontes
            </Link>
          </p>
            </div>
            <div className="span-6 start-7">
              <picture className="levels__photo">
                <source srcSet="/images/hero.webp" type="image/webp" />
                <img
                  src="/images/hero.jpg"
                  alt="Ervas secas e flores em tigelas de madeira, com um pilão branco, sobre uma mesa"
                  width="984"
                  height="656"
                  loading="lazy"
                  decoding="async"
                  data-source="client"
                  data-subject="ervas secas"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
