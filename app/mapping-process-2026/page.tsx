import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from 'components/Navbar'
import Expandable from 'components/Expandable'
import { ImageLightbox } from 'components/ImageLightbox'
import { contactEmail } from 'app/metadata'
import { MEET_URL, ICS_PATH, googleCalendarUrl } from './event'

const title = 'Evolve 2027: An Online Gathering, Sunday 6 December'
const summary =
  'Visioning into the future of Evolve - what does success look like?'

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
const VPM_SRC = '/images/evolve-2027/vision-purpose-mission.jpg'
const VPM_ALT =
  "Evolve's Vision, Purpose and Mission, for the Evolve Festival in November 2027. Vision: becoming the people and generating the culture to avert crisis and usher in the more beautiful world our hearts know is possible. Purpose: our aim is to avert crisis by taking our energy out of the systems that aren't life-serving and instead manifest a beautiful world by living Evolve's values as we co-create the Evolve Festival for November 2027. Mission: practicing Evolve's values as we organise ourselves as a 'Community of Co-Hosts' to create the Evolve Festival in November 2027."
const CANVAS_SRC = '/images/evolve-2027/community-canvas.webp'
const CANVAS_ALT =
  'The Community Canvas. Identity sits at the centre (purpose, identity, values, brand and success definition). Around it is Experience: selection, rituals, shared experiences, content, rules, roles and transition. Below is Structure: organisation, governance, financing, channels and platforms, and data management.'

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
  'Vision & Identity',
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
                [
                  'Sunday 6 December 2026',
                  "Purpose of sharing an understanding of the Evolve 2027 mission, vision and purpose and exploring 'Definitions of Success'.",
                ],
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
                This session is to support shared voices and shared understanding in creating the Evolve Festival
                2027, and to explore which definitions of success ring most true to us.
              </p>
              <h3 className="font-display text-xl mt-2">Why you might value coming</h3>
              <PebbleList
                items={[
                  'You get to say what a successful Evolve would mean for you.',
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
              Roles won&apos;t be the focus of our gathering on the 6th, we&apos;ll aim to explore roles in person
              in January. We&apos;re looking forward to sitting in circle together online on the 6th to map what
              success looks like first, and appreciate Kaz and Zoe&apos;s support to facilitate. See you there.
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
          <div className="max-w-2xl mx-auto flex flex-col gap-4 text-ink-soft">
            <p>
              Zoe and I are looking forward to seeing everyone online on the 6th. We&apos;re supporting the
              facilitation of this conversation for Evolve so that we can explore what matters to us all. We&apos;ve
              been especially inspired by the Community Canvas as a guide to the sorts of questions we can ask
              together as a community. There&apos;s a link to learn more about the Community Canvas below.
            </p>
            <p>
              What particularly inspires me is the idea of creating Wellbeing Teams, so that if you&apos;re working
              to support the festival you also feel like others you&apos;re working alongside &lsquo;have your
              back&rsquo; and you have theirs. We&apos;re all tired of the culture of competition and self-interest,
              and practicing the Evolve values together in explicit ways is one way we can counter-act the
              extractive nature of &lsquo;capitalist-style&rsquo; relating.
            </p>
            <p>
              I&apos;m currently hosting a Wellbeing Team&apos;s Research Project inside the Australian NVC
              community and am happy to bring what I&apos;m learning to share with the Evolve community. It&apos;s
              not something we&apos;ll go deeply into on the 6th but perhaps something we can explore at the
              residential in January. I&apos;m looking forward to being online together to get the ball rolling
              :-)
            </p>
            <p className="font-display text-xl text-forest">Warmly, Kaz</p>
          </div>

          <div className="max-w-2xl mx-auto w-full flex flex-col gap-4">
            <h3 className="font-display text-heading-2 text-center">Why Wellbeing Teams inspire me</h3>
            <ul className="rounded-md border border-line bg-leaf/15 px-6 md:px-8 py-2 divide-y divide-line">
              {wellbeingQuotes.map((q) => (
                <li key={q} className="py-4">
                  <blockquote className="italic text-ink-soft">&ldquo;{q}&rdquo;</blockquote>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 md:grid-cols-[3fr_2fr] md:items-start">
            <article className="card p-6 md:p-8 flex flex-col gap-4">
              <h3 className="font-display text-heading-2">Evolve&apos;s Vision, Purpose &amp; Mission</h3>
              <figure>
                <ImageLightbox src={VPM_SRC} alt={VPM_ALT}>
                  <Image
                    src={VPM_SRC}
                    width={1600}
                    height={900}
                    sizes="(min-width: 1024px) 540px, (min-width: 768px) 55vw, 92vw"
                    className="w-full h-auto rounded-sm"
                    alt={VPM_ALT}
                  />
                </ImageLightbox>
              </figure>
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
              ['Facilitators', 'Kaz and Zoe, supporting us on the day'],
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
