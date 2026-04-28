import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@uranus-workspace/design-system';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn.js';
import { type DetailDrawerVariantProps, detailDrawerVariants } from './detail-drawer.variants.js';

export interface DetailDrawerProps extends DetailDrawerVariantProps {
  /** Controlled open state. */
  open: boolean;
  /** Open/close callback. */
  onOpenChange: (open: boolean) => void;
  /** Drawer title — required, used for `aria-labelledby`. */
  title: ReactNode;
  /** Optional subtitle below the title. */
  description?: ReactNode;
  /** Optional header trailing slot (e.g. a "Edit" button). Renders to the right of the title. */
  headerActions?: ReactNode;
  /** Drawer body — typically a scrollable list of fields or a sub-form. */
  children: ReactNode;
  /** Footer slot — typically primary/secondary actions. */
  footer?: ReactNode;
  /** Override the side. Defaults to `right`. */
  side?: 'left' | 'right';
}

/**
 * Right-side detail panel built on `Sheet`. The "view details" pattern that
 * lives next to a `DataTable` row click. Sized via `cva` (`sm | md | lg`).
 */
export function DetailDrawer({
  open,
  onOpenChange,
  title,
  description,
  headerActions,
  children,
  footer,
  size,
  side = 'right',
}: DetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        className={cn(detailDrawerVariants({ size }), 'p-0')}
        data-slot="detail-drawer"
        {...(description ? {} : { 'aria-describedby': undefined })}
      >
        <SheetHeader className="border-b p-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <SheetTitle>{title}</SheetTitle>
              {description ? <SheetDescription>{description}</SheetDescription> : null}
            </div>
            {headerActions ? (
              <div data-slot="detail-drawer-actions" className="flex items-center gap-2">
                {headerActions}
              </div>
            ) : null}
          </div>
        </SheetHeader>

        <div data-slot="detail-drawer-body" className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {footer ? (
          <div
            data-slot="detail-drawer-footer"
            className="flex flex-wrap items-center justify-end gap-2 border-t p-4"
          >
            {footer}
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
