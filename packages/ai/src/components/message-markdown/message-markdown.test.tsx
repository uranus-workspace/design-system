import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import type { ReactElement, ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { MessageMarkdown } from './message-markdown.js';

function FakeMarkdown({
  children,
  components,
}: {
  children: string;
  components: Record<string, unknown>;
  remarkPlugins?: unknown[];
}): ReactElement {
  const Anchor = components.a as (props: { children: ReactNode; href: string }) => ReactElement;
  return (
    <div>
      <p>{children}</p>
      <Anchor href="https://uranus.com.br">Uranus</Anchor>
    </div>
  );
}

describe('MessageMarkdown', () => {
  it('renders consumer-supplied markdown', () => {
    render(<MessageMarkdown markdownComponent={FakeMarkdown}>**Olá**</MessageMarkdown>);
    expect(screen.getByText('**Olá**')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Uranus' })).toHaveAttribute('rel', 'noreferrer');
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <MessageMarkdown markdownComponent={FakeMarkdown}>texto</MessageMarkdown>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
