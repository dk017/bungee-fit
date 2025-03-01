// Database Types

type HoursOfOperation = {
  [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']:
    | string
    | {
        open?: string;
        close?: string;
        closed?: boolean;
      };
};
export interface Database {
  public: {
    Tables: {
      cities: {
        Row: {
          id: string;
          name: string;
          state: string | null;
          country: string;
          region: string | null;
          slug: string;
          meta_title: string | null;
          meta_description: string | null;
          featured: boolean;
          created_at: string;
          updated_at: string;
          description: string | null;
          unique_features: Record<string, any> | null;
        };
      };
      studios: {
        Row: {
          id: string;
          city_id: string;
          name: string;
          slug: string;
          business_status: 'OPERATIONAL' | 'CLOSED' | 'TEMPORARILY_CLOSED';
          rating: number | null;
          review_count: number | null;
          price_level: '$' | '$$' | '$$$' | '$$$$' | null;
          address: string;
          neighborhood: string | null;
          postal_code: string | null;
          latitude: number | null;
          longitude: number | null;
          phone: string | null;
          email: string | null;
          website: string | null;
          instagram_handle: string | null;
          facebook_url: string | null;
          description: string | null;
          amenities: Record<string, boolean> | null;
          hours_of_operation: HoursOfOperation | null;
          weight_limits: { min: number; max: number } | null;
          age_limit: number | null;
          featured: boolean;
          verified: boolean;
          created_at: string;
          updated_at: string;
          featured_image_path: string | null;
          gallery_image_paths: string[] | null;
          booking_url: string | null;
          maps_url: string | null;
        };
      };
      studio_programs: {
        Row: {
          id: string;
          studio_id: string;
          name: string;
          description: string | null;
          duration: number;
          level: string | null;
          prerequisites: string | null;
          created_at: string;
        };
      };
      studio_pricing: {
        Row: {
          id: string;
          studio_id: string;
          name: string;
          price: number;
          duration: string;
          description: string | null;
          features: Record<string, any> | null;
          created_at: string;
        };
      };
      studio_reviews: {
        Row: {
          id: string;
          studio_id: string;
          author_name: string;
          rating: number;
          review_text: string | null;
          review_date: string;
          source: string | null;
          verified: boolean;
        };
      };
    };
  };
}

// Component Types
export interface Studio {
  id: string;
  cityId: string;
  name: string;
  slug: string;
  businessStatus: 'OPERATIONAL' | 'CLOSED' | 'TEMPORARILY_CLOSED';
  rating?: number;
  reviewCount: number;
  priceLevel?: '$' | '$$' | '$$$' | '$$$$';
  address: string;
  neighborhood?: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  website?: string;
  instagramHandle?: string;
  facebookUrl?: string;
  description?: string;
  amenities: Record<string, boolean>;
  hoursOfOperation: HoursOfOperation;
  weightLimits?: {
    min: number;
    max: number;
  };
  ageLimit?: number;
  featured: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  featured_image_path?: string;
  gallery_image_paths: string[];
  booking_url?: string;
  mapsUrl?: string;

  // Related data
  programs: Array<{
    id: string;
    name: string;
    description?: string;
    duration: number;
    level?: string;
    prerequisites?: string;
  }>;

  pricing: Array<{
    id: string;
    name: string;
    price: number;
    duration: string;
    description: string;
    features: Record<string, any>;
  }>;

  reviews: Array<{
    id: string;
    authorName: string;
    rating: number;
    reviewText?: string;
    reviewDate: string;
    source?: string;
  }>;
}

export type Tables = Database['public']['Tables'];
export type City = Tables['cities']['Row'];
export type StudioProgram = Tables['studio_programs']['Row'];
export type StudioPricing = Tables['studio_pricing']['Row'];
export type StudioReview = Tables['studio_reviews']['Row'];