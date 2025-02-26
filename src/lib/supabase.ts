import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Tables = Database['public']['Tables'];
export type City = Tables['cities']['Row'];
export type Studio = Tables['studios']['Row'];
export type Program = Tables['programs']['Row'];
export type PricingPlan = Tables['pricing_plans']['Row'];
export type Instructor = Tables['instructors']['Row'];
export type Article = Tables['articles']['Row'];
export type Testimonial = Tables['testimonials']['Row'];

export async function getCityData(citySlug: string): Promise<City | null> {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', citySlug)
    .single();
  console.log(data?.description);
  if (error) {
    console.error('Error fetching city data:', error);
    return null;
  }

  return data;
}

export async function getCityWithRelatedData(citySlug: string) {
  const cleanSlug = citySlug.replace("bungee-fitness-", "").toLowerCase();

  // First get the city
  const { data: city, error: cityError } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", cleanSlug)
    .single();

  console.log(city);

  if (cityError || !city) {
    console.error('Error fetching city:', cityError);
    return null;
  }

  // Single query for all studios with their related data
  const { data: studios, error: studiosError } = await supabase
    .from("studios")
    .select(`
      *,
      studio_programs (*),
      studio_pricing (*),
      studio_reviews (*),
      studio_instructors (*)
    `)
    .eq("city_id", city.id)
    .eq("business_status", "OPERATIONAL");

  // Log only once
  console.log(`Found ${studios?.length || 0} operational studios in ${city.name}`);

  if (studiosError) {
    console.error('Error fetching studios:', studiosError);
    return null;
  }

  return {
    ...city,
    studios: studios || []
  };
}

export async function getCountryCities(country: string) {
  try {
    console.log('Fetching cities for country:', country);

    // Remove description from the query since it doesn't exist
    const { data: cities, error: citiesError } = await supabase
      .from('cities')
      .select(`
        id,
        name,
        state,
        country,
        slug,
        featured,
        description,
        studios (
          id,
          name,
          rating,
          review_count,
          business_status
        )
      `)
      .eq('country', country)
      .eq('studios.business_status', 'OPERATIONAL')
      .order('name', { ascending: true });

    if (citiesError) {
      console.error('Error fetching cities:', citiesError);
      return { cities: null, error: citiesError };
    }

    // Transform the data to include studio count and filter out cities with no active studios
    const citiesWithStudios = cities
      ?.filter(city => city.studios && city.studios.length > 0)
      ?.map(city => ({
        id: city.id,
        name: city.name,
        state: city.state,
        country: city.country,
        slug: city.slug,
        featured: city.featured,
        studioCount: city.studios.length,
        description: city.description,
        averageRating: city.studios.reduce((acc, studio) => acc + (studio.rating || 0), 0) / city.studios.length,
        totalReviews: city.studios.reduce((acc, studio) => acc + (studio.review_count || 0), 0),
        studios: city.studios
      }));

    console.log(`Found ${citiesWithStudios?.length || 0} cities with active studios in ${country}`);

    return {
      cities: citiesWithStudios || [],
      error: null
    };

  } catch (error) {
    console.error('Error in getCountryCities:', error);
    return {
      cities: null,
      error: 'Failed to fetch cities'
    };
  }
}

// Updated types to match the actual database schema
