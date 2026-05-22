export interface BusinessListing {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategories: string[];
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  short_description: string;
  services: string[];
  logo_url: string | null;
  photos: string[];
  cover_image: string | null;
  tier: 'free' | 'premium' | 'vip';
  is_featured: boolean;
  featured_until: string | null;
  rating: number;
  review_count: number;
  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  business_hours: BusinessHours | null;
  created_at: string;
  updated_at: string;
  claimed_by: string | null;
  is_verified: boolean;
}

export interface BusinessHours {
  monday: { open: string; close: string; closed: boolean };
  tuesday: { open: string; close: string; closed: boolean };
  wednesday: { open: string; close: string; closed: boolean };
  thursday: { open: string; close: string; closed: boolean };
  friday: { open: string; close: string; closed: boolean };
  saturday: { open: string; close: string; closed: boolean };
  sunday: { open: string; close: string; closed: boolean };
}

export interface Review {
  id: string;
  business_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  city?: string;
  state?: string;
  tier?: 'free' | 'premium' | 'vip';
  is_featured?: boolean;
}
