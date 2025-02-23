import { CustomMDX } from './components/CustomMDX'
import { getMDXData } from './lib/utils'
import path from 'path'
import { Navbar } from './components/Navbar'
import { Banner } from './components/Banner'

export default function Page() {
  let pages = getMDXData(path.join(process.cwd(), 'app'))
  const homepage = pages?.find((post) => post.slug === 'homepage') ?? { content: 'No content' }

  return (
    <div className="flex flex-col gap-6">
      <Banner title="Evolve Community" />

      <Navbar />

      <section className="prose max-w-xl mx-auto">
        <CustomMDX source={homepage.content} />
      </section>
    </div>
  )
}
