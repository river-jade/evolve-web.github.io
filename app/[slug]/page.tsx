import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/CustomMDX'
import { getHashLinks, getPageMarkdown, parseHeadings } from 'app/lib/utils'
import { baseUrl, authorName } from 'app/metadata'
import { Banner } from 'app/components/Banner'
import { cx } from 'app/lib/cx'
import { Workshops } from 'app/components/Workshops'
import { Navbar } from 'app/components/Navbar'

export async function generateStaticParams() {
  let posts = getPageMarkdown()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }) {
  let post = getPageMarkdown().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Page({ params }) {
  let page = getPageMarkdown().find((post) => post.slug === params.slug)

  if (!page) {
    notFound()
  }

  const headings = parseHeadings(page.content)
  const links = getHashLinks(headings)

  return (
    <div className="Page relative flex flex-col gap-6">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            headline: page.metadata.title,
            datePublished: page.metadata.publishedAt,
            dateModified: page.metadata.publishedAt,
            description: page.metadata.summary,
            image: page.metadata.image
              ? `${baseUrl}${page.metadata.image}`
              : `/og?title=${encodeURIComponent(page.metadata.title)}`,
            url: `${baseUrl}/${page.slug}`,
            author: {
              '@type': 'Person',
              name: authorName,
            },
          }),
        }}
      />
      <Banner title={page.metadata.title} />
      <Navbar links={links} />

      <section
        className={cx(`prose max-w-xl mx-auto`, page.metadata.className)}
      >
        <CustomMDX source={page.content} components={{ Workshops }} />
      </section>
    </div>
  )
}
