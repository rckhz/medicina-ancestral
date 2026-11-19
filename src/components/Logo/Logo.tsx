/** O logo do projeto (a folha do favicon) e o nome na fonte de títulos, como o kit pede (.nav__logo).
 *  No celular o nome (18 letras) não cabe ao lado do botão: fica só a folha, e o nome segue para leitores de tela. */
export default function Logo() {
  return (
    <a className="nav__logo" href="/">
      <svg className="logo-mark" viewBox="0 0 64 64" width="28" height="28" aria-hidden="true" focusable="false">
        <rect width="64" height="64" rx="14" fill="#233D32" />
        <path d="M32 52C32 34 40 20 52 12c-2 18-8 32-20 40Z" fill="#71866A" />
        <path d="M32 52C32 38 25 27 14 20c1 15 7 26 18 32Z" fill="#D6C69A" />
        <path d="M32 52V30" stroke="#F3EBDD" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="nav__name">Medicina Ancestral</span>
    </a>
  )
}
