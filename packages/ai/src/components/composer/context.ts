import { createContext, useContext } from 'react';
import type { UranusAttachment, UranusChatMode, UranusChatStatus } from '../../types.js';

export interface ComposerContextValue {
  value: string;
  setValue: (value: string) => void;
  status: UranusChatStatus;
  disabled: boolean;
  busy: boolean;
  /** True while audio is being captured (drives the record button UI). */
  recording: boolean;
  /** Active conversation mode (chat | plan | research). */
  mode: UranusChatMode;
  setMode: (mode: UranusChatMode) => void;
  /** Pending attachments to send with the next message. */
  attachments: UranusAttachment[];
  addAttachments: (files: File[]) => void;
  removeAttachment: (id: string) => void;
  clearAttachments: () => void;
  /** Imperatively submit (e.g. submit button or keyboard shortcut). */
  submit: () => void;
  /** Stop a running stream. Returns true when there was anything to stop. */
  stop: () => boolean;
  /** Triggered by Composer.RecordButton. Internally `useAudioRecorder` is owned by the Record button. */
  setRecording: (recording: boolean) => void;
}

export const ComposerContext = createContext<ComposerContextValue | null>(null);

export function useComposer(): ComposerContextValue {
  const ctx = useContext(ComposerContext);
  if (!ctx) {
    throw new Error('Composer subcomponents must be rendered inside Composer.Root');
  }
  return ctx;
}
