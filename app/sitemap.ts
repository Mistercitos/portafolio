import type { MetadataRoute } from 'next'
import { cases } from '@/lib/cases'
import { getPublishedPosts } from '@/lib/posts'

const BASE_URL = 'https://chrisdelbarco.design'

type RouteOpts = {
  lastModified: Date
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

/**
 * Genera una entrada de sitemap para una ruta, con la URL canónica en español
 * (sin prefijo) y los alternates hreflang hacia su equivalente en `/en`.
 */
function localizedEntry(path: string, opts: RouteOpts): MetadataRoute.Sitemap[number] {
  const clean = path === '/' ? '' : path
  const esUrl = `${BASE_URL}${clean || '/'}`
  const enUrl = `${BASE_URL}/en${clean}`
  return {
    url: esUrl,
    lastModified: opts.lastModified,
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: {
      languages: {
        es: esUrl,
        en: enUrl,
      },
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    localizedEntry('/', { lastModified: now, changeFrequency: 'monthly', priority: 1 }),
    localizedEntry('/trabajo', { lastModified: now, changeFrequency: 'monthly', priority: 0.9 }),
    localizedEntry('/escribo', { lastModified: now, changeFrequency: 'weekly', priority: 0.8 }),
    localizedEntry('/lab', { lastModified: now, changeFrequency: 'monthly', priority: 0.7 }),
    localizedEntry('/about', { lastModified: now, changeFrequency: 'yearly', priority: 0.7 }),
    localizedEntry('/uses', { lastModified: now, changeFrequency: 'monthly', priority: 0.5 }),
    localizedEntry('/contact', { lastModified: now, changeFrequency: 'yearly', priority: 0.6 }),
  ]

  const caseRoutes: MetadataRoute.Sitemap = cases.map((c) =>
    localizedEntry(`/trabajo/${c.slug}`, {
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
  )

  const postRoutes: MetadataRoute.Sitemap = getPublishedPosts('es').map((p) =>
    localizedEntry(`/escribo/${p.slug}`, {
      lastModified: new Date(p.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
  )

  return [...staticRoutes, ...caseRoutes, ...postRoutes]
}
