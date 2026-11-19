import { evidenceLevels, getCategory } from '../data/categories'
import type { ContentItem, ContentType, EvidenceLevel, Reference } from '../types/content'
import { normalize, parseFrontmatter } from './markdown'

// Arquivos que começam com "_" são modelos e não são publicados.
const files = import.meta.glob<string>(['../content/**/*.md', '!../content/**/_*.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE = /^\d{4}-\d{2}-\d{2}$/

function warn(path: string, message: string) {
  console.warn(`[conteúdo] ${path}: ${message}`)
}

function str(value: unknown): string | undefined {
  if (typeof value === 'number') return String(value)
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function strList(value: unknown): string[] {
  return Array.isArray(value) ? value.map(str).filter((v): v is string => !!v) : []
}

function isSafeUrl(url: string): boolean {
  return url.startsWith('/') || /^https?:\/\//.test(url)
}

function parseReferences(path: string, value: unknown): Reference[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((ref) => {
    const title = str(ref?.title)
    if (!title) {
      warn(path, 'referência sem "title" ignorada')
      return []
    }
    let url = str(ref.url)
    if (url && !isSafeUrl(url)) {
      warn(path, `URL de referência inválida: ${url}`)
      url = undefined
    }
    return [{ title, author: str(ref.author), year: str(ref.year), url }]
  })
}

function toItem(path: string, raw: string): ContentItem | null {
  const type: ContentType | null = path.includes('/conditions/')
    ? 'condition'
    : path.includes('/preparations/')
      ? 'preparation'
      : null
  if (!type) {
    warn(path, 'arquivo fora de conditions/ ou preparations/')
    return null
  }

  const { data, body } = parseFrontmatter(raw)
  if (data.published !== true) return null

  const fileSlug = path.split('/').pop()!.replace(/\.md$/, '')
  const slug = str(data.slug) ?? fileSlug
  const title = str(data.title)
  const description = str(data.description)
  const category = str(data.category)

  if (data.type !== undefined && data.type !== type) warn(path, `"type: ${String(data.type)}" não corresponde à pasta (${type})`)
  if (!SLUG.test(slug)) return warn(path, `slug inválido "${slug}"`), null
  if (!title) return warn(path, 'campo "title" obrigatório'), null
  if (!description) return warn(path, 'campo "description" obrigatório'), null
  if (!category || !getCategory(type, category)) return warn(path, `categoria inválida "${category}"`), null

  let evidence = str(data.evidence) as EvidenceLevel | undefined
  if (evidence && !(evidence in evidenceLevels)) {
    warn(path, `evidência desconhecida "${evidence}"`)
    evidence = undefined
  }

  let image = str(data.image)
  if (image && !isSafeUrl(image)) {
    warn(path, `imagem inválida "${image}"`)
    image = undefined
  }

  let lastUpdated = str(data.lastUpdated)
  if (lastUpdated && !DATE.test(lastUpdated)) {
    warn(path, `data inválida "${lastUpdated}" (use AAAA-MM-DD)`)
    lastUpdated = undefined
  }

  return {
    type,
    slug,
    title,
    description,
    category,
    evidence,
    image,
    imageAlt: str(data.imageAlt),
    reviewed: data.reviewed === true,
    safetyNotice: data.safetyNotice !== false,
    lastUpdated,
    keywords: strList(data.keywords),
    plantNames: strList(data.plantNames),
    related: strList(data.related),
    references: parseReferences(path, data.references),
    body,
    path,
  }
}

function load(): ContentItem[] {
  const items: ContentItem[] = []
  const seen = new Set<string>()
  for (const [path, raw] of Object.entries(files)) {
    const item = toItem(path, raw)
    if (!item) continue
    const key = `${item.type}:${item.slug}`
    if (seen.has(key)) {
      warn(path, `slug duplicado "${item.slug}" ignorado`)
      continue
    }
    seen.add(key)
    items.push(item)
  }
  return items.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
}

export const allContent = load()

export function getContent(type: ContentType): ContentItem[] {
  return allContent.filter((item) => item.type === type)
}

export function getBySlug(type: ContentType, slug: string): ContentItem | undefined {
  return allContent.find((item) => item.type === type && item.slug === slug)
}

/** Itens do outro tipo ligados a este, em qualquer direção do campo "related". */
export function getRelated(item: ContentItem): ContentItem[] {
  return allContent.filter(
    (other) =>
      other.type !== item.type &&
      (item.related.includes(other.slug) || other.related.includes(item.slug)),
  )
}

export function countByCategory(type: ContentType, category: string): number {
  return allContent.filter((item) => item.type === type && item.category === category).length
}

// ---- Busca local ----

const index = allContent.map((item) => ({
  item,
  title: normalize(item.title),
  names: normalize([...item.plantNames, ...item.keywords].join(' ')),
  meta: normalize(
    [item.description, item.category, getCategory(item.type, item.category)?.name ?? ''].join(' '),
  ),
  body: normalize(item.body),
}))

/** Todos os termos precisam aparecer; título e nomes de plantas pesam mais. */
export function searchContent(query: string, pool: ContentItem[] = allContent): ContentItem[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  if (terms.length === 0) return pool

  const allowed = new Set(pool)
  return index
    .filter((entry) => allowed.has(entry.item))
    .map((entry) => {
      let score = 0
      for (const term of terms) {
        const s =
          (entry.title.includes(term) ? 4 : 0) +
          (entry.names.includes(term) ? 3 : 0) +
          (entry.meta.includes(term) ? 2 : 0) +
          (entry.body.includes(term) ? 1 : 0)
        if (s === 0) return { item: entry.item, score: 0 }
        score += s
      }
      return { item: entry.item, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item)
}
