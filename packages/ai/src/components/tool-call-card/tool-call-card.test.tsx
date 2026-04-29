import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { ToolCallCard } from './tool-call-card.js';

describe('ToolCallCard', () => {
  it('renders the tool name and current state', () => {
    render(
      <ToolCallCard
        toolCall={{ id: '1', name: 'web_search', state: 'call', args: { query: 'uranus' } }}
      />,
    );
    expect(screen.getByText('web_search')).toBeInTheDocument();
    expect(screen.getByText('Executando')).toBeInTheDocument();
  });

  it('expands to show input and result', async () => {
    const user = userEvent.setup();
    render(
      <ToolCallCard
        toolCall={{
          id: '1',
          name: 'fetch',
          state: 'result',
          args: { url: 'https://uranus.com.br' },
          result: { ok: true },
        }}
      />,
    );
    await user.click(screen.getByRole('button', { name: /Expandir/ }));
    expect(screen.getByText(/uranus.com.br/)).toBeInTheDocument();
    expect(screen.getByText('Entrada')).toBeInTheDocument();
    expect(screen.getByText('Resultado')).toBeInTheDocument();
  });

  it('shows the error variant when state is error', () => {
    render(
      <ToolCallCard
        toolCall={{ id: '1', name: 'web_search', state: 'error', errorText: 'timeout' }}
        defaultOpen
      />,
    );
    expect(screen.getByText('Falhou')).toBeInTheDocument();
    expect(screen.getByText('timeout')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <ToolCallCard
        toolCall={{ id: '1', name: 'fetch', state: 'result', args: { ok: 1 }, result: { ok: 1 } }}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
