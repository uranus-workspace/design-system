import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress.js';

const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
  args: { value: 60 },
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: (args) => <Progress {...args} className="w-80" />,
};
