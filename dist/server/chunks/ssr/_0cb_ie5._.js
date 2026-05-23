module.exports=[52562,a=>{"use strict";let b=(0,a.i(64831).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);a.s(["Check",0,b],52562)},92046,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(64831);let e=(0,d.default)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);var f=a.i(52562);let g=(0,d.default)("database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]),h=(0,d.default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);var i=a.i(38246);let j=`-- Enable UUID extension
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
  FOR SELECT USING (true);`;a.s(["default",0,function(){let[a,d]=(0,c.useState)(!1),k=async()=>{await navigator.clipboard.writeText(j),d(!0),setTimeout(()=>d(!1),2e3)};return(0,b.jsxs)("main",{className:"min-h-screen bg-gray-50",children:[(0,b.jsx)("div",{className:"bg-[#371a5b] text-white",children:(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",children:[(0,b.jsxs)(i.default,{href:"/",className:"inline-flex items-center text-white/80 hover:text-white mb-4",children:[(0,b.jsx)(h,{className:"w-4 h-4 mr-2"}),"Back to Home"]}),(0,b.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,b.jsx)(g,{className:"w-8 h-8 text-[#54afe6]"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{className:"text-2xl font-bold",style:{fontFamily:"Montserrat, sans-serif"},children:"Supabase Database Schema"}),(0,b.jsx)("p",{className:"text-white/70 text-sm",children:"Copy this SQL and run it in your Supabase SQL Editor"})]})]})]})}),(0,b.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[(0,b.jsxs)("div",{className:"bg-white rounded-xl shadow-sm p-6 mb-6",children:[(0,b.jsx)("h2",{className:"text-lg font-semibold text-[#371a5b] mb-4",children:"How to Apply This Schema"}),(0,b.jsxs)("ol",{className:"space-y-3 text-gray-700",children:[(0,b.jsxs)("li",{className:"flex items-start",children:[(0,b.jsx)("span",{className:"bg-[#54afe6] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5",children:"1"}),(0,b.jsxs)("span",{children:["Go to ",(0,b.jsx)("a",{href:"https://supabase.com/dashboard/project/catwmqztvgmdwiusroar",target:"_blank",rel:"noopener noreferrer",className:"text-[#54afe6] hover:underline",children:"your Supabase Dashboard"})]})]}),(0,b.jsxs)("li",{className:"flex items-start",children:[(0,b.jsx)("span",{className:"bg-[#54afe6] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5",children:"2"}),(0,b.jsx)("span",{children:'Click "SQL Editor" in the left sidebar'})]}),(0,b.jsxs)("li",{className:"flex items-start",children:[(0,b.jsx)("span",{className:"bg-[#54afe6] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5",children:"3"}),(0,b.jsx)("span",{children:'Click "New Query"'})]}),(0,b.jsxs)("li",{className:"flex items-start",children:[(0,b.jsx)("span",{className:"bg-[#54afe6] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5",children:"4"}),(0,b.jsx)("span",{children:"Copy the SQL below (click the copy button)"})]}),(0,b.jsxs)("li",{className:"flex items-start",children:[(0,b.jsx)("span",{className:"bg-[#54afe6] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5",children:"5"}),(0,b.jsx)("span",{children:'Paste into the SQL Editor and click "Run"'})]})]})]}),(0,b.jsxs)("div",{className:"bg-gray-900 rounded-xl overflow-hidden",children:[(0,b.jsxs)("div",{className:"flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700",children:[(0,b.jsx)("span",{className:"text-gray-400 text-sm font-mono",children:"schema.sql"}),(0,b.jsx)("button",{onClick:k,className:"flex items-center space-x-2 text-gray-400 hover:text-white transition-colors",children:a?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(f.Check,{className:"w-4 h-4 text-green-400"}),(0,b.jsx)("span",{className:"text-sm text-green-400",children:"Copied!"})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(e,{className:"w-4 h-4"}),(0,b.jsx)("span",{className:"text-sm",children:"Copy"})]})})]}),(0,b.jsx)("div",{className:"overflow-x-auto",children:(0,b.jsx)("pre",{className:"p-6 text-sm font-mono text-gray-300 leading-relaxed",children:(0,b.jsx)("code",{children:j})})})]}),(0,b.jsxs)("div",{className:"mt-8 grid md:grid-cols-2 gap-6",children:[(0,b.jsxs)("div",{className:"bg-white rounded-xl shadow-sm p-6",children:[(0,b.jsx)("h3",{className:"text-lg font-semibold text-[#371a5b] mb-4",children:"Tables Created"}),(0,b.jsxs)("ul",{className:"space-y-2 text-gray-700",children:[(0,b.jsxs)("li",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"w-2 h-2 bg-[#54afe6] rounded-full mr-3"}),(0,b.jsx)("code",{className:"bg-gray-100 px-2 py-1 rounded text-sm",children:"businesses"}),(0,b.jsx)("span",{className:"ml-2 text-gray-500",children:"- Main business listings"})]}),(0,b.jsxs)("li",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"w-2 h-2 bg-[#54afe6] rounded-full mr-3"}),(0,b.jsx)("code",{className:"bg-gray-100 px-2 py-1 rounded text-sm",children:"reviews"}),(0,b.jsx)("span",{className:"ml-2 text-gray-500",children:"- Customer reviews"})]})]})]}),(0,b.jsxs)("div",{className:"bg-white rounded-xl shadow-sm p-6",children:[(0,b.jsx)("h3",{className:"text-lg font-semibold text-[#371a5b] mb-4",children:"Sample Data Included"}),(0,b.jsxs)("ul",{className:"space-y-2 text-gray-700",children:[(0,b.jsxs)("li",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"w-2 h-2 bg-[#ffc107] rounded-full mr-3"}),"True Products Marketing (VIP)"]}),(0,b.jsxs)("li",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"w-2 h-2 bg-[#bb7ce4] rounded-full mr-3"}),"AIM Training & Consultancy (Premium)"]}),(0,b.jsxs)("li",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"w-2 h-2 bg-[#bb7ce4] rounded-full mr-3"}),"Missouri SEO Agency (Premium)"]}),(0,b.jsxs)("li",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"w-2 h-2 bg-[#ffc107] rounded-full mr-3"}),"MJM Lawn & Land (VIP)"]}),(0,b.jsxs)("li",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"w-2 h-2 bg-gray-400 rounded-full mr-3"}),"Schneider Roofing (Free)"]}),(0,b.jsxs)("li",{className:"flex items-center",children:[(0,b.jsx)("span",{className:"w-2 h-2 bg-[#bb7ce4] rounded-full mr-3"}),"Elite Dental Care (Premium)"]})]})]})]})]})]})}],92046)}];

//# sourceMappingURL=_0cb_ie5._.js.map