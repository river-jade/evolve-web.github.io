import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  shortTitle?: string
  order?: number
}

/**
 * Parses frontmatter and content from a markdown string
 */
function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key.trim()] = value
  })

  return { metadata: metadata as Metadata, content }
}

/**
 * Gets all MDX files from a directory
 */
function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

/**
 * Reads and parses an MDX file
 */
function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

export type MDXData = {
  metadata: Metadata
  slug: string
  content: string
}

/**
 * Gets parsed data from all MDX files in a directory
 */
export function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((fileName) => {
    let { metadata, content } = readMDXFile(path.join(dir, fileName))
    let slug = path.basename(fileName, path.extname(fileName))
    const data: MDXData = { metadata, slug, content }
    return data
  })
}

/**
 * Gets parsed markdown data from the pages directory
 */
export function getPageMarkdown(): MDXData[] {
  return getMDXData(path.join(process.cwd(), 'app', '[slug]', 'pages'))
}

export type NavLink = {
  title: string
  href: string
  metadata: Metadata
}

/**
 * Gets navigation links from MDX files in the pages directory
 */
export function getPageLinks() {
  return getMDXData(path.join(process.cwd(), 'app', '[slug]', 'pages')).map(
    (page): NavLink =>
      ({
        title: page.metadata.title,
        href: `/${page.slug}`,
        metadata: page.metadata,
      } satisfies NavLink),
  )
}

/**
 * Formats a date string with optional relative time
 */
export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}

export const DEFAULT_ORDER = 100
export const sortByOrder = (a: NavLink, b: NavLink) =>
  (a.metadata.order ?? DEFAULT_ORDER) - (b.metadata.order ?? DEFAULT_ORDER)
