import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { CodeBlock } from './code-block.js';

describe('CodeBlock', () => {
  it('renders code and language label', () => {
    render(<CodeBlock code="const x = 1;" language="ts" />);
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
    expect(screen.getByText('ts')).toBeInTheDocument();
  });

  it('hides the copy button when hideCopy is set', () => {
    render(<CodeBlock code="echo hi" language="bash" hideCopy />);
    expect(screen.queryByRole('button', { name: /copiar/i })).not.toBeInTheDocument();
  });

  it('uses renderCode when provided', () => {
    render(
      <CodeBlock
        code="ignored"
        language="ts"
        renderCode={() => <pre data-testid="custom-render">custom</pre>}
      />,
    );
    expect(screen.getByTestId('custom-render')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(<CodeBlock code="const x = 1;" language="ts" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
