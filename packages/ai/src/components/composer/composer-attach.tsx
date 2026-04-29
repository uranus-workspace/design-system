import { Button } from '@uranus-workspace/design-system';
import { ImagePlus } from 'lucide-react';
import { type ChangeEvent, type ComponentProps, forwardRef, useRef } from 'react';
import { cn } from '../../lib/cn.js';
import { useComposer } from './context.js';

export interface ComposerAttachButtonProps
  extends Omit<ComponentProps<typeof Button>, 'onClick' | 'type' | 'children'> {
  /** Mime types accepted by the file picker. Default any (`* / *` without spaces). */
  accept?: string;
  /** Allow multiple file selection. Default `true`. */
  multiple?: boolean;
  /** Label (sr-only). Default "Anexar foto ou arquivo". */
  label?: string;
}

export const ComposerAttachButton = forwardRef<HTMLButtonElement, ComposerAttachButtonProps>(
  function ComposerAttachButton(
    {
      accept = '*/*',
      multiple = true,
      label = 'Anexar foto ou arquivo',
      className,
      disabled,
      ...props
    },
    ref,
  ) {
    const { addAttachments, busy, disabled: composerDisabled } = useComposer();
    const inputRef = useRef<HTMLInputElement>(null);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files ?? []);
      if (files.length > 0) addAttachments(files);
      event.target.value = '';
    };

    return (
      <>
        <Button
          {...props}
          ref={ref}
          type="button"
          variant="ghost"
          size="icon"
          aria-label={label}
          disabled={disabled || composerDisabled || busy}
          className={cn(
            'h-9 w-9 shrink-0 rounded-full text-muted-foreground hover:bg-muted/80 hover:text-foreground',
            className,
          )}
          onClick={() => inputRef.current?.click()}
          data-slot="composer-attach-button"
        >
          <ImagePlus aria-hidden className="size-[18px] stroke-[2]" />
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          hidden
          onChange={onChange}
          data-slot="composer-attach-input"
        />
      </>
    );
  },
);
