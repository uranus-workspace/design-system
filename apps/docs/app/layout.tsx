import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import './global.css';

export const metadata = {
  title: {
    default: 'Uranus Design System',
    template: '%s · Uranus Design System',
  },
  description:
    'The Uranus Technologies design system — tokens, foundations, components, blocks, and guidelines.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
