"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Phone, ExternalLink, BadgeCheck, Crown } from "lucide-react";

const businesses = [
  {
    id: 1,
    name: "True Products Marketing",
    category: "Marketing Agency",
    rating: 5.0,
    reviews: 47,
    location: "Chesterfield, MO",
    phone: "(314) 886-8084",
    image: "/business-1.jpg",
    tier: "vip",
    description: "Full-service digital marketing agency helping local businesses grow online presence.",
    tags: ["SEO", "Web Design", "Social Media"],
    featured: true,
  },
  {
    id: 2,
    name: "AIM Training & Consultancy",
    category: "Business Training",
    rating: 4.9,
    reviews: 32,
    location: "St. Louis, MO",
    phone: "(314) 555-0123",
    image: "/business-2.jpg",
    tier: "premium",
    description: "Professional training and consulting services for businesses of all sizes.",
    tags: ["Training", "Consulting", "Coaching"],
    featured: true,
  },
  {
    id: 3,
    name: "Missouri SEO Agency",
    category: "SEO Services",
    rating: 4.8,
    reviews: 28,
    location: "St. Charles, MO",
    phone: "(636) 555-0456",
    image: "/business-3.jpg",
    tier: "premium",
    description: "Expert SEO services to get your business ranking on page one of Google.",
    tags: ["SEO", "PPC", "Analytics"],
    featured: false,
  },
  {
    id: 4,
    name: "MJM Lawn & Land",
    category: "Landscaping",
    rating: 4.9,
    reviews: 56,
    location: "Chesterfield, MO",
    phone: "(314) 555-0789",
    image: "/business-4.jpg",
    tier: "vip",
    description: "Professional lawn care and landscaping services for residential and commercial properties.",
    tags: ["Lawn Care", "Landscaping", "Maintenance"],
    featured: true,
  },
  {
    id: 5,
    name: "Schneider Roofing",
    category: "Roofing Services",
    rating: 4.7,
    reviews: 89,
    location: "St. Louis, MO",
    phone: "(314) 555-0321",
    image: "/business-5.jpg",
    tier: "free",
    description: "Family-owned roofing company serving St. Louis for over 30 years.",
    tags: ["Roofing", "Repairs", "Inspections"],
    featured: false,
  },
  {
    id: 6,
    name: "Elite Dental Care",
    category: "Dental Services",
    rating: 4.9,
    reviews: 124,
    location: "St. Charles, MO",
    phone: "(636) 555-0654",
    image: "/business-6.jpg",
    tier: "premium",
    description: "Comprehensive dental care with state-of-the-art technology and gentle service.",
    tags: ["Dental", "Cosmetic", "Family"],
    featured: false,
  },
];

const tierBadge = {
  vip: { icon: Crown, color: "bg-gradient-to-r from-[#ffc107] to-[#f68712]", label: "VIP" },
  premium: { icon: BadgeCheck, color: "bg-gradient-to-r from-[#54afe6] to-[#bb7ce4]", label: "Premium" },
  free: { icon: BadgeCheck, color: "bg-gray-400", label: "Free" },
};

export default function FeaturedBusinesses() {
  return (
    <section id="businesses" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#54afe6]/10 text-[#54afe6] rounded-full text-sm font-semibold mb-4">
            Featured Listings
          </span>
          <h2 className="text-4xl font-bold text-[#371a5b] mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Premium & VIP Businesses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover the best local businesses in St. Louis. Our Premium and VIP members get prime visibility and exclusive benefits.
          </p>
        </div>

        {/* Business Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((business) => {
            const TierIcon = tierBadge[business.tier as keyof typeof tierBadge].icon;
            return (
              <div
                key={business.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg card-hover border ${
                  business.tier === 'vip' ? 'border-[#ffc107]/50' : business.tier === 'premium' ? 'border-[#54afe6]/50' : 'border-gray-200'
                }`}
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#371a5b] to-[#bb7ce4]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/30 text-6xl font-bold">{business.name[0]}</span>
                  </div>
                  {/* Tier Badge */}
                  <div className={`absolute top-4 right-4 ${tierBadge[business.tier as keyof typeof tierBadge].color} rounded-full px-3 py-1 flex items-center space-x-1`}>
                    <TierIcon className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-bold">{tierBadge[business.tier as keyof typeof tierBadge].label}</span>
                  </div>
                  {/* Featured Badge */}
                  {business.featured && (
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
                      <span className="text-sm text-gray-500">({business.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#371a5b] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {business.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{business.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {business.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-[#54afe6]" />
                      {business.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-[#54afe6]" />
                      {business.phone}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/business/${business.id}`}
                    className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-[#371a5b] to-[#bb7ce4] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    View Profile
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/businesses"
            className="inline-flex items-center px-8 py-4 bg-white border-2 border-[#371a5b] text-[#371a5b] rounded-full font-semibold hover:bg-[#371a5b] hover:text-white transition-colors"
          >
            View All Businesses
            <ExternalLink className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
