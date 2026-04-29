import { Button } from '@uranus-workspace/design-system';
import { ArrowUp, Square } from 'lucide-react';
import { type ComponentProps, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';
import { useComposer } from './context.js';

export interface ComposerSubmitButtonProps
  extends Omit<ComponentProps<typeof Button>, 'onClick' | 'children' | 'type'> {
  /** Label for the idle send button (sr-only). Default "Enviar". */
  sendLabel?: string;
  /** Label for the busy stop button (sr-only). Default "Parar". */
  stopLabel?: string;
}

export const ComposerSubmitButton = forwardRef<HTMLButtonElement, ComposerSubmitButtonProps>(
  function ComposerSubmitButton(
    { sendLabel = 'Enviar', stopLabel = 'Parar', className, disabled, ...props },
    ref,
  ) {
    const { busy, submit, stop, value, attachments, disabled: composerDisabled } = useComposer();
    const canSend = (value.trim().length > 0 || attachments.length > 0) && !busy;

    return (
      <Button
        {...props}
        ref={ref}
        type={busy ? 'button' : 'submit'}
        size="icon"
        variant={busy ? 'secondary' : 'primary'}
        aria-label={busy ? stopLabel : sendLabel}
        disabled={busy ? false : disabled || composerDisabled || !canSend}
        onClick={(event) => {
          if (busy) {
            event.preventDefault();
            stop();
          } else if (event.currentTarget.type !== 'submit') {
            event.preventDefault();
            submit();
          }
        }}
        data-slot="composer-submit"
        className={cn('h-9 w-9 shrink-0', className)}
      >
        {busy ? (
          <Square aria-hidden className="size-3.5 fill-current" />
        ) : (
          <ArrowUp aria-hidden className="size-4" />
        )}
      </Button>
    );
  },
);
