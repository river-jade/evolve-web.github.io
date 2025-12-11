import path from 'path'
import { CustomMDX } from './components/CustomMDX'
import { getHashLinks, getMDXData, parseHeadings } from './lib/utils'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { PrinciplesGrid } from './components/PrinciplesGrid'

export default function Page() {
  let pages = getMDXData(path.join(process.cwd(), 'app'))
  const homepage = pages?.find((post) => post.slug === 'homepage') ?? {
    content: 'No content',
  }

  // We keep the navbar links logic
  const headings = parseHeadings(homepage.content)
  const links = getHashLinks(headings)

  return (
    <div className="flex flex-col w-full">
      {/* 1. VISUAL HERO */}
      <Hero />

      {/* 2. NAVIGATION (Sticky below hero) */}
      <Navbar links={links} />

      {/* 3. THE INTRO (The "Why") */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col gap-3">
            <span className="text-4xl mb-2">🎉</span>
            <h3 className="text-xl font-bold">A Festival</h3>
            <p className="text-stone-600 leading-relaxed">
              A gathering on land to break out of the matrix, connect with nature, and celebrate life through ritual and play.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-4xl mb-2">🌍</span>
            <h3 className="text-xl font-bold">A Movement</h3>
            <p className="text-stone-600 leading-relaxed">
              Growing from one event into a global network of communities experimenting with better ways to live.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-4xl mb-2">🧪</span>
            <h3 className="text-xl font-bold">An Experiment</h3>
            <p className="text-stone-600 leading-relaxed">
              Pioneering decentralised governance and the "wisdom of crowds" to make better collective decisions.
            </p>
          </div>
        </div>
      </section>

      {/* 4. UPCOMING EVENTS (Highlighting 2026) */}
      <section id="events" className="py-20 px-6 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Upcoming Gatherings</h2>

          {/* Main Event Card */}
          <div className="bg-stone-800 rounded-3xl p-8 md:p-12 border border-stone-700 hover:border-teal-500 transition-colors relative overflow-hidden group">
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div>
                   <span className="bg-teal-500 text-stone-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Next Major Event</span>
                   <h3 className="text-3xl md:text-5xl font-bold mt-4 mb-2">Evolve Festival 2026</h3>
                   <p className="text-xl text-stone-300">March 6th - 9th • Gilwell Park, Gembrook</p>
                 </div>
                 <a
                   href="https://www.trybooking.com/DHISF"
                   target="_blank"
                   className="bg-white text-stone-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-400 transition-colors whitespace-nowrap"
                 >
                   Get Tickets →
                 </a>
               </div>
          </div>

          {/* Smaller list for other events */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
             <div className="bg-stone-800/50 rounded-xl p-6 border border-stone-700">
               <h4 className="font-bold text-lg text-stone-200">Vision Conference</h4>
               <p className="text-stone-400">October 2025 • Moora Moora</p>
             </div>
             <div className="bg-stone-800/50 rounded-xl p-6 border border-stone-700">
               <h4 className="font-bold text-lg text-stone-200">Spring Confest Village</h4>
               <p className="text-stone-400">October 2025</p>
             </div>
          </div>
        </div>
      </section>

      {/* 5. PRINCIPLES GRID */}
      <PrinciplesGrid />

      {/* 6. MANIFESTO (The Full MDX Content) */}
      <section id="manifesto" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-stone-400 uppercase mb-2">The Manifesto</h2>
            <h3 className="text-3xl font-bold text-stone-900">For those who want to go deeper</h3>
          </div>

          <div className="prose prose-lg prose-stone prose-headings:font-bold prose-a:text-teal-600 hover:prose-a:text-teal-500 mx-auto">
            <CustomMDX source={homepage.content} />
          </div>
        </div>
      </section>
    </div>
  )
}
