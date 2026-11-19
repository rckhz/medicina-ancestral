import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/condicoes" element={<Conditions />} />
          <Route path="/condicoes/:slug" element={<ConditionDetails />} />
          <Route path="/preparacoes" element={<Preparations />} />
          <Route path="/preparacoes/:slug" element={<PreparationDetails />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/busca" element={<SearchResults />} />
          <Route path="/sobre" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
