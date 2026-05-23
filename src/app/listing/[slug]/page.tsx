import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getBusinessBySlug, getFeaturedBusinesses } from '@/lib/supabase';

interface ListingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  // Get related businesses (same category or city)
  const featuredBusinesses = await getFeaturedBusinesses(3);
  const relatedBusinesses = featuredBusinesses.filter(b => b.id !== business.id);

  const planName = business.listing?.plan?.plan_name;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{business.business_name}</h1>
                {planName && (
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    planName === 'VIP' ? 'bg-purple-500' :
                    planName === 'Premium' ? 'bg-blue-400' : 'bg-gray-500'
                  }`}>
                    {planName}
                  </span>
                )}
              </div>
              {business.location && (
                <p className="text-blue-100 text-lg">
                  {business.location.city}, {business.location.state}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              {business.phone && (
                <a
                  href={`tel:${business.phone}`}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Call Now
                </a>
              )}
              {business.website_url && (
                <a
                  href={business.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              {business.description_long ? (
                <p className="text-gray-600 leading-relaxed">{business.description_long}</p>
              ) : business.description_short ? (
                <p className="text-gray-600 leading-relaxed">{business.description_short}</p>
              ) : (
                <p className="text-gray-500 italic">No description available</p>
              )}
            </div>

            {/* Categories */}
            {business.categories && business.categories.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {business.categories.map((bc, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
                    >
                      {bc.category?.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Images Gallery (if available) */}
            {business.images && business.images.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {business.images.map((image, idx) => (
                    <div key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={image.image_url}
                        alt={image.alt_text || `${business.business_name} image`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact This Business</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                {business.phone && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${business.phone}`} className="text-blue-600 hover:underline">
                      {business.phone}
                    </a>
                  </div>
                )}
                {business.email && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${business.email}`} className="text-blue-600 hover:underline">
                      {business.email}
                    </a>
                  </div>
                )}
                {business.website_url && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <a
                      href={business.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate"
                    >
                      {business.website_url.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Address */}
            {business.location && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-700">
                      {business.location.address_line_1}
                      {business.location.address_line_2 && <>, {business.location.address_line_2}</>}
                    </p>
                    <p className="text-gray-700">
                      {business.location.city}, {business.location.state} {business.location.zip_code}
                    </p>
                    {business.location.service_area && (
                      <p className="text-gray-500 text-sm mt-1">
                        Service area: {business.location.service_area}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Hours (placeholder) */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Business Hours</h2>
              <p className="text-gray-500 italic">Contact business for hours</p>
            </div>

            {/* Claim Listing */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-2">Own this business?</h3>
              <p className="text-blue-700 text-sm mb-4">
                Claim your listing to update information, add photos, and respond to reviews.
              </p>
              <Link
                href={`/claim-listing?business=${business.id}`}
                className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Claim Listing
              </Link>
            </div>
          </div>
        </div>

        {/* Related Businesses */}
        {relatedBusinesses.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Businesses</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBusinesses.map((related) => (
                <Link
                  key={related.id}
                  href={`/listing/${related.slug}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{related.business_name}</h3>
                    {related.location && (
                      <p className="text-gray-500 text-sm mb-2">
                        {related.location.city}, {related.location.state}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {related.description_short || 'No description available'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
