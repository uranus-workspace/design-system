import { readFile, writeFile } from 'node:fs/promises';
import { defineConfig } from 'tsup';

const CLIENT_DIRECTIVE = '"use client";\n';

const CLIENT_OUTPUTS = ['dist/index.js', 'dist/index.cjs', 'dist/screens.js', 'dist/screens.cjs'];

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    core: 'src/core/index.ts',
    screens: 'src/screens/index.ts',
    api: 'src/api/index.ts',
    keycloak: 'src/keycloak/index.ts',
    nextjs: 'src/nextjs/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  external: [
    'react',
    'react-dom',
    'oidc-client-ts',
    '@uranus-workspace/design-system',
    '@uranus-workspace/blocks',
    'jose',
    'next',
    'next/server',
    'next/headers',
    'next/navigation',
  ],
  async onSuccess() {
    for (const file of CLIENT_OUTPUTS) {
      const content = await readFile(file, 'utf8');
      if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
        await writeFile(file, CLIENT_DIRECTIVE + content);
      }
    }
  },
});
