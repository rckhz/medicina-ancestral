export type ContentType = 'condition' | 'preparation'

export type EvidenceLevel =
  | 'consistent'
  | 'limited'
  | 'traditional'
  | 'insufficient'
  | 'not-recommended'

export interface Reference {
  title: string
  author?: string
  year?: string
  url?: string
}

export interface ContentItem {
  type: ContentType
  title: string
  slug: string
  category: string
  description: string
  image?: string
  imageAlt?: string
  evidence?: EvidenceLevel
  /** true quando um profissional de saúde revisou o conteúdo */
  reviewed: boolean
  /** false oculta o aviso "Conteúdo educativo" no artigo */
  safetyNotice: boolean
  lastUpdated?: string
  keywords: string[]
  plantNames: string[]
  /** slugs do outro tipo (condição -> preparações, preparação -> condições) */
  related: string[]
  references: Reference[]
  body: string
  /** caminho do arquivo .md de origem */
  path: string
}

export type IconName =
  | 'leaf'
  | 'cup'
  | 'drop'
  | 'flask'
  | 'wind'
  | 'bowl'
  | 'sparkle'
  | 'activity'
  | 'moon'
  | 'heart'
  | 'smile'
  | 'search'
  | 'arrow'
  | 'menu'
  | 'close'
  | 'book'
  | 'alert'
  | 'compass'

export interface Category {
  slug: string
  name: string
  type: ContentType
  description: string
  icon: IconName
}
