import Link from 'next/link'
import { getPageLinks, sortByOrder } from 'app/lib/utils'

const navItems: Record<string, { name: string }> = {
  '/': {
    name: 'Home',
  },
  ...getPageLinks()
    .sort(sortByOrder)
    .reduce(
      (acc, page) => ({
        ...acc,
        [page.href]: {
          name: page.metadata.shortTitle || page.title,
        },
      }),
      {},
    ),
}

export function Navbar({ links = navItems }: { links?: Record<string, { name: string }> }) {
  return (
    <aside className="NavBar tracking-tight relative">
      <div className="lg:sticky lg:top-20 border-b-1 border-gray-200">
        <nav
          className="flex flex-row items-start relative max-w-xl mx-auto px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <ul className="flex flex-row space-x-0 -ml-3">
            {Object.entries(links).map(([path, { name }]) => {
              return (
                <li key={path}>
                  <Link
                    href={path}
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-3"
                  >
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
