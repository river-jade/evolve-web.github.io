import { ContentPage, pageMetadata, type PageInfo } from 'components/ContentPage'

const page: PageInfo = {
  path: '/past-events/easter-confest-2025',
  title: 'Easter Confest Village 2025',
  summary: 'Evolve community hosted our first village at Easter Confest.',
}

export const metadata = pageMetadata(page)

export default function EasterConfest2025Page() {
  return (
    <ContentPage {...page} className="list-none">
      <p>
        The village we ran at Spring ConFest in 2024 was somewhat of an experiment. It was a very small ConFest (around 1200 people), and our first village. It was such a huge success, that we decided to do it again for Easter, this time with a much bigger kitchen and lounge space.
      </p>

      <p>
        We hosted a brunch for everyone, a Shabbat dinner on the Friday night, and a beautiful Kirtan on Sunday evening, as well as a full timetable of workshops.
      </p>

      <p>Incredibly happy with how this all went, and excited to see you all at next ConFest in Spring!!</p>

      <p>
        Sadly we were having too much fun to take any photos this time, so please let us know if you were there and have some that we can publish!
      </p>

      <p>❤️</p>
    </ContentPage>
  )
}
