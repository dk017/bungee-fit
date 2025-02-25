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

  // Get studios with all related data
  const { data: studios, error: studiosError } = await supabase
    .from("studios")
    .select(`
      *,
      studio_programs (
        id,
        name,
        description,
        duration,
        level,
        prerequisites
      ),
      studio_pricing (
        id,
        name,
        price,
        duration,
        description,
        features
      ),
      studio_reviews (
        id,
        author_name,
        rating,
        review_text,
        review_date,
        source,
        verified
      ),
      studio_instructors (
        id,
        name,
        bio,
        photo_url,
        certifications
      )
    `)
    .eq("city_id", city.id)
    .eq("business_status", "OPERATIONAL");

  if (studiosError || !studios) {
    console.error('Error fetching studios:', studiosError);
    return null;
  }

  // Transform the data to match our Studio type
  const transformedStudios = studios.map((studio) => {
    // Parse hours of operation
    const rawHours = typeof studio.hours_of_operation === 'string'
      ? JSON.parse(studio.hours_of_operation)
      : studio.hours_of_operation;

    const formattedHours = Object.entries(rawHours || {}).reduce((acc, [day, hours]) => {
      if (hours === "Closed") {
        acc[day.toLowerCase()] = { closed: true };
      } else if (typeof hours === "string") {
        const [open, close] = hours.replace(" AM", "").replace(" PM", "").split(" - ");
        acc[day.toLowerCase()] = { open, close };
      }
      return acc;
    }, {});

    // Transform weight limits
    const weightLimits = typeof studio.weight_limits === 'string'
      ? JSON.parse(studio.weight_limits)
      : studio.weight_limits;

    return {
      id: studio.id,
      cityId: studio.city_id,
      name: studio.name,
      slug: studio.slug,
      businessStatus: studio.business_status,
      rating: studio.rating,
      reviewCount: studio.review_count,
      priceLevel: studio.price_level,
      address: studio.address,
      neighborhood: studio.neighborhood,
      postalCode: studio.postal_code,
      latitude: parseFloat(studio.latitude),
      longitude: parseFloat(studio.longitude),
      phone: studio.phone,
      email: studio.email,
      website: studio.website,
      instagramHandle: studio.instagram_handle,
      facebookUrl: studio.facebook_url,
      description: studio.description,
      amenities: studio.amenities,
      hoursOfOperation: formattedHours,
      weightLimits: weightLimits,
      ageLimit: studio.age_limit,
      featured: studio.featured,
      verified: studio.verified,
      createdAt: studio.created_at,
      updatedAt: studio.updated_at,
      pricing: studio.studio_pricing,
      programs: studio.studio_programs,
      featured_image_path: studio.featured_image_path,
      gallery_image_paths: studio.gallery_image_paths,
      booking_url: studio.booking_url,
      reviews: studio.studio_reviews?.map((review) => ({
        id: review.id,
        authorName: review.author_name,
        rating: review.rating,
        reviewText: review.review_text,
        reviewDate: review.review_date,
        source: review.source,
      })) || [],
    };
  });

  return {
    ...city,
    studios: transformedStudios,
  };
}