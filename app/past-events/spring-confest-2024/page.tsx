import ImageGallery from 'components/Gallery'
import { ContentPage, pageMetadata, type PageInfo } from 'components/ContentPage'

const page: PageInfo = {
  path: '/past-events/spring-confest-2024',
  title: 'Spring ConFest Village 2024',
  summary: 'Inaugural Evolve community village at Spring ConFest.',
}

export const metadata = pageMetadata(page)

export default function SpringConfest2024Page() {
  return (
    <ContentPage {...page} className="list-none">
      <p>
        We held our first village at the inaugural Spring ConFest in 2024. This was our first “public” event, and it felt appropriate to run it at ConFest, which is a primary inspiration for the Evolve vision.
      </p>

      <p>The village was very well attended and we got lots of very positive feedback.</p>

      <p>There were tons of high quality workshops in the space, and the timetable was full for the whole festival.</p>

      <ImageGallery
        images={[
          { src: '/images/spring-confest-2024/image-1.jpg', alt: 'Evolve village at Spring ConFest 2024' },
          { src: '/images/spring-confest-2024/image-2.jpg', alt: 'Evolve village at Spring ConFest 2024' },
          { src: '/images/spring-confest-2024/image-3.jpg', alt: 'Evolve village at Spring ConFest 2024' },
          { src: '/images/spring-confest-2024/image-4.jpg', alt: 'Evolve village at Spring ConFest 2024' },
        ]}
      />
    </ContentPage>
  )
}
