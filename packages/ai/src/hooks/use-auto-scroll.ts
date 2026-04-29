import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface UseAutoScrollOptions {
  /** Distance from bottom (in px) considered "at bottom". Default 64. */
  threshold?: number;
  /** Re-evaluate when this value changes (e.g. messages length). */
  watch?: unknown;
}

interface UseAutoScrollResult<T extends HTMLElement> {
  ref: RefObject<T>;
  /** Whether the latest content is visible (user is near bottom). */
  atBottom: boolean;
  /** Imperatively scroll to the bottom. */
  scrollToBottom: (behavior?: ScrollBehavior) => void;
}

/**
 * Sticks scroll to the bottom of a container while the user is near the bottom,
 * but stops auto-scrolling once they've scrolled up — same UX as Anthropic / OpenAI.
 */
export function useAutoScroll<T extends HTMLElement = HTMLDivElement>({
  threshold = 64,
  watch,
}: UseAutoScrollOptions = {}): UseAutoScrollResult<T> {
  const ref = useRef<T>(null) as RefObject<T>;
  const [atBottom, setAtBottom] = useState(true);
  const stickRef = useRef(true);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    const node = ref.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior });
    stickRef.current = true;
    setAtBottom(true);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onScroll = () => {
      const distance = node.scrollHeight - node.clientHeight - node.scrollTop;
      const near = distance <= threshold;
      stickRef.current = near;
      setAtBottom(near);
    };
    onScroll();
    node.addEventListener('scroll', onScroll, { passive: true });
    return () => node.removeEventListener('scroll', onScroll);
  }, [threshold]);

  useEffect(() => {
    if (!stickRef.current) return;
    const node = ref.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [watch]);

  return { ref, atBottom, scrollToBottom };
}
