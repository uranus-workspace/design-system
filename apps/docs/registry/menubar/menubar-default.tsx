'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@uranus-workspace/design-system';

export default function MenubarDefault() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Arquivo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Novo documento
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Abrir…
            <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Salvar
            <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Exportar como PDF</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Editar</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Desfazer
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Refazer
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Localizar…</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Exibir</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Modo foco</MenubarItem>
          <MenubarItem>Mostrar barra lateral</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Tela cheia</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
