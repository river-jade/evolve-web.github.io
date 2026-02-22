'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Workshop, ScheduleEvent } from 'lib/data'
import { slugify } from 'lib/client_utils'

export const WorkshopList = ({ workshops, year, scheduleEvents }: { workshops: Workshop[], year: string, scheduleEvents: ScheduleEvent[] }) => {
  // Build a lookup: lowercase workshop title → day
  const workshopDayMap = useMemo(() => {
    const map: Record<string, string> = {}
    scheduleEvents.forEach(e => {
      if (e.type !== 'break') {
        map[e.title.toLowerCase()] = e.day
      }
    })
    return map
  }, [scheduleEvents])
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const triggerFlash = (slug: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)

    setHighlightedSlug(slug) // Turn ON (Instant)

    // Wait 1/2 second, then Turn OFF (Trigger CSS fade)
    timerRef.current = setTimeout(() => {
      setHighlightedSlug(null)
    }, 500)
  }

  useEffect(() => {
    // Slight delay on load to let the page settle before flashing
    const initTimer = setTimeout(() => {
      const hash = window.location.hash.replace('#', '')
      if (hash) triggerFlash(hash)
    }, 100)
    return () => clearTimeout(initTimer)
  }, [])

  const [expandedSlugs, setExpandedSlugs] = useState<Set<string>>(new Set())

  const toggleExpand = (e: React.MouseEvent, slug: string) => {
    e.preventDefault() // prevent any link bubbling if needed
    setExpandedSlugs((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  // Only truncate if the text exceeds the threshold; truncate down to the limit
  const TRUNCATE_THRESHOLD = 30 // minimum word count before we bother truncating
  const TRUNCATE_LIMIT = 25 // where to actually cut the text

  const getTruncatedText = (text: string) => {
    if (!text) return { text: '', isTruncated: false }
    const words = text.trim().split(/\s+/)
    if (words.length <= TRUNCATE_THRESHOLD) return { text, isTruncated: false }
    return { text: words.slice(0, TRUNCATE_LIMIT).join(' ') + '...', isTruncated: true }
  }

  return (
    <ul className="not-prose grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 xl:grid-cols-3 items-start">
      {workshops.map(({ facilitator, workshop_name, details, workshop_slug }) => {
        const isHighlighted = workshop_slug === highlightedSlug
        const isExpanded = expandedSlugs.has(workshop_slug)
        const { text: displayDetails, isTruncated } = getTruncatedText(details || '')
        return (
          <li
            key={workshop_slug}
            id={workshop_slug}
            className="relative flex gap-4 p-4 rounded-2xl scroll-mt-32 transition-all duration-200 hover:bg-stone-50 hover:shadow-md overflow-hidden group/card"
          >
            {/* --- FLASH LAYER --- 
                This sits on top. It appears instantly, then fades out slowly (2s) when isHighlighted becomes false.
                It does not block mouse events, so the card hover underneath still works snappily.
            */}
            <div
              className={`
                absolute inset-0 bg-teal-50 ring-2 ring-teal-500 ring-inset rounded-2xl pointer-events-none z-0
                transition-opacity ease-linear
                ${isHighlighted ? 'opacity-100 duration-0' : 'opacity-0 duration-1500'}
              `}
            />
            {/* Content (z-10 to sit above the flash layer) */}
            <div className="relative z-10 w-1/5 min-w-[80px] sm:min-w-[120px]">
              <Link href={`/facilitators/${facilitator.slug}?year=${year}`}>
                <Image
                  src={facilitator.image_url || (facilitator.image ? `/images/facilitator-images/${facilitator.image}` : '/images/evolve-logo.jpg')}
                  alt={`${facilitator.name} - Facilitator`}
                  className="aspect-square object-cover rounded-full overflow-hidden hover:scale-105 transition-transform shadow-sm"
                  width={200}
                  height={200}
                />
              </Link>
            </div>

            <div className="relative z-10 flex flex-col gap-2 w-4/5 flex-1">
              <Link
                href={`#${workshop_slug}`}
                className="group active:opacity-60 transition-opacity"
                onClick={() => triggerFlash(workshop_slug)}
              >
                <h3 className="!m-0 text-xl font-bold group-hover:text-teal-700 transition-colors">
                  {workshop_name}
                </h3>
              </Link>

              <Link
                key={facilitator.slug}
                href={`/facilitators/${facilitator.slug}?year=${year}`}
                className="group active:opacity-60 transition-opacity"
              >
                <h4 className="!m-0 text-lg font-bold text-gray-900 group-hover:text-teal-600 underline decoration-teal-300 decoration-2 underline-offset-4">
                  {facilitator.name}
                </h4>
              </Link>

              {details && (
                <div className="flex flex-col flex-1">
                  <p className="!m-0 whitespace-pre-wrap text-stone-600 transition-all">
                    {isExpanded ? details : displayDetails}
                  </p>
                  {isTruncated && (
                    <button
                      onClick={(e) => toggleExpand(e, workshop_slug)}
                      className="text-left text-sm font-semibold text-teal-600 hover:text-teal-800 mt-2 hover:underline w-fit"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
              )}

              <div className="mt-auto pt-2">
                <Link
                  href={`/schedule/${year}${workshopDayMap[workshop_name.toLowerCase()] ? `?day=${workshopDayMap[workshop_name.toLowerCase()]}` : ''}#${slugify(workshop_name)}`}
                  className="text-sm font-medium text-teal-700 hover:text-teal-900 flex items-center gap-1 w-fit group/link"
                >
                  View in schedule <span aria-hidden="true" className="group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                </Link>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}