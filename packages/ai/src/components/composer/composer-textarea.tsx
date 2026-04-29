import { Textarea } from '@uranus-workspace/design-system';
import { type ComponentProps, type KeyboardEvent, forwardRef, useEffect, useRef } from 'react';
import { cn } from '../../lib/cn.js';
import { useComposer } from './context.js';

export interface ComposerTextareaProps
  extends Omit<ComponentProps<typeof Textarea>, 'value' | 'onChange'> {
  /** Submit on Enter (without Shift). Default `true`. */
  submitOnEnter?: boolean;
  /** Maximum auto-grow height in px. Default 240. */
  maxHeight?: number;
}

export const ComposerTextarea = forwardRef<HTMLTextAreaElement, ComposerTextareaProps>(
  function ComposerTextarea(
    {
      submitOnEnter = true,
      maxHeight = 240,
      placeholder = 'Pergunte qualquer coisa…',
      className,
      onKeyDown,
      ...props
    },
    ref,
  ) {
    const { value, setValue, submit, disabled, busy } = useComposer();
    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    // biome-ignore lint/correctness/useExhaustiveDependencies: autosize must run when controlled value or maxHeight changes
    useEffect(() => {
      const node = innerRef.current;
      if (!node) return;
      node.style.height = 'auto';
      node.style.height = `${Math.min(maxHeight, node.scrollHeight)}px`;
    }, [value, maxHeight]);

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if (
        submitOnEnter &&
        event.key === 'Enter' &&
        !event.shiftKey &&
        !event.nativeEvent.isComposing
      ) {
        event.preventDefault();
        submit();
      }
    };

    return (
      <Textarea
        {...props}
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        data-slot="composer-textarea"
        rows={1}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={busy && props.readOnly}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          'min-h-11 resize-none border-0 bg-transparent px-3 py-2 text-[15px] leading-relaxed shadow-none placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0',
          className,
        )}
      />
    );
  },
);
