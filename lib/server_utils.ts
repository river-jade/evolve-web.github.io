import fs from 'fs'
import path from 'path'

import { slugify } from './client_utils'

type Metadata = {
    title: string
    publishedAt: string
    summary: string
    image?: string
    shortTitle?: string
    order?: number
    className?: string
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
        value = value.replace(/^['"](.*)['"]\$/, '$1') // Remove quotes
        metadata[key.trim()] = value
    })

    return { metadata: metadata as Metadata, content }
}

/**
 * Gets all MDX files from a directory
 */
function getMDXFiles(dir: string) {
    return fs.readdirSync(dir, { recursive: true })
        .filter((file) => path.extname(file as string) === '.mdx')
        .map(file => file as string)
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
    const mdxFiles = getMDXFiles(dir)
    return mdxFiles.map((fileName) => {
        const { metadata, content } = readMDXFile(path.join(dir, fileName))
        const parsed = path.parse(fileName)
        const slug = path.join(parsed.dir, parsed.name)

        const data: MDXData = { metadata, slug, content }
        return data
    })
}

/**
 * Gets parsed markdown data from the pages directory
 */
export function getPageMarkdown(): MDXData[] {
    return getMDXData(path.join(process.cwd(), 'app', '[...slug]', 'pages'))
}

/**
 * Gets navigation links from MDX files in the pages directory
 */
export function getPageLinks() {
    return getMDXData(path.join(process.cwd(), 'app', '[...slug]', 'pages'))
        .sort(sortByOrder)
        .reduce(
            (acc, page) => ({
                ...acc,
                [`/${page.slug}`]: {
                    name: page.metadata.shortTitle || page.metadata.title || page.slug,
                },
            }),
            {},
        )
}

export const DEFAULT_ORDER = 100
export const sortByOrder = (a: MDXData, b: MDXData) =>
    (a.metadata.order ?? DEFAULT_ORDER) - (b.metadata.order ?? DEFAULT_ORDER)
