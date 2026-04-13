'use client';

import { Toggle } from '@uranus-workspace/design-system';
import { Bold } from 'lucide-react';

export default function ToggleDefault() {
  return (
    <Toggle aria-label="Alternar negrito">
      <Bold />
    </Toggle>
  );
}
