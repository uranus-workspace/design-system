import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input.js';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
  args: {
    placeholder: 'you@uranus.com.br',
    type: 'email',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  args: { 'aria-invalid': true, defaultValue: 'not-an-email' },
};

export const WithLabel: Story = {
  render: (args) => (
    <label className="flex flex-col gap-2 text-sm">
      Email
      <Input {...args} />
    </label>
  ),
};
