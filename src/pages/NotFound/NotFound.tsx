import { Link } from 'react-router-dom'
import PageHead from '../../components/PageHead/PageHead'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Página não encontrada')
  return (
    <>
      <PageHead title="Página não encontrada">
        <p className="lead">O endereço pode estar incorreto ou o conteúdo foi removido.</p>
      </PageHead>
      <div className="container page">
        <p>
          <Link to="/">Voltar ao início</Link> ou <Link to="/busca">pesquisar no site</Link>.
        </p>
      </div>
    </>
  )
}
