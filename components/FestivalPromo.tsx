import { cx } from 'lib/cx'
import Image from 'next/image'
import Link from 'next/link'

export const FestivalPromo = () => {
  return (
    <section className="FestivalPromo">
      <Link
        href="/mar-2026"
        className={cx(`
          relative flex flex-col overflow-hidden rounded-md bg-forest text-paper px-6
        `)}
      >
        <img
          src="/brand/evolve-mark-single-sand.svg"
          alt=""
          aria-hidden="true"
          className="spiral-pattern -right-24 -top-24 w-96 max-w-none"
        />

        <div className="flex flex-col gap-4 w-full max-w-xl mx-auto z-20 py-6">
          <h2 className="font-display text-heading-1">
            Evolve Festival 2026
          </h2>

          <p>
            Radical co-creation and self-reliance — come as a participant, leave
            as a contributor.
            <br />
            <br />
            Stunning natural surroundings with opportunities for forest walks
            and grounding in nature. Facilities include drinking water, toilets,
            and showers.
          </p>

          <p className="flex justify-between text-lg font-semibold">
            <span>6th March - 9th March, 2026</span>
            <span>Gilwell Park, Gembrook</span>
          </p>
        </div>
      </Link>
    </section>
  )
}
