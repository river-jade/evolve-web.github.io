'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { ScheduleEvent, Workshop, FacilitatorEntry } from 'lib/data'
import Modal from './Modal'

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
  onWorkshopClick,
  onFacilitatorClick,
  activeDay
}: {
  event: ScheduleEvent,
  workshops: Workshop[],
  year: string,
  isMobile?: boolean,
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

  const titleClass = "font-bold text-lg text-gray-900 leading-tight mb-1 block"

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
      {event.end_time && event.end_time !== 'Close' && (
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

  // 2. Pre-calculate Data
  const { venues, times, gridLookup } = useMemo(() => {
    const daily = events.filter(e => e.day === activeDay)

    const v = Array.from(new Set(daily.map(e => e.venue)))
      .filter(venue => isNaN(Number(venue)) && venue.trim().length > 0)

    const t = Array.from(new Set(daily.map(e => e.start_time))).sort()

    const lookup: Record<string, ScheduleEvent> = {}
    daily.forEach(e => {
      lookup[`${e.start_time}:${e.venue}`] = e
    })

    return { venues: v, times: t, gridLookup: lookup }
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
            gridTemplateColumns: `100px repeat(${venues.length}, minmax(200px, 1fr))`
          }}
        >
          {/* Header Row */}
          <div className="sticky top-0 z-20 bg-teal-50/95 border-b border-teal-200 p-4 text-right font-bold text-stone-400 text-xs uppercase tracking-widest">
            Time
          </div>
          {venues.map(venue => (
            <div key={venue} className="sticky top-0 z-20 bg-teal-50/95 backdrop-blur border-b border-teal-200 p-4 text-center border-l border-teal-100">
              <h3 className="text-lg font-bold text-teal-900 leading-tight">{venue}</h3>
            </div>
          ))}

          {/* Time Rows */}
          {times.map(time => (
            <div key={time} className="contents group">
              {/* Time Column */}
              <div className="text-right py-4 pr-4 font-mono font-bold text-stone-400 text-sm border-t border-stone-100 bg-stone-50/30">
                {time}
              </div>

              {/* Venue Cells */}
              {venues.map(venue => {
                const event = gridLookup[`${time}:${venue}`]

                if (!event) return <div key={`${time}-${venue}`} className="border-t border-l border-stone-50 bg-stone-50/10" />

                return (
                  <div key={event.id} className="border-t border-l border-stone-100 p-1">
                    <EventCard
                      event={event}
                      workshops={workshops}
                      year={year}
                      onWorkshopClick={setSelectedWorkshop}
                      onFacilitatorClick={setSelectedFacilitator}
                      activeDay={activeDay}
                    />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Workshop Modal */}
      <Modal
        isOpen={!!selectedWorkshop}
        onClose={() => setSelectedWorkshop(null)}
        title={selectedWorkshop?.workshop_name}
      >
        {selectedWorkshop && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wide mb-1">Hosted by</h3>
              <button
                onClick={() => {
                  setSelectedWorkshop(null)
                  // Small timeout to allow transition if needed, or just switch immediately
                  setTimeout(() => setSelectedFacilitator(selectedWorkshop.facilitator), 50)
                }}
                className="text-lg font-bold text-gray-800 hover:text-teal-700 hover:underline flex items-center gap-2"
              >
                {selectedWorkshop.facilitator.image && (
                  <img src={`/images/facilitator-images/${selectedWorkshop.facilitator.image}`} alt="" className="w-8 h-8 rounded-full object-cover bg-stone-100" />
                )}
                {selectedWorkshop.facilitator.name}
              </button>
            </div>

            <div>
              <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wide mb-2">About the Workshop</h3>
              <div className="prose prose-stone leading-relaxed text-gray-700">
                {selectedWorkshop.details}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Facilitator Modal */}
      <Modal
        isOpen={!!selectedFacilitator}
        onClose={() => setSelectedFacilitator(null)}
        title={selectedFacilitator?.name}
      >
        {selectedFacilitator && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {selectedFacilitator.image && (
                <div className="w-full md:w-1/3 shrink-0">
                  <img
                    src={`/images/facilitator-images/${selectedFacilitator.image}`}
                    alt={selectedFacilitator.name}
                    className="w-full aspect-square object-cover rounded-xl shadow-md bg-stone-100"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="prose prose-stone text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {selectedFacilitator.bio}
                </div>
              </div>
            </div>

            {/* Other Workshops by this person */}
            {selectedFacilitator.workshops && selectedFacilitator.workshops.length > 0 && (
              <div className="pt-4 border-t border-stone-100">
                <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wide mb-3">Workshops at Evolve</h3>
                <ul className="space-y-2">
                  {selectedFacilitator.workshops.map(w => (
                    <li key={w.slug}>
                      <span className="font-medium text-gray-900 block">{w.title}</span>
                      {/* Link to specific workshop in modal? Or just text for now? 
                                        Let's keep it simple: text. 
                                    */}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <Link
                href={`/facilitators/${selectedFacilitator.slug}?year=${year}&from=schedule&day=${activeDay}`}
                className="text-sm font-medium text-teal-600 hover:text-teal-800 flex items-center gap-1"
              >
                View full profile <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        )}
      </Modal>

    </div>
  )
}