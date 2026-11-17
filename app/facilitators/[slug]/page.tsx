import { getAllFacilitators, getFacilitatorBySlug } from 'lib/data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from 'components/Icon'

export async function generateStaticParams() {
  const facilitators = getAllFacilitators()
  return Object.keys(facilitators).map((slug) => ({ slug }))
}

export default async function Page({ params, searchParams }:
  {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ year?: string, from?: string, day?: string }>
  }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const facilitator = getFacilitatorBySlug(resolvedParams.slug)

  if (!facilitator) return notFound()

  const imageSrc = facilitator.image_url ||
    (facilitator.image ? `/images/facilitator-images/${facilitator.image}` : '/images/evolve-placeholder.png')

  const returnYear = resolvedSearchParams.year || facilitator.workshops.at(-1)?.year || '2025'

  const fromSchedule = resolvedSearchParams.from === 'schedule'
  const dayParam = resolvedSearchParams.day

  let backLink = fromSchedule ? `/schedule/${returnYear}` : `/workshops/${returnYear}`
  if (fromSchedule && dayParam) {
    backLink += `?day=${dayParam}`
  }

  const backText = fromSchedule ? `Back to ${returnYear} Schedule` : `Back to ${returnYear} Workshops`

  return (
    <main className="w-full max-w-5xl mx-auto px-6 py-12">
      <Link
        href={backLink}
        className="label inline-flex items-center gap-2 mb-10 underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-sage transition-colors"
      >
        <Icon name="arrowLeft" size={16} />
        {backText}
      </Link>
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
        <div className="w-full md:w-96 shrink-0 bg-paper border border-line rounded-md overflow-hidden">
          <Image
            src={imageSrc}
            alt={facilitator.name}
            width={800}
            height={800}
            priority
            className="w-full h-auto" // Natural height, no cropping
            unoptimized
          />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="font-display text-heading-1 md:text-display text-forest mb-6">
            {facilitator.name}
          </h1>

          <div className="flex flex-col gap-3 mb-8">
            {facilitator.workshops.map((w: any) => (
              <div key={w.title} className="flex items-center gap-3 text-lg">
                <Link href={`/workshops/${w.year}#${w.slug}`} className="flex items-center group">
                  <span className="bg-leaf/50 text-forest text-label px-2 py-1 rounded-sm font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 mr-3">
                    {w.year}
                  </span>
                  <span className="font-medium text-forest underline decoration-sage decoration-2 underline-offset-4 group-hover:decoration-forest transition-colors">
                    {w.title}
                  </span>
                  <Icon name="arrowRight" size={16} className="ml-2 shrink-0 text-sage md:hidden group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          <div className="prose max-w-none text-forest whitespace-pre-wrap">
            {facilitator.bio || <p className="italic text-ink-soft">No bio provided.</p>}
          </div>
        </div>
      </div>
    </main>
  )
}