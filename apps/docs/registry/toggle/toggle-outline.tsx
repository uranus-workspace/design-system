'use client';

import { Toggle } from '@uranus-workspace/design-system';
import { Italic } from 'lucide-react';

export default function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Alternar itálico">
      <Italic />
      Itálico
    </Toggle>
  );
}
