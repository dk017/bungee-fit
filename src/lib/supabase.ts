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

// Optional: Add function to get related data
export async function getCityWithRelatedData(citySlug: string) {
  const { data: city, error: cityError } = await supabase
    .from('cities')
    .select(`
      *,
      studios (
        *,
        programs (*),
        pricing_plans (*),
        instructors (*)
      )
    `)
    .eq('slug', citySlug)
    .single();

  if (cityError) {
    console.error('Error fetching city with related data:', cityError);
    return null;
  }

  return city;
}