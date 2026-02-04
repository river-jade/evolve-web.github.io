import { Suspense } from 'react'
import { ALL_WORKSHOPS, ALL_SCHEDULES } from 'lib/data'
import { ScheduleGrid } from 'components/ScheduleGrid'

export const Schedule = ({ year }: { year: string }) => {
  // Safe access with default empty arrays
  const workshops = ALL_WORKSHOPS[year] || []
  const events = ALL_SCHEDULES[year] || []

  return (
    <Suspense fallback={<div className="p-12 text-center text-stone-400">Loading schedule...</div>}>
      <ScheduleGrid events={events} workshops={workshops} year={year} />
    </Suspense>
  )
}

export default Schedule