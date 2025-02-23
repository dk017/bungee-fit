"use client";

import { useState } from "react";
import { StudioCard } from "./StudioCard";
import { StudioMap } from "./StudioMap";
import type { Studio } from "./types";

interface StudioListingSectionProps {
  studios: Studio[];
  cityName: string;
}

export const StudioListingSection = ({
  studios,
  cityName,
}: StudioListingSectionProps) => {
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);

  const handleStudioSelect = (studio: Studio) => {
    setSelectedStudio(studio);
    document.getElementById("studios-map")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="space-y-12">
      {/* Studios List */}
      <div className="space-y-6">
        {studios.map((studio) => (
          <StudioCard
            key={studio.id}
            studio={studio}
            cityName={cityName}
            isSelected={selectedStudio?.id === studio.id}
            onSelect={handleStudioSelect}
          />
        ))}
      </div>

      {/* Map Section */}
      <div id="studios-map" className="mt-12 pt-12 border-t border-gray-200">
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
  );
};
