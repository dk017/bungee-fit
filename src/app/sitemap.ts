import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all cities from your database
  const { data: cities } = await supabase
    .from('cities')
    .select('slug, updated_at');

  const baseUrl = 'https://bungeefitnessnear.me';

  // Start with static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Add dynamic city routes
  if (cities) {
    const cityRoutes = cities.map((city) => ({
      url: `${baseUrl}/bungee-fitness-${city.slug}`,
      lastModified: new Date(city.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
    routes.push(...cityRoutes);
  }

  return routes;
}