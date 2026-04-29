import {
  Badge,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@uranus-workspace/design-system';
import { ExternalLink } from 'lucide-react';
import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import type { UranusCitation } from '../../types.js';

export interface CitationProps extends Omit<HTMLAttributes<HTMLAnchorElement>, 'children'> {
  citation: UranusCitation;
  /** Index used as the chip number. Defaults to 1. */
  index?: number;
}

export const Citation = forwardRef<HTMLAnchorElement, CitationProps>(function Citation(
  { citation, index = 1, className, ...props },
  ref,
) {
  const content = (
    <Badge
      variant="outline"
      className="gap-1 border-primary/30 bg-primary/5 text-[11px] font-medium text-foreground hover:bg-primary/10"
    >
      <span aria-hidden className="text-primary">
        {index}
      </span>
      <span className="max-w-[14ch] truncate">{citation.title}</span>
      {citation.url ? <ExternalLink aria-hidden className="size-3 opacity-60" /> : null}
    </Badge>
  );

  const trigger = citation.url ? (
    <a
      ref={ref}
      href={citation.url}
      target="_blank"
      rel="noreferrer"
      data-slot="citation"
      className={cn('inline-flex items-center', className)}
      {...props}
    >
      {content}
    </a>
  ) : (
    <span data-slot="citation" className={cn('inline-flex items-center', className)}>
      {content}
    </span>
  );

  if (!citation.snippet && !citation.source) return trigger;

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs space-y-1 text-xs">
          {citation.source ? (
            <p className="font-medium text-foreground">{citation.source}</p>
          ) : null}
          {citation.snippet ? <p className="text-muted-foreground">{citation.snippet}</p> : null}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

export interface CitationListProps extends HTMLAttributes<HTMLDivElement> {
  citations: UranusCitation[];
  /** Header label rendered above the chip strip. */
  label?: string;
}

export const CitationList = forwardRef<HTMLDivElement, CitationListProps>(function CitationList(
  { citations, label = 'Fontes', className, ...props },
  ref,
) {
  if (citations.length === 0) return null;
  return (
    <div
      ref={ref}
      data-slot="citation-list"
      className={cn('flex flex-col gap-1.5', className)}
      {...props}
    >
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-1.5">
        {citations.map((citation, idx) => (
          <Citation key={citation.id} citation={citation} index={idx + 1} />
        ))}
      </div>
    </div>
  );
});
