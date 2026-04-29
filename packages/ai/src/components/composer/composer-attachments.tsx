import { Button } from '@uranus-workspace/design-system';
import { File as FileIcon, Mic as MicIcon, X } from 'lucide-react';
import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import type { UranusAttachment } from '../../types.js';
import { useComposer } from './context.js';

export interface ComposerAttachmentsProps extends HTMLAttributes<HTMLDivElement> {}

function formatBytes(bytes?: number): string | null {
  if (bytes == null) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface ChipProps {
  attachment: UranusAttachment;
  onRemove: () => void;
}

function AttachmentChip({ attachment, onRemove }: ChipProps) {
  const isImage = attachment.contentType.startsWith('image/') && attachment.previewUrl;
  const isAudio = attachment.contentType.startsWith('audio/');
  return (
    <div
      data-slot="composer-attachment"
      className="group relative flex items-center gap-2 rounded-md border bg-muted/40 p-1.5 pr-7 text-xs"
    >
      {isImage ? (
        <img src={attachment.previewUrl} alt="" className="size-9 rounded object-cover" />
      ) : (
        <span className="flex size-9 items-center justify-center rounded bg-background text-muted-foreground">
          {isAudio ? (
            <MicIcon aria-hidden className="size-4" />
          ) : (
            <FileIcon aria-hidden className="size-4" />
          )}
        </span>
      )}
      <span className="flex min-w-0 flex-col">
        <span className="max-w-[16ch] truncate font-medium text-foreground">{attachment.name}</span>
        {attachment.size != null ? (
          <span className="text-muted-foreground">{formatBytes(attachment.size)}</span>
        ) : null}
      </span>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        aria-label={`Remover anexo ${attachment.name}`}
        onClick={onRemove}
        className="absolute right-0.5 top-0.5 size-5 text-muted-foreground hover:text-foreground"
      >
        <X aria-hidden className="size-3" />
      </Button>
    </div>
  );
}

/**
 * Strip of pending attachments rendered above (or alongside) `Composer.Textarea`.
 * Reads from the composer context — call inside `Composer.Root`.
 */
export const ComposerAttachments = forwardRef<HTMLDivElement, ComposerAttachmentsProps>(
  function ComposerAttachments({ className, ...props }, ref) {
    const { attachments, removeAttachment } = useComposer();
    if (attachments.length === 0) return null;
    return (
      <div
        ref={ref}
        data-slot="composer-attachments"
        className={cn('flex flex-wrap gap-1.5 px-1', className)}
        {...props}
      >
        {attachments.map((attachment) => (
          <AttachmentChip
            key={attachment.id}
            attachment={attachment}
            onRemove={() => removeAttachment(attachment.id)}
          />
        ))}
      </div>
    );
  },
);
