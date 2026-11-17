'use client'

import { Navbar } from 'components/Navbar'
import { Hero } from 'components/Hero'
import { ValuesGrid } from 'components/ValuesGrid'
import ImageGallery from 'components/Gallery'
import { PastEventsCompact } from 'components/PastEventsList'
import Link from 'next/link'
import { Icon } from 'components/Icon'

export default function Page() {



  // Images from the original homepage.mdx
  const galleryImages = [
    { src: '/images/gilwell-park-2026/opening-ceremony.jpeg', alt: 'Opening ceremony at Gilwell Park 2026' },
    { src: '/images/gilwell-park-2026/opening-ceremony-spiral-1.jpeg', alt: 'Opening ceremony spiral' },
    { src: '/images/gilwell-park-2026/opening-ceremony-spiral-2.jpeg', alt: 'Opening ceremony spiral' },
    { src: '/images/gilwell-park-2026/opening-ceremony-spiral-3.jpeg', alt: 'Opening ceremony spiral' },
    { src: '/images/gilwell-park-2026/workshop.jpg', alt: 'Workshop at Gilwell Park' },
    { src: '/images/gilwell-park-2026/mandala-whole.jpeg', alt: 'Mandala' },
    { src: '/images/gilwell-park-2026/mandala-close-up.jpeg', alt: 'Mandala close up' },
    { src: '/images/gilwell-park-2026/bridge-in-forest.JPG', alt: 'Bridge in the forest' },
    { src: '/images/gilwell-park-2026/lounge-tent.JPG', alt: 'Lounge tent' },
    { src: '/images/gilwell-park-2026/lounge-at-dusk.JPG', alt: 'Lounge at dusk' },
    { src: '/images/gilwell-park-2026/pot-luck.JPG', alt: 'Pot luck' },
    { src: '/images/gilwell-park-2026/open-mic.jpg', alt: 'Open mic' },
    { src: '/images/gilwell-park-2026/open-mic-melody-moon.JPG', alt: 'Melody Moon at the open mic' },
    { src: '/images/gilwell-park-2026/festival-at-night.JPG', alt: 'Festival at night' },
    { src: '/images/gilwell-park-2026/closing-ceremony.jpg', alt: 'Closing ceremony' },
    { src: '/images/spring-confest-2024/image-1.jpg', alt: 'Community gathering' },
    { src: '/images/spring-confest-2024/image-2.jpg', alt: 'Workshops in nature' },
    { src: '/images/spring-confest-2024/image-3.jpg', alt: 'Connection' },
    { src: '/images/spring-confest-2024/image-4.jpg', alt: 'Celebration' },
    { src: '/images/bell-park-2025/image-1.jpg', alt: 'Bell Park Festival' },
    { src: '/images/bell-park-2025/image-2.jpg', alt: 'Gathering' },
    { src: '/images/bell-park-2025/image-3.jpg', alt: 'Nature' },
    { src: '/images/bell-park-2025/image-4.jpg', alt: 'Tent village' },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* 1. VISUAL HERO (Includes Navigation) */}
      <Navbar overlay={true} />
      <Hero />

      {/* 2. THE INTRO (The "Why") */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-sand">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-16">
          <p className="font-display text-heading-2 md:text-[32px] md:leading-[1.25] text-forest">
            Evolve is a festival and a social movement, bringing people together to share knowledge, wisdom, and community to support culture change for a better world.
          </p>
          <p className="text-lg text-ink-soft">
            It is both a response to the global metacrisis, and an invitation to co-create the more beautiful world our hearts know is possible.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left">
          <div className="flex flex-col gap-3 items-center md:items-start">
            <span className="icon-disc mb-2"><Icon name="people" size={28} /></span>
            <h3 className="font-display text-heading-2">Community</h3>
            <p className="text-ink-soft">
              A tribe of open hearts and minds, dedicated to deep connection, safety, and mutual support.
            </p>
          </div>
          <div className="flex flex-col gap-3 items-center md:items-start">
            <span className="icon-disc mb-2"><Icon name="globe" size={28} /></span>
            <h3 className="font-display text-heading-2">Culture</h3>
            <p className="text-ink-soft">
              Seeking truth together - integrating diverse perspectives to let collective intelligence emerge.
            </p>
          </div>
          <div className="flex flex-col gap-3 items-center md:items-start">
            <span className="icon-disc mb-2"><Icon name="sprout" size={28} /></span>
            <h3 className="font-display text-heading-2">Movement</h3>
            <p className="text-ink-soft">
              Growing from a festival into a global network of changemakers co-creating a better world.
            </p>
          </div>
        </div>
      </section>

      {/* 3. UPCOMING EVENT SPOTLIGHT */}
      {/* <section id="events" className="py-20 px-6 bg-forest text-paper">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="label !text-leaf mb-2">Join the next gathering</span>
            <h2 className="font-display text-heading-1 md:text-display">Evolve Festival 2026</h2>
          </div>

          <div className="rounded-md p-8 md:p-12 border border-paper/20 hover:border-paper/50 transition-colors relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <h3 className="font-display text-heading-2 md:text-heading-1 mb-2">Gilwell Park, Gembrook</h3>
                <p className="text-xl text-paper mb-4">March 6th - 9th, 2026</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 border border-paper/30 rounded-sm text-small">Camping</span>
                  <span className="px-3 py-1 border border-paper/30 rounded-sm text-small">Workshops</span>
                  <span className="px-3 py-1 border border-paper/30 rounded-sm text-small">Music</span>
                  <span className="px-3 py-1 border border-paper/30 rounded-sm text-small">Ritual</span>
                </div>
              </div>
              <Link
                href="/mar-2026"
                className="btn btn-sun px-8 py-4 text-lg whitespace-nowrap"
              >
                View Event Details
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* 4. VALUES GRID */}
      <ValuesGrid />

      {/* 5. MOMENTS & HISTORY (The Gallery) */}
      <section className="pt-16 md:pt-24 pb-0 px-6 md:px-16 bg-sand">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display text-heading-1 mb-6 text-forest">Moments from the Movement</h2>
              <p className="text-ink-soft mb-6">
                Evolve has grown from small village gatherings at Confest into standalone festivals.
                Here is a glimpse of the connection, play, and beauty we create together.
              </p>
              <div className="card p-6">
                <h4 className="label mb-4">Past Events</h4>
                <PastEventsCompact />
              </div>
            </div>

            {/* Gallery Component */}
            <div>
              <ImageGallery images={galleryImages} initialRows={5} />
              <p className="text-center text-label font-medium text-ink-soft mt-3">Click images to expand</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
