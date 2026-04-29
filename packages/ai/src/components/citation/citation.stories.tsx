import type { Meta, StoryObj } from '@storybook/react';
import { TooltipProvider } from '@uranus-workspace/design-system';
import { Citation, CitationList } from './citation.js';

const meta: Meta<typeof CitationList> = {
  title: 'AI/Mensagens/Citation',
  component: CitationList,
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
type Story = StoryObj<typeof CitationList>;

export const List: Story = {
  args: {
    citations: [
      {
        id: '1',
        title: 'Manual Uranus 2026',
        url: 'https://uranus.com.br',
        source: 'uranus.com.br',
        snippet:
          'Mais do que estética, a nova Uranus se posiciona como um hub de serviços flexível.',
      },
      {
        id: '2',
        title: 'Repo design-system',
        url: 'https://github.com/uranus-workspace/design-system',
        source: 'github.com',
      },
    ],
  },
};

export const Inline: StoryObj = {
  render: () => (
    <p className="max-w-prose text-sm">
      A paleta cósmica é definida no manual de marca{' '}
      <Citation
        index={1}
        citation={{
          id: '1',
          title: 'Manual Uranus 2026',
          url: 'https://uranus.com.br',
          source: 'uranus.com.br',
        }}
      />{' '}
      e propaga via tokens.
    </p>
  ),
};
