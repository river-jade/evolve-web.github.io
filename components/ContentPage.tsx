import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from 'components/Navbar'
import Banner from 'components/Banner'
import { cx } from 'lib/cx'

/** What a text page says about itself: its heading, and what search results and link previews show. */
export type PageInfo = {
  path: string
  title: string
  /** A sentence or two shown in search results and link previews. */
  summary?: string
  /** Image for link previews. Without one, a card with the title is generated. */
  image?: string
}

export function pageMetadata({ path, title, summary, image }: PageInfo): Metadata {
  const previewImage = image ?? `/og?title=${encodeURIComponent(title)}`
  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      url: path,
      images: [{ url: previewImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
      images: [previewImage],
    },
  }
}

/** Layout for text pages: navbar, page title, then the content styled as prose. */
export function ContentPage({
  title,
  className,
  children,
}: PageInfo & { className?: string; children: React.ReactNode }) {
  return (
    <div className="Page relative flex flex-col gap-6 pb-10">
      <Navbar overlay={false} />
      <div className="pt-28 px-6">
        <Banner title={title} />
      </div>
      <section className={cx('prose w-full max-w-2xl mx-auto px-6', className)}>
        {children}
      </section>
    </div>
  )
}

/** A link: pages on this site open in place, other websites open in a new tab. */
export function A({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith('/')) {
    return <Link href={href}>{children}</Link>
  }
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return <a href={href}>{children}</a>
}
