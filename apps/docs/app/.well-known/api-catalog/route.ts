import { getSiteUrl } from '@/lib/site';

export async function GET() {
  const base = getSiteUrl();
  const body = {
    linkset: [
      {
        anchor: base,
        'service-desc': [
          {
            href: `${base}/openapi.yaml`,
            type: 'application/yaml',
          },
        ],
        'service-doc': [
          {
            href: `${base}/docs`,
            type: 'text/html',
          },
        ],
        status: [
          {
            href: `${base}/health`,
            type: 'text/plain',
          },
        ],
      },
    ],
  };

  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
    },
  });
}
