import { createClient } from '@supabase/supabase-js';
import { BusinessListing, SearchFilters } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Search businesses with filters
export async function searchBusinesses(filters: SearchFilters) {
  let query = supabase
    .from('businesses')
    .select('*')
    .eq('is_verified', true);

  // Text search across name, description, and category
  if (filters.query) {
    query = query.or(
      `name.ilike.%${filters.query}%,description.ilike.%${filters.query}%,category.ilike.%${filters.query}%`
    );
  }

  // Filter by category
  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  // Filter by city
  if (filters.city) {
    query = query.ilike('city', `%${filters.city}%`);
  }

  // Filter by state
  if (filters.state) {
    query = query.eq('state', filters.state);
  }

  // Filter by tier
  if (filters.tier) {
    query = query.eq('tier', filters.tier);
  }

  // Filter featured
  if (filters.is_featured) {
    query = query.eq('is_featured', true);
  }

  // Order by tier (VIP first), then rating
  const { data, error } = await query
    .order('tier', { ascending: false })
    .order('rating', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Search error:', error);
    return [];
  }

  return data as BusinessListing[];
}

// Get featured businesses
export async function getFeaturedBusinesses(limit: number = 6) {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('is_featured', true)
    .eq('is_verified', true)
    .order('tier', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured:', error);
    return [];
  }

  return data as BusinessListing[];
}

// Get business by slug
export async function getBusinessBySlug(slug: string) {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching business:', error);
    return null;
  }

  return data as BusinessListing;
}

// Get all categories
export async function getCategories() {
  const { data, error } = await supabase
    .from('businesses')
    .select('category')
    .eq('is_verified', true);

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Extract unique categories
  const categories = [...new Set(data.map((b) => b.category))];
  return categories;
}

// Get all cities
export async function getCities() {
  const { data, error } = await supabase
    .from('businesses')
    .select('city, state')
    .eq('is_verified', true);

  if (error) {
    console.error('Error fetching cities:', error);
    return [];
  }

  // Extract unique city/state combinations
  const cities = [...new Set(data.map((b) => `${b.city}, ${b.state}`))];
  return cities;
}
