'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Icon'

export type LightboxImage = { src: string; alt: string }

const overlayButton =
  'flex items-center justify-center w-11 h-11 rounded-pill border border-paper/40 text-paper hover:bg-paper/15 transition-colors disabled:opacity-30 disabled:hover:bg-transparent'

/**
 * Full-screen view of one image, styled like the photo gallery's lightbox.
 * Esc or a click outside closes it. With more than one image it shows
 * previous/next buttons and a counter, and the arrow keys step through.
 */
export function LightboxOverlay({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: LightboxImage[]
  index: number
  onIndexChange?: (index: number) => void
  onClose: () => void
}) {
  const many = images.length > 1 && onIndexChange
  const go = (i: number) => onIndexChange?.(Math.max(0, Math.min(images.length - 1, i)))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (many && e.key === 'ArrowLeft') go(index - 1)
      if (many && e.key === 'ArrowRight') go(index + 1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }) // re-binds each render so the handler sees the current index

  const image = images[index]

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-forest/90 p-6"
      onClick={onClose}
    >
      <div className="flex max-w-full max-h-full flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex w-full items-center justify-between gap-4">
          <p className="text-small text-paper/80 tabular-nums" aria-live="polite">
            {many ? `${index + 1} of ${images.length}` : ''}
          </p>
          <button type="button" onClick={onClose} aria-label="Close" title="Esc" autoFocus className={overlayButton}>
            <Icon name="close" size={20} />
          </button>
        </div>
        <img
          src={image.src}
          alt={image.alt}
          className="block max-w-full max-h-[75vh] w-auto h-auto rounded-md bg-paper"
        />
        {many && (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous image"
              className={overlayButton}
            >
              <Icon name="chevronLeft" size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === images.length - 1}
              aria-label="Next image"
              className={overlayButton}
            >
              <Icon name="chevronRight" size={20} />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

/** Wraps a thumbnail so clicking it opens the full image in a LightboxOverlay. */
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
      {open && <LightboxOverlay images={[{ src, alt }]} index={0} onClose={() => setOpen(false)} />}
    </>
  )
}

export default ImageLightbox
