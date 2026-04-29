import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export interface ComposerToolbarProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Bottom row of the composer that hosts overflow menu, mode, attach / record /
 * submit controls. Children are laid out in a `flex` row with `items-center`.
 */
export const ComposerToolbar = forwardRef<HTMLDivElement, ComposerToolbarProps>(
  function ComposerToolbar({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="composer-toolbar"
        className={cn('flex items-center gap-1.5 px-1', className)}
        {...props}
      />
    );
  },
);
