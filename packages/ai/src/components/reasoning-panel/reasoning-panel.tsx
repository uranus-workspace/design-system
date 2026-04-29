import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@uranus-workspace/design-system';
import { Brain, ChevronDown } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef, useState } from 'react';
import { cn } from '../../lib/cn.js';

export interface ReasoningPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Reasoning text emitted by the model. */
  text: string;
  /** Whether reasoning is still streaming (drives the shimmer + label). */
  streaming?: boolean;
  /** Override the trigger label. */
  triggerLabel?: ReactNode;
  /** Open by default. */
  defaultOpen?: boolean;
  /** Controlled open. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Collapsible "thinking" trace, matching the Anthropic / OpenAI UX. Bind the
 * `text` prop to a `ReasoningUIPart`'s `text`. While `streaming` is true the
 * trigger animates a shimmer; when complete it summarises with "Pensei por X".
 */
export const ReasoningPanel = forwardRef<HTMLDivElement, ReasoningPanelProps>(
  function ReasoningPanel(
    {
      text,
      streaming = false,
      triggerLabel,
      defaultOpen = false,
      open: openProp,
      onOpenChange,
      className,
      ...props
    },
    ref,
  ) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const open = openProp ?? internalOpen;
    const setOpen = (value: boolean) => {
      if (openProp === undefined) setInternalOpen(value);
      onOpenChange?.(value);
    };

    return (
      <div
        ref={ref}
        data-slot="reasoning-panel"
        data-streaming={streaming || undefined}
        className={cn('rounded-lg border bg-muted/30 px-3 py-2 text-sm', className)}
        {...props}
      >
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger
            className={cn(
              'group flex w-full items-center gap-2 text-left text-xs font-medium text-foreground',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2',
            )}
            aria-label={open ? 'Ocultar raciocínio' : 'Mostrar raciocínio'}
          >
            <Brain
              aria-hidden
              className={cn(
                'size-3.5 text-muted-foreground',
                streaming && 'motion-safe:animate-pulse',
              )}
            />
            <span
              className={cn(
                streaming &&
                  'bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground bg-[length:200%_100%] bg-clip-text text-transparent motion-safe:animate-[shimmer_1.6s_linear_infinite]',
              )}
            >
              {triggerLabel ?? (streaming ? 'Pensando…' : 'Mostrar raciocínio')}
            </span>
            <ChevronDown
              aria-hidden
              className={cn(
                'ml-auto size-3.5 text-muted-foreground transition-transform',
                open && 'rotate-180',
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent
            data-slot="reasoning-panel-content"
            className="overflow-hidden text-xs text-muted-foreground data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
          >
            <pre className="mt-2 whitespace-pre-wrap font-sans leading-relaxed">{text}</pre>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
);
