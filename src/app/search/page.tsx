'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { searchBusinesses, getCategories } from '@/lib/supabase';
import type { Business, Category } from '@/lib/supabase';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  useEffect(() => {
    loadData();
  }, [query, categoryParam]);

  async function loadData() {
    setLoading(true);
    const [businessesData, categoriesData] = await Promise.all([
      searchBusinesses({
        query: query || undefined,
        category: categoryParam || undefined
      }),
      getCategories()
    ]);
    setBusinesses(businessesData);
    setCategories(categoriesData);
    setLoading(false);
  }

  function handleSearch() {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    window.location.href = `/search?${params.toString()}`;
  }

  function getPlanBadgeColor(planName?: string) {
    switch (planName) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'Premium':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  return (
    <>
      {/* Search Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {query ? `Search Results for "${query}"` : 'Search Businesses'}
          </h1>
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
            <input
              type="text"
              placeholder="Search businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-lg text-gray-900"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                Found <span className="font-semibold">{businesses.length}</span> business{businesses.length !== 1 ? 'es' : ''}
                {query && ` matching "${query}"`}
                {categoryParam && ` in ${categoryParam}`}
              </p>
            </div>

            {businesses.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-md">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No businesses found</h2>
                <p className="text-gray-500 mb-4">Try adjusting your search terms or browse all listings</p>
                <Link
                  href="/listings"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Browse All Listings
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businesses.map((business) => (
                  <Link
                    key={business.id}
                    href={`/listing/${business.slug}`}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                            {business.business_name}
                          </h3>
                          {business.location && (
                            <p className="text-gray-500 text-sm">
                              {business.location.city}, {business.location.state}
                            </p>
                          )}
                        </div>
                        {business.listing?.plan && (
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPlanBadgeColor(business.listing.plan.plan_name)}`}>
                            {business.listing.plan.plan_name}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {business.description_short || 'No description available'}
                      </p>

                      {/* Categories */}
                      {business.categories && business.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {business.categories.slice(0, 3).map((bc, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              {bc.category?.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Contact */}
                      <div className="space-y-1 text-sm">
                        {business.phone && (
                          <p className="text-gray-600">
                            <span className="font-medium">Phone:</span> {business.phone}
                          </p>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="mt-4 pt-4 border-t">
                        <span className="text-blue-600 font-medium group-hover:underline">
                          View Listing →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <SearchResults />
      </Suspense>
      <Footer />
    </main>
  );
}
