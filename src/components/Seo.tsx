import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { site } from '../content/site'

type Props = { title: string; description: string; noindex?: boolean }

function setMeta(attr: 'name' | 'property', key: string, content: string | null) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (content === null) return el?.remove()
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function setCanonical(href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (href === null) return el?.remove()
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

export default function Seo({ title, description, noindex = false }: Props) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = pathname === '/' ? `${site.fullName} | ${site.locality}` : `${title} | ${site.fullName}`
    const url = site.siteUrl ? `${site.siteUrl}${pathname}` : null
    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    if (url) setMeta('property', 'og:url', url)
    setCanonical(noindex ? null : url)
    setMeta('name', 'robots', noindex ? 'noindex' : null)
  }, [title, description, noindex, pathname])

  return null
}
