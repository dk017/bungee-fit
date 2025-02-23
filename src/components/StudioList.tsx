"use client";

import { useState } from "react";
import { StudioCard } from "./StudioCard";
import { StudioMap } from "./StudioMap";
import type { Studio } from "./types";

interface StudioListProps {
  studios: Studio[];
  cityName: string;
}

export const StudioList = ({ studios, cityName }: StudioListProps) => {
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);

  return (
    <div className="space-y-12">
      {/* Studios List Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8">
          Bungee Fitness Studios in {cityName}
        </h2>
        <div className="space-y-6">
          {studios.map((studio) => (
            <StudioCard
              key={studio.id}
              studio={studio}
              isSelected={selectedStudio?.id === studio.id}
              onSelect={(studio) => {
                setSelectedStudio(studio);
                // Scroll map into view
                document.getElementById("studios-map")?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            />
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div
        id="studios-map"
        className="bg-gray-50 py-12 -mx-4 sm:-mx-6 lg:-mx-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Studio Locations</h2>
          <div className="h-[600px] rounded-xl overflow-hidden shadow-lg">
            <StudioMap
              studios={studios}
              selectedStudio={selectedStudio}
              onStudioSelect={setSelectedStudio}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
