import './global.css'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/Footer'
import { cx } from './lib/cx'
import { metadata as _metadata } from './metadata'

// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#google-fonts
// https://fonts.google.com/specimen/Poppins
const poppinsFont = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] })

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
        'text-black bg-white',
        poppinsFont.className,
      )}
    >
      {/* CHANGED: Removed mt-8 mx-auto to allow full-width designs */}
      <body className="antialiased selection:bg-teal-200 selection:text-teal-900">
        <main className="flex-auto min-w-0 flex flex-col">
          {children}

          {/* Constrain the footer so it doesn't look too wide */}
          <div className="max-w-4xl mx-auto w-full px-6">
            <Footer />
          </div>

          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
