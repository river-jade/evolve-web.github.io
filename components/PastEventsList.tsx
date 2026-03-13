import Link from 'next/link'
import Image from 'next/image'

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
        <Link href={`/${e.slug}`} key={i} className="block hover:bg-stone-100 rounded-lg p-2 transition-colors">
          <li className="flex justify-between text-sm border-b border-stone-200 pb-2 last:border-0">
            <span className="font-medium text-stone-700">{e.title}</span>
            <span className="text-stone-500">{e.date}</span>
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
          className="group block bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-teal-400 hover:shadow-lg transition-all duration-300"
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
              <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">{event.date}</span>
              <h3 className="text-lg font-bold text-stone-800 group-hover:text-teal-700 transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">{event.summary}</p>
              <span className="text-sm font-medium text-teal-600 mt-1 group-hover:translate-x-1 transition-transform inline-block">
                View details →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
