'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cx } from 'lib/cx'

export function Navbar({overlay = false } : {overlay?: boolean}) {
  const [isScrolled, setIsScrolled] = useState(false)
  // Handle scroll effect for transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isTransparent = overlay && !isScrolled
  return (
    <nav
      className={cx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isTransparent
          ? 'bg-transparent border-transparent text-white py-6' // Hero State
          : 'bg-white/95 backdrop-blur-md border-stone-200 text-stone-800 py-3 shadow-sm' // Standard/Scrolled State
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
        <div className="hidden md:flex items-center gap-5 font-medium text-sm">
          <Link href="/mar-2026" className="hover:opacity-70 transition-opacity">Festival</Link>
          <Link href="/workshops/2026" className="hover:opacity-70 transition-opacity">Workshops</Link>
          <Link href="/values" className="hover:opacity-70 transition-opacity">Our Values</Link>

          {/* CTA Button */}
          <Link
            href="https://www.trybooking.com/DHISF"
            className={cx(
              "px-5 py-2 rounded-full font-bold transition-all",
              isTransparent
                ? "bg-white text-stone-900 hover:bg-stone-200"
                : "bg-stone-900 text-white hover:bg-teal-600"
            )}
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </nav>
  )
}
