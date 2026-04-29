import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { Composer } from './composer.js';

describe('Composer', () => {
  it('submits text via Enter key by default', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(
      <Composer.Root onSubmit={onSubmit}>
        <Composer.Textarea aria-label="mensagem" />
        <Composer.SubmitButton />
      </Composer.Root>,
    );
    await user.type(screen.getByLabelText('mensagem'), 'Olá Uranus');
    await user.keyboard('{Enter}');
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0]?.[0]).toMatchObject({ text: 'Olá Uranus', mode: 'chat' });
  });

  it('inserts a newline on Shift+Enter without submitting', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(
      <Composer.Root onSubmit={onSubmit}>
        <Composer.Textarea aria-label="mensagem" />
      </Composer.Root>,
    );
    const ta = screen.getByLabelText('mensagem') as HTMLTextAreaElement;
    await user.type(ta, 'linha 1');
    await user.keyboard('{Shift>}{Enter}{/Shift}');
    await user.type(ta, 'linha 2');
    expect(onSubmit).not.toHaveBeenCalled();
    expect(ta.value).toBe('linha 1\nlinha 2');
  });

  it('disables submit while busy and exposes a stop click', async () => {
    const onStop = vi.fn();
    const user = userEvent.setup();
    render(
      <Composer.Root onSubmit={() => {}} onStop={onStop} status="streaming">
        <Composer.Textarea aria-label="mensagem" />
        <Composer.SubmitButton />
      </Composer.Root>,
    );
    const button = screen.getByRole('button', { name: 'Parar' });
    await user.click(button);
    expect(onStop).toHaveBeenCalledTimes(1);
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <Composer.Root onSubmit={() => {}}>
        <Composer.Textarea aria-label="mensagem" />
        <Composer.Toolbar>
          <Composer.MoreMenu />
          <Composer.SubmitButton />
        </Composer.Toolbar>
        <Composer.Hints />
      </Composer.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
