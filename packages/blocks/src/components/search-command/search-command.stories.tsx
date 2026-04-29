import type { Meta, StoryObj } from '@storybook/react';
import { Button, CommandSeparator } from '@uranus-workspace/design-system';
import { Bell, Folder, Home, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { SearchCommand } from './search-command.js';

const meta: Meta<typeof SearchCommand> = {
  title: 'Blocks/Forms/SearchCommand',
  component: SearchCommand,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SearchCommand>;

export const Open: Story = {
  render: () => (
    <SearchCommand open onOpenChange={() => {}} shortcutBinding={false}>
      <SearchCommand.Group heading="Navegação">
        <SearchCommand.Item
          value="dashboard"
          icon={<Home aria-hidden />}
          shortcut="G H"
          onSelect={() => {}}
        >
          Ir para Dashboard
        </SearchCommand.Item>
        <SearchCommand.Item
          value="projects"
          icon={<Folder aria-hidden />}
          shortcut="G P"
          onSelect={() => {}}
        >
          Projetos
        </SearchCommand.Item>
      </SearchCommand.Group>
      <CommandSeparator />
      <SearchCommand.Group heading="Conta">
        <SearchCommand.Item value="profile" icon={<User aria-hidden />} onSelect={() => {}}>
          Meu perfil
        </SearchCommand.Item>
        <SearchCommand.Item value="notifications" icon={<Bell aria-hidden />} onSelect={() => {}}>
          Notificações
        </SearchCommand.Item>
        <SearchCommand.Item
          value="settings"
          icon={<Settings aria-hidden />}
          keywords={['preferências', 'theme']}
          onSelect={() => {}}
        >
          Configurações
        </SearchCommand.Item>
      </SearchCommand.Group>
    </SearchCommand>
  ),
};

export const Triggered: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Abrir paleta (⌘K)</Button>
        <SearchCommand open={open} onOpenChange={setOpen}>
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
        </SearchCommand>
      </div>
    );
  },
};
