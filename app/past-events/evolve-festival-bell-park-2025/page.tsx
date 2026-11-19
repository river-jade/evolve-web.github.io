import ImageGallery from 'components/Gallery'
import { A, ContentPage, pageMetadata, type PageInfo } from 'components/ContentPage'

const page: PageInfo = {
  path: '/past-events/evolve-festival-bell-park-2025',
  title: 'Evolve Festival at Bell Park 2025',
  summary: 'We ran our inaugural festival at Bell Park in March, 2025 for around 150 attendees.',
}

export const metadata = pageMetadata(page)

export default function BellPark2025Page() {
  return (
    <ContentPage {...page} className="list-none">
      <p>We ran our inaugural festival at Bell Park in March, 2025 for around 150 attendees.</p>

      <p>
        We couldn’t have been happier with how it went. We had a full timetable of high-quality workshops, fantastic night time entertainment, and had to chance to dive into some of the underlying values and vision of the Evolve project.
      </p>

      <p>
        We’re excited to continue bringing people together on land for the purpose of transforming culture and building a better world.
      </p>

      <p>
        <A href="/workshops/2025">Check out the workshops from 2025!</A>
        <br />
        <A href="/schedule/2025">And the schedule</A>
      </p>

      <h2>Gallery</h2>
      <ImageGallery
        images={[
          { src: '/images/bell-park-2025/image-1.jpg', alt: 'Image 1' },
          { src: '/images/bell-park-2025/image-2.jpg', alt: 'Image 2' },
          { src: '/images/bell-park-2025/image-3.jpg', alt: 'Image 3' },
          { src: '/images/bell-park-2025/image-4.jpg', alt: 'Image 4' },
          { src: '/images/bell-park-2025/image-5.jpg', alt: 'Image 5' },
          { src: '/images/bell-park-2025/image-6.jpg', alt: 'Image 6' },
          { src: '/images/bell-park-2025/image-7.jpg', alt: 'Image 7' },
        ]}
      />
    </ContentPage>
  )
}
