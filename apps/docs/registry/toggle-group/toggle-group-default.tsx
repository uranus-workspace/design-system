'use client';

import { ToggleGroup, ToggleGroupItem } from '@uranus-workspace/design-system';
import { Bold, Italic, Underline } from 'lucide-react';

export default function ToggleGroupDefault() {
  return (
    <ToggleGroup type="multiple" variant="outline" aria-label="Formatação de texto">
      <ToggleGroupItem value="bold" aria-label="Alternar negrito">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Alternar itálico">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Alternar sublinhado">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
