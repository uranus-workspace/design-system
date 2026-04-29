import { Alert, AlertDescription, Button } from '@uranus-workspace/design-system';
import { type HTMLAttributes, type ReactNode, forwardRef, useCallback, useMemo } from 'react';
import { cn } from '../../lib/cn.js';
import type { UranusChatMode, UranusChatStatus, UranusMessage } from '../../types.js';
import { CitationList } from '../citation/citation.js';
import type { ComposerSubmitPayload } from '../composer/composer-root.js';
import { Composer } from '../composer/composer.js';
import { MessageList } from '../message-list/message-list.js';
import { Message } from '../message/message.js';
import { StreamingText } from '../streaming-text/streaming-text.js';
import { ThinkingIndicator } from '../thinking-indicator/thinking-indicator.js';

export interface ChatProps extends HTMLAttributes<HTMLDivElement> {
  messages: UranusMessage[];
  status: UranusChatStatus;
  /** Called when the user submits a new turn from the composer. */
  onSend: (payload: ComposerSubmitPayload) => void;
  onStop?: () => void;
  onRegenerate?: () => void;
  /** Mode toggle controlled value (optional). When omitted, `Composer.ModeToggle` manages mode internally. */
  mode?: UranusChatMode;
  onModeChange?: (mode: UranusChatMode) => void;
  /** Optional render override for a single message. */
  renderMessage?: (message: UranusMessage) => ReactNode;
  /** Optional empty state when `messages.length === 0`. */
  emptyState?: ReactNode;
  /** Slots: header above the message list. */
  header?: ReactNode;
  /** Slots: sidebar to the left of the message column. */
  sidebar?: ReactNode;
  /** Slots: composer toolbar children (override default toolbar). */
  composerToolbar?: ReactNode;
  /** When true, render the default attach + record + submit toolbar. Default `true`. */
  defaultToolbar?: boolean;
  /** Optional transcribe handler wired to `Composer.RecordButton`. */
  transcribeAudio?: (blob: Blob) => Promise<string>;
  /** Display label below the composer (e.g. model picker). */
  composerHint?: ReactNode;
  /** Error to surface above the composer. */
  error?: string | null;
}

function Bubble({ message }: { message: UranusMessage }) {
  return (
    <Message
      role={message.role}
      name={message.authorName}
      avatarUrl={message.authorAvatarUrl}
      timestamp={
        message.timestamp instanceof Date
          ? message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          : message.timestamp
      }
    >
      <Message.Content>
        {message.content ? (
          message.content
        ) : (
          <StreamingText text={message.text ?? ''} streaming={message.streaming} />
        )}
      </Message.Content>
      {message.citations && message.citations.length > 0 ? (
        <CitationList citations={message.citations} />
      ) : null}
    </Message>
  );
}

