import { createClient } from '@supabase/supabase-js';
import { Database } from './types';
import { Studio } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Tables = Database['public']['Tables'];
export type City = Tables['cities']['Row'];
export type Program = Tables['studio_programs']['Row'];
export type PricingPlan = Tables['studio_pricing']['Row'];
export type Review = Tables['studio_reviews']['Row'];

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

  if (cityError || !city) {
    console.error('Error fetching city:', cityError);
    return null;
  }

  // Single query for all studios with their related data
  const { data: rawStudios, error: studiosError } = await supabase
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

  if (studiosError) {
    console.error('Error fetching studios:', studiosError);
    return null;
  }

  // Transform raw studio data to match the Studio type
  const studios: Studio[] = rawStudios?.map(studio => ({
    id: studio.id,
    cityId: studio.city_id,
    name: studio.name,
    slug: studio.slug,
    businessStatus: studio.business_status,
    rating: studio.rating || undefined,
    reviewCount: studio.review_count || 0,
    priceLevel: studio.price_level,
    address: studio.address,
    neighborhood: studio.neighborhood || undefined,
    postalCode: studio.postal_code || undefined,
    latitude: studio.latitude || 0,
    longitude: studio.longitude || 0,
    phone: studio.phone || undefined,
    email: studio.email || undefined,
    website: studio.website || undefined,
    instagramHandle: studio.instagram_handle || undefined,
    facebookUrl: studio.facebook_url || undefined,
    description: studio.description || undefined,
    amenities: studio.amenities || {},
    hoursOfOperation: studio.hours_of_operation || {},
    weightLimits: studio.weight_limits || undefined,
    ageLimit: studio.age_limit || undefined,
    featured: studio.featured,
    verified: studio.verified,
    createdAt: studio.created_at,
    updatedAt: studio.updated_at,
    featured_image_path: studio.featured_image_path || undefined,
    gallery_image_paths: studio.gallery_image_paths || [],
    booking_url: studio.booking_url || undefined,
    mapsUrl: studio.maps_url || undefined,

    // Transform related data
    programs: studio.studio_programs?.map(program => ({
      id: program.id,
      name: program.name,
      description: program.description || undefined,
      duration: program.duration,
      level: program.level || undefined,
      prerequisites: program.prerequisites || undefined
    })) || [],

    pricing: studio.studio_pricing?.map(price => ({
      id: price.id,
      name: price.name,
      price: price.price,
      duration: price.duration,
      description: price.description || '',
      features: price.features || {}
    })) || [],

    reviews: studio.studio_reviews?.map(review => ({
      id: review.id,
      authorName: review.author_name,
      rating: review.rating,
      reviewText: review.review_text || undefined,
      reviewDate: review.review_date,
      source: review.source || undefined
    })) || []
  })) || [];

  return {
    ...city,
    studios
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
