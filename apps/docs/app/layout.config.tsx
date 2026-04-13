import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="font-display text-[15px] font-semibold tracking-tight">
        Uranus<sup className="ml-0.5 text-[10px]">®</sup>{' '}
        <span className="font-sans text-muted-foreground font-normal">Design System</span>
      </span>
    ),
    url: '/',
  },
  links: [
    { text: 'Docs', url: '/docs', active: 'nested-url' },
    { text: 'Foundations', url: '/docs/foundations', active: 'nested-url' },
    { text: 'Components', url: '/docs/components/button', active: 'nested-url' },
    { text: 'Blocks', url: '/docs/blocks/page-header', active: 'nested-url' },
    { text: 'uranus.com.br', url: 'https://uranus.com.br', external: true },
  ],
};
