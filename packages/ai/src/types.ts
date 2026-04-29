import type { ReactNode } from 'react';

/** Normalized chat status, derived from `useChat` status + message parts. */
export type UranusChatStatus =
  | 'idle'
  | 'submitted'
  | 'thinking'
  | 'searching'
  | 'streaming'
  | 'error';

/** Conversation mode propagated to the server route via `body.mode`. */
export type UranusChatMode = 'chat' | 'plan' | 'research';

/** Stage status for plan/research progress lists. */
export type UranusStageStatus = 'queued' | 'running' | 'done' | 'error' | 'skipped';

export interface UranusStage {
  id: string;
  title: string;
  description?: string;
  status: UranusStageStatus;
}

export interface UranusCitation {
  id: string;
  title: string;
  url?: string;
  snippet?: string;
  source?: string;
}

export interface UranusToolCall {
  id: string;
  name: string;
  args?: unknown;
  result?: unknown;
  state: 'partial-call' | 'call' | 'result' | 'error';
  errorText?: string;
}

export interface UranusAttachment {
  id: string;
  /** File name, used as the chip label. */
  name: string;
  /** MIME type, e.g. `image/png`, `application/pdf`, `audio/webm`. */
  contentType: string;
  /** Bytes. Optional, used for the chip subtitle. */
  size?: number;
  /** Object URL or remote URL for image previews. */
  previewUrl?: string;
  /** Underlying file (set for client-side captures and picker results). */
  file?: File;
}

/** Minimal message shape used by presentational components. */
export interface UranusMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  /** Concatenated text content, ready for display. Optional when the message is purely tool/reasoning. */
  text?: string;
  /** Optional rich content override; takes precedence over `text` when rendering. */
  content?: ReactNode;
  /** Optional reasoning trace (Anthropic/OpenAI thinking). */
  reasoning?: string;
  /** Tool calls associated with the assistant turn. */
  toolCalls?: UranusToolCall[];
  /** Source citations associated with the assistant turn. */
  citations?: UranusCitation[];
  /** Attachments uploaded by the user with this message. */
  attachments?: UranusAttachment[];
  /** Mark the message as still streaming (renders streaming caret on the trailing message). */
  streaming?: boolean;
  /** Author display label override (e.g. model name). */
  authorName?: string;
  /** Author avatar override URL. */
  authorAvatarUrl?: string;
  /** Render timestamp; can be a string ("agora", "há 2m") or a Date. */
  timestamp?: string | Date;
}
