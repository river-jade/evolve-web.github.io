'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { ScheduleEvent, Workshop, FacilitatorEntry } from 'lib/data'
import { WorkshopModal } from './WorkshopModal'
import { FacilitatorModal } from './FacilitatorModal'

const slugify = (str: string) => str.toString().toLowerCase().trim()
  .replace(/\s+/g, '-').replace(/&/g, '-and-')
  .replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-')

type Props = {
  events: ScheduleEvent[]
  workshops: Workshop[]
  year: string
}

// --- Helper: Centralized Matching Logic ---
const findWorkshop = (title: string, workshops: Workshop[]) => {
  return workshops.find(w => w.workshop_name.trim().toLowerCase() === title.toLowerCase())
}

// --- Helper: Reusable Event Card Component ---
const EventCard = ({
  event,
  workshops,
  year,
  isMobile = false,
  hideEndTime = false,
  onWorkshopClick,
  onFacilitatorClick,
  activeDay
}: {
  event: ScheduleEvent,
  workshops: Workshop[],
  year: string,
  isMobile?: boolean,
  hideEndTime?: boolean,
  onWorkshopClick: (w: Workshop) => void
  onFacilitatorClick: (f: FacilitatorEntry) => void
  activeDay: string
}) => {
  const isBreak = event.type === 'break'
  const linked = !isBreak ? findWorkshop(event.title, workshops) : null

  // Styles
  const containerClass = isBreak
    ? `bg-stone-50 border-stone-300 text-stone-500 italic ${isMobile ? 'p-4 border-l-4' : 'h-full p-3 rounded-lg text-center justify-center min-h-[60px] text-sm'}`
    : `bg-teal-50/50 hover:bg-teal-100 hover:shadow-md transition-all ${isMobile ? 'p-4 border-l-4 border-teal-500 bg-teal-50' : 'h-full p-3 rounded-lg min-h-[120px] flex flex-col justify-between'}`

  const titleClass = "font-bold text-md text-gray-900 leading-tight mb-1 block"

  if (isBreak) {
    return (
      <div className={containerClass}>
        {isMobile && <div className="text-xs font-bold uppercase tracking-wider text-teal-800/60 mb-1">{event.venue}</div>}
        <span>{event.title}</span>
      </div>
    )
  }

  return (
    <div className={containerClass}>
      <div>
        {isMobile && <div className="text-xs font-bold uppercase tracking-wider text-teal-800/60 mb-1">{event.venue}</div>}

        {/* Title */}
        {linked ? (
          <Link
            href={`/workshops/${year}#${linked.workshop_slug}`}
            onClick={(e) => {
              e.preventDefault()
              onWorkshopClick(linked)
            }}
            className={`${titleClass} hover:text-teal-600`}
          >
            {event.title}
          </Link>
        ) : (
          <div className={titleClass}>{event.title}</div>
        )}

        {/* Facilitator */}
        {(event.facilitator || linked) && (
          <div className="text-sm text-gray-600 mt-1">
            <span className="opacity-70 text-xs">with </span>
            {linked ? (
              <Link
                href={`/facilitators/${linked.facilitator.slug}?year=${year}&from=schedule&day=${activeDay}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onFacilitatorClick(linked.facilitator)
                }}
                className="font-medium text-teal-700 hover:underline"
              >
                {linked.facilitator.name}
              </Link>
            ) : (
              <span className="font-medium text-teal-700">{event.facilitator}</span>
            )}
          </div>
        )}
      </div>

      {/* End Time */}
      {!hideEndTime && event.end_time && event.end_time !== 'Close' && (
        <div className="mt-3 text-[10px] uppercase tracking-wide text-gray-400 font-bold">
          Until {event.end_time}
        </div>
      )}
    </div>
  )
}

export const ScheduleGrid = ({ events, workshops, year }: Props) => {
  if (!events.length) {
    return <div className="p-12 text-center bg-stone-50 rounded-xl text-stone-500">Schedule coming soon.</div>
  }

  // 1. Setup State
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const days = useMemo(() => Array.from(new Set(events.map(e => e.day))), [events])

  // Get active day from URL or default to first day
  const dayParam = searchParams.get('day')
  const activeDay = (dayParam && days.includes(dayParam)) ? dayParam : days[0]

  const setActiveDay = (day: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('day', day)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null)
  const [selectedFacilitator, setSelectedFacilitator] = useState<FacilitatorEntry | null>(null)

  // Hash-based highlight
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null)
  const highlightTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        setHighlightedSlug(hash)
        const el = document.getElementById(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        highlightTimer.current = setTimeout(() => setHighlightedSlug(null), 500)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // 2. Pre-calculate Data
  const { venues, times, gridLookup, spanMap, coveredCells } = useMemo(() => {
    const daily = events.filter(e => e.day === activeDay)

    const v = Array.from(new Set(daily.map(e => e.venue)))
      .filter(venue => isNaN(Number(venue)) && venue.trim().length > 0)

    // Include both start and end times so intermediate rows show up
    // (e.g., if all 10:30 events span to 12:30, 11:30 still appears as a row)
    const allTimes = new Set(daily.map(e => e.start_time))
    daily.forEach(e => {
      if (e.end_time && e.end_time.match(/\d{1,2}:\d{2}/)) allTimes.add(e.end_time)
    })
    const t = Array.from(allTimes).sort()

    const lookup: Record<string, ScheduleEvent> = {}
    daily.forEach(e => {
      lookup[`${e.start_time}:${e.venue}`] = e
    })

    // Calculate row spans: how many time rows each event covers
    const spans: Record<string, number> = {}
    const covered = new Set<string>()

    daily.forEach(e => {
      const startIdx = t.indexOf(e.start_time)
      if (startIdx === -1) return

      // Find how many time rows this event's end_time covers
      let span = 1
      for (let i = startIdx + 1; i < t.length; i++) {
        if (t[i] < e.end_time) {
          span++
          covered.add(`${t[i]}:${e.venue}`)
        } else {
          break
        }
      }
      if (span > 1) {
        spans[`${e.start_time}:${e.venue}`] = span
      }
    })

    return { venues: v, times: t, gridLookup: lookup, spanMap: spans, coveredCells: covered }
  }, [events, activeDay])

  return (
    <div className="ScheduleGrid align-full w-full my-8 px-4 md:px-6">

      {/* Day Tabs */}
      {days.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {days.map(day => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${activeDay === day
                ? 'bg-teal-600 text-white shadow-md transform scale-105'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      {/* --- MOBILE VIEW (Vertical Timeline) --- */}
      <div className="md:hidden flex flex-col gap-8 pb-12">
        {times.map(time => {
          const eventsAtTime = venues
            .map(v => gridLookup[`${time}:${v}`])
            .filter(Boolean)

          if (!eventsAtTime.length) return null

          // Check for Common Break
          const uniqueTitles = Array.from(new Set(eventsAtTime.map(e => e.title)))
          const isCommonBreak = eventsAtTime.length > 2 && uniqueTitles.length === 1 && eventsAtTime[0].type === 'break'

          if (isCommonBreak) {
            return (
              <div key={time} className="bg-stone-100 p-4 rounded-xl text-center text-stone-500 italic border border-stone-200">
                <span className="font-bold not-italic text-stone-700">{time}</span> — {uniqueTitles[0]}
              </div>
            )
          }

          return (
            <div key={time} className="relative">
              <div className="sticky top-0 z-10 py-2 bg-white/95 backdrop-blur-sm border-b border-teal-100 mb-3">
                <span className="inline-block bg-teal-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                  {time}
                </span>
              </div>

              <div className="space-y-3 pl-2">
                {eventsAtTime.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    workshops={workshops}
                    year={year}
                    isMobile={true}
                    onWorkshopClick={setSelectedWorkshop}
                    onFacilitatorClick={setSelectedFacilitator}
                    activeDay={activeDay}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* --- DESKTOP VIEW (Horizontal Grid) --- */}
      <div className="hidden md:block overflow-x-auto pb-12 border border-stone-100 rounded-xl shadow-sm bg-white">
        <div
          className="grid gap-0"
          style={{
            gridTemplateColumns: `100px repeat(${venues.length}, minmax(200px, 1fr))`,
            gridTemplateRows: `auto repeat(${times.length}, auto)`
          }}
        >
          {/* Header Row */}
          <div className="sticky top-0 z-20 bg-teal-50/95 border-b border-teal-200 p-4 text-right font-bold text-stone-400 text-xs uppercase tracking-widest"
            style={{ gridRow: 1, gridColumn: 1 }}
          >
            Time
          </div>
          {venues.map((venue, vi) => (
            <div key={venue} className="sticky top-0 z-20 bg-teal-50/95 backdrop-blur border-b border-teal-200 p-4 text-center border-l border-teal-100"
              style={{ gridRow: 1, gridColumn: vi + 2 }}
            >
              <h3 className="text-lg font-bold text-teal-900 leading-tight">{venue}</h3>
            </div>
          ))}

          {/* Time Cells + Venue Cells */}
          {times.map((time, ti) => {
            const row = ti + 2 // +2 because row 1 is the header

            return [
              // Time Column
              <div key={`time-${time}`}
                className="text-right py-4 pr-4 font-mono font-bold text-stone-400 text-sm border-t border-stone-200 bg-stone-50/30"
                style={{ gridRow: row, gridColumn: 1 }}
              >
                {time}
              </div>,

              // Venue Cells
              ...venues.map((venue, vi) => {
                const cellKey = `${time}:${venue}`

                // Skip cells covered by a spanning event from a previous row
                if (coveredCells.has(cellKey)) return null

                const event = gridLookup[cellKey]
                const span = spanMap[cellKey] || 1

                if (!event) {
                  return <div key={`${time}-${venue}`}
                    className="border-t border-l border-stone-200 bg-stone-50/10"
                    style={{ gridRow: row, gridColumn: vi + 2 }}
                  />
                }

                const eventSlug = event.type !== 'break' ? slugify(event.title) : null
                const isHighlighted = eventSlug && eventSlug === highlightedSlug

                return (
                  <div key={event.id}
                    id={eventSlug || undefined}
                    className={`border-t border-l border-stone-200 p-1 relative scroll-mt-32 rounded-lg transition-all duration-0 ${isHighlighted ? 'ring-2 ring-teal-500 bg-teal-50' : ''}`}
                    style={{ gridRow: `${row} / span ${span}`, gridColumn: vi + 2, transition: isHighlighted ? 'none' : 'all 1.5s ease-out' }}
                  >
                    <EventCard
                      event={event}
                      workshops={workshops}
                      year={year}
                      hideEndTime={ti < times.length - 1}
                      onWorkshopClick={setSelectedWorkshop}
                      onFacilitatorClick={setSelectedFacilitator}
                      activeDay={activeDay}
                    />
                  </div>
                )
              })
            ]
          })}
        </div>
      </div>

      {/* --- MODALS --- */}
      <WorkshopModal
        workshop={selectedWorkshop}
        onClose={() => setSelectedWorkshop(null)}
        onFacilitatorClick={setSelectedFacilitator}
        year={year}
      />
      <FacilitatorModal
        facilitator={selectedFacilitator}
        onClose={() => setSelectedFacilitator(null)}
        year={year}
        activeDay={activeDay}
      />

    </div>
  )
}