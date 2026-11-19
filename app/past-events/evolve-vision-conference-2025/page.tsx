import { ContentPage, pageMetadata, type PageInfo } from 'components/ContentPage'

const page: PageInfo = {
  path: '/past-events/evolve-vision-conference-2025',
  title: 'Evolve Vision Conference 2025',
  summary:
    'Evolve Vision Conference is a small, invitation only gathering to discuss and envision the future of Evolve.',
}

export const metadata = pageMetadata(page)

export default function VisionConference2025Page() {
  return (
    <ContentPage {...page} className="list-none">
      <p>
        The Evolve Vision Conference is a small (20-30) gathering of people who have expressed serious interest in the Evolve project, or who have deep experience with building community organisations. It will be a two day gathering on the land at Moora Moora, and an opportunity to share the larger vision for Evolve more broadly, as well as integrate different perspectives for a confluence of vision. It’s also the next step in expanding the democratic decision making that is a deep intention of the Evolve project.
      </p>
    </ContentPage>
  )
}
