import { NextRequest, NextResponse } from 'next/server';
import { searchBusinesses } from '@/lib/supabase';

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
    const businesses = await searchBusinesses(filters);
    return NextResponse.json({ 
      success: true, 
      count: businesses.length,
      businesses 
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}
