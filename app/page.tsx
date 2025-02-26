import { CustomMDX } from './components/CustomMDX'
import { getHashLinks, getMDXData, parseHeadings } from './lib/utils'
import path from 'path'
import { Navbar } from './components/Navbar'
import { Banner } from './components/Banner'
import { FestivalPromo } from './components/FestivalPromo'
export default function Page() {
  let pages = getMDXData(path.join(process.cwd(), 'app'))
  const homepage = pages?.find((post) => post.slug === 'homepage') ?? {
    content: 'No content',
  }
  const headings = parseHeadings(homepage.content)
  const links = getHashLinks(headings)

  return (
    <div className="flex flex-col gap-6">
      <Banner title="Evolve Community" />
      <FestivalPromo />
      <Navbar links={links} />

      <section className="prose max-w-xl mx-auto">
        <CustomMDX source={homepage.content} />
      </section>
    </div>
  )
}
