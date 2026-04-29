import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getSiteUrl } from '@/lib/site';
import { source } from '@/lib/source';

export const runtime = 'nodejs';

export async function GET(_request: Request, context: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await context.params;
  const page = source.getPage(slug);
  if (!page) {
    return new Response(
      `No page for ${getSiteUrl()}/docs${slug?.length ? `/${slug.join('/')}` : ''}`,
      {
        status: 404,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      },
    );
  }

  let raw = '';
  try {
    raw = await readFile(join(process.cwd(), 'content/docs', page.file.path), 'utf-8');
  } catch {
    return new Response('Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return new Response(raw, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(Math.ceil(raw.length / 4)),
    },
  });
}
