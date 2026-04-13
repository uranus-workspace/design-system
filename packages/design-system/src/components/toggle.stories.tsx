import type { Meta, StoryObj } from '@storybook/react';
import { Bold } from 'lucide-react';
import { Toggle } from './toggle.js';

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Negrito">
      <Bold />
    </Toggle>
  ),
};
