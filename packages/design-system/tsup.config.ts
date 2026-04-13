import { readFile, writeFile } from 'node:fs/promises';
import { defineConfig } from 'tsup';

const CLIENT_DIRECTIVE = '"use client";\n';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  external: ['react', 'react-dom', 'motion'],
  injectStyle: false,
  async onSuccess() {
    for (const file of ['dist/index.js', 'dist/index.cjs']) {
      const content = await readFile(file, 'utf8');
      if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
        await writeFile(file, CLIENT_DIRECTIVE + content);
      }
    }
  },
});
