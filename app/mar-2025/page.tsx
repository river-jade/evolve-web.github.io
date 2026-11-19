import { A, ContentPage, pageMetadata, type PageInfo } from 'components/ContentPage'

const page: PageInfo = {
  path: '/mar-2025',
  title: 'Evolve Festival 2025',
  summary:
    'Evolve Festival 2025 is a gathering of people on land to connect with themselves and each other in a ritual that breaks them out of the routine of everyday life.',
}

export const metadata = pageMetadata(page)

export default function Festival2025Page() {
  return (
    <ContentPage {...page} className="list-none">
      <ul>
        <li>Date: 7th March - 10th March, 2025</li>
        <li>
          Location: <A href="https://maps.app.goo.gl/SBKD5mB7ABmX4BdY6">Bell Park, Lang Lang</A> (around 1 hour from Melbourne)
        </li>
        <li>
          Tickets: <A href="https://www.trybooking.com/CYSCA">trybooking.com/CYSCA</A>
        </li>
        <li>
          Facebook event: <A href="https://www.facebook.com/events/1113242300544718/">facebook.com/events/1113242300544718/</A>
        </li>
      </ul>

      <h2>What is Evolve?</h2>

      <p>
        Evolve is more than a festival—it’s a movement. It’s a gathering of hearts and minds, united by a shared vision: to create a better world for human and non-human beings alike. Join us for a lived experience of deeper connection—to yourself, to others, and to the land. Together, we’ll plant the seeds for a global network of interconnected communities and celebrate the beauty of life, humanity, and nature.
      </p>

      <p>
        <A href="/">Read more about Evolve</A>.
      </p>

      <h2>Our Vision</h2>

      <ul>
        <li>Share knowledge and wisdom for positive change.</li>
        <li>Explore how to live in greater harmony with the earth and each other.</li>
        <li>Celebrate the joy of community, creativity, and collaboration.</li>
      </ul>

      <h2>What to Expect</h2>

      <ul>
        <li>Radical co-creation and self-reliance—come as a participant, leave as a contributor.</li>
        <li>Facilities include drinking water, toilets, and showers.</li>
        <li>Stunning natural surroundings with opportunities for forest walks and grounding in nature.</li>
        <li>A fire circle for storytelling, connection, and reflection.</li>
        <li>Workshop spaces, community kitchens, and a cosy lounge area.</li>
        <li>A like-minded community dedicated to creating positive change.</li>
      </ul>

      <h2>Workshops &amp; Experiences</h2>

      <p>
        Evolve is an “unconference”, which means that anyone can offer a workshop in an area aligned with the vision of the festival. We’ll also be inviting some well-respected facilitators in these disciplines and will announce more as we can.
      </p>

      <p>
        <A href="/workshops/2025">See workshop descriptions</A>
      </p>

      <hr />

      <p>Potential topics include:</p>

      <ul>
        <li>Permaculture</li>
        <li>Nonviolent Communication (NVC)</li>
        <li>Deep Ecology</li>
        <li>De-centralised Governance</li>
        <li>Authentic Relating</li>
        <li>Contact Improvisation</li>
        <li>Ecstatic Dance</li>
        <li>Rewilding</li>
        <li>Yoga &amp; Meditation</li>
        <li>Qigong</li>
      </ul>

      <p>
        Want to run a workshop or share your wisdom? We’d love to hear from you! Email us at{' '}
        <A href="mailto:workshops@evolvecommunity.world">workshops@evolvecommunity.world</A> or fill out{' '}
        <A href="https://forms.gle/rTbYTsmBqo5iPSut8">this form</A>.
      </p>

      <h2>Entertainment</h2>

      <p>
        Dance the night away with DJs on Saturday night (music ends at midnight). On Sunday, enjoy an open mic night where the community takes the stage.
      </p>

      <h2>Accommodation</h2>

      <p>
        Camping only—bring your tent and enjoy sleeping under the stars. Van and car camping also welcome! Please let us know if you want to bring a caravan as space may be limited.
      </p>

      <h2>Cost</h2>

      <p>
        Adult tickets are $130 for 3 nights, and kids $80 (under fives free). Part of your contribution is also a minimum of 2 hours of your time to help things to run smoothly. Please contact us if you have financial hardship but would really like to come. NTAFLOF (no-one turned away for lack of funds).
      </p>

      <h2>Get Involved</h2>

      <p>
        What would you like to offer? Is there a workshop you’d like to run? Who would you like to see speak, teach, or perform at Evolve? Do you have some other offering you can contribute? Let us know!
      </p>

      <h2>Not-for-Profit</h2>

      <p>
        Evolve is a community-driven, not-for-profit event. Your participation directly supports the creation of this and future gatherings.
      </p>

      <h2>Join Us</h2>

      <p>
        This is more than a festival—it’s an opportunity to be part of something bigger. Come to connect, contribute, and co-create the future we all dream of.
      </p>

      <p>
        Tickets here: <A href="https://www.trybooking.com/CYSCA">trybooking.com/CYSCA</A>
      </p>

      <p>Let’s evolve together. See you there!</p>
    </ContentPage>
  )
}
