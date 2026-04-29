import type { Meta, StoryObj } from '@storybook/react';
import { SearchingIndicator } from './searching-indicator.js';

const meta: Meta<typeof SearchingIndicator> = {
  title: 'AI/Status/SearchingIndicator',
  component: SearchingIndicator,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SearchingIndicator>;

export const Default: Story = { args: {} };
export const WithSources: Story = {
  args: {
    sources: [
      'github.com/uranus-workspace/design-system',
      'uranus.com.br/manual-de-marca',
      'apps/docs/content/docs/index.mdx',
      'packages/blocks/README.md',
    ],
  },
};
