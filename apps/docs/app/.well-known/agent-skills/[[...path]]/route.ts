import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getSiteUrl } from '@/lib/site';

export const runtime = 'nodejs';

const SKILL_DIR = join(process.cwd(), 'content', 'agent-skills');

const SKILL_FILES = ['consume-design-system.md', 'contribute-component.md'] as const;

function isSkillFilename(name: string): name is (typeof SKILL_FILES)[number] {
  return (SKILL_FILES as readonly string[]).includes(name);
}

function descriptionFromFrontmatter(md: string): string {
  const block = md.match(/^---\n([\s\S]*?)\n---\s*\n/);
  if (!block?.[1]) {
    return '';
  }
  const line = block[1].match(/^\s*description:\s*(.+)$/m);
  return line?.[1]?.trim() ?? '';
}

async function sha256Hex(content: string): Promise<string> {
  return createHash('sha256').update(content, 'utf-8').digest('hex');
}

export async function GET(_request: Request, context: { params: Promise<{ path?: string[] }> }) {
  const segments = (await context.params).path ?? [];
  const key = segments.join('/');

  if (key === 'index.json') {
    const base = getSiteUrl();
    const skills = await Promise.all(
      SKILL_FILES.map(async (filename) => {
        const filePath = join(SKILL_DIR, filename);
        const text = await readFile(filePath, 'utf-8');
        const name = filename.replace(/\.md$/, '');
        const digestHex = await sha256Hex(text);
        const description = descriptionFromFrontmatter(text) || `Uranus design system — ${name}`;
        return {
          name,
          type: 'skill-md' as const,
          description,
          url: `${base}/.well-known/agent-skills/${filename}`,
          digest: `sha256:${digestHex}`,
        };
      }),
    );

    return Response.json({
      $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
      skills,
    });
  }

  if (key.endsWith('.md')) {
    if (!isSkillFilename(key)) {
      return new Response('Not Found', { status: 404 });
    }
    try {
      const text = await readFile(join(SKILL_DIR, key), 'utf-8');
      return new Response(text, {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
      });
    } catch {
      return new Response('Not Found', { status: 404 });
    }
  }

  return new Response('Not Found', { status: 404 });
}
