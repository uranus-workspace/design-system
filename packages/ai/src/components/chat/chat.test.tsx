import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { Chat } from './chat.js';

describe('Chat', () => {
  const messages = [
    { id: '1', role: 'user' as const, text: 'O que vocês fazem?' },
    {
      id: '2',
      role: 'assistant' as const,
      text: 'Construímos sistemas de IA aplicada.',
      authorName: 'Uranus',
    },
  ];

  it('renders messages and a thinking indicator while submitted', () => {
    render(
      <Chat messages={messages} status="submitted" onSend={() => {}} defaultToolbar={false} />,
    );
    expect(screen.getByText('O que vocês fazem?')).toBeInTheDocument();
    expect(screen.getByText('Construímos sistemas de IA aplicada.')).toBeInTheDocument();
    expect(screen.getByText(/Enviando|Pensando/i)).toBeInTheDocument();
  });

  it('forwards composer submits to onSend with the active mode', async () => {
    const onSend = vi.fn();
    const user = userEvent.setup();
    render(
      <Chat
        messages={[]}
        status="idle"
        onSend={onSend}
        defaultToolbar={false}
        emptyState={<p>Sem mensagens</p>}
      />,
    );
    const ta = screen.getByRole('textbox');
    await user.type(ta, 'Olá');
    await user.keyboard('{Enter}');
    expect(onSend).toHaveBeenCalledWith({
      text: 'Olá',
      attachments: [],
      mode: 'chat',
    });
  });

  it('renders an error alert when error is provided', () => {
    render(
      <Chat
        messages={messages}
        status="error"
        onSend={() => {}}
        error="Algo deu errado"
        defaultToolbar={false}
      />,
    );
    expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <Chat messages={messages} status="idle" onSend={() => {}} defaultToolbar={false} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
