import { getPageMarkdown } from 'app/lib/utils'

export const baseUrl = 'https://evolvecommunity.world'

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
