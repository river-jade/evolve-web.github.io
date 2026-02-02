import './global.css'
import type { Metadata } from 'next'

export const title = 'Evolve Community'

export const description = `Evolve is a "transformational" festival; a gathering of people on
    land to connect with themselves and each other in a ritual that
    breaks them out of the routine of everyday life.`

export const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://evolvecommunity.world'

export const contactEmail = 'contact@evolvecommunity.world'

export const authorName = 'Evolve Community'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  openGraph: {
    title,
    description,
    url: baseUrl,
    siteName: title,
    locale: 'en_AU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/public/favicon.ico',
    apple: '/public/apple-touch-icon.png',
    // <link rel="icon" href="/favicon.ico" />
    // <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    // TODO serve additional sizes
    // <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    // <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  },
}
