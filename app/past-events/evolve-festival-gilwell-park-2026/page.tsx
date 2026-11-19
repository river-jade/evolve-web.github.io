import Image from 'next/image'
import ImageGallery from 'components/Gallery'
import { A, ContentPage, pageMetadata, type PageInfo } from 'components/ContentPage'

const page: PageInfo = {
  path: '/past-events/evolve-festival-gilwell-park-2026',
  title: 'Evolve Festival at Gilwell Park 2026',
  summary: 'We ran our second festival at Gilwell Park in March, 2026 for around 200 attendees.',
}

export const metadata = pageMetadata(page)

export default function GilwellPark2026Page() {
  return (
    <ContentPage {...page} className="list-none">
      <Image src="/images/gilwell-park-2026/opening-ceremony.jpeg" alt="Opening ceremony" width={800} height={600} />

      <p>
        We held our second festival at Gilwell Park in March 2026, welcoming around 200 people for a rich weekend of connection, learning, celebration, and co-creation.
      </p>

      <p>
        The gathering felt deeply alive. Across the weekend, there was a strong program of thoughtful, high-quality workshops, beautiful music and evening entertainment, and many opportunities to explore the values, relationships, and ways of being that sit at the heart of Evolve.
      </p>

      <p>
        It was heartening to see the festival become not just an event, but a living expression of the culture we want to help grow: more connected, more conscious, more collaborative, and more rooted in care for each other and the wider world.
      </p>

      <p>
        We’re excited to keep bringing people together on the land in service of cultural transformation and a more beautiful future.
      </p>

      <p>
        <A href="/workshops/2026">Check out the workshops from 2026!</A>
        <br />
        <A href="/schedule/2026">And the schedule</A>
      </p>

      <h2>Gallery</h2>
      <ImageGallery
        images={[
          { src: '/images/gilwell-park-2026/bridge-in-forest.JPG', alt: 'Bridge in forest' },
          { src: '/images/gilwell-park-2026/closing-ceremony.jpg', alt: 'Closing ceremony' },
          { src: '/images/gilwell-park-2026/festival-at-night.JPG', alt: 'Festival at night' },
          { src: '/images/gilwell-park-2026/lounge-at-dusk.JPG', alt: 'Lounge at dusk' },
          { src: '/images/gilwell-park-2026/lounge-tent.JPG', alt: 'Lounge tent' },
          { src: '/images/gilwell-park-2026/mandala-close-up.jpeg', alt: 'Mandala close up' },
          { src: '/images/gilwell-park-2026/mandala-whole.jpeg', alt: 'Mandala whole' },
          { src: '/images/gilwell-park-2026/open-mic-melody-moon.JPG', alt: 'Open mic Melody Moon' },
          { src: '/images/gilwell-park-2026/open-mic.jpg', alt: 'Open mic' },
          { src: '/images/gilwell-park-2026/opening-ceremony-spiral-1.jpeg', alt: 'Opening ceremony spiral 1' },
          { src: '/images/gilwell-park-2026/opening-ceremony-spiral-2.jpeg', alt: 'Opening ceremony spiral 2' },
          { src: '/images/gilwell-park-2026/opening-ceremony-spiral-3.jpeg', alt: 'Opening ceremony spiral 3' },
          { src: '/images/gilwell-park-2026/opening-ceremony.jpeg', alt: 'Opening ceremony' },
          { src: '/images/gilwell-park-2026/pot-luck.JPG', alt: 'Pot luck' },
          { src: '/images/gilwell-park-2026/workshop.jpg', alt: 'Workshop' },
        ]}
      />
    </ContentPage>
  )
}
