import { notFound } from 'next/navigation'
import { CustomMDX } from 'components/CustomMDX'
import { Banner } from 'components/Banner'
import { FAQ } from 'components/FAQ'
import { Navbar } from 'components/Navbar'
import { Workshops } from 'components/Workshops'
import { getPageMarkdown } from 'lib/utils'
import { baseUrl, authorName } from '@/metadata'
import { cx } from 'lib/cx'
import Link from 'next/link'

export async function generateStaticParams() {
  let posts = getPageMarkdown()
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }))
}

export function generateMetadata({ params }) {
  const fullPath = params.slug.join('/');
  let post = getPageMarkdown().find((post) => post.slug === fullPath)
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
    ? (image.startsWith('/') ? `${baseUrl}${image}` : image) // Auto-fix relative paths
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

export default function Page({ params }: { params: { slug: string[] } }) {
  const fullPath = params.slug.join('/');
  let page = getPageMarkdown().find((post) => post.slug === fullPath)

  if (!page) {
    notFound()
  }

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
      <Navbar overlay={false} />
      <div className="pt-24 px-6">
          <Banner title={page.metadata.title} />
      </div>
      <section
        className={cx(`prose max-w-xl mx-auto px-6`, page.metadata.className)}
      >
        <CustomMDX source={page.content} components={{ Workshops, FAQ, Link }} />
      </section>
    </div>
  )
}
