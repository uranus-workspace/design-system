import type { Meta, StoryObj } from '@storybook/react';
import { type NotificationItem, NotificationList } from './notification-list.js';

const meta: Meta<typeof NotificationList> = {
  title: 'Blocks/Data/NotificationList',
  component: NotificationList,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof NotificationList>;

const items: NotificationItem[] = [
  {
    id: '1',
    title: 'Novo comentário em Projeto Apollo',
    description: 'Bruno: ficou ótimo!',
    timestamp: 'há 2m',
    unread: true,
  },
  {
    id: '2',
    title: 'Build concluído',
    description: 'main passou em 2m31s',
    timestamp: 'há 1h',
  },
  {
    id: '3',
    title: 'Você foi mencionado',
    description: 'em PR #142',
    timestamp: 'há 3h',
    unread: true,
  },
];

export const Default: Story = {
  args: {
    items,
    onMarkAllRead: () => {},
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
