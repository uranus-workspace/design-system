import { resolve } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import tailwind from '@tailwindcss/vite';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: [
    '../../../packages/design-system/src/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/blocks/src/**/*.stories.@(ts|tsx|mdx)',
    '../../../packages/ai/src/**/*.stories.@(ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(baseConfig) {
    return mergeConfig(baseConfig, {
      plugins: [
        tailwind(),
        tsconfigPaths({
          projects: [
            resolve(__dirname, '../../../packages/design-system/tsconfig.json'),
            resolve(__dirname, '../../../packages/blocks/tsconfig.json'),
            resolve(__dirname, '../../../packages/ai/tsconfig.json'),
          ],
        }),
      ],
    });
  },
};

export default config;
