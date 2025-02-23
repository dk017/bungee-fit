/*
  # City Content Schema

  1. New Tables
    - `cities`
      - Core city information
      - Includes name, state, country, slug
    - `studios`
      - Bungee fitness studios in each city
      - Includes location, programs, pricing
    - `instructors`
      - Studio instructors
    - `articles`
      - City-specific content and guides
    - `testimonials`
      - User reviews for studios
    
  2. Security
    - Enable RLS on all tables
    - Public read access for content
    - Authenticated write access for admin users
*/

-- Cities table
CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  state text,
  country text NOT NULL,
  region text,
  slug text UNIQUE NOT NULL,
  meta_title text,
  meta_description text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Studios table
CREATE TABLE IF NOT EXISTS studios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES cities(id),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  address text NOT NULL,
  description text,
  phone text,
  email text,
  website text,
  max_weight_limit integer,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Studio Programs
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id uuid REFERENCES studios(id),
  name text NOT NULL,
  description text,
  duration text,
  level text,
  created_at timestamptz DEFAULT now()
);

-- Pricing Plans
CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id uuid REFERENCES studios(id),
  name text NOT NULL,
  price decimal(10,2) NOT NULL,
  description text,
  duration text,
  classes_included integer,
  created_at timestamptz DEFAULT now()
);

-- Instructors
CREATE TABLE IF NOT EXISTS instructors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id uuid REFERENCES studios(id),
  name text NOT NULL,
  bio text,
  specialties text[],
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Articles
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id uuid REFERENCES cities(id),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  meta_title text,
  meta_description text,
  featured_image text,
  author_name text,
  author_bio text,
  author_image text,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id uuid REFERENCES studios(id),
  author_name text NOT NULL,
  content text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public to read cities"
  ON cities FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow public to read studios"
  ON studios FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow public to read programs"
  ON programs FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow public to read pricing_plans"
  ON pricing_plans FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow public to read instructors"
  ON instructors FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow public to read articles"
  ON articles FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow public to read testimonials"
  ON testimonials FOR SELECT TO public
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS cities_slug_idx ON cities(slug);
CREATE INDEX IF NOT EXISTS studios_city_id_idx ON studios(city_id);
CREATE INDEX IF NOT EXISTS articles_city_id_idx ON articles(city_id);
CREATE INDEX IF NOT EXISTS articles_slug_idx ON articles(slug);