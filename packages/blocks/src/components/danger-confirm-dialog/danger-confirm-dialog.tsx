import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Input,
  Label,
  Spinner,
  buttonVariants,
} from '@uranus-workspace/design-system';
import { type ReactNode, useEffect, useId, useState } from 'react';
import { cn } from '../../lib/cn.js';

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
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (loading && !next) return;
        onOpenChange(next);
      }}
    >
      <AlertDialogContent {...(description ? {} : { 'aria-describedby': undefined })}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
        </AlertDialogHeader>

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

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: 'destructive' }), 'gap-2')}
            disabled={!matched || loading}
            onClick={async (event) => {
              event.preventDefault();
              await onConfirm();
              onOpenChange(false);
            }}
          >
            {loading ? <Spinner className="size-4" aria-hidden /> : null}
            <span>{confirmLabel}</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
