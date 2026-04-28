const BASE = 'https://uranus.com.br';

export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
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
