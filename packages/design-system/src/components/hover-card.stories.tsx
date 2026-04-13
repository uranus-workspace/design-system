import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button/button.js';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card.js';

const meta: Meta<typeof HoverCard> = {
  title: 'Primitives/HoverCard',
  component: HoverCard,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@uranus</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">Uranus Technologies</h4>
          <p className="text-sm text-muted-foreground">
            Hub de serviços flexível e escalável. uranus.com.br
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
