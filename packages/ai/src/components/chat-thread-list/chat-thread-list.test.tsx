import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { ChatThreadList } from './chat-thread-list.js';

describe('ChatThreadList', () => {
  const threads = [
    { id: 't1', title: 'Como integrar Uranus AI', description: 'iniciado há 2 dias' },
    { id: 't2', title: 'Manual de marca', description: 'iniciado há 5 dias', unread: true },
  ];

  it('renders threads and announces the active one', () => {
    render(<ChatThreadList threads={threads} activeId="t1" />);
    expect(screen.getByText('Como integrar Uranus AI')).toBeInTheDocument();
    const active = screen.getByRole('button', { name: /Como integrar Uranus AI/ });
    expect(active).toHaveAttribute('aria-current', 'true');
  });

  it('emits onSelect when a thread is clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<ChatThreadList threads={threads} onSelect={onSelect} />);
    await user.click(screen.getByText('Manual de marca'));
    expect(onSelect).toHaveBeenCalledWith(threads[1]);
  });

  it('renders an empty state when there are no threads', () => {
    render(<ChatThreadList threads={[]} emptyState="Nada por aqui" />);
    expect(screen.getByText('Nada por aqui')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<ChatThreadList threads={threads} activeId="t1" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
