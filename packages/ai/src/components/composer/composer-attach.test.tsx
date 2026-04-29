import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Composer } from './composer.js';

describe('Composer.AttachButton', () => {
  it('renders an accessible attach button', () => {
    render(
      <Composer.Root onSubmit={() => {}}>
        <Composer.Textarea aria-label="msg" />
        <Composer.AttachButton />
      </Composer.Root>,
    );
    expect(screen.getByRole('button', { name: 'Anexar foto ou arquivo' })).toBeInTheDocument();
  });

  it('opens the file picker on click', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Composer.Root onSubmit={() => {}}>
        <Composer.Textarea aria-label="msg" />
        <Composer.AttachButton />
      </Composer.Root>,
    );
    const input = container.querySelector(
      'input[data-slot="composer-attach-input"]',
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('file');
    await user.click(screen.getByRole('button', { name: 'Anexar foto ou arquivo' }));
    // Click handler was wired (jsdom doesn't open the picker, but the click propagates).
  });

  it('renders the attachment chip when files are added', () => {
    const { container } = render(
      <Composer.Root onSubmit={() => {}}>
        <Composer.Attachments />
        <Composer.Textarea aria-label="msg" />
        <Composer.AttachButton />
      </Composer.Root>,
    );
    const file = new File(['hello'], 'note.txt', { type: 'text/plain' });
    const input = container.querySelector(
      'input[data-slot="composer-attach-input"]',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('note.txt')).toBeInTheDocument();
  });

  it('removes attachment when the X button is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Composer.Root onSubmit={() => {}}>
        <Composer.Attachments />
        <Composer.Textarea aria-label="msg" />
        <Composer.AttachButton />
      </Composer.Root>,
    );
    const file = new File(['hi'], 'a.txt', { type: 'text/plain' });
    const input = container.querySelector(
      'input[data-slot="composer-attach-input"]',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });
    const removeBtn = screen.getByRole('button', { name: /Remover anexo a\.txt/ });
    await user.click(removeBtn);
    expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <Composer.Root onSubmit={() => {}}>
        <Composer.Attachments />
        <Composer.Textarea aria-label="msg" />
        <Composer.AttachButton />
      </Composer.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
