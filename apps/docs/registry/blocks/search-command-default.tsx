'use client';

import { SearchCommand } from '@uranus-workspace/blocks';
import { Button, CommandSeparator } from '@uranus-workspace/design-system';
import { Bell, Folder, Home, Settings, User } from 'lucide-react';
import { useState } from 'react';

export default function SearchCommandDefault() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        Abrir paleta de comandos (⌘K)
      </Button>
      <SearchCommand open={open} onOpenChange={setOpen} shortcutBinding={false}>
        <SearchCommand.Group heading="Navegação">
          <SearchCommand.Item
            value="dashboard"
            icon={<Home aria-hidden />}
            shortcut="G H"
            onSelect={() => setOpen(false)}
          >
            Ir para Dashboard
          </SearchCommand.Item>
          <SearchCommand.Item
            value="projects"
            icon={<Folder aria-hidden />}
            shortcut="G P"
            onSelect={() => setOpen(false)}
          >
            Projetos
          </SearchCommand.Item>
        </SearchCommand.Group>
        <CommandSeparator />
        <SearchCommand.Group heading="Conta">
          <SearchCommand.Item
            value="profile"
            icon={<User aria-hidden />}
            onSelect={() => setOpen(false)}
          >
            Meu perfil
          </SearchCommand.Item>
          <SearchCommand.Item
            value="notifications"
            icon={<Bell aria-hidden />}
            onSelect={() => setOpen(false)}
          >
            Notificações
          </SearchCommand.Item>
          <SearchCommand.Item
            value="settings"
            icon={<Settings aria-hidden />}
            keywords={['preferências', 'theme']}
            onSelect={() => setOpen(false)}
          >
            Configurações
          </SearchCommand.Item>
        </SearchCommand.Group>
      </SearchCommand>
    </div>
  );
}
