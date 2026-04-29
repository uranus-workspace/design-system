import { useEffect, useState } from 'react';

interface UseStreamingTextOptions {
  /** Characters revealed per tick. Default 2. */
  charsPerTick?: number;
  /** Tick interval in ms. Default 24. */
  intervalMs?: number;
  /** Disable the animation (e.g. when prefers-reduced-motion). */
  disabled?: boolean;
}

/**
 * Reveals `text` character-by-character. Useful when you have a final string
 * and want to simulate streaming for non-AI-SDK consumers; the `useChat` flow
 * does not need this — feed `messages[i].text` directly to `<StreamingText>`.
 */
export function useStreamingText(text: string, options: UseStreamingTextOptions = {}): string {
  const { charsPerTick = 2, intervalMs = 24, disabled = false } = options;
  const [shown, setShown] = useState(disabled ? text.length : 0);

  useEffect(() => {
    if (disabled) {
      setShown(text.length);
      return;
    }
    setShown(0);
  }, [text, disabled]);

  useEffect(() => {
    if (disabled) return;
    if (shown >= text.length) return;
    const id = setTimeout(
      () => setShown((c) => Math.min(text.length, c + charsPerTick)),
      intervalMs,
    );
    return () => clearTimeout(id);
  }, [shown, text, charsPerTick, intervalMs, disabled]);

  return text.slice(0, shown);
}
