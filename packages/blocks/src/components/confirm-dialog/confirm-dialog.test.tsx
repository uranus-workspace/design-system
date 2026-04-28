import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { ConfirmDialog } from './confirm-dialog.js';

describe('ConfirmDialog', () => {
  it('renders title, description and both buttons when open', () => {
    render(
      <ConfirmDialog
        open
        onOpenChange={() => {}}
        title="Apagar projeto?"
        description="Essa ação não pode ser desfeita."
        onConfirm={() => {}}
      />,
    );
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('Apagar projeto?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('runs onConfirm and closes when the user confirms', async () => {
    const onConfirm = vi.fn();
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ConfirmDialog
        open
        onOpenChange={onOpenChange}
        title="Apagar projeto?"
        onConfirm={onConfirm}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(onConfirm).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('disables both buttons when loading is true', () => {
    render(
      <ConfirmDialog open onOpenChange={() => {}} title="Apagar" onConfirm={() => {}} loading />,
    );
    expect(screen.getByRole('button', { name: /Confirm/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('renders dialogBody between description and actions', () => {
    render(
      <ConfirmDialog
        open
        onOpenChange={() => {}}
        title="Confirmar"
        description="Description here."
        dialogBody={<p>Extra campo ou copy.</p>}
        onConfirm={() => {}}
      />,
    );
    expect(screen.getByText('Extra campo ou copy.')).toBeInTheDocument();
  });

  it('has no a11y violations when open', async () => {
    const { container } = render(
      <ConfirmDialog
        open
        onOpenChange={() => {}}
        title="Apagar projeto?"
        description="Essa ação não pode ser desfeita."
        onConfirm={() => {}}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
