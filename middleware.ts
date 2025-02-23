import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Handle SEO-friendly URLs
  if (url.pathname.startsWith('/bungee-fitness-')) {
    const city = url.pathname.replace('/bungee-fitness-', '').toLowerCase();
    url.pathname = `/${city}`;
    return NextResponse.redirect(url);
  }

  // Add canonical URLs for city pages
  if (url.pathname !== '/' && !url.pathname.startsWith('/bungee-fitness-')) {
    const canonical = new URL(url.toString());
    canonical.pathname = `/bungee-fitness-${url.pathname.slice(1)}`;
    const response = NextResponse.next();
    response.headers.set('Link', `<${canonical.toString()}>; rel="canonical"`);
    return response;
  }

  return NextResponse.next();
}

// Configure which routes the middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};