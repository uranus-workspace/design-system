import { Hero } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';

export default function HeroDefault() {
  return (
    <Hero
      eyebrow="Design system"
      title="Blocos prontos para produto"
      description="Composição clara, tokens semânticos e acessibilidade em primeiro lugar."
      actions={
        <>
          <Button>Começar</Button>
          <Button variant="outline">Documentação</Button>
        </>
      }
    />
  );
}
