import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { FolderPlus } from 'lucide-react';
import { EmptyState } from './empty-state.js';

const meta: Meta<typeof EmptyState> = {
  title: 'Blocks/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: <FolderPlus aria-hidden />,
    title: 'No projects yet',
    description: 'Create your first project to start collaborating with your team.',
    actions: (
      <>
        <Button variant="outline">Learn more</Button>
        <Button>New project</Button>
      </>
    ),
  },
};

export const Minimal: Story = {
  args: {
    title: 'Nothing to see here',
  },
};
