import base from '@uranus-workspace/test-config/vitest';
import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  base,
  defineConfig({
    test: {
      include: ['src/**/*.test.{ts,tsx}'],
    },
  }),
);
