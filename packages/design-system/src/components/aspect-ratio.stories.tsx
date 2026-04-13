import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './aspect-ratio.js';

const meta: Meta<typeof AspectRatio> = {
  title: 'Primitives/AspectRatio',
  component: AspectRatio,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Cosmic: Story = {
  render: () => (
    <div className="w-[480px]">
      <AspectRatio ratio={16 / 9} className="bg-cosmic rounded-lg">
        <div className="flex h-full w-full items-center justify-center font-display text-2xl text-white">
          16 : 9
        </div>
      </AspectRatio>
    </div>
  ),
};
