import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { PageHeader } from './page-header.js';

const meta: Meta<typeof PageHeader> = {
  title: 'Blocks/PageHeader',
  component: PageHeader,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: 'Projetos',
    description: 'Gerencie todos os projetos do seu workspace Uranus.',
    actions: (
      <>
        <Button variant="outline">Importar</Button>
        <Button>Novo projeto</Button>
      </>
    ),
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    breadcrumbs: (
      <ol className="flex gap-2 text-xs text-muted-foreground">
        <li>Início</li>
        <li>/</li>
        <li>Projetos</li>
      </ol>
    ),
    title: 'Projetos',
    description: 'Todos os projetos aos quais você tem acesso.',
  },
};

export const TitleOnly: Story = {
  args: { title: 'Configurações' },
};
