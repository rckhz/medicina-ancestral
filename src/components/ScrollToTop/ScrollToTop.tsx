import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Chaves de propósito: window.scrollTo pode devolver um valor em navegadores
    // novos, e o React trataria esse retorno como função de limpeza do efeito.
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
