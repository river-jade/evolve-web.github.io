import Image from 'next/image'
import workshops_2025 from 'app/components/Workshops/workshops-2025.json'
import workshops_2026 from 'app/components/Workshops/workshops-2026.json'
import Link from 'next/link'

const DATA_SOURCES: Record<string, any[]> = {
  workshops_2025: workshops_2025,
  workshops_2026: workshops_2026,
}

type Data = {
  Name: string
  'Workshop name': string
  Details: string
  image: string
}

export const Workshops = ({source}: {source: string}) => {
  const data = DATA_SOURCES[source]
  type Workshop = (typeof cleaned)[number]

  const Workshop = ({ id, name, workshopName, details, image, image_url, thumbnail_url }: Workshop) => (
  <li key={id} className="flex gap-2">
    <div className="w-1/5">
      <Link href={image ? `/images/${image}` : image_url ? image_url : '/images/evolve-logo.jpg'} target="_blank" rel="noopener noreferrer">
        <Image
          src={image ? `/images/${image}` : thumbnail_url ? thumbnail_url : '/images/evolve-logo.jpg'}
          alt={image ? `${name} - ${workshopName}` : 'Evolve Logo'}
          className="aspect-square object-cover rounded-full overflow-hidden"
          width={200}
          height={200}
        />
      </Link>
    </div>

    <div className="flex flex-col gap-2 w-4/5">
      <h3 className="m-0! text-xl font-bold">{workshopName}</h3>
      <h4 className="m-0! text-lg font-bold">{name}</h4>
      {details && <p className="m-0!">{details}</p>}
    </div>
  </li>
  )

  const cleaned = data
    .map((workshop: Data, id: number) => ({
      id,
      name: workshop['Name'].trim(),
      workshopName: workshop['Workshop name'].trim(),
      details: workshop['Details'].trim(),
      image: workshop['image']?.trim(),
      image_url: workshop['image_url']?.trim(),
      thumbnail_url: workshop['thumbnail_url']?.trim(),
    }))
    .map((workshop) => ({
      ...workshop,
      // streamline
      details: workshop.details == workshop.workshopName ? '' : workshop.details,
    }))

    const workshops = cleaned.filter(({ workshopName }) => !!workshopName)
    const workshopIds = workshops.map(({ id }) => id)
    const namesWithoutDetails = cleaned
      .filter(({ id }) => !workshopIds.includes(id))
      .map(({ name }) => name)

    return (<div className="Workshops align-full my-12">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {workshops
            .filter(({ details }) => details)
            .map((workshop) => (
              <Workshop key={workshop.id} {...workshop} />
            ))}
          {workshops
            .filter(({ details }) => !details)
            .map((workshop) => (
              <Workshop key={workshop.id} {...workshop} />
            ))}
        </ul>

        {namesWithoutDetails && namesWithoutDetails.length ? (
          <div className="max-w-xl mx-auto">
            <h3>And further offerings from:</h3>
            <p>{namesWithoutDetails.join(', ')}.</p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
