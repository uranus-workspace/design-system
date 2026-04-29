import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { DangerConfirmDialog } from './danger-confirm-dialog.js';

describe('DangerConfirmDialog', () => {
  it('keeps the confirm button disabled until the phrase matches', async () => {
    const user = userEvent.setup();
    render(
      <DangerConfirmDialog
        open
        onOpenChange={() => {}}
        title="Delete project"
        confirmationText="apollo"
        onConfirm={() => {}}
      />,
    );
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    await user.type(screen.getByRole('textbox'), 'apollo');
    expect(screen.getByRole('button', { name: 'Delete' })).toBeEnabled();
  });

  it('runs onConfirm and closes when the user confirms', async () => {
    const onConfirm = vi.fn();
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DangerConfirmDialog
        open
        onOpenChange={onOpenChange}
        title="Delete project"
        confirmationText="apollo"
        onConfirm={onConfirm}
      />,
    );
    await user.type(screen.getByRole('textbox'), 'apollo');
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('disables both buttons when loading is true', () => {
    render(
      <DangerConfirmDialog
        open
        onOpenChange={() => {}}
        title="Delete"
        confirmationText="apollo"
        onConfirm={() => {}}
        loading
      />,
    );
    expect(screen.getByRole('button', { name: /Delete/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('has no a11y violations when open', async () => {
    const { container } = render(
      <DangerConfirmDialog
        open
        onOpenChange={() => {}}
        title="Delete project"
        description="This is permanent."
        confirmationText="apollo"
        onConfirm={() => {}}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
