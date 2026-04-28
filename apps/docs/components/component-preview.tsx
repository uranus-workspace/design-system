import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { highlight } from 'fumadocs-core/highlight';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import type { ReactNode } from 'react';
import { cn } from '../lib/utils';
import { registry } from '../registry';

interface ComponentPreviewProps {
  /**
   * Registry key, e.g. `button-default`, `badge-outline`.
   * Maps to `registry/<component>/<key>.tsx` on disk.
   */
  name: string;
  /**
   * Cross-axis alignment inside the preview row (`items-*`).
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Minimum height of the preview pane in pixels. Omit so the frame hugs the
   * example (better for cards and narrow blocks). Pass e.g. 480 for chrome/layout demos.
   */
  minHeight?: number;
  /**
   * Extra classes applied to the preview pane wrapper (not the code).
   */
  previewClassName?: string;
}

const alignClass = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
} as const;

export async function ComponentPreview({
  name,
  align = 'start',
  minHeight,
  previewClassName,
}: ComponentPreviewProps): Promise<ReactNode> {
  const entry = registry[name];

  if (!entry) {
    return (
      <div className="my-6 rounded-lg border border-fd-border bg-fd-card p-6 text-sm text-fd-muted-foreground">
        Exemplo <code className="font-mono">{name}</code> não encontrado no registro.
      </div>
    );
  }

  const { Component, folder } = entry;
  const source = await readFile(join(process.cwd(), 'registry', folder, `${name}.tsx`), 'utf-8');

  const highlighted = await highlight(source, {
    lang: 'tsx',
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    components: {
      pre: Pre,
    },
  });

  return (
    <div className="group relative my-6 flex flex-col gap-4">
      <Tabs items={['Preview', 'Código']}>
        <Tab value="Preview">
          <div
            className={cn(
              'flex w-full min-w-0 justify-start overflow-auto rounded-lg border border-fd-border bg-fd-card px-4 py-4 sm:px-6 sm:py-5',
              alignClass[align],
              previewClassName,
            )}
            {...(minHeight != null && minHeight > 0 ? { style: { minHeight } } : {})}
          >
            <div className="min-w-0 max-w-full">
              <Component />
            </div>
          </div>
        </Tab>
        <Tab value="Código">
          <CodeBlock>{highlighted}</CodeBlock>
        </Tab>
      </Tabs>
    </div>
  );
}
