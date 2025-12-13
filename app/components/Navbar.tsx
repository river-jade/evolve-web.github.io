'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getPageLinks } from 'app/lib/utils'
import { cx } from 'app/lib/cx'

export function Navbar({ links }: { links?: Record<string, { name: string }> }) {
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect for transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm border-gray-200 text-stone-800'
          : 'bg-transparent py-6 border-transparent text-white'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* BRANDING */}
        <Link href="/" className="flex items-center gap-2 group">
           {/* Optional: Add Logo Image here if you have one available as a file */}
           <span className="text-2xl font-extrabold tracking-tighter">
             EVOLVE
           </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link href="/mar-2026" className="hover:opacity-70 transition-opacity">Festival 2026</Link>
          <Link href="/principles" className="hover:opacity-70 transition-opacity">Principles</Link>

          {/* CTA Button */}
          <Link
            href="/mar-2026"
            className={cx(
              "px-5 py-2 rounded-full font-bold transition-all",
              isScrolled
                ? "bg-stone-900 text-white hover:bg-teal-600"
                : "bg-white text-stone-900 hover:bg-stone-200"
            )}
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </nav>
  )
}
