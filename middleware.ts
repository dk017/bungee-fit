import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cityCountryMap } from './src/lib/city-country'; // adjust path as needed

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Match only old URLs (not already country-prefixed)
  const match = pathname.match(/^\/bungee-fitness-([^/]+)$/);
  if (match) {
    const citySlug = match[1].toLowerCase();
    // Lookup country for city, default to 'us'
    const country = cityCountryMap[citySlug] || 'us';
    const newUrl = `${origin}/${country}/bungee-fitness-${citySlug}`;
    return NextResponse.redirect(newUrl, 301);
  }

  // Otherwise, continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
