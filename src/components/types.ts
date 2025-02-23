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
    amenities?: Record<string, any>;
    hoursOfOperation: Record<string, { open: string; close: string; closed?: boolean }>;
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
    gallery_image_paths?: string[];
    pricing: Array<{
      id: string;
      name: string;
      price: number;
      duration: string;
      description: string;
      features: any;
    }>;
    // Add related table interfaces
  programs?: Array<{
    id: string;
    name: string;
    description?: string;
    duration: number;
    level?: string;
    prerequisites?: string;
  }>;
  reviews?: Array<{
    id: string;
    authorName: string;
    rating: number;
    reviewText?: string;
    reviewDate: string;
    source?: string;
  }>;
  booking_url?: string;
  }