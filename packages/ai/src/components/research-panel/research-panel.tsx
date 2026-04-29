import { Card, CardContent, CardHeader, CardTitle } from '@uranus-workspace/design-system';
import { Telescope } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import type { UranusCitation, UranusStage } from '../../types.js';
import { CitationList } from '../citation/citation.js';
import { StageList } from '../stage-list/stage-list.js';

export interface ResearchPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Live research stages, mirrors `StageList`. */
  stages: UranusStage[];
  /** Sources discovered so far. */
  citations: UranusCitation[];
  /** Optional title. */
  title?: ReactNode;
  /** Optional summary text rendered below the citations list. */
  summary?: ReactNode;
}

/**
 * Research mode panel — pairs the live `StageList` with the discovered
 * `CitationList`. Use as a complement (or full replacement) to the chat
 * column when `mode === 'research'`.
 */
export const ResearchPanel = forwardRef<HTMLDivElement, ResearchPanelProps>(function ResearchPanel(
  { stages, citations, title = 'Pesquisa', summary, className, ...props },
  ref,
) {
  return (
    <Card
      ref={ref}
      data-slot="research-panel"
      className={cn('overflow-hidden', className)}
      {...props}
    >
      <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-3">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Telescope aria-hidden className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <CardTitle className="text-sm">{title}</CardTitle>
          <p className="text-xs text-muted-foreground">
            {citations.length} fontes · {stages.filter((s) => s.status === 'done').length}/
            {stages.length} passos
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <section aria-label="Etapas">
          <StageList stages={stages} />
        </section>
        {citations.length > 0 ? (
          <section aria-label="Fontes" className="border-t pt-3">
            <CitationList citations={citations} label="Fontes consultadas" />
          </section>
        ) : null}
        {summary ? (
          <section aria-label="Resumo" className="rounded-md bg-muted/40 p-3 text-sm">
            {summary}
          </section>
        ) : null}
      </CardContent>
    </Card>
  );
});
