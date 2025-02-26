import Link from 'next/link'
import { getPageLinks } from 'app/lib/utils'
import { cx } from 'app/lib/cx'

const navItems: Record<string, { name: string }> = {
  '/': {
    name: 'Home',
  },
  ...getPageLinks(),
}

const HtmlLink = (
  props: {
    href: string
    children: React.ReactNode
  } & Record<string, unknown>,
) => <a {...props} />

export function Navbar({
  links = navItems,
  linkComponent,
}: {
  links?: Record<string, { name: string }>
  linkComponent?: typeof Link | typeof HtmlLink
}) {
  const LinkComponent = linkComponent ?? Link
  return (
    // FIXME target content is covered by sticky navbar
    <aside className="NavBar md:sticky md:top-0 tracking-tight relative">
      <div className="py-2 bg-white dark:bg-neutral-900 border-b-1 border-gray-200">
        <nav
          id="nav"
          className="max-w-xl mx-auto px-0 pb-0 fade md:overflow-auto scroll-pr-6"
        >
          <ul className="flex flex-col md:flex-row flex-wrap space-x-0 -ml-3">
            {Object.entries(links).map(([path, { name }]) => {
              return (
                <li key={path} className="min-w-content">
                  <LinkComponent
                    href={path}
                    className={cx(`
                      flex align-middle py-1 px-3
                      hover:text-neutral-800 dark:hover:text-neutral-200 whitespace-nowrap
                      hover:underline transition-all
                      ${path === '/' ? 'font-bold' : ''}
                    `)}
                  >
                    {name}
                  </LinkComponent>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
