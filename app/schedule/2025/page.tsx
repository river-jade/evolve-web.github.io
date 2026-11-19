import Schedule from 'components/Schedule'
import { A, ContentPage, pageMetadata, type PageInfo } from 'components/ContentPage'

const page: PageInfo = {
  path: '/schedule/2025',
  title: 'Evolve Festival 2025 - Schedule',
  image: '/images/2025-schedule-screenshot.png',
}

export const metadata = pageMetadata(page)

export default function Schedule2025Page() {
  return (
    <ContentPage {...page} className="list-none">
      <Schedule year="2025" />

      <p>
        Want to offer something? Please fill out our <A href="https://forms.gle/N4DWRWGhYRXiccnK6">workshop form</A>
      </p>
    </ContentPage>
  )
}
