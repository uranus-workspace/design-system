import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './separator.js';

const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-80 space-y-4 text-sm">
      <p>Marinho</p>
      <Separator />
      <p>Turquesa</p>
      <Separator />
      <p>Lilás</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-16 items-center gap-4 text-sm">
      <span>Docs</span>
      <Separator orientation="vertical" />
      <span>Blog</span>
      <Separator orientation="vertical" />
      <span>Changelog</span>
    </div>
  ),
};
