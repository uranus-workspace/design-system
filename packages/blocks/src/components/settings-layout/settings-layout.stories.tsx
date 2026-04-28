import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Lock, User, Users } from 'lucide-react';
import { FormSection } from '../form-section/form-section.js';
import { SettingsLayout, type SettingsNavGroup } from './settings-layout.js';

const groups: SettingsNavGroup[] = [
  {
    label: 'Conta',
    items: [
      {
        id: 'profile',
        label: 'Perfil',
        href: '#profile',
        icon: <User aria-hidden className="size-4" />,
        active: true,
      },
      {
        id: 'security',
        label: 'Segurança',
        href: '#security',
        icon: <Lock aria-hidden className="size-4" />,
      },
      {
        id: 'notifications',
        label: 'Notificações',
        href: '#notifications',
        icon: <Bell aria-hidden className="size-4" />,
      },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        id: 'team',
        label: 'Time',
        href: '#team',
        icon: <Users aria-hidden className="size-4" />,
      },
    ],
  },
];

const meta: Meta<typeof SettingsLayout> = {
  title: 'Blocks/Forms/SettingsLayout',
  component: SettingsLayout,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SettingsLayout>;

export const Compound: Story = {
  render: () => (
    <SettingsLayout>
      <SettingsLayout.Header>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Configurações</h1>
          <p className="text-sm text-muted-foreground">Gerencie a sua conta e o seu workspace.</p>
        </div>
      </SettingsLayout.Header>
      <SettingsLayout.Grid>
        <SettingsLayout.Nav>
          <SettingsLayout.Group label="Conta">
            <SettingsLayout.Link href="#profile" icon={<User aria-hidden className="size-4" />} active>
              Perfil
            </SettingsLayout.Link>
            <SettingsLayout.Link href="#security" icon={<Lock aria-hidden className="size-4" />}>
              Segurança
            </SettingsLayout.Link>
            <SettingsLayout.Link href="#notifications" icon={<Bell aria-hidden className="size-4" />}>
              Notificações
            </SettingsLayout.Link>
          </SettingsLayout.Group>
          <SettingsLayout.Group label="Workspace">
            <SettingsLayout.Link href="#team" icon={<Users aria-hidden className="size-4" />}>
              Time
            </SettingsLayout.Link>
          </SettingsLayout.Group>
        </SettingsLayout.Nav>
        <SettingsLayout.Panel>
          <FormSection title="Perfil" description="Informações exibidas na sua conta." layout="split">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="rounded-md border px-3 py-2" defaultValue="Gustavo" />
              <input className="rounded-md border px-3 py-2" defaultValue="Bertoi" />
            </div>
          </FormSection>
        </SettingsLayout.Panel>
      </SettingsLayout.Grid>
    </SettingsLayout>
  ),
};

export const Default: Story = {
  args: {
    groups,
    header: (
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Configurações</h1>
        <p className="text-sm text-muted-foreground">Gerencie a sua conta e o seu workspace.</p>
      </div>
    ),
    children: (
      <>
        <FormSection title="Perfil" description="Informações exibidas na sua conta." layout="split">
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="rounded-md border px-3 py-2" defaultValue="Gustavo" />
            <input className="rounded-md border px-3 py-2" defaultValue="Bertoi" />
          </div>
        </FormSection>
        <FormSection
          title="E-mail"
          description="O e-mail é usado para login e notificações."
          layout="split"
        >
          <input className="rounded-md border px-3 py-2" defaultValue="gustavo@uranus.com.br" />
        </FormSection>
      </>
    ),
  },
};
