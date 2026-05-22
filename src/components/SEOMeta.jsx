import { useEffect } from 'react'

export default function SEOMeta({ title, description, canonical }) {
  useEffect(() => {
    document.title = title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', description)
    const canonicalEl = document.querySelector('link[rel="canonical"]')
    if (canonicalEl && canonical) canonicalEl.setAttribute('href', canonical)
  }, [title, description, canonical])

  return null
}
