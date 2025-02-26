"use client";

import { ReactNode, useEffect, useState } from "react";
import { LeadCollector } from "../components/LeadCollector";
import { Studio } from "./types";

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

    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem(`hasSeenLeadPopup_${cityName}`);
      if (!hasSeenPopup) {
        setShowLeadCollector(true);
        localStorage.setItem(`hasSeenLeadPopup_${cityName}`, "true");
      }
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, [cityName]);

  return (
    <>
      {children}
      {showLeadCollector && (
        <LeadCollector
          cityName={cityName}
          studios={studios.map((studio) => ({
            id: studio.id,
            name: studio.name,
            location: studio.address, // or whatever location field you have
          }))}
          onClose={() => setShowLeadCollector(false)}
        />
      )}
    </>
  );
}
