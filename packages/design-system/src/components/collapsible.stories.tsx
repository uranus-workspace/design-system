import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible.js';

const meta: Meta<typeof Collapsible> = {
  title: 'Primitives/Collapsible',
  component: Collapsible,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-80">
      <CollapsibleTrigger className="rounded-md border px-4 py-2 font-medium">
        Ver detalhes
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 rounded-md border p-4 text-sm text-muted-foreground">
        Escondido até clicar. A Uranus usa collapsibles para densificar listas.
      </CollapsibleContent>
    </Collapsible>
  ),
};
