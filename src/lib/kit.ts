/**
 * Ponte com o kit de design em public/assets (design-taste-frontend): system.js (menu, guardas),
 * motion.js (entrada do hero, hover) e layout.js. São módulos estáticos, carregados depois que o
 * React desenha a página, para que encontrem o HTML pronto.
 */
type KitModule = { mountAll?: (root?: ParentNode) => Promise<unknown>; unmountAll?: (root?: ParentNode) => void }

// Um import() escrito no código passa pelo Vite, que no `npm run dev` reescreve o endereço
// (/assets/system.js?import) e recusa arquivos de /public. Montado em tempo de execução, o import()
// vai direto ao navegador, como uma tag <script type="module">.
const nativeImport = new Function('url', 'return import(url)') as (url: string) => Promise<KitModule>
const load = (path: string): Promise<KitModule> => nativeImport(new URL(path, location.origin).href)

let booted: Promise<void> | null = null

export function bootKit(): Promise<void> {
  booted ??= (async () => {
    await load('/assets/system.js')
    await load('/assets/motion/motion.js')
    await load('/assets/layout/layout.js')
  })()
  return booted
}

/** Monta os momentos (animações de rolagem) de um trecho desenhado depois do carregamento. */
export async function mountMoments(root: ParentNode): Promise<void> {
  if (!booted) return
  await booted
  const moments = await load('/assets/moments/moments.js')
  await moments.mountAll?.(root)
}

export async function unmountMoments(root: ParentNode): Promise<void> {
  if (!booted) return
  const moments = await load('/assets/moments/moments.js')
  moments.unmountAll?.(root)
}

export function kitBooted(): boolean {
  return booted !== null
}
