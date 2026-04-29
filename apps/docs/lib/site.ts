const DEFAULT_SITE_URL = 'https://design.uranus.com.br';

/**
 * Canonical origin for the docs deployment (Link headers, sitemap, llms.txt, well-known).
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (explicit) {
    return explicit;
  }

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, '');
  if (vercel) {
    return vercel.startsWith('http') ? vercel : `https://${vercel}`;
  }

  return DEFAULT_SITE_URL;
}
