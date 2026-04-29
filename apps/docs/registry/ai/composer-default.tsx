'use client';

import { Composer } from '@uranus-workspace/ai';
import { useState } from 'react';

export default function ComposerDefault() {
  const [last, setLast] = useState<string | null>(null);
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
      <Composer.Root status="idle" onSubmit={(payload) => setLast(payload.text)}>
        <Composer.Textarea placeholder="Pergunte algo ao Uranus…" />
        <Composer.Toolbar>
          <Composer.AttachButton />
          <Composer.RecordButton attachOnStop />
          <Composer.ModeToggle />
          <span className="flex-1" />
          <Composer.SubmitButton />
        </Composer.Toolbar>
        <Composer.Hints />
      </Composer.Root>
      {last ? (
        <p className="text-xs text-muted-foreground">
          Última submissão: <span className="font-medium">{last}</span>
        </p>
      ) : null}
    </div>
  );
}
