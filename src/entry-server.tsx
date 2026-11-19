import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { getContent } from './lib/content'
import { typeInfo } from './data/categories'

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}

/** Todas as rotas que viram arquivos HTML estáticos no build. */
export function routes(): string[] {
  const articles = [...getContent('preparation'), ...getContent('condition')].map(
    (item) => `${typeInfo[item.type].basePath}/${item.slug}`,
  )
  return ['/', '/condicoes', '/preparacoes', '/categorias', '/busca', '/sobre', ...articles]
}
