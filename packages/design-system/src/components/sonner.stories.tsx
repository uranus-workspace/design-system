import type { Meta, StoryObj } from '@storybook/react';
import { toast } from 'sonner';
import { Button } from './button/button.js';
import { Toaster } from './sonner.js';

const meta: Meta<typeof Toaster> = {
  title: 'Primitives/Sonner',
  component: Toaster,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <>
      <Button onClick={() => toast('Bem-vindo à Uranus!')}>Mostrar toast</Button>
      <Toaster />
    </>
  ),
};
