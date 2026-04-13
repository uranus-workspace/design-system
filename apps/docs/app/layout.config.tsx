import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'Uranus Design System',
  },
  links: [
    { text: 'Docs', url: '/docs', active: 'nested-url' },
    { text: 'Components', url: '/docs/components/button', active: 'nested-url' },
    { text: 'Blocks', url: '/docs/blocks/page-header', active: 'nested-url' },
  ],
};
