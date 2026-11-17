import Link from 'next/link'
import Image from 'next/image'
import { Icon } from './Icon'

export type PastEvent = {
  title: string
  date: string
  slug: string
  summary: string
  image?: string
}

export const pastEvents: PastEvent[] = [
  {
    title: "Evolve Festival @ Gilwell Park",
    date: "March 2026",
    slug: "past-events/evolve-festival-gilwell-park-2026",
    summary: "Our second festival brought together around 200 people at Gilwell Park for workshops, music, and ritual.",
    image: "/images/gilwell-park-2026/mandala-close-up.png",
  },
  {
    title: "Spring Confest Village",
    date: "October 2025",
    slug: "past-events/spring-confest-2025",
    summary: "Our village at Spring ConFest, continuing to grow the Evolve community at its spiritual home.",
    image: "/images/spring-confest-2024/image-2.jpg",
  },
  {
    title: "Easter Confest Village",
    date: "April 2025",
    slug: "past-events/easter-confest-2025",
    summary: "Bringing the Evolve village experience to Easter ConFest.",
    image: "/images/spring-confest-2024/image-3.jpg",
  },
  {
    title: "Evolve Festival @ Bell Park",
    date: "March 2025",
    slug: "past-events/evolve-festival-bell-park-2025",
    summary: "Our inaugural standalone festival at Bell Park, with 150 attendees, workshops, and night-time entertainment.",
    image: "/images/bell-park-2025/image-3.jpg",
  },
  {
    title: "Spring Confest Village",
    date: "October 2024",
    slug: "past-events/spring-confest-2024",
    summary: "Our first public event — a village at the inaugural Spring ConFest, inspired by the ConFest tradition.",
    image: "/images/spring-confest-2024/image-1.jpg",
  },
]

/** Compact list variant for embedding on other pages (e.g. homepage) */
export function PastEventsCompact() {
  return (
    <ul className="space-y-3">
      {pastEvents.map((e, i) => (
        <Link href={`/${e.slug}`} key={i} className="block hover:bg-sand rounded-sm p-2 transition-colors">
          <li className="flex justify-between gap-4 text-small border-b border-line pb-2 last:border-0">
            <span className="font-medium text-forest">{e.title}</span>
            <span className="text-ink-soft whitespace-nowrap">{e.date}</span>
          </li>
        </Link>
      ))}
    </ul>
  )
}

/** Full card layout for the dedicated /past-events page */
export default function PastEventsList() {
  return (
    <div className="grid gap-6">
      {pastEvents.map((event, i) => (
        <Link
          href={`/${event.slug}`}
          key={i}
          className="group block card overflow-hidden hover:border-sage transition-colors duration-300"
        >
          <div className="flex flex-col sm:flex-row">
            {event.image && (
              <div className="sm:w-56 h-44 sm:h-auto relative overflow-hidden shrink-0">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="flex flex-col justify-center p-6 gap-2">
              <span className="label">{event.date}</span>
              <h3 className="font-display text-heading-2 text-forest">
                {event.title}
              </h3>
              <p className="text-small text-ink-soft">{event.summary}</p>
              <span className="text-small font-semibold text-forest mt-1 inline-flex items-center gap-2">
                View details
                <Icon name="arrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
