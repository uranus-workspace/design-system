import { Avatar, AvatarFallback, AvatarImage } from '@uranus-workspace/design-system';
import { Bot, User } from 'lucide-react';
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

type MessageRole = 'user' | 'assistant' | 'system';

export interface MessageProps extends Omit<HTMLAttributes<HTMLElement>, 'role'> {
  role: MessageRole;
  /** Author display label. Default: "Você" / "Assistente" / "Sistema". */
  name?: ReactNode;
  /** Author avatar URL. */
  avatarUrl?: string;
  /** Author initials for the avatar fallback. */
  initials?: string;
  /** Render timestamp. */
  timestamp?: ReactNode;
}

const ROLE_DEFAULTS: Record<MessageRole, { name: string; initials: string }> = {
  user: { name: 'Você', initials: 'EU' },
  assistant: { name: 'Assistente', initials: 'AI' },
  system: { name: 'Sistema', initials: 'SY' },
};

const MessageRoot = forwardRef<HTMLElement, MessageProps>(function Message(
  { role, name, avatarUrl, initials, timestamp, className, children, ...props },
  ref,
) {
  const defaults = ROLE_DEFAULTS[role];
  const Icon = role === 'user' ? User : Bot;
  return (
    <article
      ref={ref}
      data-slot="message"
      data-role={role}
      aria-label={`${typeof name === 'string' ? name : defaults.name} (${role})`}
      className={cn(
        'group flex w-full gap-3 px-1 py-3 first:pt-1 last:pb-1',
        role === 'user' && 'flex-row-reverse',
        className,
      )}
      {...props}
    >
      <Avatar
        aria-hidden
        className={cn(
          'mt-0.5 size-8 shrink-0 ring-1 ring-border',
          role === 'assistant' && 'bg-primary/5',
        )}
      >
        {avatarUrl ? <AvatarImage alt="" src={avatarUrl} /> : null}
        <AvatarFallback className="text-xs font-medium">
          {initials ?? defaults.initials.slice(0, 2)}
        </AvatarFallback>
      </Avatar>

      <div className={cn('flex min-w-0 flex-1 flex-col gap-1.5', role === 'user' && 'items-end')}>
        <header className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon aria-hidden className="size-3.5" />
          <span data-slot="message-name" className="font-medium text-foreground">
            {name ?? defaults.name}
          </span>
          {timestamp ? <time data-slot="message-timestamp">{timestamp}</time> : null}
        </header>

        {children}
      </div>
    </article>
  );
});

MessageRoot.displayName = 'Message';

export interface MessageContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Constrain bubble width to a comfortable reading line length. Default `true`. */
  prose?: boolean;
}

export const MessageContent = forwardRef<HTMLDivElement, MessageContentProps>(
  function MessageContent({ className, prose = true, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="message-content"
        className={cn(
          'rounded-lg text-sm leading-relaxed text-foreground',
          'group-data-[role=user]:bg-primary group-data-[role=user]:text-primary-foreground group-data-[role=user]:px-3.5 group-data-[role=user]:py-2.5',
          'group-data-[role=assistant]:bg-transparent',
          'group-data-[role=system]:bg-muted group-data-[role=system]:text-muted-foreground group-data-[role=system]:px-3 group-data-[role=system]:py-2',
          prose && 'max-w-prose',
          'whitespace-pre-wrap break-words',
          className,
        )}
        {...props}
      />
    );
  },
);
MessageContent.displayName = 'Message.Content';

export interface MessageActionsProps extends HTMLAttributes<HTMLDivElement> {}

export const MessageActions = forwardRef<HTMLDivElement, MessageActionsProps>(
  function MessageActions({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="message-actions"
        className={cn(
          'flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100',
          className,
        )}
        {...props}
      />
    );
  },
);
MessageActions.displayName = 'Message.Actions';

export interface MessageAttachmentsProps extends HTMLAttributes<HTMLDivElement> {}

export const MessageAttachments = forwardRef<HTMLDivElement, MessageAttachmentsProps>(
  function MessageAttachments({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="message-attachments"
        className={cn('flex flex-wrap gap-2', className)}
        {...props}
      />
    );
  },
);
MessageAttachments.displayName = 'Message.Attachments';

/**
 * Conversation message bubble. Compose with **`Message.Content`**, **`Message.Actions`**,
 * and **`Message.Attachments`** as children.
 */
export const Message = Object.assign(MessageRoot, {
  Content: MessageContent,
  Actions: MessageActions,
  Attachments: MessageAttachments,
});
