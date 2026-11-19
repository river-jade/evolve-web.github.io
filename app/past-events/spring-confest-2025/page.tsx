import { A, ContentPage, pageMetadata, type PageInfo } from 'components/ContentPage'

const page: PageInfo = {
  path: '/past-events/spring-confest-2025',
  title: 'Spring Confest Village 2025',
  summary: 'Evolve community will again host a village at Spring Confest.',
}

export const metadata = pageMetadata(page)

export default function SpringConfest2025Page() {
  return (
    <ContentPage {...page} className="list-none">
      <p>
        After the wonderful experience of the last two villages we ran at ConFest, we’re planning to hold another space at ConFest Spring 2025. Similar to the last two times, we’ll be setting up a communal kitchen, a large workshop, and a lounge area.
      </p>

      <p>
        We invite anyone who feels aligned with the Evolve project to camp nearby, and contribute to the space, whether that’s through volunteering, running a workshop, or just bringing good vibes, conversation, and something to share.
      </p>

      <p>
        Please reach out to us at <A href="mailto:contact@evolvecommunity.world">contact@evolvecommunity.world</A> if you’d like to get involved.
      </p>
    </ContentPage>
  )
}
