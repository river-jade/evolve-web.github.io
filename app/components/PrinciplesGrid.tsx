import Link from 'next/link'

export function PrinciplesGrid() {
  const principles = [
    {
      title: "Learning & Evolution",
      icon: "🌱",
      slug: "1-learning-growing-and-evolving-together",
      desc: "We support each other’s development as individuals while cultivating a cultural transformation together."
    },
    {
      title: "Ecological Wellbeing",
      icon: "🌿",
      slug: "2-ecological-wellbeing-and-interconnectedness",
      desc: "We recognize we are nature. We design for regeneration, listening to the wisdom of the land and ecosystems."
    },
    {
      title: "Belonging & Contribution",
      icon: "🤝",
      slug: "3-belonging-and-meaningful-contribution",
      desc: "Everyone has a place. We create safe spaces where people feel seen, valued, and free to express their gifts."
    },
    {
      title: "Celebration & Play",
      icon: "🔥",
      slug: "4-celebration-creativity-and-play",
      desc: "Joy and creativity sustain us. We harness the power of play to build trust and open space for emergence."
    },
    {
      title: "Collective Sensemaking",
      icon: "🧠",
      slug: "5-synthesis-and-collective-sensemaking",
      desc: "We seek truth together—integrating diverse perspectives to let collective intelligence emerge."
    },
    {
      title: "Collective Governance",
      icon: "⚖️",
      slug: "6-collective-governance-and-decision-making",
      desc: "We aim for fair power distribution, minimising centralisation and maximising trust and accountability."
    },
    {
      title: "Agency & Action",
      icon: "🚀",
      slug: "7-agency-and-action",
      desc: "We don't just talk; we act. We use our shared inspiration to generate real-world projects that make a difference."
    },
  ]

  return (
    <section className="py-20 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Our Core Principles</h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            Evolve is built on a foundation of seven key principles. Click below to explore them in depth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {principles.map((p, i) => (
            <Link
              href={`/principles#${p.slug}`}
              key={i}
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-stone-100 flex flex-col gap-4 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="text-4xl bg-stone-100 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                  {p.icon}
                </div>
                <span className="text-stone-300 group-hover:text-teal-500 transition-colors">→</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 group-hover:text-teal-700 transition-colors">
                {p.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
