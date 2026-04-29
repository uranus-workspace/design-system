import { Button } from '@uranus-workspace/design-system';
import { Sparkles } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface SuggestedPrompt {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  prompt: string;
}

export interface SuggestedPromptsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  prompts: SuggestedPrompt[];
  /** Called with the chosen `prompt` text. */
  onSelect: (prompt: string) => void;
  /** Optional column count. Default `auto-fit` minmax 220px. */
  columns?: number;
}

/**
 * Card grid of "what can I ask?" prompts, surfaced when the chat is empty.
 * Each card emits the raw prompt text via `onSelect`, leaving the consumer
 * free to send it through `useUranusChat.sendMessage` or any custom flow.
 */
export const SuggestedPrompts = forwardRef<HTMLDivElement, SuggestedPromptsProps>(
  function SuggestedPrompts({ prompts, onSelect, columns, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="suggested-prompts"
        className={cn(
          'grid gap-2',
          !columns && 'grid-cols-[repeat(auto-fit,minmax(220px,1fr))]',
          className,
        )}
        style={columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined}
        {...props}
      >
        {prompts.map((suggestion, index) => (
          <Button
            key={suggestion.id ?? index}
            type="button"
            variant="outline"
            className="h-auto items-start justify-start gap-2 px-3 py-3 text-left"
            onClick={() => onSelect(suggestion.prompt)}
            data-slot="suggested-prompt"
          >
            <Sparkles aria-hidden className="mt-0.5 size-3.5 shrink-0 text-primary" />
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">{suggestion.title}</span>
              {suggestion.description ? (
                <span className="line-clamp-2 text-xs text-muted-foreground">
                  {suggestion.description}
                </span>
              ) : null}
            </span>
          </Button>
        ))}
      </div>
    );
  },
);
