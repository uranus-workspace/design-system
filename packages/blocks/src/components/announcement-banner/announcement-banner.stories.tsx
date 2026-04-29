import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { AnnouncementBanner } from './announcement-banner.js';

const meta: Meta<typeof AnnouncementBanner> = {
  title: 'Blocks/Growth/AnnouncementBanner',
  component: AnnouncementBanner,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'inline-radio',
      options: ['info', 'success', 'warning', 'danger', 'neutral'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof AnnouncementBanner>;

export const Info: Story = {
  args: {
    title: 'Nova versão disponível',
    description: 'Veja o que mudou na 2.0.',
    action: (
      <Button size="sm" variant="ghost">
        Ler changelog
      </Button>
    ),
    onDismiss: () => {},
  },
};

export const Warning: Story = {
  args: {
    title: 'Manutenção programada',
    description: 'Sábado às 02:00 — janela de 30min.',
    intent: 'warning',
    onDismiss: () => {},
  },
};

export const Danger: Story = {
  args: {
    title: 'Pagamento atrasado',
    description: 'Atualize o seu cartão para evitar suspensão.',
    intent: 'danger',
    action: <Button size="sm">Atualizar agora</Button>,
  },
};
