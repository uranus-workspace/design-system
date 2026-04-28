import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@uranus-workspace/design-system';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface ChartCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Top-right slot for filters, range pickers, or overflow menus. */
  actions?: ReactNode;
  /** Footer content below the chart, e.g. legend hint or summary. */
  footer?: ReactNode;
  /** Chart body — typically a `<ChartContainer>` from @uranus-workspace/design-system. */
  children: ReactNode;
}

/**
 * Card preset that hosts a chart with consistent header + actions slot.
 *
 * Composes `Card`/`CardHeader`/`CardContent` so every chart on a dashboard
 * shares the same padding, title typography, and action alignment.
 */
export const ChartCard = forwardRef<HTMLDivElement, ChartCardProps>(function ChartCard(
  { title, description, actions, footer, children, className, ...props },
  ref,
) {
  return (
    <Card ref={ref} data-slot="chart-card" className={cn('flex flex-col', className)} {...props}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <div className="min-w-0 flex-1">
          <CardTitle className="text-base">{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
        </div>
        {actions ? (
          <div data-slot="chart-card-actions" className="flex items-center gap-1">
            {actions}
          </div>
        ) : null}
      </CardHeader>
      <CardContent data-slot="chart-card-body" className="flex-1">
        {children}
      </CardContent>
      {footer ? (
        <div
          data-slot="chart-card-footer"
          className="border-t px-6 py-4 text-sm text-muted-foreground"
        >
          {footer}
        </div>
      ) : null}
    </Card>
  );
});
