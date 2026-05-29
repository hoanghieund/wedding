import { MetadataRoute } from 'next'
import { EVENT_DATA } from '@/lib/constants/event-data'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${EVENT_DATA.site.baseUrl}/sitemap.xml`,
  }
}
