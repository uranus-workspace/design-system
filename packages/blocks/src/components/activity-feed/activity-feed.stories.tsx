import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle2, GitPullRequest, Plus } from 'lucide-react';
import { ActivityFeed, type ActivityItem } from './activity-feed.js';

const meta: Meta<typeof ActivityFeed> = {
  title: 'Blocks/Data/ActivityFeed',
  component: ActivityFeed,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ActivityFeed>;

const items: ActivityItem[] = [
  {
    id: '1',
    actor: { name: 'Alice Costa' },
    action: 'criou',
    target: 'Projeto Apollo',
    timestamp: 'há 2 minutos',
    icon: <Plus className="size-2.5" />,
  },
  {
    id: '2',
    actor: { name: 'Bruno Lima' },
    action: 'aprovou',
    target: 'PR #142',
    timestamp: 'há 1 hora',
    icon: <CheckCircle2 className="size-2.5" />,
  },
  {
    id: '3',
    actor: { name: 'Camila Souza' },
    action: 'abriu',
    target: 'PR #141',
    timestamp: 'há 3 horas',
    icon: <GitPullRequest className="size-2.5" />,
  },
];

export const Default: Story = {
  args: { items },
};

export const Empty: Story = {
  args: { items: [] },
};
