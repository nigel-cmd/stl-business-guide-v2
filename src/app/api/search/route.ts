import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const filters = {
    query: searchParams.get('q') || undefined,
    category: searchParams.get('category') || undefined,
    city: searchParams.get('city') || undefined,
    state: searchParams.get('state') || undefined,
    tier: searchParams.get('tier') as 'free' | 'premium' | 'vip' || undefined,
    is_featured: searchParams.get('featured') === 'true' || undefined,
  };

  try {
    const supabase = await createClient();
    
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
      return NextResponse.json(
        { success: false, error: 'Search failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      count: data?.length || 0,
      businesses: data || []
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}
