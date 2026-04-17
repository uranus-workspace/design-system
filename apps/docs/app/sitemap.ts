import { source } from '@/lib/source';
import type { MetadataRoute } from 'next';

const BASE = 'https://uranus.com.br';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();
  return [
    { url: BASE, priority: 1, changeFrequency: 'monthly' as const },
    ...pages.map((page) => ({
      url: `${BASE}${page.url}`,
      priority: 0.8,
      changeFrequency: 'weekly' as const,
      lastModified: new Date(),
    })),
  ];
}
