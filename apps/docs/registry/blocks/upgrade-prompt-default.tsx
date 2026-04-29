'use client';
import { UpgradePrompt } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';

export default function UpgradePromptDefault() {
  return (
    <UpgradePrompt
      layout="card"
      title="Desbloqueie relatórios avançados"
      description="Compare períodos, exporte em CSV e adicione visões personalizadas no plano Pro."
      action={<Button size="sm">Fazer upgrade</Button>}
    />
  );
}
