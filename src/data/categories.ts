import type { Category, ContentType, EvidenceLevel } from '../types/content'

export const categories: Category[] = [
  { slug: 'respiratorias', icon: 'wind', name: 'Doenças respiratórias', type: 'condition', description: 'Gripes, resfriados, tosse e outras condições das vias aéreas.' },
  { slug: 'digestivas', icon: 'bowl', name: 'Problemas digestivos', type: 'condition', description: 'Desconfortos do estômago e do intestino.' },
  { slug: 'dermatologicas', icon: 'sparkle', name: 'Condições dermatológicas', type: 'condition', description: 'Cuidados com a pele.' },
  { slug: 'musculares', icon: 'activity', name: 'Músculos e articulações', type: 'condition', description: 'Dores musculares, tensões e problemas articulares.' },
  { slug: 'saude-mental', icon: 'moon', name: 'Saúde mental e sono', type: 'condition', description: 'Sono, estresse, ansiedade e bem-estar emocional.' },
  { slug: 'cardiovasculares', icon: 'heart', name: 'Saúde cardiovascular', type: 'condition', description: 'Coração, circulação e pressão arterial.' },
  { slug: 'saude-bucal', icon: 'smile', name: 'Saúde bucal', type: 'condition', description: 'Dentes, gengivas e boca.' },
  { slug: 'plantas-medicinais', icon: 'leaf', name: 'Plantas medicinais', type: 'preparation', description: 'Fichas de plantas e seus usos estudados.' },
  { slug: 'infusoes', icon: 'cup', name: 'Infusões e chás', type: 'preparation', description: 'Preparações feitas com água quente.' },
  { slug: 'compressas', icon: 'drop', name: 'Compressas', type: 'preparation', description: 'Aplicações externas quentes ou frias.' },
  { slug: 'outras', icon: 'flask', name: 'Outras preparações', type: 'preparation', description: 'Xaropes, preparações tópicas e outras.' },
]

export function getCategory(type: ContentType, slug: string): Category | undefined {
  return categories.find((c) => c.type === type && c.slug === slug)
}

export const evidenceLevels: Record<EvidenceLevel, { label: string; meaning: string }> = {
  consistent: { label: 'Evidência consistente', meaning: 'Pesquisas de boa qualidade sustentam determinado uso.' },
  limited: { label: 'Evidência limitada', meaning: 'Existem estudos, mas permanecem incertezas.' },
  traditional: { label: 'Uso tradicional documentado', meaning: 'Existe histórico de utilização, sem confirmação clínica suficiente.' },
  insufficient: { label: 'Evidência insuficiente', meaning: 'Não existem informações adequadas para concluir sobre eficácia ou segurança.' },
  'not-recommended': { label: 'Não recomendado', meaning: 'Existem riscos relevantes ou ausência de justificativa para orientar o uso.' },
}

export const typeInfo: Record<ContentType, { plural: string; basePath: string }> = {
  condition: { plural: 'Condições', basePath: '/condicoes' },
  preparation: { plural: 'Plantas e preparações', basePath: '/preparacoes' },
}
