import Image from 'next/image'
import Link from 'next/link'

export const Banner = ({ title }: { title: string }) => {
  return (
    <div className="Banner">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-extrabold text-neutral-700 tracking-tight mt-6 mb-2">
          {title}
        </h1>
      </div>
    </div>
  )
}

export default Banner