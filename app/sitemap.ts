import { getPageMarkdown } from 'app/lib/utils'
import { baseUrl } from 'app/metadata'
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
