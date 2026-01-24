import { getPageMarkdown, sortByOrder } from 'lib/utils'
import Link from 'next/link'

export function PageList() {
  let allBlogs = getPageMarkdown()

  return (
    <ul className="PageList list-disc ml-4">
      {allBlogs.sort(sortByOrder).map((post) => (
        <li key={post.slug}>
          <Link className="" href={`/${post.slug}`}>
            {post.metadata.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
