import Link from 'next/link'

export function Hero() {
  return (
    <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden bg-stone-900 text-white">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-60"
        style={{
          // Using an image from your gallery list
          backgroundImage: "url('/images/bell-park-2025/image-4.jpg')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
          Come as a participant,<br />
          <span className="text-teal-400">leave as a contributor.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-stone-200 max-w-2xl font-light drop-shadow-md">
          Radical co-creation, self-reliance, and deep connection in nature.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link 
            href="#events" 
            className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-stone-900 font-bold rounded-full text-lg transition-all transform hover:scale-105"
          >
            Join the Festival
          </Link>
          <Link 
            href="#manifesto" 
            className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full text-lg transition-all"
          >
            Read the Vision
          </Link>
        </div>
      </div>
    </div>
  )
}
