/*
 * The 6 December gathering: one place for the details used by the page,
 * the Google Calendar link and the .ics file.
 *
 * MEET_URL: paste the Google Meet link here once the calendar event exists.
 * While it is empty the page says "link to come" and no join button shows.
 */
export const MEET_URL: string = 'https://meet.google.com/wwk-vrqv-jch'

/*
 * Sunday 6 December 2026, 3pm to 5pm Melbourne time (AEDT, UTC+11).
 * Times are local to TIMEZONE so calendars save it as a Melbourne event,
 * shown in each person's own time.
 */
export const TIMEZONE = 'Australia/Melbourne'

export const event = {
  title: 'Evolve 2027: An Online Gathering',
  description:
    'An online gathering hosted by the Evolve Vision Council, for everyone who has been part of Evolve, to help put the Evolve 2027 mission into words.' +
    (MEET_URL ? `\n\nJoin on Google Meet: ${MEET_URL}` : '') +
    '\n\nhttps://evolvecommunity.world/mapping-process-2026',
  location: MEET_URL || 'Google Meet',
  start: '20261206T150000',
  end: '20261206T170000',
}

/** Published path of the .ics file (see ./evolve-2027.ics/route.ts) */
export const ICS_PATH = '/mapping-process-2026/evolve-2027.ics'

export const googleCalendarUrl =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent(event.title)}` +
  `&dates=${event.start}/${event.end}` +
  `&details=${encodeURIComponent(event.description)}` +
  `&location=${encodeURIComponent(event.location)}` +
  `&ctz=${TIMEZONE}`

const icsEscape = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')

/* Lines over 75 octets must be folded (RFC 5545 3.1); Outlook is strict about it */
const icsFold = (line: string) => {
  const out: string[] = []
  let rest = line
  while (Buffer.byteLength(rest) > 75) {
    let cut = 75
    while (Buffer.byteLength(rest.slice(0, cut)) > 75) cut--
    out.push(rest.slice(0, cut))
    rest = ' ' + rest.slice(cut)
  }
  out.push(rest)
  return out.join('\r\n')
}

export function buildIcs() {
  return (
    [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Evolve Community//Evolve 2027 Online Gathering//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      // Melbourne's rules: AEDT (+11) from the first Sunday in October,
      // AEST (+10) from the first Sunday in April. Outlook needs this block.
      'BEGIN:VTIMEZONE',
      `TZID:${TIMEZONE}`,
      'BEGIN:STANDARD',
      'DTSTART:19700405T030000',
      'RRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU',
      'TZOFFSETFROM:+1100',
      'TZOFFSETTO:+1000',
      'TZNAME:AEST',
      'END:STANDARD',
      'BEGIN:DAYLIGHT',
      'DTSTART:19701004T020000',
      'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=1SU',
      'TZOFFSETFROM:+1000',
      'TZOFFSETTO:+1100',
      'TZNAME:AEDT',
      'END:DAYLIGHT',
      'END:VTIMEZONE',
      'BEGIN:VEVENT',
      'UID:evolve-2027-online-gathering-20261206@evolvecommunity.world',
      'DTSTAMP:20261120T000000Z',
      `DTSTART;TZID=${TIMEZONE}:${event.start}`,
      `DTEND;TZID=${TIMEZONE}:${event.end}`,
      `SUMMARY:${icsEscape(event.title)}`,
      `DESCRIPTION:${icsEscape(event.description)}`,
      `LOCATION:${icsEscape(event.location)}`,
      MEET_URL ? `URL:${MEET_URL}` : null,
      'END:VEVENT',
      'END:VCALENDAR',
    ]
      .filter((l): l is string => Boolean(l))
      .map(icsFold)
      .join('\r\n') + '\r\n'
  )
}
