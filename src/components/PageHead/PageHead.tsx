import type { ReactNode } from 'react'

interface Props {
  title: string
  children?: ReactNode
}

/** Faixa de abertura das páginas internas. */
export default function PageHead({ title, children }: Props) {
  return (
    <header className="page-head">
      <div className="container">
        <h1>{title}</h1>
        {children}
      </div>
    </header>
  )
}
