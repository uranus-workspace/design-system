import { type UseChatOptions, useChat } from '@ai-sdk/react';
import type { ChatStatus, UIMessage } from 'ai';
import { useCallback, useMemo, useState } from 'react';
import type {
  UranusAttachment,
  UranusChatMode,
  UranusChatStatus,
  UranusCitation,
  UranusMessage,
  UranusToolCall,
} from '../types.js';

type AnyUIMessagePart = UIMessage['parts'][number];

interface SendOptions {
  /** Override the conversation mode for this single send. */
  mode?: UranusChatMode;
  /** Extra fields to forward in `body` (merged on top of `{ mode }`). */
  body?: Record<string, unknown>;
}

export interface UseUranusChatOptions
  extends Omit<UseChatOptions<UIMessage>, 'messages' | 'transport'> {
  /** Initial conversation mode. Default `'chat'`. */
  defaultMode?: UranusChatMode;
  /** Optional pre-population. Re-renders if reference changes. */
  initialMessages?: UIMessage[];
  /** Static body fields appended on every request. */
  body?: Record<string, unknown>;
}

export interface UseUranusChatResult {
  /** Raw `UIMessage[]` from `@ai-sdk/react` (use `messages` for the simple shape). */
  rawMessages: UIMessage[];
  /** Uranus-shaped messages, ready to feed into `<Chat>` / `<MessageList>`. */
  messages: UranusMessage[];
  /** Normalized status for the indicator components. */
  status: UranusChatStatus;
  /** Active conversation mode. */
  mode: UranusChatMode;
  setMode: (mode: UranusChatMode) => void;
  /** Send a message, forwarding `{ mode }` in `body`. */
  sendMessage: (
    payload: { text: string; attachments?: UranusAttachment[] },
    options?: SendOptions,
  ) => Promise<void>;
  /** Cancel the current stream. */
  stop: () => void;
  /** Regenerate the last assistant turn. */
  regenerate: () => Promise<void>;
  /** Last error from the SDK, if any. */
  error: Error | undefined;
  /** Imperatively clear the error. */
  clearError: () => void;
}

function attachmentsToFileList(attachments: UranusAttachment[]): FileList | undefined {
  if (typeof window === 'undefined' || attachments.length === 0) return undefined;
  if (typeof DataTransfer === 'undefined') return undefined;
  const dt = new DataTransfer();
  for (const att of attachments) {
    if (att.file) dt.items.add(att.file);
  }
  return dt.files.length > 0 ? dt.files : undefined;
}

function partTextSnapshot(parts: AnyUIMessagePart[] | undefined): string {
  if (!parts) return '';
  let buffer = '';
  for (const part of parts) {
    if ('type' in part && part.type === 'text' && 'text' in part) {
      buffer += part.text;
    }
  }
  return buffer;
}

function partReasoning(parts: AnyUIMessagePart[] | undefined): string | undefined {
  if (!parts) return undefined;
  let buffer = '';
  for (const part of parts) {
    if ('type' in part && part.type === 'reasoning' && 'text' in part) {
      buffer += part.text;
    }
  }
  return buffer.length > 0 ? buffer : undefined;
}

function partCitations(parts: AnyUIMessagePart[] | undefined): UranusCitation[] {
  if (!parts) return [];
  const citations: UranusCitation[] = [];
  for (const part of parts) {
    if (!('type' in part)) continue;
    if (part.type === 'source-url') {
      citations.push({
        id: part.sourceId,
        title: part.title ?? part.url,
        url: part.url,
      });
    } else if (part.type === 'source-document') {
      citations.push({
        id: part.sourceId,
        title: part.title,
        source: part.filename,
      });
    }
  }
  return citations;
}

function partToolCalls(parts: AnyUIMessagePart[] | undefined): UranusToolCall[] {
  if (!parts) return [];
  const calls: UranusToolCall[] = [];
  for (const part of parts) {
    if (!('type' in part)) continue;
    const type = part.type as string;
    if (type !== 'dynamic-tool' && !type.startsWith('tool-')) continue;
    const p = part as unknown as {
      type: string;
      toolName?: string;
      toolCallId?: string;
      input?: unknown;
      output?: unknown;
      state?: 'input-streaming' | 'input-available' | 'output-available' | 'output-error';
      errorText?: string;
    };
    const name = p.toolName ?? p.type.replace(/^tool-/, '');
    const stateMap: Record<string, UranusToolCall['state']> = {
      'input-streaming': 'partial-call',
      'input-available': 'call',
      'output-available': 'result',
      'output-error': 'error',
    };
    calls.push({
      id: p.toolCallId ?? `${name}-${calls.length}`,
      name,
      args: p.input,
      result: p.output,
      state: (p.state && stateMap[p.state]) ?? 'call',
      errorText: p.errorText,
    });
  }
  return calls;
}

