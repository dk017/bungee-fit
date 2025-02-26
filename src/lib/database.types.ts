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
        };
      };
      studios: {
        Row: {
          id: string;
          city_id: string;
          name: string;
          slug: string;
          address: string;
          description: string | null;
          phone: string | null;
          email: string | null;
          website: string | null;
          max_weight_limit: number | null;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      programs: {
        Row: {
          id: string;
          studio_id: string;
          name: string;
          description: string | null;
          duration: string | null;
          level: string | null;
          created_at: string;
        };
      };
      pricing_plans: {
        Row: {
          id: string;
          studio_id: string;
          name: string;
          price: number;
          description: string | null;
          duration: string | null;
          classes_included: number | null;
          created_at: string;
        };
      };
      instructors: {
        Row: {
          id: string;
          studio_id: string;
          name: string;
          bio: string | null;
          specialties: string[] | null;
          image_url: string | null;
          created_at: string;
        };
      };
      articles: {
        Row: {
          id: string;
          city_id: string;
          title: string;
          slug: string;
          content: string;
          meta_title: string | null;
          meta_description: string | null;
          featured_image: string | null;
          author_name: string | null;
          author_bio: string | null;
          author_image: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          studio_id: string;
          author_name: string;
          content: string;
          rating: number;
          created_at: string;
        };
      };
    };
  };
}