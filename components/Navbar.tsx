'use client'

import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { cx } from 'lib/cx'

const NAV_LINKS = [
  { href: '/mar-2026', label: 'Festival' },
  { href: '/workshops/2026', label: 'Workshops' },
  { href: '/schedule/2026', label: 'Schedule' },
  { href: '/values', label: 'Our Values' },
]

const TICKET_LINK = 'https://www.trybooking.com/DHISF'

export function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect for transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  const isTransparent = overlay && !isScrolled && !isMobileMenuOpen
  return (
    <>
      <nav
        className={cx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
          isTransparent
            ? 'bg-transparent border-transparent text-white py-6'
            : 'bg-white/95 backdrop-blur-md border-stone-200 text-stone-800 py-3 shadow-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* BRANDING */}
          <Link href="/" className="flex items-center gap-2 group" onClick={closeMobileMenu}>
            <span className="text-2xl font-extrabold tracking-tighter">
              EVOLVE
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-5 font-medium text-sm">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="hover:opacity-70 transition-opacity">{label}</Link>
            ))}
            <Link
              href={TICKET_LINK}
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

          {/* MOBILE BURGER BUTTON */}
          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={cx(
              "absolute w-5 h-0.5 rounded-full transition-all duration-300",
              isTransparent ? "bg-white" : "bg-stone-800",
              isMobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
            )} />
            <span className={cx(
              "absolute w-5 h-0.5 rounded-full transition-all duration-300",
              isTransparent ? "bg-white" : "bg-stone-800",
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            )} />
            <span className={cx(
              "absolute w-5 h-0.5 rounded-full transition-all duration-300",
              isTransparent ? "bg-white" : "bg-stone-800",
              isMobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
            )} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={cx(
          "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobileMenu}
      />

      {/* MOBILE MENU DRAWER */}
      <div
        className={cx(
          "fixed top-0 right-0 h-full w-72 bg-white z-40 shadow-xl transition-transform duration-300 ease-out md:hidden flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-1 pt-24 px-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMobileMenu}
              className={cx(
                "text-lg font-semibold py-3 px-3 rounded-xl transition-colors",
                pathname.startsWith(href)
                  ? "text-teal-700 bg-teal-50"
                  : "text-stone-700 hover:bg-stone-50"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="mt-auto px-6 pb-8">
          <Link
            href={TICKET_LINK}
            onClick={closeMobileMenu}
            className="block w-full text-center px-5 py-3 rounded-full font-bold bg-stone-900 text-white hover:bg-teal-600 transition-all text-lg"
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar