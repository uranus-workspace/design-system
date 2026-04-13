import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from './scroll-area.js';

const meta: Meta<typeof ScrollArea> = {
  title: 'Primitives/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-56 w-64 rounded-md border p-4">
      <div className="space-y-2 text-sm">
        {Array.from({ length: 30 }, (_, i) => `item-${i}`).map((key, i) => (
          <p key={key}>Item cósmico #{i + 1}</p>
        ))}
      </div>
    </ScrollArea>
  ),
};
