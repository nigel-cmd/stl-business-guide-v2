"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Businesses", href: "#businesses" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#54afe6] to-[#bb7ce4] flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#371a5b]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                STL Business
              </span>
              <span className="text-2xl font-bold text-[#54afe6]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {" "}Guide
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-[#54afe6] font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:314-886-8084"
              className="flex items-center space-x-2 text-gray-600 hover:text-[#54afe6] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">314-886-8084</span>
            </a>
            <Link
              href="#pricing"
              className="btn-primary px-6 py-2.5 rounded-full text-white font-semibold shadow-lg"
            >
              List Your Business
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:text-[#54afe6] font-medium rounded-lg hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3">
              <a
                href="tel:314-886-8084"
                className="flex items-center space-x-2 px-3 py-2 text-gray-600"
              >
                <Phone className="w-4 h-4" />
                <span>314-886-8084</span>
              </a>
              <Link
                href="#pricing"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center btn-primary px-6 py-3 rounded-full text-white font-semibold"
              >
                List Your Business
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
