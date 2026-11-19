import { useId, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../Icon/Icon'

interface Props {
  defaultValue?: string
  /** compact: cabeçalho · hero: página inicial · default: página de busca */
  variant?: 'default' | 'compact' | 'hero'
  onSubmitted?: () => void
}

export default function Search({ defaultValue = '', variant = 'default', onSubmitted }: Props) {
  const navigate = useNavigate()
  const id = useId()
  const compact = variant === 'compact'

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = String(new FormData(event.currentTarget).get('q') ?? '').trim()
    navigate(query ? `/busca?q=${encodeURIComponent(query)}` : '/busca')
    onSubmitted?.()
  }

  return (
    <form role="search" className={`search search--${variant}`} onSubmit={handleSubmit}>
      <label htmlFor={id} className="visually-hidden">
        Pesquisar plantas, preparações e condições
      </label>
      <div className="search__field">
        <Icon name="search" className="search__icon" />
        <input
          id={id}
          key={defaultValue}
          name="q"
          type="search"
          defaultValue={defaultValue}
          placeholder={compact ? 'Buscar…' : 'Busque uma planta ou sintoma'}
          autoComplete="off"
        />
        <button type="submit" className={compact ? 'visually-hidden' : undefined}>
          Buscar
        </button>
      </div>
    </form>
  )
}
