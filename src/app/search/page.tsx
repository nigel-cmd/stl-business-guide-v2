"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Star, ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { BusinessListing } from "@/lib/database.types";

function SearchContent() {
  const searchParams = useSearchParams();
  const [businesses, setBusinesses] = useState<BusinessListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const query = searchParams.get("q") || "";
  const city = searchParams.get("city") || "";
  const state = searchParams.get("state") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      try {
        const supabase = createClient();
        
        let dbQuery = supabase
          .from('businesses')
          .select('*')
          .eq('is_verified', true);

        // Text search across name, description, and category
        if (query) {
          dbQuery = dbQuery.or(
            `name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`
          );
        }

        // Filter by category
        if (category) {
          dbQuery = dbQuery.eq('category', category);
        }

        // Filter by city
        if (city) {
          dbQuery = dbQuery.ilike('city', `%${city}%`);
        }

        // Filter by state
        if (state) {
          dbQuery = dbQuery.eq('state', state);
        }

        // Order by tier (VIP first), then rating
        const { data, error: dbError } = await dbQuery
          .order('tier', { ascending: false })
          .order('rating', { ascending: false })
          .limit(50);

        if (dbError) {
          console.error('Search error:', dbError);
          setError("Failed to load search results");
        } else {
          setBusinesses(data || []);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError("An error occurred while searching");
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query, city, state, category]);

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-[#54afe6] mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl font-bold text-[#371a5b]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Search Results
          </h1>
          
          {(query || city || category) && (
            <p className="text-gray-600 mt-2">
              {query && `Searching for "${query}"`}
              {city && ` in ${city}${state ? `, ${state}` : ''}`}
              {category && ` in category "${category}"`}
            </p>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#54afe6] mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : businesses.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No results found</h2>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">Found {businesses.length} business{businesses.length !== 1 ? 'es' : ''}</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

function BusinessCard({ business }: { business: BusinessListing }) {
  const tierColors = {
    vip: "bg-gradient-to-r from-[#ffc107] to-[#f68712]",
    premium: "bg-gradient-to-r from-[#54afe6] to-[#bb7ce4]",
    free: "bg-gray-400",
  };

  return (
    <Link 
      href={`/business/${business.slug}`}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 block"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-[#371a5b] to-[#bb7ce4]">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/30 text-6xl font-bold">{business.name[0]}</span>
        </div>
        
        {/* Tier Badge */}
        <div className={`absolute top-4 right-4 ${tierColors[business.tier]} rounded-full px-3 py-1`}>
          <span className="text-white text-xs font-bold uppercase">{business.tier}</span>
        </div>
        
        {/* Featured Badge */}
        {business.is_featured && (
          <div className="absolute top-4 left-4 bg-[#e36087] rounded-full px-3 py-1">
            <span className="text-white text-xs font-bold">Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#54afe6] font-medium">{business.category}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-[#ffc107] fill-current" />
            <span className="text-sm font-semibold text-gray-700">{business.rating}</span>
            <span className="text-sm text-gray-500">({business.review_count})</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#371a5b] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {business.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{business.short_description}</p>

        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-[#54afe6]" />
          {business.city}, {business.state}
        </div>
      </div>
    </Link>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <Suspense fallback={
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#54afe6] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </main>
  );
}
