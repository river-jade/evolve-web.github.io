import Navbar from 'components/Navbar'
import PastEventsList from 'components/PastEventsList'

export const metadata = {
  title: 'Past Events – Evolve Community',
  description: 'Browse past Evolve Community gatherings, festivals, and village events.',
}

export default function PastEventsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar overlay={false} />

      <section className="flex-1 px-6 pt-32 pb-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="label">Our Journey</span>
            <h1 className="font-display text-heading-1 md:text-display text-forest mt-3 mb-4">Past Events</h1>
            <p className="text-ink-soft text-lg max-w-xl mx-auto">
              From village gatherings at ConFest to standalone festivals. A look back at the events that have shaped our community.
            </p>
          </div>
          <PastEventsList />
        </div>
      </section>
    </div>
  )
}
