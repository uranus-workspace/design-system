import { Kbd } from '@uranus-workspace/design-system';
import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface ComposerHintsProps extends HTMLAttributes<HTMLDivElement> {}

export const ComposerHints = forwardRef<HTMLDivElement, ComposerHintsProps>(function ComposerHints(
  { className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="composer-hints"
      className={cn(
        'flex items-center gap-2 px-3 pb-1 pt-0.5 text-[11px] text-muted-foreground/85',
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <span className="inline-flex items-center gap-1">
            <Kbd>Enter</Kbd> para enviar
          </span>
          <span className="inline-flex items-center gap-1">
            <Kbd>Shift</Kbd>
            <span aria-hidden>+</span>
            <Kbd>Enter</Kbd> para nova linha
          </span>
        </>
      )}
    </div>
  );
});
