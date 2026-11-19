import Image from 'next/image'
import Expandable from 'components/Expandable'
import { A, ContentPage, pageMetadata, type PageInfo } from 'components/ContentPage'

const page: PageInfo = {
  path: '/mar-2026',
  title: 'Evolve Festival 2026',
  summary:
    'Evolve Festival 2026 is a gathering of people on land to connect with themselves and each other in a ritual that breaks them out of the routine of everyday life.',
}

export const metadata = pageMetadata(page)

export default function Festival2026Page() {
  return (
    <ContentPage {...page} className="list-none">
      <ul>
        <li>Date: 6th March - 9th March, 2026</li>
        <li>
          Location: <A href="https://maps.app.goo.gl/EXBazoexiTy88vmr8">Gilwell Park, Gembrook</A> (1:15 hour from Melbourne)
        </li>
        <li>
          Tickets: <A href="https://www.trybooking.com/DHISF">TryBooking</A>
        </li>
        <li>
          Facebook event: <A href="https://www.facebook.com/events/860183339903891">Facebook</A>
        </li>
        <li>
          Workshop descriptions: <A href="/workshops/2026">Workshops</A>
        </li>
        <li>
          Workshop schedule: <A href="/schedule/2026">Schedule</A>
        </li>
      </ul>

      <Image src="/images/evolve-at-confest-blurred.jpg" alt="Evolve at Confest" width={1024} height={576} />

      <h2>What is Evolve?</h2>

      <p>
        Evolve is more than a festival — it’s a movement. It’s a gathering of hearts and minds, united by a shared vision: to create a better world for human and non-human beings alike. Join us for a lived experience of deeper connection—to yourself, to others, and to the land. Together, we’ll plant the seeds for a global network of interconnected communities and celebrate the beauty of life, humanity, and nature.
      </p>

      <p>
        <A href="/">Read more about Evolve on our main page</A>.
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
        <li>Talking circles for storytelling, connection, and reflection.</li>
        <li>Workshop spaces, community kitchens, and a cosy lounge area.</li>
        <li>A like-minded community dedicated to creating positive change.</li>
      </ul>

      <h2>Workshops &amp; Experiences</h2>

      <p>
        Evolve is an “unconference”, which means that anyone can offer a workshop in an area aligned with the vision of the festival. We’ll also be inviting some well-respected facilitators in these disciplines and will announce more as we can.
      </p>

      <Image src="/images/bell-park-2025/image-3.jpg" alt="Workshop at Bell Park 2025" width={1024} height={769} />

      <p>
        <A href="/workshops/2026">See workshop descriptions</A>
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
        <A href="https://forms.gle/N4DWRWGhYRXiccnK6">this form</A>.
      </p>

      <h2>Entertainment</h2>

      <ul>
        <li>Kirtan with Paul on Friday night to help us all drop in.</li>
        <li>Dance the night away with DJs on Saturday night (music ends at midnight).</li>
        <li>On Sunday, enjoy an open mic night where the community takes the stage.</li>
      </ul>

      <Image src="/images/bell-park-2025/image-1.jpg" alt="Open mic at Bell Park" width={1024} height={771} />

      <h2>Accommodation</h2>

      <p>
        Camping only — bring your tent and enjoy sleeping under the stars. Van and car camping also welcome! Please let us know if you want to bring a caravan as space may be limited.
      </p>

      <h2>Cost</h2>

      <ul>
        <li>Early Bird (until 31st Jan): Adults $90, Kids $20.</li>
        <li>Standard Price: Adults $140, Kids $30.</li>
        <li>Under 5s: Free.</li>
      </ul>

      <p>
        Prices are for 3 nights. Part of your contribution is also a minimum of 2 hours of your time to help things to run smoothly. Please contact us if you have financial hardship but would really like to come. NTAFLOF (no-one turned away for lack of funds).
      </p>

      <h2>Get Involved</h2>

      <p>
        What would you like to offer? Is there a workshop you’d like to run? Who would you like to see speak, teach, or perform at Evolve? Do you have some other offering you can contribute?{' '}
        <A href="mailto:contact@evolvecommunity.world">Let us know!</A>
      </p>

      <h2>Not-for-Profit</h2>

      <p>
        Evolve is a community-driven, not-for-profit event. Your participation directly supports the creation of this and future gatherings.
      </p>

      <h2>Sober Festival</h2>

      <p>Due to strict insurance requirements, this is an alcohol-free event with a no BYO policy.</p>

      <h2>Frequently Asked Questions</h2>

      <Expandable title="Where is the festival located?">
        <p>The festival is held at Gilwell Park, Gembrook. It is approximately 1 hour from Melbourne.</p>
      </Expandable>
      <Expandable title="What kind of accommodation is available? Can I camp in my van / bus / caravan?">
        <p>
          This is a camping-only event. Please bring your own tent and bedding. Van and car camping are welcome, but please notify us if you plan to bring a caravan or bus as space is limited.
        </p>
        <p>
          Please note: vehicles can not be moved in the camping area during the event without the supervision of a traffic marshall. Please notify us if you’re camping with your vehicle and need to leave early or arrive late.
        </p>
      </Expandable>
      <Expandable title="Are there facilities on site?">
        <p>
          Yes. Facilities include drinking water, toilets, hot showers, community kitchen (BYO camp stove / esky), and a cosy lounge area.
        </p>
      </Expandable>
      <Expandable title="Is this a family-friendly event?">
        <p>
          Absolutely. Children are welcome. Tickets for kids are $55 (early bird) or $85 (standard). Children under five attend for free.
        </p>
      </Expandable>
      <Expandable title="Do I need to volunteer?">
        <p>
          Yes. Evolve is a co-created community event. Part of your contribution is a minimum of 2 hours of your time to help the festival run smoothly.
        </p>
      </Expandable>
      <Expandable title="What should I bring?">
        <p>
          Bring your camping gear, clothes for all weather, a water bottle, and an open heart. Since it’s a self-reliant gathering, ensure you have everything you need for a comfortable stay.
        </p>
      </Expandable>
      <Expandable title="Can I bring my pet?">
        <p>Sorry, with the exception of service animals, Gilwell Park doesn’t allow pets onsite.</p>
      </Expandable>
      <Expandable title="Do facilitators / performers / crew etc get free tickets?">
        <p>
          Part of Evolve’s philosophy is that it is a co-creation. Currently, everyone contributes financially to the infrastructure costs of the festival, and everyone contributes in ways which feel meaningful and aligned for them. Currently, no one gets paid (apart from 3rd party contractors) and no one gets comp tickets.
        </p>
      </Expandable>
      <Expandable title="Are there any day passes?">
        <p>
          In order to hold a strong container (as well as to minimise admin overhead), Evolve does not currently offer day passes.
        </p>
      </Expandable>
      <Expandable title="What if I can't come? Can I sell my ticket or get a refund?">
        <p>
          We understand that circumstances sometimes change. If you can no longer attend, you’re welcome to resell your ticket via{' '}
          <A href="https://tixel.com/sell/upload">Tixel</A>. We are only able to offer refunds in exceptional circumstances (for example, a funeral or a close family member requiring urgent care).
        </p>
      </Expandable>
      <Expandable title="Is there a market or food vendors on-site?">
        <p>
          Evolve is a non-commercial event, and there will be no market or food vendors on-site. Please come prepared with everything you need, including all food and drinks.
        </p>
      </Expandable>

      <h2>Join Us</h2>

      <p>
        This is more than a festival — it’s an opportunity to be part of something bigger. Come to connect, contribute, and co-create the future we all dream of.
      </p>

      <p>
        Tickets here: <A href="https://www.trybooking.com/DHISF">TryBooking</A>
      </p>

      <p>Let’s evolve together. See you there!</p>
    </ContentPage>
  )
}
