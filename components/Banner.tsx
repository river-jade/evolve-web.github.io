import Image from 'next/image'
import Link from 'next/link'

export const Banner = ({ title }: { title: string }) => {
  return (
    <div className="Banner">
      <div className="flex flex-col justify-center items-center">
        <h1 className="title font-display text-heading-1 md:text-display text-forest text-center mt-8 mb-2">
          {title}
        </h1>
      </div>
    </div>
  )
}

export default Banner