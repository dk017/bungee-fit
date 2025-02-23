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