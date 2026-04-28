import { getSiteUrl } from '@/lib/site';

export async function GET() {
  const base = getSiteUrl();
  const body = [
    '# Uranus Design System',
    '',
    'Sistema de design da **Uranus Technologies** — tokens, foundations, componentes e blocos React com Tailwind CSS v4, Motion e acessibilidade.',
    '',
    '## Links',
    '',
    `- [Documentação](${base}/docs)`,
    `- [Lista para LLMs (compacta)](${base}/llms.txt)`,
    `- [Documentação em texto plano completo](${base}/llms-full.txt)`,
    '- [Manual de marca / site institucional](https://uranus.com.br)',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(Math.ceil(body.length / 4)),
    },
  });
}
