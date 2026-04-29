import { Button } from '@uranus-workspace/design-system';
import { ArrowDown } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef, useImperativeHandle } from 'react';
import { useAutoScroll } from '../../hooks/use-auto-scroll.js';
import { cn } from '../../lib/cn.js';

export interface MessageListHandle {
  scrollToBottom: (behavior?: ScrollBehavior) => void;
}

export interface MessageListProps extends HTMLAttributes<HTMLDivElement> {
  /** Re-evaluate auto-scroll when this changes (e.g. `messages.length`). */
  scrollKey?: unknown;
  /** Override the default "scroll to latest" pill. */
  scrollToLatestLabel?: ReactNode;
  /** Hide the floating "scroll to latest" pill. */
  hideScrollToLatest?: boolean;
}

/**
 * Vertical list of messages that sticks to the bottom while the user is near
 * the bottom and exposes a "scroll to latest" affordance otherwise.
 */
export const MessageList = forwardRef<MessageListHandle, MessageListProps>(function MessageList(
  { className, children, scrollKey, scrollToLatestLabel, hideScrollToLatest, ...props },
  ref,
) {
  const {
    ref: scrollRef,
    atBottom,
    scrollToBottom,
  } = useAutoScroll<HTMLDivElement>({
    watch: scrollKey,
  });

  useImperativeHandle(ref, () => ({ scrollToBottom }), [scrollToBottom]);

  return (
    <div data-slot="message-list-wrapper" className="relative flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollRef}
        data-slot="message-list"
        className={cn(
          'flex-1 overflow-y-auto px-4 py-4',
          '[scrollbar-width:thin]',
          '[scrollbar-color:color-mix(in_oklab,var(--color-muted-foreground)_38%,transparent)_transparent]',
          '[&::-webkit-scrollbar]:w-2',
          '[&::-webkit-scrollbar-track]:bg-transparent',
          '[&::-webkit-scrollbar-thumb]:rounded-full',
          '[&::-webkit-scrollbar-thumb]:bg-[color-mix(in_oklab,var(--color-muted-foreground)_30%,transparent)]',
          '[&::-webkit-scrollbar-thumb:hover]:bg-[color-mix(in_oklab,var(--color-muted-foreground)_48%,transparent)]',
          className,
        )}
        {...props}
      >
        <div className="mx-auto flex w-full max-w-[min(72rem,100%)] flex-col">{children}</div>
      </div>

      {hideScrollToLatest || atBottom ? null : (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="pointer-events-auto gap-1.5 shadow-sm"
            onClick={() => scrollToBottom()}
            data-slot="message-list-scroll-pill"
          >
            <ArrowDown aria-hidden className="size-3.5" />
            {scrollToLatestLabel ?? 'Pular para a última mensagem'}
          </Button>
        </div>
      )}
    </div>
  );
});
