import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from 'components/Navbar'
import Expandable from 'components/Expandable'
import { SlideCarousel, type Slide } from 'components/SlideCarousel'
import { ImageLightbox } from 'components/ImageLightbox'
import { contactEmail } from 'app/metadata'
import { MEET_URL, ICS_PATH, googleCalendarUrl } from './event'

const title = 'Evolve 2027: An Online Gathering, Sunday 6 December'
const summary =
  'Join us online to put the Evolve 2027 mission into words, and to explore what success means to us as a community.'

export const metadata: Metadata = {
  title,
  description: summary,
  openGraph: {
    title,
    description: summary,
    images: [{ url: `/og?title=${encodeURIComponent('Evolve 2027: help shape what we do next')}` }],
  },
}

const KAZ_EMAIL = 'Kaz@activatewellbeing.com'
const SLIDES_PDF = '/files/evolve-moora-moora-slides.pdf'
const CANVAS_SRC = '/images/evolve-2027/community-canvas.webp'
const CANVAS_ALT =
  'The Community Canvas. Identity sits at the centre (purpose, identity, values, brand and success definition). Around it is Experience: selection, rituals, shared experiences, content, rules, roles and transition. Below is Structure: organisation, governance, financing, channels and platforms, and data management.'

const slides: Slide[] = [
  'Martin Luther King Jr. quote printed on the back of a hoodie: Those who love peace must learn to organize as effectively as those who love war.',
  "Vision: a wonderful and specific picture of what you're coming together to create. The more beautiful world our hearts know is possible: learning, growing and evolving together in community.",
  "Purpose: the way you'll live towards your vision. Becoming the people and generating the culture needed to avert crisis, by taking energy out of systems that aren't life-serving and meeting power over and power under with power with, and to usher in a more beautiful world, by hosting festivals and gatherings, growing a social movement and network of changemakers, and enjoying quality living within our capacity.",
  'The Community Canvas, with three sections: Identity at the centre (purpose, values, brand, success definition), Experience around it (selection, rituals, shared experiences, content, rules, roles, transition) and Structure below (organisation, governance, financing, channels and platforms, data management).',
  'Identity: who we are and who we serve. A collective of Evolve changemakers. We welcome and grow together with community changemakers who are willing to contribute as workshop hosts, onsite coordinators, and volunteer organisers before, during and after. Also listed: holistic and alternative practitioners, social entrepreneurs, alternative economy advocates, other festival organisers, social change activists and new earth creatives.',
  "Success definition: what are three outcomes that will define success? Define a successful Evolve Festival 2027 and Evolve Network of Changemakers 2027. Beforehand: what's the mission exactly?",
  "Mission: the specific strategies you're aiming for to achieve your vision in the time period you set, 2027 to 2030. Co-host three yearly festivals sustainably, demonstrating Evolve's values, and facilitate an active network of participants becoming contributors, co-hosting and evolving our experiments for living the more beautiful world.",
  "Success definition questions: How many contributors become changemakers in Evolve's network in 2027? How do we define successful communication with the existing changemaker network, past hosts and others, to tend relationships with care? What is it that we'd most want these changemakers to understand and do in 2027?",
  'Three teams mapped onto the three sections of the Community Canvas: identity, experience and structure.',
  'Designing Systems for Thriving Together. Wellbeing Teams: The Business of our Mutual Thriving, an NVC Community Research Project, by kaz.t.anderson of Activate Wellbeing.',
  "A collage of community and research references, including Researching a modern Moai, meeting for mutual wellbeing, and The Common Good Economy. Communities' technology and business models for thriving, and longevity and wellbeing related research.",
  'A social media post by Kaz T. Anderson quoting Indy Johar: one of the greatest resources in building anything is the energy required to keep its meaning alive between people.',
].map((alt, i) => ({
  src: `/images/evolve-2027/slides/slide-${String(i + 1).padStart(2, '0')}.jpg`,
  alt,
}))

