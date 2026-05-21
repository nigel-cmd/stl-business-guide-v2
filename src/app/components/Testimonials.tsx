"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    business: "Johnson's Bakery",
    role: "Owner",
    image: "/testimonial-1.jpg",
    tier: "VIP",
    quote: "Since upgrading to VIP, our foot traffic has increased by 40%. The featured placement and social media promotion have been game-changers for our business.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    business: "Chen's Auto Repair",
    role: "Manager",
    image: "/testimonial-2.jpg",
    tier: "Premium",
    quote: "The Premium plan paid for itself in the first month. We're getting 3-4 new customer calls every week from our listing. Highly recommended!",
    rating: 5,
  },
  {
    name: "Amanda Rodriguez",
    business: "Rodriguez Law Firm",
    role: "Founding Partner",
    image: "/testimonial-3.jpg",
    tier: "VIP",
    quote: "As a VIP member, we've seen a 200% increase in consultation requests. The dedicated account manager helps us optimize our listing constantly.",
    rating: 5,
  },
  {
    name: "David Thompson",
    business: "Thompson Landscaping",
    role: "Owner",
    image: "/testimonial-4.jpg",
    tier: "Premium",
    quote: "Started with the Free plan and quickly upgraded to Premium. The photo gallery and customer reviews feature have really helped showcase our work.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#86c540]/10 text-[#86c540] rounded-full text-sm font-semibold mb-4">
            Success Stories
          </span>
          <h2 className="text-4xl font-bold text-[#371a5b] mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            What Business Owners Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join hundreds of satisfied business owners who have grown their customer base with STL Business Guide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#54afe6] to-[#bb7ce4] flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#ffc107] fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#371a5b] to-[#bb7ce4] flex items-center justify-center text-white text-xl font-bold">
                  {testimonial.name[0]}
                </div>
                <div className="ml-4">
                  <p className="font-bold text-[#371a5b]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-[#54afe6] font-medium">{testimonial.business}</p>
                </div>
                <div className="ml-auto">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    testimonial.tier === 'VIP' 
                      ? 'bg-gradient-to-r from-[#ffc107] to-[#f68712] text-white'
                      : 'bg-gradient-to-r from-[#54afe6] to-[#bb7ce4] text-white'
                  }`}>
                    {testimonial.tier}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#371a5b] to-[#bb7ce4] rounded-3xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">500+</p>
              <p className="text-white/80">Active Businesses</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">25K+</p>
              <p className="text-white/80">Monthly Visitors</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">4.9</p>
              <p className="text-white/80">Average Rating</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">147%</p>
              <p className="text-white/80">Avg. Growth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
