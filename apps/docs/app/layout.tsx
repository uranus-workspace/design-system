import { RootProvider } from 'fumadocs-ui/provider';
import { Poppins } from 'next/font/google';
import type { ReactNode } from 'react';
import './global.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://uranus.com.br'),
  title: {
    default: 'Uranus Design System',
    template: '%s · Uranus Design System',
  },
  description:
    'The Uranus Technologies design system — tokens, foundations, components, blocks, and guidelines. Built for uranus.com.br.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Uranus Design System',
    description:
      'The Uranus Technologies design system — cosmic tokens, Poppins typography, and production-ready React components.',
    url: 'https://uranus.com.br',
    siteName: 'Uranus',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={poppins.variable}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
