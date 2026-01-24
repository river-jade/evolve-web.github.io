import Link from 'next/link'

export function Hero() {
  return (
    <div className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-stone-900 text-white">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: "url('/images/bell-park-2025/image-4.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-stone-900 via-transparent to-black/40" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6 pt-16">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-2xl">
          Come as a participant,<br />
          <span className="text-teal-400">leave as a contributor.</span>
        </h1>

        <p className="text-xl md:text-2xl text-stone-100 max-w-2xl font-medium drop-shadow-lg">
          Radical co-creation, self-reliance, and deep connection in nature.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          {/* UPDATED LINK */}
          <Link
            href="/mar-2026"
            className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-stone-900 font-bold rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Explore Festival 2026
          </Link>
          <Link
            href="/values"
            className="px-8 py-4 bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full text-lg transition-all"
          >
            Our Values
          </Link>
        </div>
      </div>
    </div>
  )
}
