import './global.css'
import { Marcellus, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from 'components/Footer'
import { cx } from 'lib/cx'
import { metadata as _metadata } from './metadata'

// Brand type: Marcellus for headings (one weight only), Manrope for everything else.
// https://fonts.google.com/specimen/Marcellus
// https://fonts.google.com/specimen/Manrope
const displayFont = Marcellus({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})
const sansFont = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
