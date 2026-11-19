import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/variables.css'
import './styles/global.css'

// /index.html e /preparacoes/index.html são a mesma página que / e /preparacoes
if (location.pathname.endsWith('/index.html')) {
  history.replaceState(history.state, '', location.pathname.replace(/index\.html$/, '') + location.search + location.hash)
}

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Páginas pré-renderizadas (npm run build) são hidratadas; com filtros na URL (?categoria=, ?q=)
// o HTML estático não corresponde, então a página é desenhada do zero no navegador.
const prerendered = container.firstElementChild !== null && !location.search
if (prerendered) hydrateRoot(container, app)
else createRoot(container).render(app)
