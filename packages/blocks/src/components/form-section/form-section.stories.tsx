import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input, Label, Switch } from '@uranus-workspace/design-system';
import { FormSection } from './form-section.js';

const meta: Meta<typeof FormSection> = {
  title: 'Blocks/Forms/FormSection',
  component: FormSection,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'inline-radio', options: ['stacked', 'split'] },
  },
};
export default meta;
type Story = StoryObj<typeof FormSection>;

export const Stacked: Story = {
  args: {
    title: 'Perfil',
    description: 'Atualize as suas informações pessoais.',
    layout: 'stacked',
    footer: (
      <>
        <Button variant="ghost" size="sm">
          Cancelar
        </Button>
        <Button size="sm">Salvar alterações</Button>
      </>
    ),
    children: (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="first-name">Nome</Label>
          <Input id="first-name" defaultValue="Gustavo" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="last-name">Sobrenome</Label>
          <Input id="last-name" defaultValue="Bertoi" />
        </div>
      </div>
    ),
  },
};

export const Split: Story = {
  args: {
    title: 'Notificações',
    description: 'Escolha como você quer ser avisado.',
    layout: 'split',
    footer: <Button size="sm">Salvar</Button>,
    children: (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notif">Email</Label>
          <Switch id="email-notif" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notif">Push</Label>
          <Switch id="push-notif" />
        </div>
      </div>
    ),
  },
};
