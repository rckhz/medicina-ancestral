import { useEffect } from 'react'

const SITE = 'Medicina Ancestral'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : SITE
  }, [title])
}
