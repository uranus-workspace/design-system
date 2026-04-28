'use client';
import { ActivityFeed } from '@uranus-workspace/blocks';

const items = [
  {
    id: '1',
    actor: { name: 'Ana' },
    action: 'criou',
    target: 'Projeto X',
    timestamp: 'há 5 min',
  },
  {
    id: '2',
    actor: { name: 'Bruno' },
    action: 'criou',
    target: 'Projeto Y',
    timestamp: 'há 10 min',
  },
  {
    id: '3',
    actor: { name: 'Camila' },
    action: 'criou',
    target: 'Projeto Z',
    timestamp: 'há 15 min',
  },
];

export default function ActivityFeedDefault() {
  return (
    <ActivityFeed
      className="max-w-md"
      items={items}
    />
  );
}
