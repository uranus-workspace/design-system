import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@uranus-workspace/design-system',
    '@uranus-workspace/blocks',
    '@uranus-workspace/tokens',
    '@uranus-workspace/tailwind-config',
  ],
};

export default withMDX(config);
