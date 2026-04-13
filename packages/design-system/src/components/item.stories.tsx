import type { Meta, StoryObj } from '@storybook/react';
import { Rocket } from 'lucide-react';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from './item.js';

const meta: Meta<typeof Item> = {
  title: 'Primitives/Item',
  component: Item,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Item>;

export const Default: Story = {
  render: () => (
    <ItemGroup className="w-96">
      <Item>
        <ItemMedia>
          <Rocket className="size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Deploy contínuo</ItemTitle>
          <ItemDescription>Integrado ao pipeline da Uranus em minutos.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};
