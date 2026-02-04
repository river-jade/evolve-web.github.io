import { getAllFacilitators, getFacilitatorBySlug } from 'lib/data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

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
    (facilitator.image ? `/images/facilitator-images/${facilitator.image}` : '/images/evolve-logo.jpg')

  const returnYear = resolvedSearchParams.year || facilitator.workshops.at(-1)?.year || '2025'

  const fromSchedule = resolvedSearchParams.from === 'schedule'
  const dayParam = resolvedSearchParams.day

  let backLink = fromSchedule ? `/schedule/${returnYear}` : `/workshops/${returnYear}`
  if (fromSchedule && dayParam) {
    backLink += `?day=${dayParam}`
  }

  const backText = fromSchedule ? `← Back to ${returnYear} Schedule` : `← Back to ${returnYear} Workshops`

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <Link
        href={backLink}
        className="inline-block text-sm font-bold tracking-wider text-gray-500 hover:text-teal-600 mb-10 transition-colors uppercase"
      >
        {backText}
      </Link>
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
        <div className="w-full md:w-96 shrink-0 bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
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
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
            {facilitator.name}
          </h1>

          <div className="flex flex-col gap-3 mb-8">
            {facilitator.workshops.map((w: any) => (
              <div key={w.title} className="flex items-center gap-3 text-lg">
                <Link href={`/workshops/${w.year}#${w.slug}`} className="flex items-center">
                  <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wide whitespace-nowrap shrink-0 mr-2">
                    {w.year}
                  </span>
                  <span className="font-medium text-gray-700">
                    {w.title}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          <div className="prose prose-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
            {facilitator.bio || <p className="italic text-gray-500">No bio provided.</p>}
          </div>
        </div>
      </div>
    </main>
  )
}