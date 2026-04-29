import type { Meta, StoryObj } from '@storybook/react';
import { NotificationList } from './notification-list.js';

const meta: Meta<typeof NotificationList> = {
  title: 'Blocks/Data/NotificationList',
  component: NotificationList,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof NotificationList>;

export const Default: Story = {
  render: () => (
    <NotificationList className="rounded-md border bg-popover shadow-sm">
      <NotificationList.Header title="Notificações" unreadCount={2} onMarkAllRead={() => {}} />
      <NotificationList.List>
        <NotificationList.Item
          title="Novo comentário em Projeto Apollo"
          description="Bruno: ficou ótimo!"
          timestamp="há 2 minutos"
          unread
          onSelect={() => {}}
        />
        <NotificationList.Item
          title="Build concluído"
          description="main passou em 2m31s"
          timestamp="há 1 hora"
          onSelect={() => {}}
        />
        <NotificationList.Item
          title="Você foi mencionado em PR #142"
          description="@gustavo — review pendente"
          timestamp="há 3 horas"
          unread
          onSelect={() => {}}
        />
      </NotificationList.List>
    </NotificationList>
  ),
};

export const Empty: Story = {
  render: () => (
    <NotificationList className="rounded-md border bg-popover shadow-sm">
      <NotificationList.Header title="Notificações" />
      <div className="px-4 py-8 text-center">
        <p className="text-sm font-medium">Tudo em dia</p>
        <p className="text-sm text-muted-foreground">Sem notificações novas.</p>
      </div>
    </NotificationList>
  ),
};
