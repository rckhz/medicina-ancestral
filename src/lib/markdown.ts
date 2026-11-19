import { parse } from 'yaml'

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/

/**
 * Separa o frontmatter YAML do corpo do Markdown.
 * (Substitui o gray-matter, que depende de APIs do Node e não roda no navegador.)
 */
export function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const text = raw.replace(/^﻿/, '')
  const match = FRONTMATTER.exec(text)
  if (!match) return { data: {}, body: text }

  const data: unknown = parse(match[1])
  const isObject = typeof data === 'object' && data !== null && !Array.isArray(data)
  return {
    data: isObject ? (data as Record<string, unknown>) : {},
    body: text.slice(match[0].length),
  }
}

/** Gera um id de âncora a partir do texto de um título. */
export function slugify(text: string): string {
  return normalize(text)
    .replace(/[*_`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Títulos de nível 2 (## ...) do Markdown, para o índice do artigo. */
export function getHeadings(markdown: string): { id: string; text: string }[] {
  return [...markdown.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => {
    const text = m[1].replace(/[*_`]/g, '')
    return { id: slugify(text), text }
  })
}

/** Remove acentos e caixa para comparações de busca. */
export function normalize(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}
