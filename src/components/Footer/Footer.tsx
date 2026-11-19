import Logo from '../Logo/Logo'

const arrow = (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
)

/** A última tela: o fechamento (close-type) e o rodapé escuro (footer-dark) numa só seção. */
export default function Footer() {
  return (
    <footer className="footer closing footer--dark ground-inverse" id="contato" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta close--type">
          <div className="section-head">
            <h2 id="close-h">Seis fichas de plantas e chás</h2>
            <p>Cada ficha termina com as referências usadas, para você conferir na fonte.</p>
          </div>
          <a className="btn btn--primary btn--xl btn--wide" href="/preparacoes?categoria=plantas-medicinais">
            Ver as plantas
            {arrow}
          </a>
        </div>
        <div className="closing__links">
          <div className="grid">
            <div className="span-4 stack-4">
              <Logo />
              <p className="footer__lede">
                Conteúdo educativo: não substitui consulta com profissional de saúde. Em emergência, ligue 192 (SAMU).
              </p>
            </div>
            <div className="span-2 footer__col">
              <h3>Plantas</h3>
              <ul>
                <li><a href="/preparacoes/alho">Alho</a></li>
                <li><a href="/preparacoes/alecrim">Alecrim</a></li>
                <li><a href="/preparacoes/agriao">Agrião</a></li>
                <li><a href="/preparacoes/cravo-da-india">Cravo-da-índia</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Chás</h3>
              <ul>
                <li><a href="/preparacoes/cha-de-camomila">Camomila</a></li>
                <li><a href="/preparacoes/cha-de-alecrim">Alecrim</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Condições</h3>
              <ul>
                <li><a href="/condicoes/resfriado-comum">Resfriado comum</a></li>
                <li><a href="/condicoes/insonia">Insônia</a></li>
                <li><a href="/condicoes">Todas as condições</a></li>
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>Projeto</h3>
              <ul>
                <li><a href="/categorias">Categorias</a></li>
                <li><a href="/busca">Busca</a></li>
                <li><a href="/sobre">Fontes</a></li>
              </ul>
            </div>
          </div>
          <div className="footer__legal">
            <span>&copy; 2026 Medicina Ancestral</span>
            <a className="credits" href="/creditos.html">Fotografias via Wikimedia Commons</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
