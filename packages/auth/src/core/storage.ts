import { WebStorageStateStore } from 'oidc-client-ts';
import type { AuthStorageKind } from './types.js';

/** Sentinel used to detect SSR. Falls back to an in-memory shim. */
const isBrowser = typeof window !== 'undefined';

class MemoryStorage implements Storage {
  private store = new Map<string, string>();
  get length() {
    return this.store.size;
  }
  clear() {
    this.store.clear();
  }
  getItem(key: string) {
    return this.store.get(key) ?? null;
  }
  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string) {
    this.store.delete(key);
  }
  setItem(key: string, value: string) {
    this.store.set(key, value);
  }
}

const memoryStorage = new MemoryStorage();

/**
 * Resolves an actual `Storage` instance for a given config value. On the server
 * we fall back to an in-memory shim so that constructing the client never
 * throws — the React provider only *uses* it inside `useEffect`.
 */
export function resolveStorage(value: AuthStorageKind | Storage = 'session'): Storage {
  if (typeof value === 'object') return value;
  if (!isBrowser) return memoryStorage;
  if (value === 'local') return window.localStorage;
  return window.sessionStorage;
}

/** Build the `WebStorageStateStore` oidc-client-ts expects. */
export function createStateStore(value: AuthStorageKind | Storage = 'session') {
  return new WebStorageStateStore({ store: resolveStorage(value) });
}

/** SessionStorage key used to persist the post-login `returnTo` URL. */
export const RETURN_TO_STORAGE_KEY = 'uranus.auth.returnTo';

export function persistReturnTo(value: string | undefined) {
  if (!isBrowser) return;
  if (!value) {
    window.sessionStorage.removeItem(RETURN_TO_STORAGE_KEY);
    return;
  }
  window.sessionStorage.setItem(RETURN_TO_STORAGE_KEY, value);
}

export function consumeReturnTo(): string | null {
  if (!isBrowser) return null;
  const value = window.sessionStorage.getItem(RETURN_TO_STORAGE_KEY);
  if (value) window.sessionStorage.removeItem(RETURN_TO_STORAGE_KEY);
  return value;
}
