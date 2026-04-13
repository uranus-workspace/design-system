import type { Meta, StoryObj } from '@storybook/react';
import { AlignCenter, AlignLeft, AlignRight } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from './toggle-group.js';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Primitives/ToggleGroup',
  component: ToggleGroup,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center" aria-label="Alinhamento">
      <ToggleGroupItem value="left" aria-label="Esquerda">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Centro">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Direita">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
