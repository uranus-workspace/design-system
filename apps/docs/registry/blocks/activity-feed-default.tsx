import { ActivityFeed } from '@uranus-workspace/blocks';

export default function ActivityFeedDefault() {
  return (
    <ActivityFeed
      className="max-w-md"
      items={[
        {
          id: '1',
          actor: { name: 'Ana' },
          action: 'criou',
          target: 'Projeto X',
          timestamp: 'há 5 min',
        },
      ]}
    />
  );
}
