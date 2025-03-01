"use client";

import { ReactNode, useEffect, useState } from "react";
import { LeadCollector } from "./LeadCollector";
import { Studio } from "../lib/types";

interface ClientCityPageProps {
  children: ReactNode;
  cityName: string;
  studios: Studio[];
}

export function ClientCityPage({
  children,
  cityName,
  studios,
}: ClientCityPageProps) {
  const [showLeadCollector, setShowLeadCollector] = useState(false);

  useEffect(() => {
    const POPUP_DELAY = 30000; // 30 seconds
    console.log("ClientCityPage mounted, setting timer for popup");

    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem(`hasSeenLeadPopup_${cityName}`);
      console.log("Timer fired, hasSeenPopup:", hasSeenPopup);

      if (!hasSeenPopup) {
        console.log("Showing lead collector popup");
        setShowLeadCollector(true);
        localStorage.setItem(`hasSeenLeadPopup_${cityName}`, "true");
      }
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, [cityName]);

  const handleShowLeadCollector = () => {
    console.log("Manually showing lead collector");
    setShowLeadCollector(true);
  };

  return (
    <>
      {children}

      {/* Call to Action Section */}
      <section className="bg-purple-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Try Bungee Fitness?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Book your first class today and experience the joy of flying while
            working out!
          </p>
          <button
            onClick={handleShowLeadCollector}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Get Free Consultation
          </button>
        </div>
      </section>

      {showLeadCollector && (
        <LeadCollector
          cityName={cityName}
          studios={studios.map((studio) => ({
            id: studio.id,
            name: studio.name,
            location: studio.address,
          }))}
          onClose={() => {
            console.log("Closing lead collector");
            setShowLeadCollector(false);
          }}
        />
      )}
    </>
  );
}
