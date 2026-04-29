import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@uranus-workspace/design-system';
import { FolderPlus, Github, ImagePlus, Palette, Plug, Plus, Puzzle, Sparkles } from 'lucide-react';
import { type ChangeEvent, useRef, useState } from 'react';
import { cn } from '../../lib/cn.js';
import { useComposer } from './context.js';

export interface ComposerMoreMenuProps {
  className?: string;
  /** Accepted MIME types for file picker ("Adicionar arquivos ou fotos"). Default accepts all types. */
  accept?: string;
  /** Allow multiple files. Default `true`. */
  multiple?: boolean;
}

/**
 * Claude-style overflow menu: quick attach from the picker, placeholder links for
 * integrations, and toggles that are UI-only until wired to product state.
 */
export function ComposerMoreMenu({
  className,
  accept = '*/*',
  multiple = true,
}: ComposerMoreMenuProps) {
  const { addAttachments, busy, disabled } = useComposer();
  const inputRef = useRef<HTMLInputElement>(null);
  const [webSearch, setWebSearch] = useState(true);

  const onFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length > 0) addAttachments(files);
    event.target.value = '';
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={onFiles}
        data-slot="composer-more-file-input"
        aria-hidden
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled || busy}
            aria-label="Mais opções"
            data-slot="composer-more-trigger"
            className={cn(
              'h-9 w-9 shrink-0 rounded-full text-muted-foreground hover:bg-muted/80 hover:text-foreground',
              className,
            )}
          >
            <Plus aria-hidden className="size-[18px] stroke-[2]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="top"
          sideOffset={8}
          className="w-56 rounded-xl border-border/60 p-1.5 shadow-md"
        >
          <DropdownMenuItem
            className="gap-2 rounded-lg"
            onSelect={() => {
              inputRef.current?.click();
            }}
          >
            <ImagePlus aria-hidden className="size-4 shrink-0 opacity-70" />
            Adicionar arquivos ou fotos
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 rounded-lg">
            <FolderPlus aria-hidden className="size-4 shrink-0 opacity-70" />
            Adicionar ao projeto
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 rounded-lg">
            <Github aria-hidden className="size-4 shrink-0 opacity-70" />
            Adicionar do GitHub
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border/60" />

          <DropdownMenuItem className="gap-2 rounded-lg">
            <Sparkles aria-hidden className="size-4 shrink-0 opacity-70" />
            Habilidades
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 rounded-lg">
            <Plug aria-hidden className="size-4 shrink-0 opacity-70" />
            Conectores
          </DropdownMenuItem>
          <DropdownMenuItem disabled className="gap-2 rounded-lg">
            <Puzzle aria-hidden className="size-4 shrink-0 opacity-50" />
            Plugins
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border/60" />

          <DropdownMenuCheckboxItem
            checked={webSearch}
            onCheckedChange={(checked) => setWebSearch(checked === true)}
            className="gap-2 rounded-lg pl-8"
          >
            Busca na web
          </DropdownMenuCheckboxItem>
          <DropdownMenuItem className="gap-2 rounded-lg">
            <Palette aria-hidden className="size-4 shrink-0 opacity-70" />
            Usar estilo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
