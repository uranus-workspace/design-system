'use client';

import { SearchCommand } from '@uranus-workspace/blocks';
import { Button } from '@uranus-workspace/design-system';
import { useState } from 'react';

export default function SearchCommandDefault() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col items-center gap-4">
      <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
        Abrir paleta
      </Button>
      <SearchCommand
        open={open}
        onOpenChange={setOpen}
        shortcutBinding={false}
        groups={[
          {
            heading: 'Ações',
            items: [
              {
                id: 'home',
                label: 'Ir para início',
                onSelect: () => setOpen(false),
              },
            ],
          },
        ]}
      />
    </div>
  );
}
