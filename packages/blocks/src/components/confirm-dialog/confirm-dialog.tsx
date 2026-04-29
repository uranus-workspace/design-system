import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Spinner,
  buttonVariants,
} from '@uranus-workspace/design-system';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn.js';

export type ConfirmDialogIntent = 'default' | 'destructive';

export interface ConfirmDialogProps {
  /** Controlled open state. */
  open: boolean;
  /** Called when the dialog is requested to close. */
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  /** Label for the confirm button. Defaults to `"Confirm"`. */
  confirmLabel?: ReactNode;
  /** Label for the cancel button. Defaults to `"Cancel"`. */
  cancelLabel?: ReactNode;
  /**
   * Visual intent. `destructive` colors the confirm button red.
   * Defaults to `"default"`.
   */
  intent?: ConfirmDialogIntent;
  /** Called when the user confirms. The dialog closes after the promise resolves. */
  onConfirm: () => void | Promise<void>;
  /**
   * When `true`, the confirm button shows a spinner and the dialog is
   * non-dismissible.
   */
  loading?: boolean;
  /** Additional confirm-button props (e.g. `disabled`). */
  confirmButtonProps?: { disabled?: boolean };
  /**
   * Optional region between the title/description and the footer — use for
   * forms, checkboxes, or typed confirmation fields.
   */
  dialogBody?: ReactNode;
}

/**
 * Two-button confirmation modal built on `AlertDialog`. Use when you need an
 * irreversible-feeling action without the friction of typing a phrase. For
 * truly destructive flows (delete production data, drop tables) reach for
 * [DangerConfirmDialog](../danger-confirm-dialog/danger-confirm-dialog.js)
 * instead.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  intent = 'default',
  onConfirm,
  loading,
  confirmButtonProps,
  dialogBody,
}: ConfirmDialogProps) {
  const confirmClass = cn(
    intent === 'destructive'
      ? buttonVariants({ variant: 'destructive' })
      : buttonVariants({ variant: 'primary' }),
    'gap-2',
  );

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (loading && !next) return;
        onOpenChange(next);
      }}
    >
      <AlertDialogContent {...(description || dialogBody ? {} : { 'aria-describedby': undefined })}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
        </AlertDialogHeader>
        {dialogBody ? <div className="flex flex-col gap-4 py-1">{dialogBody}</div> : null}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            className={confirmClass}
            disabled={loading || confirmButtonProps?.disabled}
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
