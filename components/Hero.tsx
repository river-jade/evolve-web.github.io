import Link from 'next/link'

export function Hero() {
  return (
    <div className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-forest text-paper">
      {/* Background photo */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/bell-park-2025/image-4.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Forest laid over the photo at about 70% so paper text reads clearly */}
      <div className="absolute inset-0 z-10 bg-forest/70" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-6 pt-28 pb-16">
        <h1 className="font-display text-heading-1 sm:text-display lg:text-[72px] lg:leading-[1.05] text-paper">
          Come as a participant,<br className="hidden sm:inline" />{' '}
          leave as a contributor.
        </h1>

        <p className="text-body sm:text-xl text-paper max-w-2xl">
          Radical co-creation, self-reliance, and deep connection in nature.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/mar-2026" className="btn btn-sun px-8 py-4 text-lg">
            Explore Festival 2026
          </Link>
          <Link href="/values" className="btn btn-on-dark px-8 py-4 text-lg">
            Our Values
          </Link>
        </div>
      </div>
    </div>
  )
}
