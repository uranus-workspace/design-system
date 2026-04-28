import { source } from '@/lib/source';
import type { MetadataRoute } from 'next';

const BASE = 'https://uranus.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();
  const now = new Date();
  return [
    { url: BASE, priority: 1, changeFrequency: 'monthly' as const },
    {
      url: `${BASE}/llms.txt`,
      priority: 0.9,
      changeFrequency: 'weekly' as const,
      lastModified: now,
    },
    {
      url: `${BASE}/llms-full.txt`,
      priority: 0.9,
      changeFrequency: 'weekly' as const,
      lastModified: now,
    },
    ...pages.map((page) => ({
      url: `${BASE}${page.url}`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
      lastModified: now,
    })),
  ];
}
