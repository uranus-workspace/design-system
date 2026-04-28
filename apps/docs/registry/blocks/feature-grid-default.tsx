import { FeatureGrid } from '@uranus-workspace/blocks';
import { Sparkles } from 'lucide-react';

export default function FeatureGridDefault() {
  return (
    <FeatureGrid
      features={[
        {
          id: '1',
          icon: <Sparkles className="size-5" aria-hidden />,
          title: 'Rápido de integrar',
          description: 'Importe blocos do pacote publicado e customize com tokens.',
        },
        {
          id: '2',
          title: 'Acessível',
          description: 'Stories com a11y em modo erro e testes com jest-axe.',
        },
        {
          id: '3',
          title: 'Componível',
          description: 'Passe JSX nos slots em vez de inventar outro DSL.',
        },
      ]}
    />
  );
}
