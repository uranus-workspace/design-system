import { Button, ScrollArea } from '@uranus-workspace/design-system';
import { MessageSquarePlus } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface ChatThread {
  id: string;
  title: string;
  description?: string;
  /** ISO date or pre-formatted "há 2 dias". */
  updatedAt?: string;
  unread?: boolean;
}

export interface ChatThreadListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  threads: ChatThread[];
  /** Currently active thread id (highlighted). */
  activeId?: string;
  onSelect?: (thread: ChatThread) => void;
  onCreate?: () => void;
  /** Optional action shown above the list (e.g. search input slot). */
  header?: ReactNode;
  /** Empty state when `threads.length === 0`. */
  emptyState?: ReactNode;
}

/**
 * Sidebar list of saved chat threads. Presentational — pass in a sorted list
 * with `activeId` and react to `onSelect` to navigate.
 */
export const ChatThreadList = forwardRef<HTMLDivElement, ChatThreadListProps>(
  function ChatThreadList(
    { threads, activeId, onSelect, onCreate, header, emptyState, className, ...props },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-slot="chat-thread-list"
        className={cn('flex h-full min-h-0 flex-col', className)}
        {...props}
      >
        <div className="flex items-center gap-2 px-3 py-3">
          <Button
            type="button"
            size="sm"
            variant="primary"
            className="flex-1 gap-2"
            onClick={onCreate}
            disabled={!onCreate}
          >
            <MessageSquarePlus aria-hidden className="size-3.5" />
            Nova conversa
          </Button>
        </div>

        {header ? <div className="px-3 pb-2">{header}</div> : null}

        <ScrollArea className="flex-1">
          {threads.length === 0 ? (
            <div
              data-slot="chat-thread-list-empty"
              className="px-3 py-6 text-center text-xs text-muted-foreground"
            >
              {emptyState ?? 'Nenhuma conversa ainda.'}
            </div>
          ) : (
            <ul className="flex flex-col gap-0.5 px-2 pb-3">
              {threads.map((thread) => {
                const isActive = thread.id === activeId;
                return (
                  <li key={thread.id}>
                    <button
                      type="button"
                      data-slot="chat-thread-item"
                      data-active={isActive || undefined}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => onSelect?.(thread)}
                      className={cn(
                        'group flex w-full flex-col gap-0.5 rounded-md px-2.5 py-2 text-left transition-colors',
                        'hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                        isActive && 'bg-muted',
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium text-foreground">
                          {thread.title}
                        </span>
                        {thread.unread ? (
                          <span
                            role="status"
                            aria-label="Não lido"
                            className="size-1.5 shrink-0 rounded-full bg-primary"
                          />
                        ) : null}
                      </div>
                      {thread.description ? (
                        <p className="line-clamp-1 text-xs text-muted-foreground">
                          {thread.description}
                        </p>
                      ) : null}
                      {thread.updatedAt ? (
                        <p className="text-[11px] text-muted-foreground">{thread.updatedAt}</p>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </ScrollArea>
      </div>
    );
  },
);
