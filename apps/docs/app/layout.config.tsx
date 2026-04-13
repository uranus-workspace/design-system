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
  // Fumadocs renders a GitHub icon link in the nav when this is set.
  githubUrl: 'https://github.com/uranus-workspace/design-system',
  links: [
    { text: 'Documentação', url: '/docs', active: 'nested-url' },
    { text: 'Fundamentos', url: '/docs/foundations', active: 'nested-url' },
    { text: 'Componentes', url: '/docs/components/button', active: 'nested-url' },
    { text: 'Blocos', url: '/docs/blocks/page-header', active: 'nested-url' },
    { text: 'uranus.com.br', url: 'https://uranus.com.br', external: true },
  ],
};
