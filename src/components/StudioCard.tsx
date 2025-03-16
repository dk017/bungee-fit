"use client";

import {
  Star,
  MapPin,
  Phone,
  Globe,
  Instagram,
  Mail,
  Facebook,
  CalendarDays,
  Navigation,
} from "lucide-react";
import type { Studio } from "../lib/types";
import { ImageGallery } from "./ImageGallery";
import { StudioPrograms } from "./StudioPrograms";
import { StudioReviews } from "./StudioReviews";

interface StudioCardProps {
  studio: Studio;
  isSelected?: boolean;
  onSelect?: (studio: Studio) => void;
  cityName: string;
}

type HourValue = string | { open?: string; close?: string; closed?: boolean };

// Add a helper function to get currency symbol
const getCurrencySymbol = (country?: string) => {
  switch (country?.toLowerCase()) {
    case "uk":
    case "united kingdom":
    case "gb":
      return "£";
    case "eu":
    case "europe":
    case "de":
    case "germany":
      return "€";
    default:
      return "$";
  }
};

export const StudioCard = ({
  studio,
  isSelected,
  onSelect,
  cityName,
}: StudioCardProps) => {
  const formatHours = (hours: HourValue) => {
    if (typeof hours === "string") {
      return hours;
    }
    if (hours.closed) {
      return "Closed";
    }
    if (hours.open && hours.close) {
      return `${hours.open} - ${hours.close}`;
    }
    return "Closed";
  };

  return (
    <div
      className={`bg-white border rounded-lg shadow-sm overflow-hidden ${
        isSelected ? "border-purple-500" : "border-gray-200"
      }`}
      onClick={() => onSelect?.(studio)}
    >
      {/* Header Section */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex flex-wrap items-center gap-2 sm:gap-3">
              {studio.name}
              {studio.mapsUrl && (
                <a
                  href={studio.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm rounded-full hover:bg-purple-700 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              )}
            </h3>

            <div className="mt-2 space-y-1">
              <div className="flex items-start sm:items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2 mt-1 sm:mt-0 shrink-0" />
                <span className="text-sm sm:text-base">
                  {studio.address}
                  {studio.neighborhood && `, ${studio.neighborhood}`}
                  {studio.postalCode && `, ${studio.postalCode}`}
                </span>
              </div>

              {studio.rating && (
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="font-semibold">{studio.rating}</span>
                  <span className="text-gray-500">
                    ({studio.reviewCount} reviews)
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            {studio.booking_url && (
              <a
                href={studio.booking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Book Now</span>
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        {studio.description && (
          <div className="mt-4 text-gray-600 text-sm sm:text-base">
            {studio.description
              .replace(/\\n/g, "\n")
              .split("\n")
              .filter((paragraph) => paragraph.trim() !== "")
              .map((paragraph, index) => (
                <p key={index} className={`${index > 0 ? "mt-4" : ""}`}>
                  {paragraph.trim()}
                </p>
              ))}
          </div>
        )}
      </div>

      <ImageGallery
        featured_image_path={studio.featured_image_path}
        gallery_image_paths={studio.gallery_image_paths}
        studioName={studio.name}
        cityName={cityName}
        socialHandles={{
          instagram: studio.instagramHandle,
          facebook: studio.facebookUrl,
        }}
      />

      {/* Quick Info */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Hours */}
          {studio.hoursOfOperation && (
            <div className="col-span-1">
              <h4 className="font-medium text-gray-900 mb-3">Hours</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(studio.hoursOfOperation).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize">{day}</span>
                    <span>{formatHours(hours)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements - if present */}
          {(studio.weightLimits || studio.ageLimit) && (
            <div className="col-span-1">
              <h4 className="font-medium text-gray-900 mb-3">Requirements</h4>
              <div className="space-y-1 text-sm">
                {studio.weightLimits && (
                  <div className="flex justify-between">
                    <span>Weight Range:</span>
                    <span>
                      {studio.weightLimits.min} - {studio.weightLimits.max} lbs
                    </span>
                  </div>
                )}
                {studio.ageLimit && (
                  <div className="flex justify-between">
                    <span>Minimum Age:</span>
                    <span>{studio.ageLimit} years</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="font-medium text-gray-900 mb-3">Contact</h4>
            <div className="space-y-2">
              {studio.phone && (
                <a
                  href={`tel:${studio.phone.replace(/\D/g, "")}`}
                  className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
                  aria-label={`Call ${studio.name} at ${studio.phone}`}
                  role="button"
                  tabIndex={0}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {studio.phone.replace(
                      /(\d{1})(\d{3})(\d{3})(\d{4})/,
                      "$1-$2-$3-$4"
                    )}
                  </span>
                </a>
              )}
              {studio.email && (
                <a
                  href={`mailto:${studio.email}`}
                  className="flex items-center text-gray-600 hover:text-purple-600"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{studio.email}</span>
                </a>
              )}
              {studio.website && (
                <a
                  href={studio.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-purple-600"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  <span className="text-sm">Website</span>
                </a>
              )}
              {studio.instagramHandle && (
                <a
                  href={`https://instagram.com/${studio.instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-purple-600"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  <span className="text-sm">Instagram</span>
                </a>
              )}
              {studio.facebookUrl && (
                <a
                  href={studio.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 hover:text-purple-600"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  <span className="text-sm">Facebook</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="p-4 sm:p-6 space-y-8">
        {/* Pricing Packages */}
        {studio.pricing && studio.pricing.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Pricing
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studio.pricing.map((package_) => (
                <div
                  key={package_.id}
                  className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col"
                >
                  <div className="flex-grow">
                    <h5 className="font-medium text-gray-900">
                      {package_.name}
                    </h5>
                    <p className="text-2xl font-bold text-purple-600 mt-2">
                      {getCurrencySymbol(studio.country)}
                      {package_.price}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {package_.duration}
                    </p>
                    {package_.description && (
                      <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                        {package_.description}
                      </p>
                    )}
                    {package_.features && (
                      <ul className="mt-3 space-y-1">
                        {(Array.isArray(package_.features)
                          ? package_.features
                          : Object.values(package_.features)
                        ).map((feature, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600 flex items-center"
                          >
                            <span className="mr-2">•</span> {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Book Now Button */}
                  {studio.booking_url && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <a
                        href={studio.booking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        <CalendarDays className="w-4 h-4" />
                        <span>Book Now</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Programs/Classes */}
        <StudioPrograms programs={studio.programs || []} />
        <StudioReviews reviews={studio.reviews || []} />
      </div>
    </div>
  );
};
