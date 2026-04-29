import type { Meta, StoryObj } from '@storybook/react';
import { ThinkingIndicator } from './thinking-indicator.js';

const meta: Meta<typeof ThinkingIndicator> = {
  title: 'AI/Status/ThinkingIndicator',
  component: ThinkingIndicator,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ThinkingIndicator>;

export const Default: Story = { args: {} };
export const CustomLabel: Story = { args: { label: 'Consultando docs…' } };
export const DotsOnly: Story = { args: { dotsOnly: true, label: 'Pensando' } };
