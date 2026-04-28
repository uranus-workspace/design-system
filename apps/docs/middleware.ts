import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

function prefersMarkdown(accept: string | null): boolean {
  if (!accept) {
    return false;
  }
  for (const part of accept.split(',')) {
    const trimmed = part.trim();
    const semi = trimmed.indexOf(';');
    const type = semi === -1 ? trimmed : trimmed.slice(0, semi).trim();
    let q = 1;
    if (semi !== -1) {
      for (const param of trimmed
        .slice(semi + 1)
        .split(';')
        .map((s) => s.trim())) {
        if (param.startsWith('q=')) {
          q = Number.parseFloat(param.slice(2)) || 0;
        }
      }
    }
    if (type === 'text/markdown' && q > 0) {
      return true;
    }
  }
  return false;
}

export function middleware(request: NextRequest) {
  if (!prefersMarkdown(request.headers.get('accept'))) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/api/agent-markdown/home';
    return NextResponse.rewrite(url);
  }

  if (pathname === '/docs' || pathname.startsWith('/docs/')) {
    const rest =
      pathname === '/docs' || pathname === '/docs/' ? '' : pathname.slice('/docs/'.length);
    const url = request.nextUrl.clone();
    url.pathname = rest ? `/api/agent-markdown/docs/${rest}` : '/api/agent-markdown/docs';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/docs', '/docs/:path*'],
};