function partAttachments(parts: AnyUIMessagePart[] | undefined): UranusAttachment[] {
  if (!parts) return [];
  const attachments: UranusAttachment[] = [];
  for (const part of parts) {
    if (!('type' in part)) continue;
    if (part.type === 'file') {
      const filePart = part as unknown as { mediaType: string; filename?: string; url: string };
      attachments.push({
        id: `${filePart.url}-${attachments.length}`,
        name: filePart.filename ?? 'arquivo',
        contentType: filePart.mediaType,
        previewUrl: filePart.mediaType.startsWith('image/') ? filePart.url : undefined,
      });
    }
  }
  return attachments;
}

function isToolCallActive(parts: AnyUIMessagePart[] | undefined): boolean {
  if (!parts) return false;
  for (const part of parts) {
    if (!('type' in part)) continue;
    const t = part.type as string;
    if (!t.startsWith('tool-') && t !== 'dynamic-tool') continue;
    const state = (part as unknown as { state?: string }).state;
    if (state === 'input-streaming' || state === 'input-available') return true;
  }
  return false;
}

function lastTextPartStreaming(parts: AnyUIMessagePart[] | undefined): boolean {
  if (!parts) return false;
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    if (!part || !('type' in part)) continue;
    if (part.type === 'text') {
      return (part as unknown as { state?: string }).state === 'streaming';
    }
  }
  return false;
}

function uiToUranusMessage(message: UIMessage): UranusMessage {
  const text = partTextSnapshot(message.parts);
  return {
    id: message.id,
    role: message.role,
    text,
    reasoning: partReasoning(message.parts),
    citations: partCitations(message.parts),
    toolCalls: partToolCalls(message.parts),
    attachments: partAttachments(message.parts),
    streaming: lastTextPartStreaming(message.parts),
  };
}

function deriveStatus(
  rawStatus: ChatStatus,
  lastAssistant: UIMessage | undefined,
): UranusChatStatus {
  if (rawStatus === 'error') return 'error';
  if (rawStatus === 'submitted') return 'submitted';
  if (rawStatus === 'ready') return 'idle';
  // streaming: differentiate between thinking, searching, and text streaming.
  const parts = lastAssistant?.parts;
  if (lastAssistant && parts) {
    if (lastTextPartStreaming(parts)) return 'streaming';
    if (isToolCallActive(parts)) {
      const hasSearch = parts.some(
        (p) =>
          'type' in p &&
          ((p.type as string).toLowerCase().includes('search') ||
            (p.type as string).toLowerCase().includes('source')),
      );
      return hasSearch ? 'searching' : 'thinking';
    }
    if (partReasoning(parts) && !partTextSnapshot(parts)) return 'thinking';
  }
  return 'thinking';
}

/**
 * Thin wrapper around `useChat` from `@ai-sdk/react` that normalizes the
 * stream status, derives Uranus-shaped messages, and propagates `mode`
 * (`chat | plan | research`) on every send via `body.mode`.
 *
 * ```tsx
 * const chat = useUranusChat({ api: '/api/chat' });
 * <Chat {...chat} />;
 * ```
 */
export function useUranusChat({
  defaultMode = 'chat',
  initialMessages,
  body,
  ...options
}: UseUranusChatOptions = {}): UseUranusChatResult {
  const [mode, setMode] = useState<UranusChatMode>(defaultMode);

  const chat = useChat({
    ...(options as UseChatOptions<UIMessage>),
    ...(initialMessages ? { messages: initialMessages } : {}),
  } as UseChatOptions<UIMessage>);

  const lastAssistant = useMemo(() => {
    for (let i = chat.messages.length - 1; i >= 0; i--) {
      const message = chat.messages[i];
      if (message?.role === 'assistant') return message;
    }
    return undefined;
  }, [chat.messages]);

  const messages = useMemo(() => chat.messages.map(uiToUranusMessage), [chat.messages]);
  const status = useMemo(
    () => deriveStatus(chat.status, lastAssistant),
    [chat.status, lastAssistant],
  );

  const sendMessage = useCallback(
    async (
      payload: { text: string; attachments?: UranusAttachment[] },
      sendOptions: SendOptions = {},
    ) => {
      const files = attachmentsToFileList(payload.attachments ?? []);
      const mergedBody = {
        ...(body ?? {}),
        ...(sendOptions.body ?? {}),
        mode: sendOptions.mode ?? mode,
      };
      await chat.sendMessage(files ? { text: payload.text, files } : { text: payload.text }, {
        body: mergedBody,
      });
    },
    [body, chat, mode],
  );

  return {
    rawMessages: chat.messages,
    messages,
    status,
    mode,
    setMode,
    sendMessage,
    stop: chat.stop,
    regenerate: () => chat.regenerate(),
    error: chat.error,
    clearError: chat.clearError,
  };
}
