'use client';

import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@uranus-workspace/design-system';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

export default function CollapsibleDefault() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-[340px] space-y-2">
      <div className="flex items-center justify-between rounded-md border px-4 py-2">
        <h4 className="text-sm font-medium">Integrações conectadas</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Alternar integrações">
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 text-sm">GitHub</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">Linear</div>
        <div className="rounded-md border px-4 py-2 text-sm">Figma</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
