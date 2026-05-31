import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://chrisdelbarco.design/sitemap.xml',
    host: 'https://chrisdelbarco.design',
  }
}
