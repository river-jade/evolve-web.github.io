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
        ? `bg-sand border-line text-ink-soft italic ${isMobile ? 'p-4 border-l-4 rounded-sm' : 'h-full p-3 rounded-md text-center justify-center min-h-[60px] text-small'}`
        : `transition-colors ${isMobile ? 'p-4 border-l-4 border-sage rounded-sm bg-paper' : 'bg-leaf/25 hover:bg-leaf/50 h-full p-3 rounded-md min-h-[120px] flex flex-col justify-between'}`

    const titleClass = "font-semibold text-body text-forest leading-tight mb-1 block"

    if (isBreak) {
        return (
            <div className={containerClass}>
                {isMobile && <div className="text-label font-semibold uppercase tracking-wider text-label mb-1">{event.venue}</div>}
                <span>{event.title}</span>
            </div>
        )
    }

    return (
        <div className={containerClass}>
            <div>
                {isMobile && <div className="text-label font-semibold uppercase tracking-wider text-label mb-1">{event.venue}</div>}

                {/* Title */}
                {linked ? (
                    <Link
                        href={`/workshops/${year}#${linked.workshop_slug}`}
                        onClick={(e) => {
                            e.preventDefault()
                            onWorkshopClick(linked)
                        }}
                        className={`${titleClass} underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-sage transition-colors`}
                    >
                        {event.title}
                    </Link>
                ) : (
                    <div className={titleClass}>{event.title}</div>
                )}

                {/* Facilitator */}
                {(event.facilitator || linked) && (
                    <div className="text-small text-ink-soft mt-1">
                        <span className="text-label">with </span>
                        {linked ? (
                            <Link
                                href={`/facilitators/${linked.facilitator.slug}?year=${year}&from=schedule&day=${activeDay}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    onFacilitatorClick(linked.facilitator)
                                }}
                                className="font-semibold text-forest hover:underline"
                            >
                                {linked.facilitator.name}
                            </Link>
                        ) : (
                            <span className="font-semibold text-forest">{event.facilitator}</span>
                        )}
                    </div>
                )}
            </div>

            {/* End Time */}
            {!hideEndTime && event.end_time && event.end_time !== 'Close' && (
                <div className="mt-3 text-[11px] uppercase tracking-wider text-label font-semibold">
                    Until {event.end_time}
                </div>
            )}
        </div>
    )
}
