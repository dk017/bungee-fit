import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cityCountryMap } from './lib/city-country';

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Match only old URLs (not already country-prefixed)
  const match = pathname.match(/^\/bungee-fitness-([^/]+)$/);
  console.error('URL Match:', { match, citySlug: match ? match[1].toLowerCase() : null });

  if (match) {
    const citySlug = match[1].toLowerCase();
    // Lookup country for city, default to 'us'
    const country = cityCountryMap[citySlug] || 'us';
    const newUrl = `${origin}/${country}/bungee-fitness-${citySlug}`;
    console.error('Redirecting to:', newUrl);
    return NextResponse.redirect(newUrl, 301);
  }

  return NextResponse.next();
}

// Only match the specific old URL pattern we want to redirect
export const config = {
  matcher: [
    '/bungee-fitness-:city*',
  ],
};