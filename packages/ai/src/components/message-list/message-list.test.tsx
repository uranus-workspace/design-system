import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Message } from '../message/message.js';
import { MessageList } from './message-list.js';

describe('MessageList', () => {
  it('renders children inside the scroll container', () => {
    render(
      <MessageList>
        <Message role="user">
          <Message.Content>Pergunta</Message.Content>
        </Message>
        <Message role="assistant">
          <Message.Content>Resposta</Message.Content>
        </Message>
      </MessageList>,
    );
    expect(screen.getByText('Pergunta')).toBeInTheDocument();
    expect(screen.getByText('Resposta')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <MessageList>
        <Message role="assistant">
          <Message.Content>Olá!</Message.Content>
        </Message>
      </MessageList>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
