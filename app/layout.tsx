import './global.css'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/Footer'
import { cx } from './lib/cx'
import { metadata as _metadata } from './metadata'

// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#google-fonts
// https://fonts.google.com/specimen/Poppins
const poppinsFont = Poppins({ subsets: ['latin'], weight: '400' })

export const metadata = _metadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx('text-black bg-white dark:text-white dark:bg-black', poppinsFont.className)}>
      <body className="antialiased mt-8 mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
