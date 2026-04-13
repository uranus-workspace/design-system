type ClassValue = string | number | false | null | undefined | ClassValue[];

/**
 * Minimal class-name joiner used by RSC documentation components. We can't
 * reuse `cn` from `@uranus-workspace/design-system` here because the published
 * bundle is prefixed with `"use client"` — calling it from a server component
 * would throw. This implementation is intentionally small: no tailwind-merge
 * dedup because docs code never composes conflicting utility classes.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (value: ClassValue) => {
    if (!value) return;
    if (Array.isArray(value)) {
      for (const v of value) walk(v);
      return;
    }
    if (typeof value === 'string' || typeof value === 'number') {
      out.push(String(value));
    }
  };
  for (const input of inputs) walk(input);
  return out.join(' ');
}
