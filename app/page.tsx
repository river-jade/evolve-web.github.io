import { CustomMDX } from './components/CustomMDX'
import { getMDXData } from './lib/utils'
import path from 'path'

export default function Page() {
  let pages = getMDXData(path.join(process.cwd(), 'app'))
  const homepage = pages?.find((post) => post.slug === 'homepage') ?? { content: 'No content' }

  return (
    <section className="flex flex-col gap-4">
      <CustomMDX source={homepage.content} />
    </section>
  )
}
