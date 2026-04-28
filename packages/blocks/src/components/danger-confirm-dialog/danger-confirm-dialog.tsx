import { Input, Label } from '@uranus-workspace/design-system';
import { type ReactNode, useEffect, useId, useState } from 'react';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.js';

export interface DangerConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  /** The literal phrase the user must type before the confirm button enables. */
  confirmationText: string;
  /** Label for the input. Defaults to a sensible message referencing `confirmationText`. */
  inputLabel?: ReactNode;
  /** Confirm button label. Defaults to `"Delete"`. */
  confirmLabel?: ReactNode;
  /** Cancel button label. Defaults to `"Cancel"`. */
  cancelLabel?: ReactNode;
  /** Called when the user confirms with the correct phrase. */
  onConfirm: () => void | Promise<void>;
  /** Disables both buttons and shows a spinner. */
  loading?: boolean;
}

/**
 * High-friction destructive confirmation. Forces the user to type a phrase
 * matching `confirmationText` before the destructive button enables. This is
 * the GitHub "delete repository" pattern.
 *
 * Implemented by composing [ConfirmDialog](../confirm-dialog/confirm-dialog.js) with a `dialogBody` field.
 */
export function DangerConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmationText,
  inputLabel,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  loading,
}: DangerConfirmDialogProps) {
  const inputId = useId();
  const [value, setValue] = useState('');
  const matched = value === confirmationText;

  useEffect(() => {
    if (!open) setValue('');
  }, [open]);

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      confirmLabel={confirmLabel}
      cancelLabel={cancelLabel}
      intent="destructive"
      onConfirm={onConfirm}
      loading={loading}
      confirmButtonProps={{ disabled: !matched }}
      dialogBody={
        <div className="flex flex-col gap-2">
          <Label htmlFor={inputId} className="text-sm">
            {inputLabel ?? (
              <>
                Type{' '}
                <code className="rounded bg-muted px-1 font-mono text-xs">{confirmationText}</code>{' '}
                to confirm.
              </>
            )}
          </Label>
          <Input
            id={inputId}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            autoComplete="off"
            disabled={loading}
          />
        </div>
      }
    />
  );
}
