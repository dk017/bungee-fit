import { createClient } from '@supabase/supabase-js';
import { Database } from './types';
import { Studio } from './types';
import { cache } from 'react'


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
  if (error) {
    console.error('Error fetching city data:', error);
    return null;
  }

  return data;
}

// Cache the data fetching function
export const getCityWithRelatedData = cache(async (citySlug: string) => {
  const cleanSlug = citySlug.replace("bungee-fitness-", "").toLowerCase();
  // First get the city with .single() since we expect one city
  const { data: cityData, error: cityError } = await supabase
    .from("cities")
    .select(`
      id,
      name,
      state,
      country,
      slug,
      description,
      featured
    `)
    .eq("slug", cleanSlug)
    .single();


  if (cityError || !cityData) {
    console.error('Error fetching city:', cityError);
    return null;
  }

  // Then get studios for this city
  // First query - just studios
  const { data: basicStudios, error: basicError } = await supabase
    .from("studios")
    .select("*")
    .eq("city_id", cityData.id)
    .eq("business_status", "OPERATIONAL");

  // Second query - studios with related data using inner joins
  const { data: detailedStudios, error: detailedError } = await supabase
    .from("studios")
    .select(`
      *,
      studio_programs!inner (*),
      studio_pricing!inner (*),
      studio_reviews!inner (*)
    `)
    .eq("city_id", cityData.id)
    .eq("business_status", "OPERATIONAL");

  // Third query - check which studios have missing related data
  if (basicStudios) {
    for (const studio of basicStudios) {
      const { data: programs } = await supabase
        .from("studio_programs")
        .select("count")
        .eq("studio_id", studio.id);

      const { data: pricing } = await supabase
        .from("studio_pricing")
        .select("count")
        .eq("studio_id", studio.id);

      const { data: reviews } = await supabase
        .from("studio_reviews")
        .select("count")
        .eq("studio_id", studio.id);

    }
  }

  // Use left joins instead of inner joins to get all studios
  const { data: rawStudios, error: studiosError } = await supabase
    .from("studios")
    .select(`
      *,
      studio_programs (*),
      studio_pricing (*),
      studio_reviews (*)
    `)
    .eq("city_id", cityData.id)
    .eq("business_status", "OPERATIONAL");

  // Transform raw studio data to match the Studio type
  const studios: Studio[] = rawStudios?.map(studio => ({
    id: studio.id,
    cityId: studio.city_id,
    name: studio.name,
    country: cityData.country,
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

  // Return combined data
  return {
    ...cityData,
    studios
  };
});

export async function getCountryCities(country: string) {
  try {
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
      .order('name', { ascending: true });

    if (citiesError) {
      console.error('Error fetching cities:', citiesError);
      return { cities: null, error: citiesError };
    }

    // Transform the data to include studio count
    const citiesWithStudios = cities?.map(city => ({
      id: city.id,
      name: city.name,
      state: city.state,
      country: city.country,
      slug: city.slug,
      featured: city.featured,
      studioCount: city.studios?.filter(studio => studio.business_status === 'OPERATIONAL').length || 0,
      description: city.description,
      averageRating: city.studios?.length 
        ? city.studios.reduce((acc, studio) => acc + (studio.rating || 0), 0) / city.studios.length 
        : 0,
      totalReviews: city.studios?.reduce((acc, studio) => acc + (studio.review_count || 0), 0) || 0,
      studios: city.studios
    }));

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

export async function getCityStudios(country: string, city: string) {
  try {
    // First get the city ID
    const { data: cityData, error: cityError } = await supabase
      .from('cities')
      .select('id')
      .eq('slug', city)
      .single();

    if (cityError || !cityData) {
      console.error('Error fetching city:', cityError);
      return { studios: null, error: 'City not found' };
    }

    // Then get studios for this city
    const { data: studios, error } = await supabase
      .from('studios')
      .select(`
        *,
        studio_programs (*),
        studio_pricing (*),
        studio_reviews (*)
      `)
      .eq('city_id', cityData.id)
      .eq('business_status', 'OPERATIONAL');

    if (error) {
      console.error('Error fetching studios:', error);
      return { studios: null, error };
    }

    return { studios, error: null };
  } catch (error) {
    console.error('Error in getCityStudios:', error);
    return { studios: null, error: 'Failed to fetch studios' };
  }
}

// Updated types to match the actual database schema
