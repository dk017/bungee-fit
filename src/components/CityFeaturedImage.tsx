"use client";

import Image from "next/image";
import { useState } from "react";

interface CityFeaturedImageProps {
  cityName: string;
  stateName: string;
  imageUrl?: string;
}

export const CityFeaturedImage = ({
  cityName,
  stateName,
  imageUrl,
}: CityFeaturedImageProps) => {
  const [imageError, setImageError] = useState(false);

  // Base banner image for all cities if no custom image
  const baseBannerImage = "/default-city-banner.png";

  return (
    <div className="relative w-full h-[400px]">
      <Image
        src={imageUrl || baseBannerImage}
        alt={`Bungee Fitness in ${cityName}, ${stateName}`}
        fill
        priority
        className="object-cover"
        onError={() => setImageError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />

      {/* Gradient overlay for brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-600/60 to-pink-600/50" />

      {/* Text overlay with city-specific content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
            Find Bungee Fitness Studios near {cityName}
          </h1>
          <p className="text-xl md:text-2xl text-purple-100">
            Your Ultimate Guide to Bungee Workouts near {cityName}, {stateName}
          </p>
          <p className="text-lg text-purple-50/90 max-w-2xl mx-auto">
            Discover certified studios, read reviews, and start your fitness
            journey today!
          </p>
        </div>
      </div>
    </div>
  );
};
