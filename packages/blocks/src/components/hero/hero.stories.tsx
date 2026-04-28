import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { ArrowRight } from 'lucide-react';
import { Hero } from './hero.js';

const meta: Meta<typeof Hero> = {
  title: 'Blocks/Marketing/Hero',
  component: Hero,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Hero>;

export const Centered: Story = {
  args: {
    eyebrow: 'Lançamento 1.0',
    title: 'Construa painéis com a velocidade da Uranus',
    description:
      'Tokens, primitives e blocos prontos para você focar no produto, não na infra de UI.',
    actions: (
      <>
        <Button>Começar agora</Button>
        <Button variant="ghost" className="gap-2">
          Ver docs
          <ArrowRight aria-hidden className="size-4" />
        </Button>
      </>
    ),
  },
};

export const WithMedia: Story = {
  args: {
    eyebrow: 'Open Source',
    title: 'Acesso completo ao código',
    description: 'Cada bloco é proprietário do seu código. Customize, fork e publique sem fricção.',
    actions: <Button>Ver no GitHub</Button>,
    media: (
      <div
        aria-hidden
        className="aspect-video w-full rounded-xl bg-gradient-to-br from-primary/40 to-primary/10"
      />
    ),
  },
};
