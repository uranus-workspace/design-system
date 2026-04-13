'use client';

import { Check, Copy, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface CopyMarkdownButtonProps {
  /**
   * Raw MDX source of the current page, read from disk at build time and
   * piped in as a prop so the client bundle doesn't need a fetch round-trip.
   */
  source: string;
}

type CopyState = 'idle' | 'copying' | 'copied';

/**
 * Renders a "Copy markdown" affordance at the top of every docs page.
 *
 * The intent is to make it trivial for AI assistants (and humans drafting
 * prompts) to pull the raw MDX of a page into their context window without
 * screen-scraping. We hand them the frontmatter and the original markdown
 * so they can cite the page accurately.
 */
export function CopyMarkdownButton({ source }: CopyMarkdownButtonProps) {
  const [state, setState] = useState<CopyState>('idle');

  return (
    <button
      type="button"
      onClick={async () => {
        if (state !== 'idle') return;
        setState('copying');
        try {
          await navigator.clipboard.writeText(source);
          setState('copied');
          setTimeout(() => setState('idle'), 2000);
        } catch {
          setState('idle');
        }
      }}
      aria-label={
        state === 'copied' ? 'Markdown copiado para a área de transferência' : 'Copiar markdown'
      }
      className="inline-flex items-center gap-2 rounded-md border border-fd-border bg-fd-card px-3 py-1.5 text-xs font-medium text-fd-muted-foreground transition-colors hover:border-fd-border hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-ring"
    >
      {state === 'idle' && <Copy className="h-3.5 w-3.5" aria-hidden />}
      {state === 'copying' && <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />}
      {state === 'copied' && <Check className="h-3.5 w-3.5 text-fd-primary" aria-hidden />}
      <span>
        {state === 'idle' && 'Copiar markdown'}
        {state === 'copying' && 'Copiando…'}
        {state === 'copied' && 'Copiado'}
      </span>
    </button>
  );
}
