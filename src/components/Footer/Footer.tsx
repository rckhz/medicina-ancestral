import { Link } from 'react-router-dom'
import Logo from '../Logo/Logo'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo />
          <p>Saberes das plantas medicinais e das preparações tradicionais, lidos com olhar científico.</p>
        </div>

        <nav aria-label="Rodapé">
          <h2>Explorar</h2>
          <ul>
            <li><Link to="/preparacoes?categoria=plantas-medicinais">Plantas medicinais</Link></li>
            <li><Link to="/preparacoes?categoria=infusoes">Chás e infusões</Link></li>
            <li><Link to="/condicoes">Condições de saúde</Link></li>
            <li><Link to="/categorias">Categorias</Link></li>
            <li><Link to="/sobre">Sobre o projeto e fontes</Link></li>
          </ul>
        </nav>

        <section aria-labelledby="aviso-geral" className="site-footer__notice">
          <h2 id="aviso-geral">Aviso importante</h2>
          <p>
            Este site possui finalidade exclusivamente educativa e não substitui avaliação, diagnóstico ou
            orientação de profissionais de saúde. Informações sobre plantas medicinais e preparações
            tradicionais não representam necessariamente eficácia comprovada.
          </p>
          <p>
            Não interrompa nem altere tratamentos prescritos por conta própria. Preparações naturais também
            podem apresentar contraindicações, efeitos adversos e interações medicamentosas. Em caso de
            sintomas intensos, persistentes ou sinais de urgência, procure atendimento profissional
            (SAMU: 192).
          </p>
        </section>
      </div>
      <div className="container site-footer__bottom">
        <p>Medicina Ancestral — projeto de educação em saúde.</p>
        <p>SAMU: 192</p>
      </div>
    </footer>
  )
}
