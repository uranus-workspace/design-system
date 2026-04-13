import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './kbd.js';

const meta: Meta<typeof Kbd> = {
  title: 'Primitives/Kbd',
  component: Kbd,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = { args: { children: 'K' } };
export const Shortcut: Story = {
  render: () => (
    <div className="flex items-center gap-1 text-sm">
      Pressione <Kbd>⌘</Kbd> <Kbd>K</Kbd>
    </div>
  ),
};
