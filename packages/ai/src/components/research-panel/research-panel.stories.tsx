import type { Meta, StoryObj } from '@storybook/react';
import { TooltipProvider } from '@uranus-workspace/design-system';
import { ResearchPanel } from './research-panel.js';

const meta: Meta<typeof ResearchPanel> = {
  title: 'AI/Fluxos/ResearchPanel',
  component: ResearchPanel,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ResearchPanel>;

export const Default: Story = {
  args: {
    stages: [
      { id: '1', title: 'Coletar fontes da Uranus', status: 'done' },
      { id: '2', title: 'Comparar com sistemas de referência', status: 'running' },
      { id: '3', title: 'Resumir', status: 'queued' },
    ],
    citations: [
      {
        id: '1',
        title: 'Manual Uranus 2026',
        url: 'https://uranus.com.br',
        source: 'uranus.com.br',
        snippet: 'Identidade visual e tokens cósmicos.',
      },
      {
        id: '2',
        title: 'design-system repo',
        url: 'https://github.com/uranus-workspace/design-system',
        source: 'github.com',
      },
      {
        id: '3',
        title: 'Carbon Design System',
        url: 'https://carbondesignsystem.com',
        source: 'IBM',
      },
    ],
    summary:
      'A identidade Uranus combina paleta cósmica, tipografia Poppins e fundos gradientes específicos.',
  },
};
