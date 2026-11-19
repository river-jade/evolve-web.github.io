import { Workshops } from 'components/Workshops'
import { ContentPage, pageMetadata, type PageInfo } from 'components/ContentPage'

const page: PageInfo = {
  path: '/workshops/2025',
  title: 'Evolve Festival 2025 - workshops',
}

export const metadata = pageMetadata(page)

export default function Workshops2025Page() {
  return (
    <ContentPage {...page} className="list-none">
      <Workshops year="2025" />
    </ContentPage>
  )
}
