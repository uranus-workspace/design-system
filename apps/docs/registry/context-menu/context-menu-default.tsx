'use client';

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from '@uranus-workspace/design-system';

export default function ContextMenuDefault() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-full max-w-md items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Clique com o botão direito aqui para abrir o menu
      </ContextMenuTrigger>
      <ContextMenuContent className="w-60">
        <ContextMenuLabel>Ações</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Abrir
          <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Duplicar
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Renomear
          <ContextMenuShortcut>F2</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Mostrar na barra lateral</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive focus:text-destructive">
          Excluir
          <ContextMenuShortcut>⌫</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
