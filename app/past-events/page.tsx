import Navbar from 'components/Navbar'
import PastEventsList from 'components/PastEventsList'

export const metadata = {
  title: 'Past Events – Evolve Community',
  description: 'Browse past Evolve Community gatherings, festivals, and village events.',
}

export default function PastEventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar overlay={false} />

      <section className="flex-1 px-6 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-teal-600 font-bold tracking-widest uppercase text-sm">Our Journey</span>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mt-2 mb-4">Past Events</h1>
            <p className="text-stone-600 text-lg max-w-xl mx-auto">
              From village gatherings at ConFest to standalone festivals — a look back at the events that have shaped our community.
            </p>
          </div>
          <PastEventsList />
        </div>
      </section>
    </div>
  )
}
