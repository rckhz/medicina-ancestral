// Gera um HTML estático por rota (dist/<rota>/index.html) com a página já desenhada.
// O navegador hidrata esse HTML; o kit de design e os buscadores enxergam o conteúdo sem JavaScript.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const dist = join(root, 'dist')
const ssr = join(root, 'dist-ssr')
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const { render, routes } = await import(pathToFileURL(join(ssr, 'entry-server.js')).href)

for (const url of routes()) {
  const html = template.replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`)
  const file = url === '/' ? join(dist, 'index.html') : join(dist, url, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
}
// 404: o mesmo app, sem conteúdo prévio (o navegador desenha a página "não encontrada")
writeFileSync(join(dist, '404.html'), template)
rmSync(ssr, { recursive: true, force: true })
console.log(`prerender: ${routes().length} páginas em dist/`)
