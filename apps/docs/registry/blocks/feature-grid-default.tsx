'use client';
import { FeatureGrid } from '@uranus-workspace/blocks';
import { Boxes, Layers3, Palette, Sparkles } from 'lucide-react';

export default function FeatureGridDefault() {
  return (
    <FeatureGrid columns={4}>
      <FeatureGrid.Item
        icon={<Palette aria-hidden className="size-5" />}
        title="Tokens semânticos"
        description="Cores OKLCH, tipografia e radii em CSS-first. Trocar tema é editar variáveis CSS."
      />
      <FeatureGrid.Item
        icon={<Boxes aria-hidden className="size-5" />}
        title="Primitives donos"
        description="Cada componente shadcn vive como código próprio do seu repositório."
      />
      <FeatureGrid.Item
        icon={<Layers3 aria-hidden className="size-5" />}
        title="Blocos compostos"
        description="Layouts prontos para dashboards: AppShell, AppSidebar, DataTable, e mais."
      />
      <FeatureGrid.Item
        icon={<Sparkles aria-hidden className="size-5" />}
        title="Docs interativos"
        description="Storybook + Fumadocs com exemplos vivos importando o real do código."
      />
    </FeatureGrid>
  );
}
