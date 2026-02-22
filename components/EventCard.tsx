import { findWorkshop } from "lib/client_utils"
import { FacilitatorEntry, ScheduleEvent, Workshop } from "lib/data"
import Link from "next/link"

// --- Helper: Reusable Event Card Component ---
export const EventCard = ({
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
