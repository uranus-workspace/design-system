import {
  type DragEvent,
  type FormEvent,
  type FormHTMLAttributes,
  type ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '../../lib/cn.js';
import type { UranusAttachment, UranusChatMode, UranusChatStatus } from '../../types.js';
import { ComposerContext, type ComposerContextValue } from './context.js';

let idCounter = 0;
const nextId = () => `att-${Date.now()}-${++idCounter}`;

function fileToAttachment(file: File): UranusAttachment {
  return {
    id: nextId(),
    name: file.name,
    contentType: file.type || 'application/octet-stream',
    size: file.size,
    previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    file,
  };
}

export interface ComposerSubmitPayload {
  text: string;
  attachments: UranusAttachment[];
  mode: UranusChatMode;
}

export interface ComposerRootProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Controlled value. Uncontrolled by default. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called with the trimmed text + attachments + mode on submit. */
  onSubmit: (payload: ComposerSubmitPayload) => void;
  /** Optional cancel handler — wired to `Composer.SubmitButton` while `status` is busy. */
  onStop?: () => void;
  /** Pipeline status (driven by `useUranusChat` or your own state). */
  status?: UranusChatStatus;
  /** Disable input and submit. */
  disabled?: boolean;
  /** Mime types accepted by attach + drag-and-drop. Default any. */
  accept?: string;
  /** Maximum number of attachments. Default unlimited. */
  maxAttachments?: number;
  /** Initial mode. Default `'chat'`. */
  defaultMode?: UranusChatMode;
  mode?: UranusChatMode;
  onModeChange?: (mode: UranusChatMode) => void;
  /** Wrapper layout className. */
  className?: string;
  children?: ReactNode;
}

const STATUS_BUSY: UranusChatStatus[] = ['submitted', 'thinking', 'searching', 'streaming'];

export const ComposerRoot = forwardRef<HTMLFormElement, ComposerRootProps>(function ComposerRoot(
  {
    value: controlledValue,
    defaultValue,
    onValueChange,
    onSubmit,
    onStop,
    status = 'idle',
    disabled = false,
    accept = '*/*',
    maxAttachments,
    defaultMode = 'chat',
    mode: controlledMode,
    onModeChange,
    className,
    children,
    ...formProps
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [internalMode, setInternalMode] = useState<UranusChatMode>(defaultMode);
  const [attachments, setAttachments] = useState<UranusAttachment[]>([]);
  const attachmentsRef = useRef<UranusAttachment[]>(attachments);
  attachmentsRef.current = attachments;
  const [recording, setRecording] = useState(false);

  const value = controlledValue ?? internalValue;
  const mode = controlledMode ?? internalMode;

  const setValue = useCallback(
    (next: string) => {
      if (controlledValue === undefined) setInternalValue(next);
      onValueChange?.(next);
    },
    [controlledValue, onValueChange],
  );

  const setMode = useCallback(
    (next: UranusChatMode) => {
      if (controlledMode === undefined) setInternalMode(next);
      onModeChange?.(next);
    },
    [controlledMode, onModeChange],
  );

  const addAttachments = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;
      setAttachments((prev) => {
        const next = [...prev, ...files.map(fileToAttachment)];
        return maxAttachments ? next.slice(-maxAttachments) : next;
      });
    },
    [maxAttachments],
  );

  const removeAttachment = useCallback((id: string) => {
    setAttachments((prev) => {
      const target = prev.find((att) => att.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((att) => att.id !== id);
    });
  }, []);

  const clearAttachments = useCallback(() => {
    setAttachments((prev) => {
      for (const att of prev) {
        if (att.previewUrl) URL.revokeObjectURL(att.previewUrl);
      }
      return [];
    });
  }, []);

  const busy = STATUS_BUSY.includes(status);

  const submit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed && attachments.length === 0) return;
    if (busy || disabled) return;
    onSubmit({ text: trimmed, attachments, mode });
    setValue('');
    clearAttachments();
  }, [value, attachments, busy, disabled, onSubmit, mode, setValue, clearAttachments]);

  const stop = useCallback(() => {
    if (!busy) return false;
    onStop?.();
    return true;
  }, [busy, onStop]);

  useEffect(() => {
    return () => {
      for (const att of attachmentsRef.current) {
        if (att.previewUrl) URL.revokeObjectURL(att.previewUrl);
      }
    };
  }, []);

  const ctx: ComposerContextValue = useMemo(
    () => ({
      value,
      setValue,
      status,
      disabled,
      busy,
      recording,
      mode,
      setMode,
      attachments,
      addAttachments,
      removeAttachment,
      clearAttachments,
      submit,
      stop,
      setRecording,
    }),
    [
      value,
      setValue,
      status,
      disabled,
      busy,
      recording,
      mode,
      setMode,
      attachments,
      addAttachments,
      removeAttachment,
      clearAttachments,
      submit,
      stop,
    ],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit();
  };

  const handleDrop = (event: DragEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) return;
    const files = Array.from(event.dataTransfer?.files ?? []);
    if (files.length > 0) addAttachments(files);
  };

  const handleDragOver = (event: DragEvent<HTMLFormElement>) => {
    if (event.dataTransfer?.types.includes('Files')) event.preventDefault();
  };

  return (
    <ComposerContext.Provider value={ctx}>
      <form
        {...formProps}
        ref={ref}
        data-slot="composer"
        data-status={status}
        data-mode={mode}
        data-busy={busy || undefined}
        data-recording={recording || undefined}
        data-accept={accept}
        className={cn(
          'flex w-full flex-col gap-1 rounded-xl border border-border/50 bg-muted/10 p-1.5 shadow-none transition focus-within:border-border focus-within:ring-1 focus-within:ring-ring/40',
          disabled && 'opacity-60',
          className,
        )}
        onSubmit={handleSubmit}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {children}
      </form>
    </ComposerContext.Provider>
  );
});
