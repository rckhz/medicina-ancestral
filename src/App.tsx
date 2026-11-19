import { useEffect } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import About from './pages/About/About'
import Categories from './pages/Categories/Categories'
import ConditionDetails from './pages/ConditionDetails/ConditionDetails'
import Conditions from './pages/Conditions/Conditions'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import PreparationDetails from './pages/PreparationDetails/PreparationDetails'
import Preparations from './pages/Preparations/Preparations'
import SearchResults from './pages/SearchResults/SearchResults'
import { bootKit } from './lib/kit'

/** Páginas internas: ficam num bloco próprio, fora do ritmo "uma seção por tela" da página inicial. */
function InnerLayout() {
  return (
    <div className="ma">
      <Outlet />
    </div>
  )
}

/** O roteador fica de fora: BrowserRouter no navegador, StaticRouter na pré-renderização. */
export default function App() {
  // O kit de design age sobre o HTML pronto: carrega depois do primeiro desenho (ou da hidratação).
  useEffect(() => {
    void bootKit()
  }, [])

  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="top" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<InnerLayout />}>
            <Route path="/condicoes" element={<Conditions />} />
            <Route path="/condicoes/:slug" element={<ConditionDetails />} />
            <Route path="/preparacoes" element={<Preparations />} />
            <Route path="/preparacoes/:slug" element={<PreparationDetails />} />
            <Route path="/categorias" element={<Categories />} />
            <Route path="/busca" element={<SearchResults />} />
            <Route path="/sobre" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  )
}
