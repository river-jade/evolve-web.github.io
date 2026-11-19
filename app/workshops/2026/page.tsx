import { Workshops } from 'components/Workshops'
import { ContentPage, pageMetadata, type PageInfo } from 'components/ContentPage'

const page: PageInfo = {
  path: '/workshops/2026',
  title: 'Evolve Festival 2026 - workshops',
  image: '/images/2026-workshops-screenshot.png',
}

export const metadata = pageMetadata(page)

export default function Workshops2026Page() {
  return (
    <ContentPage {...page} className="list-none">
      <Workshops year="2026" />

      <p>
        Workshop applications are now closed for 2026. If you want to offer a workshop, there will be empty slots in the timetable and you can sign up on-site.
      </p>
    </ContentPage>
  )
}
