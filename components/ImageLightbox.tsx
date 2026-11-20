'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icon'

/**
 * Wraps a thumbnail so clicking it opens the full image in an overlay,
 * styled like the photo gallery's lightbox. Esc or a click outside closes it.
 */
export function ImageLightbox({
  src,
  alt,
  children,
}: {
  /** The full-size image shown in the overlay */
  src: string
  alt: string
  /** The thumbnail shown on the page */
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge image: ${alt}`}
        className="block w-full cursor-zoom-in rounded-md outline-none focus-visible:ring-2 focus-visible:ring-forest"
      >
        {children}
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-forest/90 p-6"
            onClick={() => setOpen(false)}
          >
            <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                title="Esc"
                autoFocus
                className="absolute -top-14 right-0 flex items-center justify-center w-11 h-11 rounded-pill border border-paper/40 text-paper hover:bg-paper/15 transition-colors"
              >
                <Icon name="close" size={20} />
              </button>
              <img
                src={src}
                alt={alt}
                className="block max-w-full max-h-[80vh] w-auto h-auto rounded-md bg-paper"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export default ImageLightbox
