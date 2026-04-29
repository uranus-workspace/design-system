import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { UranusChatStatus } from '../../types.js';
import type { ComposerSubmitPayload } from './composer-root.js';
import { Composer } from './composer.js';

const meta: Meta = {
  title: 'AI/Composer/Composer',
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Composer.Root
      onSubmit={(payload: ComposerSubmitPayload) => alert(JSON.stringify(payload, null, 2))}
    >
      <Composer.Attachments />
      <Composer.Textarea />
      <Composer.Toolbar className="mt-1 gap-2 border-t border-border/40 px-0 pb-0 pt-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Composer.MoreMenu />
          <Composer.ModeToggle />
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <Composer.AttachButton accept="image/*,application/pdf" />
          <Composer.SubmitButton />
        </div>
      </Composer.Toolbar>
      <Composer.Hints />
    </Composer.Root>
  ),
};

export const WithRecord: Story = {
  render: () => (
    <Composer.Root
      onSubmit={(payload: ComposerSubmitPayload) => alert(JSON.stringify(payload, null, 2))}
    >
      <Composer.Attachments />
      <Composer.Textarea placeholder="Pergunte ou grave um áudio…" />
      <Composer.Toolbar className="mt-1 gap-2 border-t border-border/40 px-0 pb-0 pt-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Composer.MoreMenu />
          <Composer.ModeToggle />
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <Composer.AttachButton />
          <Composer.RecordButton attachOnStop />
          <Composer.SubmitButton />
        </div>
      </Composer.Toolbar>
      <Composer.Hints />
    </Composer.Root>
  ),
};

export const Busy: Story = {
  render: () => {
    const [status, setStatus] = useState<UranusChatStatus>('streaming');
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground">
          Status: <code>{status}</code> — clique no botão para alternar.
        </p>
        <Composer.Root
          status={status}
          onSubmit={() => setStatus('streaming')}
          onStop={() => setStatus('idle')}
        >
          <Composer.Textarea defaultValue="Pode parar quando quiser" />
          <Composer.Toolbar>
            <span className="flex-1" />
            <Composer.SubmitButton />
          </Composer.Toolbar>
        </Composer.Root>
      </div>
    );
  },
};
