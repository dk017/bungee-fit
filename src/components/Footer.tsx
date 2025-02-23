"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-purple-800 text-gray-200">
      {/* Main Footer Content */}
      {/* Bottom Bar */}
      <div className="border-t border-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">
              © {new Date().getFullYear()} Bungee Fit. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link
                href="/sitemap"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
              <Link
                href="/disclaimer"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Disclaimer
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
