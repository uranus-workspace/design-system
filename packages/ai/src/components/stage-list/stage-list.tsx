import { Check, CircleDashed, Loader2, MinusCircle, X } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import type { UranusStage, UranusStageStatus } from '../../types.js';

const STATUS_ICON: Record<UranusStageStatus, ReactNode> = {
  queued: <CircleDashed aria-hidden className="size-4 text-muted-foreground" />,
  running: <Loader2 aria-hidden className="size-4 motion-safe:animate-spin text-primary" />,
  done: <Check aria-hidden className="size-4 text-emerald-600 dark:text-emerald-400" />,
  error: <X aria-hidden className="size-4 text-destructive" />,
  skipped: <MinusCircle aria-hidden className="size-4 text-muted-foreground" />,
};

const STATUS_LABEL: Record<UranusStageStatus, string> = {
  queued: 'Aguardando',
  running: 'Executando',
  done: 'Concluído',
  error: 'Falhou',
  skipped: 'Pulado',
};

export interface StageListProps extends HTMLAttributes<HTMLOListElement> {
  stages: UranusStage[];
  /** Render override for a stage. */
  renderStage?: (stage: UranusStage) => ReactNode;
}

/**
 * Vertical timeline of phased steps for **planning** and **research** modes.
 * Steps animate in via Tailwind utilities and respect `prefers-reduced-motion`.
 */
export const StageList = forwardRef<HTMLOListElement, StageListProps>(function StageList(
  { stages, renderStage, className, ...props },
  ref,
) {
  return (
    <ol ref={ref} data-slot="stage-list" className={cn('flex flex-col', className)} {...props}>
      {stages.map((stage, index) => {
        if (renderStage) return renderStage(stage);
        return (
          <li
            key={stage.id}
            data-slot="stage-list-item"
            data-status={stage.status}
            aria-current={stage.status === 'running' ? 'step' : undefined}
            className={cn(
              'flex gap-3 px-1 py-2',
              'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-left-1 motion-safe:duration-300',
            )}
          >
            <div className="flex flex-col items-center">
              <div className="flex size-7 items-center justify-center rounded-full border bg-background">
                {STATUS_ICON[stage.status]}
              </div>
              {index < stages.length - 1 ? (
                <span aria-hidden className="mt-1 w-px flex-1 bg-border" />
              ) : null}
            </div>
            <div className="min-w-0 flex-1 pb-2">
              <div className="flex items-center gap-2">
                <p
                  className={cn(
                    'text-sm font-medium text-foreground',
                    stage.status === 'skipped' && 'text-muted-foreground line-through',
                  )}
                >
                  {stage.title}
                </p>
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {STATUS_LABEL[stage.status]}
                </span>
              </div>
              {stage.description ? (
                <p className="text-xs text-muted-foreground">{stage.description}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
});
