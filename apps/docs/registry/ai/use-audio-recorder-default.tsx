'use client';

import { CodeBlock } from '@uranus-workspace/ai';

const code = `'use client';

import { useAudioRecorder, Composer } from '@uranus-workspace/ai';

export function VoiceComposer() {
  const recorder = useAudioRecorder({
    transcribe: async (blob) => {
      const fd = new FormData();
      fd.append('audio', blob);
      const res = await fetch('/api/transcribe', { method: 'POST', body: fd });
      const { text } = await res.json();
      return text;
    },
  });

  return (
    <Composer.Root status="idle" onSubmit={() => {}}>
      <Composer.Textarea />
      <Composer.Toolbar>
        <Composer.RecordButton recorder={recorder} />
      </Composer.Toolbar>
    </Composer.Root>
  );
}`;

export default function UseAudioRecorderDefault() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <CodeBlock language="tsx" code={code} />
    </div>
  );
}