/* href links to the event's page under /past-events, where one exists */
const timeline: { label: string; href?: string }[] = [
  { label: 'Spring Confest Village, October 2024', href: '/past-events/spring-confest-2024' },
  { label: 'Evolve Festival at Bell Park, March 2025', href: '/past-events/evolve-festival-bell-park-2025' },
  { label: 'Easter Confest Village, April 2025', href: '/past-events/easter-confest-2025' },
  { label: 'Spring Confest Village, October 2025', href: '/past-events/spring-confest-2025' },
  { label: 'Evolve Festival at Gilwell Park, March 2026', href: '/past-events/evolve-festival-gilwell-park-2026' },
  { label: 'Evolve residential at Moora Moora, October 2026' },
]

const circleQuotes = [
  'How do we stitch together those big gatherings, and create more sense of continuity in that belonging?',
  'I wanted to be in that space prior to being in the space.',
  'I would like clarity so I can say to friends...This is my role, and this could be your role',
  'It just opens up channels of belonging.',
]

const wellbeingQuotes = [
  "If the individuals don't feel seen and valued, the burnout happens inevitably.",
  'What if the power dynamics came up and we knew how to address them? And so we knew, as a team, how to keep functioning.',
  "You get connected to a team of people where the love flows and all of a sudden you're magicians.",
  "That's going to be very life-serving, to have our skills contributed to something that aligns so deeply with our flourishing.",
]

const runningOrder = [
  'Landing & Welcome',
  "Why we're here",
  'Mission - facilitated discussion',
  'Success Criteria - what success means activity',
  'Checkout Round - all voices',
  'Next steps',
]

