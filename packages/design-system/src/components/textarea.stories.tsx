import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea.js';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
  args: { placeholder: 'Escreva uma mensagem à Uranus…' },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => <Textarea {...args} className="w-96" />,
};
