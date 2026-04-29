import type { Meta, StoryObj } from '@storybook/react';
import { Boxes, Layers3, Palette, Sparkles } from 'lucide-react';
import { FeatureGrid } from './feature-grid.js';

const meta: Meta<typeof FeatureGrid> = {
  title: 'Blocks/Marketing/FeatureGrid',
  component: FeatureGrid,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'inline-radio', options: [2, 3, 4] },
  },
};
export default meta;
type Story = StoryObj<typeof FeatureGrid>;

export const Default: Story = {
  args: { columns: 4 },
  render: (args) => (
    <FeatureGrid {...args}>
      <FeatureGrid.Item
        icon={<Palette aria-hidden />}
        title="Tokens semânticos"
        description="Cores OKLCH, tipografia e radii em CSS-first. Trocar tema é editar variáveis CSS."
      />
      <FeatureGrid.Item
        icon={<Boxes aria-hidden />}
        title="Primitives donos"
        description="Cada componente shadcn vive como código próprio do seu repositório."
      />
      <FeatureGrid.Item
        icon={<Layers3 aria-hidden />}
        title="Blocos compostos"
        description="Layouts prontos para dashboards: AppShell, AppSidebar, DataTable, e mais."
      />
      <FeatureGrid.Item
        icon={<Sparkles aria-hidden />}
        title="Docs interativos"
        description="Storybook + Fumadocs com exemplos vivos importando o real do código."
      />
    </FeatureGrid>
  ),
};

export const ThreeColumn: Story = {
  args: { columns: 3 },
  render: (args) => (
    <FeatureGrid {...args}>
      <FeatureGrid.Item
        icon={<Palette aria-hidden />}
        title="Tokens semânticos"
        description="Cores OKLCH, tipografia e radii em CSS-first."
      />
      <FeatureGrid.Item
        icon={<Boxes aria-hidden />}
        title="Primitives donos"
        description="Cada componente shadcn vive como código próprio do repositório."
      />
      <FeatureGrid.Item
        icon={<Layers3 aria-hidden />}
        title="Blocos compostos"
        description="Layouts prontos para dashboards: AppShell, AppSidebar, DataTable."
      />
    </FeatureGrid>
  ),
};
