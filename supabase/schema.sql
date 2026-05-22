-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create businesses table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL,
  subcategories TEXT[] DEFAULT '{}',
  
  -- Location
  address TEXT,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'USA',
  
  -- Contact
  phone VARCHAR(50),
  email VARCHAR(255),
  website VARCHAR(500),
  
  -- Content
  description TEXT,
  short_description VARCHAR(500),
  services TEXT[] DEFAULT '{}',
  
  -- Media
  logo_url TEXT,
  photos TEXT[] DEFAULT '{}',
  cover_image TEXT,
  
  -- Membership
  tier VARCHAR(20) DEFAULT 'free' CHECK (tier IN ('free', 'premium', 'vip')),
  is_featured BOOLEAN DEFAULT false,
  featured_until TIMESTAMP WITH TIME ZONE,
  
  -- Ratings
  rating DECIMAL(2,1) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  
  -- Social
  facebook_url TEXT,
  instagram_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  
  -- Business hours (stored as JSON)
  business_hours JSONB,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  claimed_by UUID,
  is_verified BOOLEAN DEFAULT false,
  
  -- Search vector for full-text search
  search_vector tsvector
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster searches
CREATE INDEX idx_businesses_category ON businesses(category);
CREATE INDEX idx_businesses_city ON businesses(city);
CREATE INDEX idx_businesses_state ON businesses(state);
CREATE INDEX idx_businesses_tier ON businesses(tier);
CREATE INDEX idx_businesses_featured ON businesses(is_featured) WHERE is_featured = true;
CREATE INDEX idx_businesses_verified ON businesses(is_verified);
CREATE INDEX idx_businesses_search ON businesses USING GIN(search_vector);

-- Create function to update search vector
CREATE OR REPLACE FUNCTION update_business_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.category, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.city, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(NEW.services::text, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update search vector
CREATE TRIGGER businesses_search_vector_update
  BEFORE INSERT OR UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_business_search_vector();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO businesses (
  name, slug, category, subcategories, city, state, 
  phone, email, website, description, short_description,
  tier, is_featured, is_verified, rating, review_count
) VALUES 
(
  'True Products Marketing',
  'true-products-marketing',
  'Marketing Agency',
  ARRAY['SEO', 'Web Design', 'Social Media'],
  'Chesterfield', 'MO',
  '(314) 886-8084',
  'info@trueproductsnetwork.com',
  'https://trueproductsnetwork.com',
  'Full-service digital marketing agency helping local businesses grow online presence. We specialize in SEO, web design, and social media marketing.',
  'Digital marketing agency specializing in SEO and web design',
  'vip', true, true, 5.0, 47
),
(
  'AIM Training & Consultancy',
  'aim-training-consultancy',
  'Business Training',
  ARRAY['Training', 'Consulting', 'Coaching'],
  'St. Louis', 'MO',
  '(314) 555-0123',
  'info@aimtraining.com',
  'https://aimtraining.com',
  'Professional training and consulting services for businesses of all sizes.',
  'Business training and consulting services',
  'premium', true, true, 4.9, 32
),
(
  'Missouri SEO Agency',
  'missouri-seo-agency',
  'SEO Services',
  ARRAY['SEO', 'PPC', 'Analytics'],
  'St. Charles', 'MO',
  '(636) 555-0456',
  'info@missouriseo.com',
  'https://missouriseo.com',
  'Expert SEO services to get your business ranking on page one of Google.',
  'Expert SEO services for local businesses',
  'premium', false, true, 4.8, 28
),
(
  'MJM Lawn & Land',
  'mjm-lawn-land',
  'Landscaping',
  ARRAY['Lawn Care', 'Landscaping', 'Maintenance'],
  'Chesterfield', 'MO',
  '(314) 555-0789',
  'info@mjmlawn.com',
  'https://mjmlawn.com',
  'Professional lawn care and landscaping services for residential and commercial properties.',
  'Professional lawn care and landscaping',
  'vip', true, true, 4.9, 56
),
(
  'Schneider Roofing',
  'schneider-roofing',
  'Roofing Services',
  ARRAY['Roofing', 'Repairs', 'Inspections'],
  'St. Louis', 'MO',
  '(314) 555-0321',
  'info@schneiderroofing.com',
  'https://schneiderroofing.com',
  'Family-owned roofing company serving St. Louis for over 30 years.',
  'Family-owned roofing company',
  'free', false, true, 4.7, 89
),
(
  'Elite Dental Care',
  'elite-dental-care',
  'Dental Services',
  ARRAY['Dental', 'Cosmetic', 'Family'],
  'St. Charles', 'MO',
  '(636) 555-0654',
  'info@elitedental.com',
  'https://elitedental.com',
  'Comprehensive dental care with state-of-the-art technology.',
  'Comprehensive dental care',
  'premium', false, true, 4.9, 124
);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON businesses
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON reviews
  FOR SELECT USING (true);
