import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './button-group.js';
import { Button } from './button/button.js';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Primitives/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Dia</Button>
      <Button variant="outline">Semana</Button>
      <Button variant="outline">Mês</Button>
    </ButtonGroup>
  ),
};
