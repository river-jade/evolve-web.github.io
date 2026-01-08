'use client'

import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { PrinciplesGrid } from './components/PrinciplesGrid'
import ImageGallery from './components/Gallery' // Assuming you have this component
import Link from 'next/link'

export default function Page() {

  // Hardcoded past events list for the "Moments" section
  const pastEvents = [
    // { title: "Vision Conference", date: "October 2025", slug:"vision-conference-2025" },
    { title: "Spring Confest Village", date: "October 2025", slug:"spring-confest-2025" },
    { title: "Easter Confest Village", date: "April 2025", slug:"easter-confest-2025" },
    { title: "Evolve Festival @ Bell Park", date: "March 2025", slug:"evolve-festival-bell-park-2025" },
    { title: "Spring Confest Village", date: "October 2024", slug:"spring-confest-2024" },
  ]

  // Images from the original homepage.mdx
  const galleryImages = [
    { src: '/images/spring-confest-2024/image-1.jpg', alt: 'Community gathering'},
    { src: '/images/spring-confest-2024/image-2.jpg', alt: 'Workshops in nature'},
    { src: '/images/spring-confest-2024/image-3.jpg', alt: 'Connection'},
    { src: '/images/spring-confest-2024/image-4.jpg', alt: 'Celebration'},
    { src: '/images/bell-park-2025/image-1.jpg', alt: 'Bell Park Festival'},
    { src: '/images/bell-park-2025/image-2.jpg', alt: 'Gathering'},
    { src: '/images/bell-park-2025/image-3.jpg', alt: 'Nature'},
    { src: '/images/bell-park-2025/image-4.jpg', alt: 'Tent village'},
  ]

  return (
    <div className="flex flex-col w-full">
      {/* 1. VISUAL HERO (Includes Navigation) */}
      <Navbar overlay={true} />
      <Hero />

      {/* 2. THE INTRO (The "Why") */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col gap-3">
            <span className="text-4xl mb-2">🎉</span>
            <h3 className="text-xl font-bold">A Community</h3>
            <p className="text-stone-600 leading-relaxed">
              A tribe of open hearts and minds, dedicated to deep connection, safety, and mutual support.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-4xl mb-2">🌍</span>
            <h3 className="text-xl font-bold">A Culture</h3>
            <p className="text-stone-600 leading-relaxed">
              Seeking truth together - integrating diverse perspectives to let collective intelligence emerge.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-4xl mb-2">🧪</span>
            <h3 className="text-xl font-bold">A Movement</h3>
            <p className="text-stone-600 leading-relaxed">
              Growing from a festival into a global network of changemakers building a better world.
            </p>
          </div>
        </div>
      </section>

      {/* 3. UPCOMING EVENT SPOTLIGHT */}
      <section id="events" className="py-20 px-6 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-teal-400 font-bold tracking-widest uppercase mb-2 text-sm">Join the next gathering</span>
            <h2 className="text-3xl md:text-5xl font-bold">Evolve Festival 2026</h2>
          </div>

          <div className="bg-stone-800 rounded-3xl p-8 md:p-12 border border-stone-700 hover:border-teal-500 transition-colors relative overflow-hidden group shadow-2xl">
               {/* Background accent */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

               <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="text-center md:text-left">
                   <h3 className="text-2xl md:text-4xl font-bold mb-2">Gilwell Park, Gembrook</h3>
                   <p className="text-xl text-stone-400 mb-4">March 6th - 9th, 2026</p>
                   <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-stone-700 rounded-lg text-sm">Camping</span>
                      <span className="px-3 py-1 bg-stone-700 rounded-lg text-sm">Workshops</span>
                      <span className="px-3 py-1 bg-stone-700 rounded-lg text-sm">Music</span>
                      <span className="px-3 py-1 bg-stone-700 rounded-lg text-sm">Ritual</span>
                   </div>
                 </div>
                 <Link
                   href="/mar-2026"
                   className="bg-white text-stone-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-400 transition-colors whitespace-nowrap shadow-lg"
                 >
                   View Event Details →
                 </Link>
               </div>
          </div>
        </div>
      </section>

      {/* 4. PRINCIPLES GRID */}
      <PrinciplesGrid />

      {/* 5. MOMENTS & HISTORY (The Gallery) */}
      <section className="pt-24 pb-0 px-6 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
             <div>
                <h2 className="text-3xl font-bold mb-6 text-stone-800">Moments from the Movement</h2>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Evolve has grown from small village gatherings at Confest into standalone festivals.
                  Here is a glimpse of the connection, play, and beauty we create together.
                </p>
                <div className="bg-stone-50 p-6 rounded-2xl">
                  <h4 className="font-bold text-stone-900 mb-4">Past Gatherings</h4>
                  <ul className="space-y-3">
                    {pastEvents.map((e, i) => (
                      <Link href={`/${e.slug}`} key={i} className="block hover:bg-stone-100 rounded-lg p-2 transition-colors">
                        <li key={i} className="flex justify-between text-sm border-b border-stone-200 pb-2 last:border-0">
                          <span className="font-medium text-stone-700">{e.title}</span>
                          <span className="text-stone-500">{e.date}</span>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
             </div>

             {/* Gallery Component */}
             <div className="bg-stone-100 rounded-2xl p-4">
                <ImageGallery images={galleryImages} />
                <p className="text-center text-xs text-stone-400 mt-2">Click images to expand</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
