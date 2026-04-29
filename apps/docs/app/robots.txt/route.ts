import { getSiteUrl } from '@/lib/site';

export function GET() {
  const BASE = getSiteUrl();
  const body = [
    'User-agent: *',
    'Allow: /',
    'Content-Signal: ai-train=no, search=yes, ai-input=no',
    '',
    `Host: ${BASE}`,
    `Sitemap: ${BASE}/sitemap.xml`,
    '',
    '# LLM-friendly content',
    `LLM-Content: ${BASE}/llms.txt`,
    `LLM-Full-Content: ${BASE}/llms-full.txt`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
