import type { ReactNode } from 'react'

interface Props {
  eyebrow?: string
  title: string
  children?: ReactNode
}

/** Faixa de abertura das páginas internas. */
export default function PageHead({ eyebrow, title, children }: Props) {
  return (
    <header className="page-head">
      <div className="ma-wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {children}
      </div>
    </header>
  )
}
