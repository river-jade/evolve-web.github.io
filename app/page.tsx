import { CustomMDX } from './components/CustomMDX'
import { getMDXData } from './lib/utils'
import path from 'path'
import Image from 'next/image'

export default function Page() {
  let pages = getMDXData(path.join(process.cwd(), 'app'))
  const homepage = pages?.find((post) => post.slug === 'homepage') ?? { content: 'No content' }

  return (
    <section className="prose">
      <div className="banner flex justify-center items-center">
        <Image src="/images/evolve-logo.jpg" alt="Evolve Logo" width={200} height={200} />
      </div>

      <h1>Evolve Community</h1>

      <CustomMDX source={homepage.content} />
    </section>
  )
}
