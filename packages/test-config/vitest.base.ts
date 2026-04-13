import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Shared Vitest base config. Packages extend it via:
 *
 *   import { mergeConfig, defineConfig } from 'vitest/config';
 *   import base from '@uranus-workspace/test-config/vitest';
 *   export default mergeConfig(base, defineConfig({ ... }));
 */
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [resolve(__dirname, 'setup.ts')],
    css: true,
    restoreMocks: true,
    clearMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: ['**/*.stories.*', '**/*.test.*', '**/index.ts', '**/dist/**', '**/node_modules/**'],
    },
  },
});
