import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle2, GitPullRequest, Plus } from 'lucide-react';
import { ActivityFeed } from './activity-feed.js';

const meta: Meta<typeof ActivityFeed> = {
  title: 'Blocks/Data/ActivityFeed',
  component: ActivityFeed,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ActivityFeed>;

export const Default: Story = {
  render: () => (
    <ActivityFeed className="max-w-md">
      <ActivityFeed.Item
        actor={{ name: 'Alice Costa' }}
        action="criou"
        target="Projeto Apollo"
        timestamp="há 2 minutos"
        icon={<Plus className="size-2.5" />}
      />
      <ActivityFeed.Item
        actor={{ name: 'Bruno Lima' }}
        action="aprovou"
        target="PR #142"
        timestamp="há 1 hora"
        icon={<CheckCircle2 className="size-2.5" />}
      />
      <ActivityFeed.Item
        actor={{ name: 'Camila Souza' }}
        action="abriu"
        target="PR #141"
        timestamp="há 3 horas"
        icon={<GitPullRequest className="size-2.5" />}
      />
    </ActivityFeed>
  ),
};

export const Empty: Story = {
  render: () => (
    <ActivityFeed.Empty className="max-w-md">
      <p className="text-sm text-muted-foreground">Sem atividades ainda.</p>
    </ActivityFeed.Empty>
  ),
};
