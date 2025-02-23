/*
  # Create leads table for storing customer inquiries

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text)
      - `message` (text)
      - `city` (text, required)
      - `interest` (text, required)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `leads` table
    - Add policy for authenticated users to read their own leads
    - Add policy for inserting new leads (public access)
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  city text NOT NULL,
  interest text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to insert leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read their own leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid()
    FROM auth.users
    WHERE email = leads.email
  ));