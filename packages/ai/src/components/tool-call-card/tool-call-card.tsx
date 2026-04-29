import {
  Badge,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@uranus-workspace/design-system';
import { AlertTriangle, ChevronRight, Loader2, Wrench } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef, useState } from 'react';
import { cn } from '../../lib/cn.js';
import type { UranusToolCall } from '../../types.js';

const STATE_LABELS: Record<
  UranusToolCall['state'],
  { label: string; tone: 'info' | 'success' | 'error' | 'pending' }
> = {
  'partial-call': { label: 'Preparando entrada', tone: 'pending' },
  call: { label: 'Executando', tone: 'pending' },
  result: { label: 'Concluído', tone: 'success' },
  error: { label: 'Falhou', tone: 'error' },
};

const TONE_CLASSES: Record<'info' | 'success' | 'error' | 'pending', string> = {
  info: 'border-primary/30 bg-primary/5 text-primary',
  success: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400',
  error: 'border-destructive/30 bg-destructive/5 text-destructive',
  pending: 'border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-400',
};

export interface ToolCallCardProps extends HTMLAttributes<HTMLDivElement> {
  toolCall: UranusToolCall;
  /** Render override for the input (defaults to JSON pretty print). */
  renderInput?: (input: unknown) => ReactNode;
  /** Render override for the result. */
  renderResult?: (result: unknown) => ReactNode;
  /** Show input + result expanded by default. */
  defaultOpen?: boolean;
}

function asPretty(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

/**
 * Compact card that shows a tool invocation: name, status, expandable input
 * and result. Map a `ToolUIPart`/`DynamicToolUIPart` from `@ai-sdk/react`
 * via `useUranusChat` (`message.toolCalls[i]`) directly into this component.
 */
export const ToolCallCard = forwardRef<HTMLDivElement, ToolCallCardProps>(function ToolCallCard(
  { toolCall, renderInput, renderResult, defaultOpen = false, className, ...props },
  ref,
) {
  const [open, setOpen] = useState(defaultOpen);
  const stateMeta = STATE_LABELS[toolCall.state];

  const isPending = toolCall.state === 'partial-call' || toolCall.state === 'call';

  return (
    <div
      ref={ref}
      data-slot="tool-call-card"
      data-tool-state={toolCall.state}
      className={cn(
        'rounded-lg border bg-background text-xs',
        toolCall.state === 'error' && 'border-destructive/40',
        className,
      )}
      {...props}
    >
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger
          className="flex w-full items-center gap-2 px-2.5 py-2 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          aria-label={open ? 'Recolher detalhes da ferramenta' : 'Expandir detalhes da ferramenta'}
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            {toolCall.state === 'error' ? (
              <AlertTriangle aria-hidden className="size-3.5" />
            ) : isPending ? (
              <Loader2 aria-hidden className="size-3.5 motion-safe:animate-spin" />
            ) : (
              <Wrench aria-hidden className="size-3.5" />
            )}
          </span>
          <span className="font-mono font-medium text-foreground">{toolCall.name}</span>
          <Badge
            variant="outline"
            className={cn('h-5 px-1.5 text-[10px]', TONE_CLASSES[stateMeta.tone])}
          >
            {stateMeta.label}
          </Badge>
          <ChevronRight
            aria-hidden
            className={cn(
              'ml-auto size-3.5 text-muted-foreground transition-transform',
              open && 'rotate-90',
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent className="border-t bg-muted/30 px-2.5 py-2">
          {toolCall.errorText ? (
            <p className="mb-2 text-destructive">{toolCall.errorText}</p>
          ) : null}

          {toolCall.args !== undefined ? (
            <div className="mb-2">
              <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Entrada
              </p>
              {renderInput ? (
                renderInput(toolCall.args)
              ) : (
                <pre className="overflow-x-auto rounded bg-background p-2 font-mono text-[11px]">
                  {asPretty(toolCall.args)}
                </pre>
              )}
            </div>
          ) : null}

          {toolCall.result !== undefined ? (
            <div>
              <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Resultado
              </p>
              {renderResult ? (
                renderResult(toolCall.result)
              ) : (
                <pre className="overflow-x-auto rounded bg-background p-2 font-mono text-[11px]">
                  {asPretty(toolCall.result)}
                </pre>
              )}
            </div>
          ) : null}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
});
