import { OnboardingChecklist } from '@uranus-workspace/blocks';

export default function OnboardingChecklistDefault() {
  return (
    <OnboardingChecklist
      title="Primeiros passos"
      steps={[
        { id: '1', title: 'Complete seu perfil', completed: true },
        { id: '2', title: 'Convide o time', completed: false },
      ]}
      onDismiss={() => {}}
    />
  );
}
