'use client'

import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { cx } from 'lib/cx'

const NAV_LINKS = [
  { href: '/', label: 'Home', mobileOnly: true },
  // { href: '/mar-2026', label: 'Festival' },
  // { href: '/workshops/2026', label: 'Workshops' },
  // { href: '/schedule/2026', label: 'Schedule' },
  { href: '/values', label: 'Our Values' },
  { href: '/past-events', label: 'Past Events' },
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
            ? 'bg-transparent border-transparent text-paper py-4'
            : 'bg-sand/95 backdrop-blur-md border-line text-forest py-2'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">

          {/* BRANDING */}
          {/* Horizontal lockup. Kept at 60px so the double spiral stays above its 48px minimum. */}
          <Link href="/" className="flex items-center" onClick={closeMobileMenu} aria-label="Evolve home">
            <img
              src={isTransparent ? '/brand/evolve-lockup-horizontal-on-dark.svg' : '/brand/evolve-lockup-horizontal.svg'}
              alt="Evolve"
              width={220}
              height={60}
              className="h-[60px] w-auto"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8 font-medium text-small">
            {NAV_LINKS.filter(l => !l.mobileOnly).map(({ href, label }) => (
              <Link key={href} href={href} className="underline decoration-transparent decoration-2 underline-offset-8 hover:decoration-current transition-colors">{label}</Link>
            ))}
            {/* <Link
              href={TICKET_LINK}
              className={cx(
                "px-5 py-2 rounded-pill font-semibold transition-colors",
                isTransparent
                  ? "bg-sun text-forest hover:bg-paper"
                  : "bg-forest text-paper hover:bg-ink-soft"
              )}
            >
              Get Tickets
            </Link> */}
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
              isTransparent ? "bg-paper" : "bg-forest",
              isMobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
            )} />
            <span className={cx(
              "absolute w-5 h-0.5 rounded-full transition-all duration-300",
              isTransparent ? "bg-paper" : "bg-forest",
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            )} />
            <span className={cx(
              "absolute w-5 h-0.5 rounded-full transition-all duration-300",
              isTransparent ? "bg-paper" : "bg-forest",
              isMobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
            )} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={cx(
          "fixed inset-0 bg-forest/70 z-40 transition-opacity duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobileMenu}
      />

      {/* MOBILE MENU DRAWER */}
      <div
        className={cx(
          "fixed top-0 right-0 h-full w-72 bg-paper border-l border-line z-40 transition-transform duration-300 ease-out md:hidden flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-1 pt-28 px-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMobileMenu}
              className={cx(
                "text-lg font-medium py-3 px-4 rounded-md transition-colors",
                (href === '/' ? pathname === '/' : pathname.startsWith(href))
                  ? "text-forest bg-leaf/50"
                  : "text-forest hover:bg-sand"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* <div className="mt-auto px-6 pb-8">
          <Link
            href={TICKET_LINK}
            onClick={closeMobileMenu}
            className="block w-full text-center px-5 py-3 rounded-pill font-semibold bg-forest text-paper hover:bg-ink-soft transition-colors text-lg"
          >
            Get Tickets
          </Link>
        </div> */}
      </div>
    </>
  )
}

export default Navbar