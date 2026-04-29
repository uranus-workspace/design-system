import type { Meta, StoryObj } from '@storybook/react';
import { ChatThreadList } from './chat-thread-list.js';

const meta: Meta<typeof ChatThreadList> = {
  title: 'AI/Fluxos/ChatThreadList',
  component: ChatThreadList,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ChatThreadList>;

export const Default: Story = {
  render: () => (
    <div className="h-[480px] w-72 rounded-lg border bg-background">
      <ChatThreadList
        activeId="t2"
        onSelect={(thread) => console.log(thread)}
        onCreate={() => console.log('create')}
        threads={[
          { id: 't1', title: 'Como integrar Uranus AI', description: 'iniciado há 2 dias' },
          {
            id: 't2',
            title: 'Manual de marca',
            description: 'última msg: hoje',
            updatedAt: 'há 2 minutos',
            unread: true,
          },
          { id: 't3', title: 'Tradução para inglês', description: 'iniciado há 5 dias' },
        ]}
      />
    </div>
  ),
};
