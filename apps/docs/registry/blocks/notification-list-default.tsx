'use client';
import { NotificationList } from '@uranus-workspace/blocks';

export default function NotificationListDefault() {
  return (
    <NotificationList
      items={[
        {
          id: '1',
          title: 'Deploy concluído',
          description: 'main está no ar.',
          timestamp: 'há 1h',
          unread: true,
        },
      ]}
      onMarkAllRead={() => {}}
    />
  );
}
