import Schedule from 'components/Schedule'
import { A, ContentPage, pageMetadata, type PageInfo } from 'components/ContentPage'

const page: PageInfo = {
  path: '/schedule/2026',
  title: 'Evolve Festival 2026 - Schedule',
  image: '/images/2026-schedule-screenshot.png',
}

export const metadata = pageMetadata(page)

export default function Schedule2026Page() {
  return (
    <ContentPage {...page} className="list-none">
      <p className="text-center">
        Workshop descriptions are available <A href="/workshops/2026">here</A>
      </p>

      <Schedule year="2026" />

      <p>
        Workshop applications are now closed for 2026. If you want to offer a workshop, there will be empty slots in the timetable and you can sign up on-site.
      </p>
    </ContentPage>
  )
}
