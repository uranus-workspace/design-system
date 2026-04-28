import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@uranus-workspace/design-system';
import { OnboardingChecklist, type OnboardingChecklistStep } from './onboarding-checklist.js';

const steps: OnboardingChecklistStep[] = [
  {
    id: 'connect',
    title: 'Conecte o seu repositório',
    description: 'Importe o seu repo do GitHub ou GitLab.',
    completed: true,
  },
  {
    id: 'invite',
    title: 'Convide o time',
    description: 'Adicione colegas para colaborar.',
    completed: false,
    action: (
      <Button size="sm" variant="outline">
        Convidar
      </Button>
    ),
  },
  {
    id: 'deploy',
    title: 'Faça o primeiro deploy',
    description: 'Suba o app para produção em 1 clique.',
    completed: false,
    action: <Button size="sm">Deploy</Button>,
  },
];

const meta: Meta<typeof OnboardingChecklist> = {
  title: 'Blocks/Growth/OnboardingChecklist',
  component: OnboardingChecklist,
  parameters: { layout: 'padded', a11y: { test: 'error' } },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof OnboardingChecklist>;

export const Default: Story = {
  args: {
    title: 'Comece por aqui',
    description: 'Faltam 2 passos para você usar 100% do app.',
    steps,
    onDismiss: () => {},
  },
};

export const Completed: Story = {
  args: {
    title: 'Tudo pronto',
    steps: steps.map((step) => ({ ...step, completed: true })),
  },
};
