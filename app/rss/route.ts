import type { DefaultTemplateString } from 'next/dist/lib/metadata/types/metadata-types'
import { getPageMarkdown } from 'app/lib/utils'
import { metadata } from 'app/layout'
import { baseUrl } from 'app/sitemap'

export async function GET() {
  let allBlogs = await getPageMarkdown()

  const itemsXml = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .map(
      (post) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/${post.slug}</link>
          <description>${post.metadata.summary || ''}</description>
          <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
        </item>`,
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>${(metadata.title as DefaultTemplateString).default}</title>
        <link>${baseUrl}</link>
        <description>${metadata.description}</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
