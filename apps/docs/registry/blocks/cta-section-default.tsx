'use client';
import { CTASection } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';

export default function CTASectionDefault() {
  return (
    <CTASection
      eyebrow="Pronto para escalar"
      title="Padronize o front-end da Uranus"
      description="Um único kit para marketing e produto."
      actions={
        <>
          <Button>Agendar demo</Button>
          <Button variant="outline">Ver roadmap</Button>
        </>
      }
    />
  );
}
