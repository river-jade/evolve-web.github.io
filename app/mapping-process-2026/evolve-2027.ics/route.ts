import { buildIcs } from '../event'

// Built once at deploy time and served as a plain file
export const dynamic = 'force-static'

export function GET() {
  return new Response(buildIcs(), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="evolve-2027-online-gathering.ics"',
    },
  })
}
