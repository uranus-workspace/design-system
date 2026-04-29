import type { Meta, StoryObj } from '@storybook/react';
import { ToolCallCard } from './tool-call-card.js';

const meta: Meta<typeof ToolCallCard> = {
  title: 'AI/Status/ToolCallCard',
  component: ToolCallCard,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ToolCallCard>;

export const Calling: Story = {
  args: {
    toolCall: { id: '1', name: 'web_search', state: 'call', args: { query: 'uranus' } },
  },
};

export const Result: Story = {
  args: {
    toolCall: {
      id: '1',
      name: 'fetch',
      state: 'result',
      args: { url: 'https://uranus.com.br' },
      result: { ok: true, status: 200 },
    },
    defaultOpen: true,
  },
};

export const Errored: Story = {
  args: {
    toolCall: {
      id: '1',
      name: 'web_search',
      state: 'error',
      args: { query: 'uranus' },
      errorText: 'AbortError: timeout após 5s',
    },
    defaultOpen: true,
  },
};
