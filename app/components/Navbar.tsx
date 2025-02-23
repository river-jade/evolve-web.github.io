import Link from 'next/link'
import { getPageLinks, sortByOrder } from 'app/lib/utils'

const navItems: Record<string, { name: string }> = {
  '/': {
    name: 'Home',
  },
  ...getPageLinks()
    .sort(sortByOrder)
    .reduce((acc, page) => {
      acc[page.href] = {
        name: page.metadata.shortTitle || page.title,
      }
      return acc
    }, {}),
}

export function Navbar() {
  return (
    <aside className="NavBar -ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <ul className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <li key={path}>
                  <Link
                    href={path}
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
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
