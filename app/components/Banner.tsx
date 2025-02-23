import Image from 'next/image'
import Link from 'next/link'

export const Banner = ({ title }: { title: string }) => {
  return (
    <div className="Banner">
      <Link href="/" className="flex flex-col justify-center items-center">
        <Image src="/images/evolve-logo.jpg" alt="Evolve Logo" width={200} height={200} />
        <h1 className="text-5xl font-extrabold text-neutral-700 dark:text-neutral-400 tracking-tight mt-6 mb-2">
          {title}
        </h1>
      </Link>
    </div>
  )
}
