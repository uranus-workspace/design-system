import type { Meta, StoryObj } from '@storybook/react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable.js';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Primitives/Resizable',
  component: ResizablePanelGroup,
  parameters: { layout: 'centered', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="h-48 w-96 rounded-md border">
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center p-4">Um</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full items-center justify-center p-4">Dois</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
