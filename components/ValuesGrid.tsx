import Link from 'next/link'
import { Icon, type IconName } from './Icon'

export function ValuesGrid() {
  const values: { title: string; icon: IconName; slug: string; desc: string }[] = [
    {
      title: "Learning & Evolution",
      icon: "sprout",
      slug: "learning-growing-and-evolving-together",
      desc: "We support each other’s development as individuals while cultivating a cultural transformation together."
    },
    {
      title: "Ecological Wellbeing",
      icon: "globe",
      slug: "ecological-wellbeing-and-interconnectedness",
      desc: "We recognize we are nature. We design for regeneration, listening to the wisdom of the land and ecosystems."
    },
    {
      title: "Belonging & Contribution",
      icon: "people",
      slug: "belonging-and-meaningful-contribution",
      desc: "Everyone has a place. We create safe spaces where people feel seen, valued, and free to express their gifts."
    },
    {
      title: "Celebration & Play",
      icon: "flame",
      slug: "celebration-creativity-and-play",
      desc: "Joy and creativity sustain us. We harness the power of play to build trust and open space for emergence."
    },
    {
      title: "Collective Sensemaking",
      icon: "network",
      slug: "synthesis-and-collective-sensemaking",
      desc: "We seek truth together—integrating diverse perspectives to let collective intelligence emerge."
    },
    {
      title: "Collective Governance",
      icon: "scales",
      slug: "collective-governance-and-decision-making",
      desc: "We aim for fair power distribution, minimising centralisation and maximising trust and accountability."
    },
    {
      title: "Agency & Action",
      icon: "bolt",
      slug: "agency-and-action",
      desc: "We don't just talk; we act. We use our shared inspiration to generate real-world projects that make a difference."
    },
    {
      title: "Honouring the Sacred",
      icon: "heart",
      slug: "honouring-the-sacred",
      desc: "We acknowledge the spiritual dimensions of our work, creating space for reverence, gratitude, and connection to the sacred."
    }
  ]

  return (
    <section className="py-16 md:py-24 px-6 md:px-16 bg-leaf/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-heading-1 text-forest mb-4">Our Core Values</h2>
          <p className="text-ink-soft max-w-2xl mx-auto text-lg">
            Evolve is built on a foundation of eight key values. Click below to explore them in depth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((p, i) => (
            <Link
              href={`/values#${p.slug}`}
              key={i}
              className="group card p-6 flex flex-col gap-4 transition-colors hover:border-sage"
            >
              <div className="flex items-center justify-between">
                <div className="icon-disc transition-colors group-hover:bg-leaf">
                  <Icon name={p.icon} size={28} />
                </div>
                <Icon name="arrowRight" size={20} className="text-sage transition-all group-hover:text-forest group-hover:translate-x-1" />
              </div>
              <h3 className="font-display text-heading-2 text-forest">
                {p.title}
              </h3>
              <p className="text-ink-soft">{p.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
