import { cx } from 'app/lib/cx'
import Image from 'next/image'
import Link from 'next/link'

export const FestivalPromo = () => {
  return (
    <section className="FestivalPromo">
      <Link
        href="/mar-2025"
        className={cx(`
          relative flex flex-col
        `)}
      >
        <div
          className={cx(`
            absolute inset-0
            bg-[url('/images/evolve-logo.jpg')] bg-cover bg-top
            opacity-20 blur-sm
          `)}
        />

        <div className="flex flex-col gap-4 w-full max-w-xl mx-auto z-20 py-6">
          <h2 className="text-4xl font-extrabold text-neutral-700">
            Evolve Festival 2025
          </h2>

          <p className="font-bold">
            Radical co-creation and self-reliance — come as a participant, leave
            as a contributor.
            <br />
            <br />
            Stunning natural surroundings with opportunities for 
            forest walks and grounding in nature. Facilities include drinking
            water, toilets, and showers.
          </p>

          <p className="flex justify-between text-lg font-bold">
            <span>7th March - 10th March, 2025</span>
            <span>Bell Park, Lang Lang</span>
          </p>
        </div>
      </Link>
    </section>
  )
}
