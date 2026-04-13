import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { PageHeader } from './page-header.js';

const meta: Meta<typeof PageHeader> = {
  title: 'Blocks/PageHeader',
  component: PageHeader,
  parameters: { layout: 'fullscreen', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: 'Projects',
    description: 'Manage every project inside your Uranus workspace.',
    actions: (
      <>
        <Button variant="outline">Import</Button>
        <Button>New project</Button>
      </>
    ),
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    breadcrumbs: (
      <ol className="flex gap-2 text-xs text-muted-foreground">
        <li>Home</li>
        <li>/</li>
        <li>Projects</li>
      </ol>
    ),
    title: 'Projects',
    description: 'Every project you can access.',
  },
};

export const TitleOnly: Story = {
  args: { title: 'Settings' },
};