const ChatRoot = forwardRef<HTMLDivElement, ChatProps>(function Chat(
  {
    messages,
    status,
    onSend,
    onStop,
    onRegenerate,
    mode,
    onModeChange,
    renderMessage,
    emptyState,
    header,
    sidebar,
    composerToolbar,
    defaultToolbar = true,
    transcribeAudio,
    composerHint,
    error,
    className,
    ...props
  },
  ref,
) {
  const renderItem = useCallback(
    (message: UranusMessage) =>
      renderMessage ? renderMessage(message) : <Bubble message={message} />,
    [renderMessage],
  );

  const showThinking = useMemo(() => {
    if (status !== 'submitted' && status !== 'thinking') return false;
    const last = messages.at(-1);
    return !last?.streaming;
  }, [status, messages]);

  return (
    <div
      ref={ref}
      data-slot="chat"
      data-status={status}
      className={cn('flex h-full min-h-0 w-full flex-1 overflow-hidden', className)}
      {...props}
    >
      {sidebar ? (
        <aside
          data-slot="chat-sidebar"
          className="hidden w-64 shrink-0 border-r bg-muted/20 md:flex md:flex-col"
        >
          {sidebar}
        </aside>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        {header ? (
          <div
            data-slot="chat-header"
            className="border-b border-border/40 bg-background px-4 py-2.5"
          >
            {header}
          </div>
        ) : null}

        <MessageList scrollKey={`${messages.length}-${status}`}>
          {messages.length === 0 && emptyState ? (
            <div data-slot="chat-empty" className="my-6">
              {emptyState}
            </div>
          ) : (
            messages.map((message) => <div key={message.id}>{renderItem(message)}</div>)
          )}
          {showThinking ? (
            <div className="px-1 py-2">
              <ThinkingIndicator label={status === 'submitted' ? 'Enviando…' : 'Pensando…'} />
            </div>
          ) : null}
        </MessageList>

        <div
          data-slot="chat-footer"
          className="space-y-2 border-t border-border/40 bg-muted/5 px-4 py-3"
        >
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          {onRegenerate && messages.length > 0 && status === 'idle' ? (
            <div className="flex justify-center">
              <Button type="button" size="sm" variant="ghost" onClick={onRegenerate}>
                Refazer última resposta
              </Button>
            </div>
          ) : null}

          <div className="mx-auto w-full max-w-[min(80rem,100%)] px-1">
            <Composer.Root
              status={status}
              onSubmit={onSend}
              onStop={onStop}
              mode={mode}
              onModeChange={onModeChange}
            >
              <Composer.Attachments />
              <Composer.Textarea />
              {composerToolbar ??
                (defaultToolbar ? (
                  <Composer.Toolbar className="mt-1 gap-2 border-t border-border/40 px-0 pb-0 pt-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <Composer.MoreMenu />
                      <Composer.ModeToggle />
                    </div>
                    <div className="flex shrink-0 items-center gap-0.5">
                      <Composer.AttachButton />
                      {transcribeAudio ? (
                        <Composer.RecordButton transcribe={transcribeAudio} />
                      ) : (
                        <Composer.RecordButton attachOnStop />
                      )}
                      <Composer.SubmitButton />
                    </div>
                  </Composer.Toolbar>
                ) : null)}
              {composerHint ?? <Composer.Hints />}
            </Composer.Root>
          </div>
        </div>
      </div>
    </div>
  );
});

export interface ChatHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export const ChatHeader = forwardRef<HTMLDivElement, ChatHeaderProps>(function ChatHeader(
  { title, description, actions, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="chat-header-row"
      className={cn('flex items-center justify-between gap-3', className)}
      {...props}
    >
      <div className="min-w-0">
        {title ? <p className="truncate text-sm font-medium text-foreground">{title}</p> : null}
        {description ? (
          <p className="truncate text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex items-center gap-1">{actions}</div> : null}
    </div>
  );
});

export const ChatEmpty = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function ChatEmpty({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="chat-empty"
        role="status"
        className={cn('flex flex-col items-center gap-3 py-12 text-center', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ChatRoot.displayName = 'Chat';
ChatHeader.displayName = 'Chat.Header';
ChatEmpty.displayName = 'Chat.Empty';

/**
 * Anthropic / OpenAI-style chat surface. Wraps the message list, thinking
 * indicator, composer (with attachments, audio, and mode pills) and an
 * optional sidebar slot. Pair with **`useUranusChat`** for the easiest DX:
 *
 * ```tsx
 * const chat = useUranusChat({ api: '/api/chat' });
 * <Chat
 *   messages={chat.messages}
 *   status={chat.status}
 *   mode={chat.mode}
 *   onModeChange={chat.setMode}
 *   onSend={({ text, attachments }) => chat.sendMessage({ text, attachments })}
 *   onStop={chat.stop}
 *   onRegenerate={chat.regenerate}
 * />
 * ```
 */
export const Chat = Object.assign(ChatRoot, {
  Header: ChatHeader,
  Empty: ChatEmpty,
});
