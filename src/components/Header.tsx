import React from "react";
import Link from "next/link";

const COUNTRIES = [
  { code: "us", name: "United States" },
  { code: "au", name: "Australia" },
  { code: "uk", name: "United Kingdom" },
];

export function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 relative z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="ml-2 text-white font-bold leading-tight">
                <div className="text-xl">Bungee Fitness</div>
                <div className="text-lg">Near Me</div>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <div className="relative group">
                <button className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                  Studios
                </button>
                <div className="absolute left-0 w-48 pt-2">
                  <div className="rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                    {COUNTRIES.map((country) => (
                      <Link
                        key={country.code}
                        href={`/studios/${country.code.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                      >
                        {country.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link
                href="/about-us"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
