'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@uranus-workspace/design-system';
import { Maximize2 } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '../lib/utils';

interface ComponentPreviewModalProps {
  children: ReactNode;
  align: 'start' | 'center' | 'end' | 'stretch';
  minHeight?: number;
  previewClassName?: string;
  modalTitle: string;
  modalDescription?: string;
  /** Short copy shown above the open button in the Preview tab. */
  hint?: string;
}

const alignClass = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const;

export function ComponentPreviewModal({
  children,
  align,
  minHeight,
  previewClassName,
  modalTitle,
  modalDescription,
  hint = 'Este exemplo precisa de mais altura para rolar e interagir como em um app real. Abra em tela cheia.',
}: ComponentPreviewModalProps) {
  return (
    <Dialog>
      <div className="flex flex-col gap-4 rounded-lg border border-fd-border bg-fd-card/50 px-4 py-8 sm:px-8">
        <p className="mx-auto max-w-lg text-center text-sm text-fd-muted-foreground">{hint}</p>
        <DialogTrigger asChild>
          <Button type="button" variant="primary" size="md" className="mx-auto gap-2">
            <Maximize2 className="size-4 shrink-0" aria-hidden />
            Abrir exemplo em tela cheia
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent
        className={cn(
          '!flex max-h-none flex-col gap-0 overflow-hidden border-fd-border p-0',
          'h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-none',
          'sm:h-[calc(100dvh-2rem)] sm:w-[calc(100vw-2rem)] sm:rounded-xl',
        )}
      >
        <DialogHeader className="shrink-0 border-b border-fd-border px-6 py-4 pr-14 text-left">
          <DialogTitle>{modalTitle}</DialogTitle>
          {modalDescription ? <DialogDescription>{modalDescription}</DialogDescription> : null}
        </DialogHeader>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-3 pb-4 pt-0 sm:px-5">
          <div
            className={cn(
              'flex min-h-0 w-full flex-1 flex-col',
              alignClass[align],
              previewClassName,
              align === 'stretch' ? 'min-h-0 flex-1' : '',
            )}
            {...(minHeight != null && minHeight > 0 ? { style: { minHeight } } : {})}
          >
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
