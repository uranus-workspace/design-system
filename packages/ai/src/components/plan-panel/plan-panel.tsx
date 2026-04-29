import { Card, CardContent, CardHeader, CardTitle } from '@uranus-workspace/design-system';
import { ListTodo } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef, useMemo } from 'react';
import { cn } from '../../lib/cn.js';
import type { UranusStage } from '../../types.js';
import { StageList } from '../stage-list/stage-list.js';

export interface PlanPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Live-updating list of plan steps. */
  stages: UranusStage[];
  /** Optional title. Default: "Plano". */
  title?: ReactNode;
  /** Optional description rendered below the title. */
  description?: ReactNode;
  /** Slot rendered to the right of the title (e.g. "Editar plano" button). */
  actions?: ReactNode;
}

/**
 * Live-updating plan card. Pair with `useUranusChat({ defaultMode: 'plan' })`
 * — feed `stages` from your server's plan trace (e.g. via UIMessage data parts).
 */
export const PlanPanel = forwardRef<HTMLDivElement, PlanPanelProps>(function PlanPanel(
  { stages, title = 'Plano', description, actions, className, ...props },
  ref,
) {
  const summary = useMemo(() => {
    const done = stages.filter((stage) => stage.status === 'done').length;
    return `${done} de ${stages.length} etapas concluídas`;
  }, [stages]);

  return (
    <Card ref={ref} data-slot="plan-panel" className={cn('overflow-hidden', className)} {...props}>
      <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-3">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <ListTodo aria-hidden className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <CardTitle className="text-sm">{title}</CardTitle>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {description ?? summary}
          </p>
        </div>
        {actions ? <div className="flex items-center gap-1">{actions}</div> : null}
      </CardHeader>
      <CardContent>
        <StageList stages={stages} />
      </CardContent>
    </Card>
  );
});
