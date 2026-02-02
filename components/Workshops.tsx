import { ALL_WORKSHOPS } from 'lib/data'
import { WorkshopList } from './WorkshopList'

export const Workshops = ({ year }: { year: string }) => {
  const workshops = ALL_WORKSHOPS[year] || []

  // Organize list (Workshops with details first, etc.)
  const sortedWorkshops = [
    ...workshops.filter(({ details }) => details),
    ...workshops.filter(({ details }) => !details)
  ]

  return (
    <div className="Workshops align-full my-12">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        {/* Pass data to Client Component */}
        <WorkshopList workshops={sortedWorkshops} year={year} />
      </div>
    </div>
  )
}

export default Workshops