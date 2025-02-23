import { CustomMDX } from './components/CustomMDX'
import { getMDXData } from './lib/utils'
import path from 'path'

export default function Page() {
  let pages = getMDXData(path.join(process.cwd(), 'app'))
  const homepage = pages?.find((post) => post.slug === 'homepage') ?? { content: 'No content' }

  return (
    <section className="prose">
      <h1>Evolve Community</h1>

      <CustomMDX source={homepage.content} />
    </section>
  )
}
