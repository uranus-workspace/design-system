import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { Message } from './message.js';

describe('Message', () => {
  it('renders the user role with default label and content', () => {
    render(
      <Message role="user">
        <Message.Content>Olá!</Message.Content>
      </Message>,
    );
    expect(screen.getByText('Você')).toBeInTheDocument();
    expect(screen.getByText('Olá!')).toBeInTheDocument();
  });

  it('renders the assistant role with custom name and timestamp', () => {
    render(
      <Message role="assistant" name="GPT-5" timestamp="agora">
        <Message.Content>Posso ajudar?</Message.Content>
      </Message>,
    );
    expect(screen.getByText('GPT-5')).toBeInTheDocument();
    expect(screen.getByText('agora')).toBeInTheDocument();
  });

  it('exposes data-role for downstream styling', () => {
    const { container } = render(
      <Message role="assistant">
        <Message.Content>x</Message.Content>
      </Message>,
    );
    const root = container.querySelector('[data-slot="message"]');
    expect(root).toHaveAttribute('data-role', 'assistant');
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <Message role="assistant" timestamp="agora">
        <Message.Content>Olá! Em que posso ajudar?</Message.Content>
        <Message.Actions>
          <button type="button">Copiar</button>
        </Message.Actions>
      </Message>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
