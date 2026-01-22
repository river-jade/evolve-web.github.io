import Image from 'next/image'
import Link from 'next/link'
import { ALL_WORKSHOPS, Workshop } from '@/lib/data'
import { slugify } from '@/lib/utils'

export const Workshops = ({ year }: { year: string }) => {
  const workshops = ALL_WORKSHOPS[year] || []

  const Workshop = ({ facilitator, workshop_name, details }: Workshop) => (
    <li key={facilitator.slug} className="flex gap-2">
      <div className="w-1/5">
        <Link href={`/facilitators/${facilitator.slug}?year=${year}`}>
          <Image
            src={facilitator.image_url || (facilitator.image ? `/images/${facilitator.image}` : '/images/evolve-logo.jpg')}
            alt={`${facilitator.name} - Facilitator`}
            className="aspect-square object-cover rounded-full overflow-hidden hover:scale-105 transition-transform"
            width={200}
            height={200}
          />
        </Link>
      </div>

      <div className="flex flex-col gap-2 w-4/5">
        <h3 className="m-0! text-xl font-bold">{workshop_name}</h3>
        <h4 className="m-0! text-lg font-bold">{facilitator.name}</h4>
        {details && <p className="m-0! whitespace-pre-wrap">{details}</p>}
      </div>
    </li>
  )


  return (<div className="Workshops align-full my-12">
    <div className="w-full max-w-screen-xl mx-auto px-4">
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {[
          ...workshops.filter(({ details }) => details),
          ...workshops.filter(({ details }) => !details)
        ].map(workshop => <Workshop key={slugify(workshop.workshop_name)} {...workshop} />)}
      </ul>
    </div>
  </div>
  )
}
