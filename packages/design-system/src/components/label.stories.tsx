import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox.js';
import { Label } from './label.js';

const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="accept-uranus" />
      <Label htmlFor="accept-uranus">Aceitar os termos da Uranus</Label>
    </div>
  ),
};
