import { MetadataRoute } from 'next';
import { cityCountryMap } from '../lib/city-country';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bungeefitnessnear.me';
  
  // Create entries for each city with the new URL structure
  const cityEntries = Object.entries(cityCountryMap).map(([citySlug, country]) => ({
    url: `${baseUrl}/${country}/bungee-fitness-${citySlug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Add static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...cityEntries];
}