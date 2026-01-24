import { getPageMarkdown } from 'lib/utils'
import { baseUrl } from '@/metadata'
export default async function sitemap() {
  let pages = getPageMarkdown().map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.metadata.publishedAt,
  }))

  let routes = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...pages]
}
