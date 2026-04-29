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
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: [
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</docs>; rel="service-doc"',
              '</.well-known/agent-skills/index.json>; rel="describedby"',
              '</llms.txt>; rel="describedby"',
            ].join(', '),
          },
        ],
      },
    ];
  },
};

export default withMDX(config);
