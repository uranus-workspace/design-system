import { source } from '@/lib/source';

export async function GET() {
  const pages = source.getPages();

  const lines = [
    '# Uranus Design System',
    '',
    '> Sistema de design da Uranus Technologies — primitivos React com Tailwind v4, acessibilidade e Motion.',
    '',
    '## Documentação',
    '',
  ];

  for (const page of pages) {
    const title = page.data.title || 'Sem título';
    const description = page.data.description || '';
    const url = `https://uranus.com.br${page.url}`;
    lines.push(`- [${title}](${url}): ${description}`);
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
