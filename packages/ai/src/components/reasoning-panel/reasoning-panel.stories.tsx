import type { Meta, StoryObj } from '@storybook/react';
import { ReasoningPanel } from './reasoning-panel.js';

const meta: Meta<typeof ReasoningPanel> = {
  title: 'AI/Status/ReasoningPanel',
  component: ReasoningPanel,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ReasoningPanel>;

const SAMPLE = `O usuário pediu para integrar Uranus AI.
Vou responder explicando primeiro a instalação, depois o hook useUranusChat.
Devo manter o tom brasileiro e mencionar a route handler do Next.js.`;

export const Closed: Story = { args: { text: SAMPLE } };
export const Open: Story = { args: { text: SAMPLE, defaultOpen: true } };
export const Streaming: Story = { args: { text: SAMPLE, streaming: true } };
