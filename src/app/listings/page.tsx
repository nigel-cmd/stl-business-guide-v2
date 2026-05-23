'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { searchBusinesses, getCategories, getCities } from '@/lib/supabase';
import type { Business, Category } from '@/lib/supabase';

export default function ListingsPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cities, setCities] = useState<{ city: string; state: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    const [businessesData, categoriesData, citiesData] = await Promise.all([
      searchBusinesses({}),
      getCategories(),
      getCities()
    ]);
    setBusinesses(businessesData);
    setCategories(categoriesData);
    setCities(citiesData);
    setLoading(false);
  }

  async function handleSearch() {
    setLoading(true);
    const filters = {
      query: searchQuery || undefined,
      category: selectedCategory || undefined,
      city: selectedCity || undefined
    };
    const results = await searchBusinesses(filters);
    setBusinesses(results);
    setLoading(false);
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
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Business Directory</h1>
          <p className="text-blue-100">Find the best local businesses in the St. Louis area</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Locations</option>
              {cities.map((city, idx) => (
                <option key={idx} value={city.city}>{city.city}, {city.state}</option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
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
            <div className="mb-4 text-gray-600">
              Showing {businesses.length} business{businesses.length !== 1 ? 'es' : ''}
            </div>

            {businesses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No businesses found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setSelectedCity('');
                    handleSearch();
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear filters
                </button>
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
                        {business.website_url && (
                          <p className="text-blue-600 truncate">
                            {business.website_url}
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

      <Footer />
    </main>
  );
}
