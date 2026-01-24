'use client'

import { useEffect, useState } from 'react'

/**
 * Sets scroll-padding-top on the `html` element to accommodate a Navbar that
 * has a variable height depending on the number of headings on the page.
 *
 * It can be used in two ways:
 *
 * 1. Pass `navbarSelector` to set the scroll padding top for the page based on
 *    the height of the navbar.
 * 2. Pass `scrollPaddingTop` to set the scroll padding top for the page.
 */
export const ScrollConfig = ({
  navbarSelector,
  navbarExtraOffsetPx: navbarExtraOffset = 0,
  scrollPaddingTop,
}: {
  /** passed to document.querySelector */
  navbarSelector?: string
  /** extra offset to add to the scroll padding top, in pixels */
  navbarExtraOffsetPx?: number
  /** set a static value for scroll-padding-top */
  scrollPaddingTop?: string
}) => {
  const [original, setOriginal] = useState<string | null>(null)

  // get initial scroll padding
  useEffect(() => {
    if (!(navbarSelector || scrollPaddingTop)) return

    const getInitialScrollPadding = () => {
      if (!document?.documentElement) return

      const computedStyle = window.getComputedStyle(document.documentElement)
      const currentScrollPadding = computedStyle.scrollPaddingTop

      if (original === null && currentScrollPadding !== '0px') {
        setOriginal(currentScrollPadding)
      }
    }

    // Check if document is already loaded
    if (document.readyState === 'complete') {
      getInitialScrollPadding()
    } else {
      // Wait for everything to load (including stylesheets)
      window.addEventListener('load', getInitialScrollPadding)
      return () => window.removeEventListener('load', getInitialScrollPadding)
    }
  }, [original])

  // handle scroll padding updates
  useEffect(() => {
    const htmlStyle = document?.documentElement?.style
    if (!htmlStyle || !original) return

    if (navbarSelector) {
      const navbar = document.querySelector(navbarSelector)
      if (navbar) {
        htmlStyle.scrollPaddingTop =
          (navbar as HTMLElement).offsetHeight + navbarExtraOffset + 'px'
      }
    } else if (scrollPaddingTop) htmlStyle.scrollPaddingTop = scrollPaddingTop

    // reset the original scroll padding when unmounting
    return () => {
      if (original) htmlStyle.scrollPaddingTop = original
    }
  }, [original, scrollPaddingTop])

  return null
}
