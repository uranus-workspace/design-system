import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { Bell, Folder, Home, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { SearchCommand, type SearchCommandGroup } from './search-command.js';

const groups: SearchCommandGroup[] = [
  {
    heading: 'Navegação',
    items: [
      {
        id: 'home',
        label: 'Ir para Dashboard',
        icon: <Home aria-hidden />,
        shortcut: 'G H',
        onSelect: () => {},
      },
      {
        id: 'projects',
        label: 'Projetos',
        icon: <Folder aria-hidden />,
        shortcut: 'G P',
        onSelect: () => {},
      },
    ],
  },
  {
    heading: 'Conta',
    items: [
      {
        id: 'profile',
        label: 'Meu perfil',
        icon: <User aria-hidden />,
        onSelect: () => {},
      },
      {
        id: 'notifications',
        label: 'Notificações',
        icon: <Bell aria-hidden />,
        onSelect: () => {},
      },
      {
        id: 'settings',
        label: 'Configurações',
        icon: <Settings aria-hidden />,
        keywords: ['preferências', 'theme'],
        onSelect: () => {},
      },
    ],
  },
];

const meta: Meta<typeof SearchCommand> = {
  title: 'Blocks/Forms/SearchCommand',
  component: SearchCommand,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SearchCommand>;

export const Open: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    groups,
    shortcutBinding: false,
  },
};

export const Triggered: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Abrir paleta (⌘K)</Button>
        <SearchCommand open={open} onOpenChange={setOpen} groups={groups} />
      </div>
    );
  },
};
