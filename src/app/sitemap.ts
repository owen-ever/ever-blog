import { getPostSitemapEntries } from '@/lib/posts';
import { SITE_URL } from '@/lib/seo';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries: MetadataRoute.Sitemap = getPostSitemapEntries().map(({ slug, lastModified }) => ({
    url: `${SITE_URL}/posts/${slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/resume`,
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/posts`,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...postEntries,
  ];
}
