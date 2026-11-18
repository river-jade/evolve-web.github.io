import './global.css'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from 'components/Footer'
import { cx } from 'lib/cx'
import { metadata as _metadata } from './metadata'

// Brand type: Marcellus for headings (one weight only), Manrope for everything else.
// https://fonts.google.com/specimen/Marcellus
// https://fonts.google.com/specimen/Manrope
// Self-hosted (latin subset, SIL Open Font License) so builds don't depend on
// Google Fonts: it sometimes returns `l/font?kit=` URLs that break the build.
const displayFont = localFont({
  src: './fonts/Marcellus-latin-400.woff2',
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})
const sansFont = localFont({
  src: './fonts/Manrope-latin-variable.woff2',
  weight: '400 700',
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = _metadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-forest bg-sand font-sans',
        displayFont.variable,
        sansFont.variable,
      )}
    >
      <body className="antialiased">
        <main className="flex-auto min-w-0 flex flex-col min-h-screen">
          {children}

          <Footer />

          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
