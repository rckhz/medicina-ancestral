import { Link } from 'react-router-dom'

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className="logo" onClick={onClick}>
      <svg className="logo__mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <rect width="64" height="64" rx="18" fill="var(--moss)" />
        <path d="M32 52C32 34 40 20 52 12c-2 18-8 32-20 40Z" fill="var(--sage)" />
        <path d="M32 52C32 38 25 27 14 20c1 15 7 26 18 32Z" fill="var(--gold-soft)" />
        <path d="M32 52V30" stroke="#f3ebdd" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="logo__text">
        Medicina <em>Ancestral</em>
      </span>
    </Link>
  )
}