/* Sage pebble bullets, as used across the restyled site */
function PebbleList({ items, className = '' }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="relative pl-6 text-ink-soft">
          <span aria-hidden="true" className="absolute left-1 top-[0.55em] h-2 w-2 rounded-pill bg-sage" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function QuoteGrid({ quotes }: { quotes: string[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {quotes.map((q) => (
        <li key={q} className="card p-6">
          <blockquote className="font-display text-xl leading-snug text-forest">&ldquo;{q}&rdquo;</blockquote>
        </li>
      ))}
    </ul>
  )
}

function PartLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 max-w-5xl mx-auto px-6 md:px-16 w-full">
      <span className="h-px flex-1 bg-line" />
      <p className="label text-center">{children}</p>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}

export default function Page() {
  return (
    <div className="flex flex-col w-full">
      <Navbar overlay={true} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-forest text-paper pt-36 pb-20 md:pt-44 md:pb-28 px-6">
        <img
          src="/brand/evolve-mark-single-sand.svg"
          alt=""
          aria-hidden="true"
          className="spiral-pattern -right-40 -top-24 w-[560px] max-w-none"
        />
        <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
          <p className="label !text-leaf">For everyone who has been part of Evolve</p>
          <h1 className="font-display text-heading-1 md:text-display title">
            Evolve 2027: help shape what we do next
          </h1>
          <p className="text-lg text-paper/90 max-w-2xl">{summary}</p>
          <ul className="w-full max-w-xl rounded-md border border-paper/25 px-6 py-5 flex flex-col gap-2 text-left">
            <li><strong className="font-semibold">Sunday 6 December 2026, 12pm AEDT</strong></li>
            <li>120 minutes on Zoom</li>
            <li>Hosted by the Evolve Vision Council: River, Chloe, Craig and Kate</li>
            <li>With supportive facilitation on the day from Kaz T. Anderson and Zoe Enticott</li>
          </ul>
          <a className="btn btn-sun px-8" href="#join">
            Save the date
          </a>
          <p className="text-small text-paper/80">
            There is nothing to commit to by coming. Come, connect and have your say.
          </p>
        </div>
      </section>

      {/* PART ONE: FROM THE EVOLVE VISION COUNCIL */}
      <div className="pt-16 md:pt-20">
        <PartLabel>From the Evolve Vision Council</PartLabel>
      </div>

      {/* Where Evolve is now */}
      <section className="py-12 md:py-16 px-6 md:px-16" aria-labelledby="now-heading">
        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2 md:items-center">
          <div className="flex flex-col gap-4">
            <h2 id="now-heading" className="font-display text-heading-1">Where Evolve is now</h2>
            <p className="text-ink-soft">
              Evolve grew from village gatherings at Confest into festivals of its own, held together by the
              connection, play and care we bring to each other. In October 2026 a group of us spent a weekend at
              Moora Moora asking where Evolve goes next.
            </p>
            <ol className="relative mt-2 flex flex-col gap-3 border-l-2 border-line pl-6">
              {timeline.map(({ label, href }, i) => (
                <li key={label} className="relative text-small text-ink-soft">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[31px] top-1 h-3 w-3 rounded-pill border-2 border-sand ${i === timeline.length - 1 ? 'bg-forest' : 'bg-sage'}`}
                  />
                  {href ? (
                    <Link href={href} target="_blank" rel="noopener" className="text-link !font-normal text-ink-soft">
                      {label}
                    </Link>
                  ) : (
                    label
                  )}
                </li>
              ))}
            </ol>
          </div>
          <figure className="flex flex-col gap-3">
            <a href="/values" className="card p-4 block hover:border-sage transition-colors">
              <img
                src="/images/values.png"
                width={680}
                height={371}
                loading="lazy"
                className="w-full h-auto"
                alt="The Evolve community principles: eight principles arranged around a central ring. 1. Learning, growing and evolving together. 2. Ecological wellbeing and interconnectedness. 3. Belonging and meaningful contribution. 4. Celebration, creativity and play. 5. Synthesis and collective sensemaking. 6. Collective governance and decision making. 7. Agency and action. 8. Honouring the sacred."
              />
            </a>
            <figcaption className="text-center text-small text-ink-soft">The Evolve community principles</figcaption>
          </figure>
        </div>
      </section>

      {/* What we decided after Moora Moora */}
      <section className="py-12 md:py-16 px-6 md:px-16" aria-labelledby="decided-heading">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          <h2 id="decided-heading" className="font-display text-heading-1">What we decided after Moora Moora</h2>
          <p className="text-ink-soft">
            After the weekend, the four of us met to reflect on everything people shared. Nearly all the energy in
            the circle was for two things: gathering in person again, and mapping Evolve clearly enough that
            everyone can see the whole and find their place in it. There was much less energy for running a
            festival early in the year.
          </p>
          <p className="text-ink-soft">
            So we have decided that the Australia Day long weekend in January 2027 will be a residential, open to a
            wider circle than Moora Moora, and not a festival. The next Evolve Festival is planned for November
            2027. We made this decision after listening, and we want you to know how it was made.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-10 flex flex-col gap-12">
          <div className="card p-6 md:p-10">
            <h3 className="font-display text-heading-2 mb-6">The path from here</h3>
            <ol className="grid gap-6 md:grid-cols-3">
              {[
                ['Sunday 6 December 2026', "Purpose of crafting Evolve 2027 mission into words, and exploring 'Definitions of Success'."],
                ['Australia Day long weekend, January 2027', 'A residential to go deeper in person.'],
                ['November 2027', 'The Evolve Festival.'],
              ].map(([when, what], i) => (
                <li key={when} className="flex flex-col gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-pill bg-leaf/50 font-display text-xl">
                    {i + 1}
                  </span>
                  <strong className="font-semibold">{when}</strong>
                  <span className="text-ink-soft">{what}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-display text-heading-2 text-center">Some of what we heard in the circle</h3>
            <QuoteGrid quotes={circleQuotes} />
          </div>
        </div>
      </section>

      {/* Why join on December 6 */}
      <section className="py-12 md:py-16 px-6 md:px-16" aria-labelledby="gathering-heading">
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div className="flex flex-col gap-4">
              <h2 id="gathering-heading" className="font-display text-heading-1">Why join on December 6</h2>
              <p className="text-ink-soft">
                This session is to help us say clearly what Evolve is setting out to do in 2027, and to explore which
                definitions of success ring most true for this community.
              </p>
              <h3 className="font-display text-xl mt-2">Why you might value coming</h3>
              <PebbleList
                items={[
                  'You can help shape the words for the mission, and come into alignment around them, before they are settled.',
                  'You get to say what a successful Evolve would mean to you.',
                  'A chance to reconnect with friends you have shared Evolve with before.',
                ]}
              />
            </div>
            <div className="card p-6 md:p-8 flex flex-col gap-4">
              <h3 className="font-display text-xl">Why you might value being part of Evolve 2027</h3>
              <PebbleList
                items={[
                  'Belonging that continues between gatherings.',
                  'A chance to help make Evolve, as well as attend it.',
                  'A say in the direction from the start.',
                  'Working in small teams where care for each other is part of the plan.',
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="label text-center">Running order</p>
            <ol className="flex flex-wrap justify-center gap-2">
              {runningOrder.map((step, i) => (
                <li key={step} className="rounded-pill border border-line bg-paper px-4 py-2 text-small">
                  <span className="text-sage font-semibold mr-2">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* The Opportunity to Imagine How You Belong */}
      <section className="py-12 md:py-16 px-6 md:px-16" aria-labelledby="role-heading">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-center">
            <h2 id="role-heading" className="font-display text-heading-1 title">
              The Opportunity to Imagine How You Belong
            </h2>
            <p className="text-ink-soft">
              Between now and the festival in November 2027, each of us is invited to explore the nature of our
              involvement. There&apos;s a vision of having teams working together to create what Evolve wants to
              become, where the individuals are held with care and understood for their capacity, capabilities and
              desire to contribute. There are many roles. Here&apos;s just some that you&apos;ll likely be familiar
              with...
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ['Workshop host', 'creating experiences of the world we dream is possible.'],
              ['Onsite coordinator', 'helping hold an area when we gather.'],
              ['Organiser', 'lending your hands before, during or after.'],
              ['Supporter', 'staying close, and coming when you can.'],
            ].map(([role, desc]) => (
              <li key={role} className="card p-5">
                <strong className="font-semibold">{role}:</strong> <span className="text-ink-soft">{desc}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 text-center text-ink-soft">
            <p>
              Roles won&apos;t be the focus of our gathering on the 6th, though there&apos;s potential to dive into
              this discussion when we next gather in person.
            </p>
            <p className="font-display text-xl text-forest">River, Chloe, Craig and Kate</p>
          </div>
        </div>
      </section>

      {/* PART TWO: FROM KAZ */}
      <div className="pt-8 md:pt-12">
        <PartLabel>From Kaz T. Anderson</PartLabel>
      </div>

      {/* Wellbeing Teams quotes and resources */}
      <section className="py-12 md:py-16 px-6 md:px-16" aria-label="Wellbeing Teams and resources">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-heading-2 text-center">Why Wellbeing Teams excite me</h3>
            <QuoteGrid quotes={wellbeingQuotes} />
          </div>

          <div className="grid gap-6 md:grid-cols-[3fr_2fr] md:items-start">
            <article className="card p-6 md:p-8 flex flex-col gap-4">
              <h3 className="font-display text-heading-2">The Slides I shared at Moora Moora</h3>
              <p className="text-ink-soft">
                These slides raised my own questions about Evolve&apos;s purpose, identity, mission and success
                (these aren&apos;t necessarily reflective or accurate to Evolve&apos;s truth). That&apos;s part of
                what we can continue to explore on 6 December:-)
              </p>
              <SlideCarousel slides={slides} label="Moora Moora slides" />
              <a className="text-link self-start" href={SLIDES_PDF} target="_blank" rel="noopener">
                View the slides (PDF)
              </a>
            </article>
            <article className="card p-6 md:p-8 flex flex-col gap-4">
              <h3 className="font-display text-heading-2">The Community Canvas</h3>
              <p className="text-ink-soft">
                A well-used map that helps a community get clear on its identity, the experience it offers and the
                structure that holds it. I brought it to Moora Moora as a way to see the whole of Evolve at once.
              </p>
              <figure className="flex flex-col gap-2">
                <ImageLightbox src={CANVAS_SRC} alt={CANVAS_ALT}>
                  <Image
                    src={CANVAS_SRC}
                    width={801}
                    height={687}
                    sizes="(min-width: 768px) 360px, 92vw"
                    className="w-full h-auto"
                    alt={CANVAS_ALT}
                  />
                </ImageLightbox>
                <figcaption className="text-label text-ink-soft">
                  The Community Canvas by community-canvas.org,{' '}
                  <a
                    className="underline decoration-sage underline-offset-2 hover:decoration-forest"
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                    target="_blank"
                    rel="noopener"
                  >
                    CC BY-NC-SA 4.0
                  </a>
                </figcaption>
              </figure>
              <a className="text-link self-start" href="https://community-canvas.org/" target="_blank" rel="noopener">
                Explore the Community Canvas
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Join us on 6 December */}
      <section id="join" className="py-12 md:py-16 px-6 md:px-16 scroll-mt-24" aria-labelledby="join-heading">
        <div className="relative overflow-hidden max-w-3xl mx-auto rounded-md bg-forest text-paper px-6 py-12 md:px-12 flex flex-col items-center text-center gap-6">
          <img
            src="/brand/evolve-mark-single-sand.svg"
            alt=""
            aria-hidden="true"
            className="spiral-pattern -left-32 -bottom-40 w-[420px] max-w-none"
          />
          <h2 id="join-heading" className="relative font-display text-heading-1">Join us on 6 December</h2>
          <p className="relative text-paper/90">
            We would value your company and your voice as we shape Evolve 2027 together.
          </p>
          <dl className="relative w-full max-w-xl grid gap-3 text-left">
            {[
              ['When', 'Sunday 6 December 2026, 12pm AEDT'],
              [
                'Where',
                MEET_URL ? (
                  <a
                    href={MEET_URL}
                    target="_blank"
                    rel="noopener"
                    className="underline decoration-leaf decoration-2 underline-offset-4 hover:decoration-paper"
                  >
                    Zoom
                  </a>
                ) : (
                  'Zoom (link to come)'
                ),
              ],
              ['How long', '120 minutes'],
              ['Hosts', 'The Evolve Vision Council'],
              ['Facilitators', 'Kaz T. Anderson and Zoe Enticott, supporting us on the day'],
              [
                'Recording',
                'We intend to record. The session is as much about connection as content, so please come live if you can.',
              ],
            ].map(([dt, dd]) => (
              <div key={String(dt)}className="grid sm:grid-cols-[9rem_1fr] gap-1 sm:gap-4 border-b border-paper/15 pb-3 last:border-0">
                <dt className="label !text-leaf sm:pt-1">{dt}</dt>
                <dd>{dd}</dd>
              </div>
            ))}
          </dl>
          <div className="relative flex flex-col items-center gap-3">
            {MEET_URL && (
              <a className="btn btn-sun px-8" href={MEET_URL} target="_blank" rel="noopener">
                Join on Zoom
              </a>
            )}
            <p className="text-small text-paper/80">
              Save the date:{' '}
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener"
                className="underline decoration-leaf decoration-2 underline-offset-4 hover:decoration-paper"
              >
                Google Calendar
              </a>{' '}
              /{' '}
              <a
                href={ICS_PATH}
                className="underline decoration-leaf decoration-2 underline-offset-4 hover:decoration-paper"
              >
                Apple or Outlook (.ics)
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="py-12 md:py-16 px-6 md:px-16" aria-labelledby="faq-heading">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <h2 id="faq-heading" className="font-display text-heading-1 text-center">Questions</h2>
          <div className="card px-6">
            <Expandable title="Who is this gathering for?">
              <p className="pb-4">
                Anyone who has been part of Evolve, as a supporter, participant, host, volunteer or friend. If you
                care about where Evolve goes next, you are welcome.
              </p>
            </Expandable>
            <Expandable title="Do I have to commit to anything by coming?">
              <p className="pb-4">No. Come, connect and have your say. What you choose afterwards is yours to decide.</p>
            </Expandable>
            <Expandable title="Will the session be recorded?">
              <p className="pb-4">
                We intend to record it. The gathering is also about connection, so please come live if you can.
              </p>
            </Expandable>
            <Expandable title="Who do I contact with a question?">
              <p className="pb-4">
                If you have questions regarding facilitation on the 6th please reach out to{' '}
                <a className="text-link" href={`mailto:${KAZ_EMAIL}`}>{KAZ_EMAIL}</a>. Otherwise reach out to the
                Evolve team at <a className="text-link" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </p>
            </Expandable>
          </div>
        </div>
      </section>
    </div>
  )
}
