import { useLocation } from 'react-router-dom'
import Logo from '../Logo/Logo'

const chevron = (
  <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Qual palavra do menu marca a página atual (só nas páginas internas). */
function currentWord(pathname: string): string | undefined {
  if (pathname.startsWith('/preparacoes')) return 'plantas'
  if (pathname.startsWith('/condicoes') || pathname.startsWith('/categorias')) return 'condicoes'
  if (pathname.startsWith('/sobre')) return 'sobre'
  return undefined
}

/**
 * Cabeçalho fixo do kit (nav-mega). O menu do celular e o painel são do system.js; os links são
 * <a> comuns para que cada página nova carregue inteira e o kit monte o que ela tiver.
 */
export default function Header() {
  const { pathname } = useLocation()
  const current = currentWord(pathname)
  const mark = (word: string) => (current === word ? ({ 'aria-current': 'page' } as const) : {})

  return (
    <header className="nav">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">
          Pular para o conteúdo
        </a>
        <Logo />
        <nav className="nav__links" aria-label="Principal">
          <div className="nav__item">
            <a className="nav__link" href="/#herbario" {...mark('plantas')}>
              Plantas {chevron}
            </a>
            <div className="nav__menu">
              <div className="wrap grid">
                <div className="menu-col span-3">
                  <p className="t-label">Plantas medicinais</p>
                  <a href="/preparacoes/alho">Alho<span>Colesterol e pressão leve</span></a>
                  <a href="/preparacoes/alecrim">Alecrim<span>Má digestão, uso tradicional</span></a>
                  <a href="/preparacoes/cravo-da-india">Cravo-da-índia<span>Especiaria de chás caseiros</span></a>
                </div>
                <div className="menu-col span-3">
                  <p className="t-label">Chás e infusões</p>
                  <a href="/preparacoes/cha-de-camomila">Chá de camomila<span>Relaxamento e digestão leve</span></a>
                  <a href="/preparacoes/cha-de-alecrim">Chá de alecrim<span>Folhas secas em infusão</span></a>
                </div>
                <a className="menu-card span-3 start-10" href="/preparacoes/agriao">
                  <div className="panel">
                    <img
                      className="frame__img"
                      src="/assets/img/photo-f51595896-500.webp"
                      alt="Ramos de agrião com folhas redondas e flores brancas pequenas"
                      width="500"
                      height="376"
                      data-source="stand-in"
                      data-subject="agrião"
                    />
                  </div>
                  <span className="t-card">Agrião</span>
                  <span className="t-small muted">Chás e xaropes para tosse</span>
                </a>
              </div>
            </div>
          </div>
          <div className="nav__item">
            <a className="nav__link" href="/#chas">Chás</a>
          </div>
          <div className="nav__item">
            <a className="nav__link" href="/#evidencias">Evidências</a>
          </div>
          <div className="nav__item">
            <a className="nav__link" href="/condicoes" {...mark('condicoes')}>Condições</a>
          </div>
          <div className="nav__item">
            <a className="nav__link" href="/sobre" {...mark('sobre')}>Sobre</a>
          </div>
        </nav>
        <div className="nav__actions">
          <a className="nav__link" href="/busca">Buscar</a>
          <a className="btn btn--primary" href="/preparacoes?categoria=plantas-medicinais">
            Ver as plantas
          </a>
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  )
}
