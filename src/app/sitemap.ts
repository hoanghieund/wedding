import { MetadataRoute } from 'next'
import { EVENT_DATA } from '@/lib/constants/event-data'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: EVENT_DATA.site.baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
