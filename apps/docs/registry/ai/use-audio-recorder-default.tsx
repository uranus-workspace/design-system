'use client';

import { CodeBlock, Composer } from '@uranus-workspace/ai';

const code = `'use client';

import { Composer } from '@uranus-workspace/ai';

export function VoiceComposer() {
  return (
    <Composer.Root status="idle" onSubmit={() => {}}>
      <Composer.Textarea />
      <Composer.Toolbar>
        <Composer.RecordButton
          transcribe={async (blob) => {
            const fd = new FormData();
            fd.append('audio', blob);
            const res = await fetch('/api/transcribe', { method: 'POST', body: fd });
            const { text } = await res.json();
            return text;
          }}
        />
      </Composer.Toolbar>
    </Composer.Root>
  );
}`;

export default function UseAudioRecorderDefault() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="rounded-lg border bg-background p-4">
        <Composer.Root status="idle" onSubmit={() => {}}>
          <Composer.Textarea placeholder="Grave pelo botão ou digite aqui…" />
          <Composer.Toolbar>
            <Composer.RecordButton
              transcribe={async () =>
                '(simulado) Texto que viria da sua API de transcrição — em produção envie o Blob ao servidor.'
              }
            />
          </Composer.Toolbar>
        </Composer.Root>
      </div>
      <CodeBlock language="tsx" code={code} />
    </div>
  );
}
