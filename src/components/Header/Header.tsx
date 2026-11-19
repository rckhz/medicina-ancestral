import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '../Icon/Icon'
import Logo from '../Logo/Logo'
import Search from '../Search/Search'

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/preparacoes', label: 'Plantas e preparações' },
  { to: '/condicoes', label: 'Condições' },
  { to: '/categorias', label: 'Categorias' },
  { to: '/sobre', label: 'Sobre' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className={open ? 'site-header is-open' : 'site-header'}>
      <div className="container site-header__inner">
        <Logo onClick={close} />

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? 'close' : 'menu'} />
          <span className="visually-hidden">{open ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>

        <div className="site-header__menu" id="menu-principal">
          <nav aria-label="Principal">
            <ul className="nav">
              {links.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.end} onClick={close}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <Search variant="compact" onSubmitted={close} />
        </div>
      </div>
    </header>
  )
}
