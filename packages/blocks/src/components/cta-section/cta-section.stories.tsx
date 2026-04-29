import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { CTASection } from './cta-section.js';

const meta: Meta<typeof CTASection> = {
  title: 'Blocks/Marketing/CTASection',
  component: CTASection,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof CTASection>;

export const Default: Story = {
  args: {
    eyebrow: 'Pronto para subir o nível?',
    title: 'Comece a construir com a Uranus hoje',
    description:
      'Tokens, primitives e blocos prontos para virar painéis em produção. Sem template lock-in.',
    actions: (
      <>
        <Button>Começar grátis</Button>
        <Button variant="ghost">Falar com vendas</Button>
      </>
    ),
  },
};
