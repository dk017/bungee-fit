"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getImageUrl, getStudioImageUrl } from "../utils/storage-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface StudioImage {
  path: string;
  alt: string;
  type: string;
  caption?: string;
}

interface ImageGalleryProps {
  featured_image_path?: string;
  gallery_image_paths?: string[];
  studioName: string;
  cityName: string;
  socialHandles?: {
    instagram?: string;
    facebook?: string;
  };
}

export const ImageGallery = ({
  featured_image_path,
  gallery_image_paths = [],
  studioName,
  cityName,
  socialHandles,
}: ImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<string[]>([]);

  // Format city name for alt text
  const formattedCityName = cityName
    ? cityName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Your City";

  // Create descriptive alt and title text
  const getImageAlt = (index: number) => {
    if (index === 0 && featured_image_path) {
      return `Featured image of ${studioName} - Bungee Fitness Studio in ${formattedCityName}`;
    }
    return `${studioName} Bungee Fitness Studio in ${formattedCityName} - Image ${
      index + 1
    }`;
  };

  useEffect(() => {
    const loadImages = async () => {
      const images: string[] = [];

      // Load featured image first if it exists
      if (featured_image_path) {
        const featuredUrl = await getImageUrl(featured_image_path as string);
        images.push(featuredUrl);
      }

      // Load gallery images
      if (gallery_image_paths.length > 0) {
        const galleryUrls = await Promise.all(
          gallery_image_paths.map(async (path) => await getImageUrl(path))
        );
        images.push(...galleryUrls);
      }

      setAllImages(images);
    };

    loadImages();
  }, [featured_image_path, gallery_image_paths]);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  if (allImages.length === 0) return null;

  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Image Container */}
        <div className="relative w-full max-w-[600px] aspect-square mx-auto overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={allImages[currentImageIndex]}
            alt={getImageAlt(currentImageIndex)}
            title={getImageAlt(currentImageIndex)}
            width={600}
            height={600}
            loading={currentImageIndex === 0 ? "eager" : "lazy"}
            className="object-contain w-full h-full"
            sizes="(max-width: 768px) 100vw, 600px"
            priority={currentImageIndex === 0}
          />

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                aria-label="Next image"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full text-white text-sm">
          {currentImageIndex + 1} / {allImages.length}
        </div>

        {/* Thumbnails - also standardized size */}
        {allImages.length > 1 && (
          <div className="mt-4 flex justify-center space-x-2 overflow-x-auto pb-2">
            {allImages.map((image, index) => (
              <button
                key={image}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-[80px] h-[80px] flex-shrink-0 overflow-hidden rounded-lg transition-all
                  ${
                    currentImageIndex === index
                      ? "ring-2 ring-purple-500 ring-offset-2"
                      : "ring-1 ring-gray-200 hover:ring-purple-300"
                  }`}
              >
                <Image
                  src={image}
                  alt={getImageAlt(index)}
                  title={getImageAlt(index)}
                  width={80}
                  height={80}
                  loading="lazy"
                  className="object-contain w-full h-full"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
        <p className="pt-4 pb-4 text-sm text-gray-500 italic">
          Image credits: {studioName}'s Instagram, Facebook, and Google
        </p>
      </div>
    </div>
  );
};
