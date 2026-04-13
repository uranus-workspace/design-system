import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button/button.js';
import { Popover, PopoverContent, PopoverTrigger } from './popover.js';

const meta: Meta<typeof Popover> = {
  title: 'Primitives/Popover',
  component: Popover,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Abrir popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <h4 className="font-semibold">Dimensões Uranus</h4>
        <p className="text-sm text-muted-foreground">Ajuste largura e altura no seu workspace.</p>
      </PopoverContent>
    </Popover>
  ),
};
