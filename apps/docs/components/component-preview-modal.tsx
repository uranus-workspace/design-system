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
  const contentMinHeight = minHeight != null && minHeight > 0 ? minHeight : 520;

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
          'flex max-h-[92vh] w-[min(100vw-1rem,56rem)] max-w-[calc(100vw-1rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-5xl',
        )}
      >
        <DialogHeader className="shrink-0 border-b border-fd-border px-6 py-4 pr-14 text-left">
          <DialogTitle>{modalTitle}</DialogTitle>
          {modalDescription ? <DialogDescription>{modalDescription}</DialogDescription> : null}
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          <div
            className={cn(
              'flex w-full flex-col',
              alignClass[align],
              previewClassName,
              align === 'stretch' ? 'min-h-0 flex-1' : '',
            )}
            style={{ minHeight: contentMinHeight }}
          >
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
