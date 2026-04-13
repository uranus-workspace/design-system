import type { Meta, StoryObj } from '@storybook/react';
import { Search } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group.js';

const meta: Meta<typeof InputGroup> = {
  title: 'Primitives/InputGroup',
  component: InputGroup,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon>
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Buscar na Uranus…" />
    </InputGroup>
  ),
};
