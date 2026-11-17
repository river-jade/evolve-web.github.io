import type { SVGProps } from 'react'

/**
 * Line icons drawn for Evolve. They take the current text colour, so set
 * the colour on the parent (forest on light grounds, paper on forest).
 */
const paths = {
  // Learning, growing: a seedling
  sprout: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 13c0-3.3-2.5-5.5-6.5-5.5C5.5 11 8 13 12 13z" />
      <path d="M12 10.5c0-3.3 2.5-5.5 6.5-5.5 0 3.5-2.5 5.5-6.5 5.5z" />
    </>
  ),
  // Ecology, culture: the Earth
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9z" />
    </>
  ),
  // Community, belonging: people side by side
  people: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <circle cx="17.5" cy="9" r="2.5" />
      <path d="M17.5 14.5c2.4 0 4 1.8 4 4.5" />
    </>
  ),
  // Celebration and play: a campfire flame
  flame: (
    <path d="M12 3c.5 3.5 5 5.5 5 10.5a5 5 0 0 1-10 0c0-2 .8-3.3 2-4.5 0 2 .8 3 2 3.5C11 9.5 10.5 6.5 12 3z" />
  ),
  // Collective sensemaking: connected points
  network: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="18" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M10.8 7.2 6.2 15.8" />
      <path d="M13.2 7.2l4.6 8.6" />
      <path d="M7.5 18h9" />
    </>
  ),
  // Governance: a balance
  scales: (
    <>
      <path d="M12 4v16" />
      <path d="M7 20h10" />
      <path d="M5 7h14" />
      <path d="M5 7l-3 7a3 3 0 0 0 6 0L5 7z" />
      <path d="M19 7l-3 7a3 3 0 0 0 6 0l-3-7z" />
    </>
  ),
  // Agency and action
  bolt: <path d="M13 2 4.5 13.5H11L10 22l9.5-12H13l0-8z" />,
  // Honouring the sacred
  heart: (
    <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  arrowLeft: (
    <>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  chevronDown: <path d="m5 9 7 7 7-7" />,
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
}

export type IconName = keyof typeof paths

export function Icon({
  name,
  size = 24,
  ...rest
}: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}

export default Icon
