'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Icon } from './Icon'

export type Slide = { src: string; alt: string }

/**
 * Self-paced slide viewer: swipe or scroll the track, or use the arrow
 * buttons / arrow keys. One slide fills the frame at a time.
 */
export function SlideCarousel({ slides, label }: { slides: Slide[]; label: string }) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current
      if (!track) return
      const clamped = Math.max(0, Math.min(slides.length - 1, i))
      track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' })
    },
    [slides.length],
  )

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let t: ReturnType<typeof setTimeout>
    const onScroll = () => {
      clearTimeout(t)
      t = setTimeout(() => setIndex(Math.round(track.scrollLeft / track.clientWidth)), 60)
    }
    track.addEventListener('scroll', onScroll)
    return () => {
      clearTimeout(t)
      track.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="flex flex-col gap-3">
      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Slides, scroll or use the arrow keys"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault()
            goTo(index - 1)
          }
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            goTo(index + 1)
          }
        }}
        className="flex overflow-x-auto snap-x snap-mandatory rounded-md border border-line bg-forest [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
      >
        {slides.map((slide, i) => (
          <li
            key={slide.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            className="relative w-full shrink-0 snap-center aspect-video"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(min-width: 768px) 560px, 92vw"
              className="object-contain"
            />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous slide"
          className="flex h-10 w-10 items-center justify-center rounded-pill border border-line bg-paper text-forest transition-colors hover:bg-leaf/50 disabled:opacity-40 disabled:hover:bg-paper"
        >
          <Icon name="chevronLeft" size={18} />
        </button>
        <p className="text-small text-ink-soft tabular-nums" aria-live="polite">
          {index + 1} of {slides.length}
        </p>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === slides.length - 1}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center rounded-pill border border-line bg-paper text-forest transition-colors hover:bg-leaf/50 disabled:opacity-40 disabled:hover:bg-paper"
        >
          <Icon name="chevronRight" size={18} />
        </button>
      </div>
    </div>
  )
}

export default SlideCarousel
