import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { SuggestedPrompts } from './suggested-prompts.js';

describe('SuggestedPrompts', () => {
  const prompts = [
    { title: 'Resumir documento', prompt: 'Resuma este PDF em 5 bullets' },
    { title: 'Gerar Code Snippet', prompt: 'Gere um exemplo de uso do useUranusChat' },
  ];

  it('renders all prompts and emits the raw text onSelect', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<SuggestedPrompts prompts={prompts} onSelect={onSelect} />);
    await user.click(screen.getByText('Resumir documento'));
    expect(onSelect).toHaveBeenCalledWith('Resuma este PDF em 5 bullets');
  });

  it('has no a11y violations', async () => {
    const { container } = render(<SuggestedPrompts prompts={prompts} onSelect={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
