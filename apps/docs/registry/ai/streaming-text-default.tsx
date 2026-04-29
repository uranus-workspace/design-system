'use client';

import { StreamingText, useStreamingText } from '@uranus-workspace/ai';
import { useEffect, useState } from 'react';

const FULL = 'Construindo resposta token a token… o caret pisca enquanto o stream chega.';

export default function StreamingTextDefault() {
  const [target, setTarget] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setTarget(FULL), 200);
    return () => clearTimeout(t);
  }, []);
  const text = useStreamingText(target);
  const streaming = text.length < target.length;
  return (
    <div className="mx-auto w-full max-w-md rounded-md border bg-muted/20 px-4 py-3 text-sm">
      <StreamingText text={text} streaming={streaming} />
    </div>
  );
}
