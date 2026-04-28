import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { OnboardingChecklist, type OnboardingChecklistStep } from './onboarding-checklist.js';

const steps: OnboardingChecklistStep[] = [
  { id: '1', title: 'Connect your repo', completed: true },
  {
    id: '2',
    title: 'Invite teammates',
    completed: false,
    action: <button type="button">Invite</button>,
  },
  { id: '3', title: 'Deploy your first app', completed: false },
];

describe('OnboardingChecklist', () => {
  it('renders the title, progress and step labels', () => {
    render(<OnboardingChecklist steps={steps} />);
    expect(screen.getByRole('heading', { name: 'Get started' })).toBeInTheDocument();
    expect(screen.getByText('Connect your repo')).toBeInTheDocument();
    expect(screen.getByText('1/3')).toBeInTheDocument();
  });

  it('renders the dismiss button when onDismiss is provided', async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    render(<OnboardingChecklist steps={steps} onDismiss={onDismiss} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss onboarding' }));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('hides the action for completed steps', () => {
    render(
      <OnboardingChecklist
        steps={[
          {
            id: '1',
            title: 'Done',
            completed: true,
            action: <button type="button">Hidden</button>,
          },
        ]}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Hidden' })).not.toBeInTheDocument();
  });

  it('has no a11y violations', async () => {
    const { container } = render(
      <OnboardingChecklist steps={steps} onDismiss={() => {}} description="2 steps to go." />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('supports composition with Step children and derives progress', () => {
    render(
      <OnboardingChecklist>
        <OnboardingChecklist.Step id="1" title="Connect your repo" completed />
        <OnboardingChecklist.Step
          id="2"
          title="Invite teammates"
          completed={false}
          action={<button type="button">Invite</button>}
        />
        <OnboardingChecklist.Step id="3" title="Deploy your first app" completed={false} />
      </OnboardingChecklist>,
    );
    expect(screen.getByText('1/3')).toBeInTheDocument();
    expect(screen.getByText('Connect your repo')).toBeInTheDocument();
  });
});
