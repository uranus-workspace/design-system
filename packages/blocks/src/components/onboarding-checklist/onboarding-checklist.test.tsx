import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@uranus-workspace/design-system';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { OnboardingChecklist } from './onboarding-checklist.js';

describe('OnboardingChecklist', () => {
  it('renders the title, progress derived from children, and step labels', () => {
    render(
      <OnboardingChecklist title="Comece por aqui">
        <OnboardingChecklist.Step title="Conecte o seu repositório" completed />
        <OnboardingChecklist.Step title="Convide o time" completed={false} />
        <OnboardingChecklist.Step title="Faça o primeiro deploy" completed={false} />
      </OnboardingChecklist>,
    );
    expect(screen.getByRole('heading', { name: 'Comece por aqui' })).toBeInTheDocument();
    expect(screen.getByText('Conecte o seu repositório')).toBeInTheDocument();
    expect(screen.getByText('1/3')).toBeInTheDocument();
  });

  it('renders the dismiss button when onDismiss is provided', async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    render(
      <OnboardingChecklist onDismiss={onDismiss}>
        <OnboardingChecklist.Step title="Conecte" completed />
      </OnboardingChecklist>,
    );
    await user.click(screen.getByRole('button', { name: 'Fechar onboarding' }));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('hides the action for completed steps', () => {
    render(
      <OnboardingChecklist>
        <OnboardingChecklist.Step
          title="Concluído"
          completed
          action={<Button size="sm">Oculto</Button>}
        />
      </OnboardingChecklist>,
    );
    expect(screen.queryByRole('button', { name: 'Oculto' })).not.toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <OnboardingChecklist
        title="Comece por aqui"
        description="Faltam 2 passos."
        onDismiss={() => {}}
      >
        <OnboardingChecklist.Step title="Conecte" completed />
        <OnboardingChecklist.Step
          title="Convide"
          completed={false}
          action={<Button size="sm">Convidar</Button>}
        />
      </OnboardingChecklist>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
