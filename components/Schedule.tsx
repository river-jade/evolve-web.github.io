import { ALL_WORKSHOPS, ALL_SCHEDULES } from 'lib/data'
import { ScheduleGrid } from 'components/ScheduleGrid'

export const Schedule = ({ year }: { year: string }) => {
  // Safe access with default empty arrays
  const workshops = ALL_WORKSHOPS[year] || []
  const events = ALL_SCHEDULES[year] || []

  return <ScheduleGrid events={events} workshops={workshops} year={year} />
}

export default Schedule