import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getSiteUrl } from '@/lib/site';
import { source } from '@/lib/source';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  const base = getSiteUrl();
  const pages = source.getPages();
  const sections: string[] = [];

  for (const page of pages) {
    const title = page.data.title || 'Sem título';
    const url = `${base}${page.url}`;

    let body = '';
    try {
      body = await readFile(join(process.cwd(), 'content/docs', page.file.path), 'utf-8');
    } catch (error) {
      console.warn(`Failed to read ${page.file.path}:`, error);
      body = '';
    }

    sections.push(`# ${title}\nURL: ${url}\n\n${body}`);
  }

  const content = sections.join('\n\n---\n\n');

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
