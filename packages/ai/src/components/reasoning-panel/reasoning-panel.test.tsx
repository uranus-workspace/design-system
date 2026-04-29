import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it } from 'vitest';
import { ReasoningPanel } from './reasoning-panel.js';

describe('ReasoningPanel', () => {
  it('renders a collapsible trigger that toggles open state', async () => {
    const user = userEvent.setup();
    render(<ReasoningPanel text="Pensando alto sobre a resposta..." />);
    const trigger = screen.getByRole('button', { name: 'Mostrar raciocínio' });
    expect(trigger).toBeInTheDocument();
    await user.click(trigger);
    expect(screen.getByText('Pensando alto sobre a resposta...')).toBeVisible();
  });

  it('shows the streaming label while streaming is true', () => {
    render(<ReasoningPanel text="..." streaming />);
    expect(screen.getByText('Pensando…')).toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <ReasoningPanel text="Estou raciocinando sobre a sua pergunta." defaultOpen />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
