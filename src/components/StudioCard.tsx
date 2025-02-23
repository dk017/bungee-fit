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
} from "lucide-react";
import type { Studio } from "./types";
import { ImageGallery } from "./ImageGallery";
import { StudioPrograms } from "./StudioPrograms";
import { StudioReviews } from "./StudioReviews";

interface StudioCardProps {
  studio: Studio;
  isSelected?: boolean;
  onSelect?: (studio: Studio) => void;
  cityName: string;
}

export const StudioCard = ({
  studio,
  isSelected,
  onSelect,
  cityName,
}: StudioCardProps) => {
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
              {studio.featured && (
                <span className="bg-purple-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
              {studio.verified && (
                <span className="text-green-600 text-sm font-medium">
                  Verified Business
                </span>
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
            {studio.booking_url ? (
              <a
                href={studio.booking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Book Now</span>
              </a>
            ) : null}
          </div>
        </div>

        {/* Description */}
        {studio.description && (
          <p className="mt-4 text-gray-600 text-sm sm:text-base whitespace-pre-line">
            {studio.description}
          </p>
        )}
      </div>

      <ImageGallery
        featured_image_path={studio.featured_image_path}
        gallery_image_paths={studio.gallery_image_paths}
        studioName={studio.name}
        cityName={cityName}
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
                    <span>
                      {hours.closed
                        ? "Closed"
                        : `${hours.open} - ${hours.close}`}
                    </span>
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
                  href={`tel:${studio.phone}`}
                  className="flex items-center text-gray-600 hover:text-purple-600"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{studio.phone}</span>
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
                      ${package_.price}
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
                        {package_.features.map((feature, index) => (
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

        {/*studio.programs && studio.programs.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Classes
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studio.programs.map((program) => (
                <div
                  key={program.id}
                  className="bg-white p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium text-gray-900">
                      {program.name}
                    </h5>
                    <span className="text-sm text-gray-600">
                      {program.duration} min
                    </span>
                  </div>
                  {program.description && (
                    <p className="text-sm text-gray-600 mt-2">
                      {program.description}
                    </p>
                  )}
                  {program.level && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-purple-600 bg-purple-50 rounded">
                      {program.level}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )*/}

        {/*studio.reviews && studio.reviews.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Reviews
            </h4>
            <div className="space-y-4">
              {studio.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {review.authorName}
                    </span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="ml-1 text-gray-600">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  {review.reviewText && (
                    <p className="text-gray-600 text-sm mt-2">
                      {review.reviewText}
                    </p>
                  )}
                  <div className="mt-2 text-xs text-gray-500">
                    {review.reviewDate &&
                      new Date(review.reviewDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                    {review.source && ` • ${review.source}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )*/}
      </div>

      <div className="space-y-4">
        <StudioPrograms programs={studio.programs || []} />
        <StudioReviews reviews={studio.reviews || []} />
      </div>
    </div>
  );
};
