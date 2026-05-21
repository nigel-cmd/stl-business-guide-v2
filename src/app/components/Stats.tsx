"use client";

import { TrendingUp, Users, Building2, Star, MapPin, Award } from "lucide-react";

const stats = [
  { icon: Building2, value: "500+", label: "Local Businesses", color: "from-[#54afe6] to-[#371a5b]" },
  { icon: Users, value: "25K+", label: "Monthly Visitors", color: "from-[#bb7ce4] to-[#54afe6]" },
  { icon: MapPin, value: "50+", label: "STL Area Locations", color: "from-[#ffc107] to-[#f68712]" },
  { icon: Star, value: "4.9", label: "Average Rating", color: "from-[#86c540] to-[#54afe6]" },
  { icon: Award, value: "150+", label: "Premium Partners", color: "from-[#e36087] to-[#bb7ce4]" },
  { icon: TrendingUp, value: "147%", label: "Growth Rate", color: "from-[#f68712] to-[#ffc107]" },
];

export default function Stats() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-[#371a5b] mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
