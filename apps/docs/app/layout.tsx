import { WebMcpTools } from '@/components/web-mcp-tools';
import { getSiteUrl } from '@/lib/site';
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

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Uranus Design System',
    template: '%s · Uranus Design System',
  },
  description:
    'The Uranus Technologies design system — tokens, foundations, components, blocks, and guidelines. Built for Uranus products.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Uranus Design System',
    description:
      'The Uranus Technologies design system — cosmic tokens, Poppins typography, and production-ready React components.',
    url: siteUrl,
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
        <WebMcpTools />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
