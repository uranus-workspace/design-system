import type { Meta, StoryObj } from '@storybook/react';
import { Boxes, Layers3, Palette, Sparkles } from 'lucide-react';
import { FeatureGrid, type FeatureItem } from './feature-grid.js';

const features: FeatureItem[] = [
  {
    id: 'tokens',
    icon: <Palette aria-hidden />,
    title: 'Tokens semânticos',
    description:
      'Cores OKLCH, tipografia e radii em CSS-first. Trocar tema é editar variáveis CSS.',
  },
  {
    id: 'primitives',
    icon: <Boxes aria-hidden />,
    title: 'Primitives donos',
    description: 'Cada componente shadcn vive como código próprio do seu repositório.',
  },
  {
    id: 'blocks',
    icon: <Layers3 aria-hidden />,
    title: 'Blocos compostos',
    description: 'Layouts prontos para dashboards: AppShell, AppSidebar, DataTable, e mais.',
  },
  {
    id: 'docs',
    icon: <Sparkles aria-hidden />,
    title: 'Docs interativos',
    description: 'Storybook + Fumadocs com exemplos vivos importando o real do código.',
  },
];

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
  args: {
    features,
    columns: 4,
  },
};

export const ThreeColumn: Story = {
  args: {
    features: features.slice(0, 3),
    columns: 3,
  },
};
