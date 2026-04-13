import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label.js';
import { RadioGroup, RadioGroupItem } from './radio-group.js';

const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="monthly">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="monthly" id="r1" />
        <Label htmlFor="r1">Mensal</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="yearly" id="r2" />
        <Label htmlFor="r2">Anual</Label>
      </div>
    </RadioGroup>
  ),
};
