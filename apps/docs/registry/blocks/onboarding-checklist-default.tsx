'use client';
import { OnboardingChecklist } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';

export default function OnboardingChecklistDefault() {
  return (
    <OnboardingChecklist
      title="Comece por aqui"
      description="Faltam 2 passos para você usar 100% do workspace."
      onDismiss={() => {}}
      className="w-full max-w-md"
    >
      <OnboardingChecklist.Step
        title="Conecte o seu repositório"
        description="Importe o seu repo do GitHub ou GitLab para sincronizar issues e PRs."
        completed
      />
      <OnboardingChecklist.Step
        title="Convide o time"
        description="Adicione colegas para colaborar em projetos e revisar mudanças."
        completed={false}
        action={
          <Button size="sm" variant="outline">
            Convidar
          </Button>
        }
      />
      <OnboardingChecklist.Step
        title="Faça o primeiro deploy"
        description="Suba o app para produção em 1 clique e dispare o pipeline."
        completed={false}
        action={<Button size="sm">Deploy</Button>}
      />
    </OnboardingChecklist>
  );
}
