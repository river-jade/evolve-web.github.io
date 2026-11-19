import fs from 'fs'
import path from 'path'
import type { MetadataRoute } from 'next'
import { baseUrl } from '@/metadata'

// Lists every page in app/ (each folder with a page.tsx), so new pages are included
// automatically. Pages with a [placeholder] in their path are left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), 'app')
  return fs
    .readdirSync(appDir, { recursive: true })
    .map(String)
    .filter((file) => path.basename(file) === 'page.tsx' && !file.includes('['))
    .map((file) => path.dirname(file).split(path.sep).join('/'))
    .map((dir) => (dir === '.' ? '' : `/${dir}`))
    .sort()
    .map((route) => ({ url: `${baseUrl}${route}` }))
}
