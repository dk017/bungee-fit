"use client";

import { ReactNode, useEffect, useState } from "react";
import { LeadCollector } from "../components/LeadCollector";

interface ClientCityPageProps {
  children: ReactNode;
  cityName: string;
}

export function ClientCityPage({ children, cityName }: ClientCityPageProps) {
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
          onClose={() => setShowLeadCollector(false)}
        />
      )}
    </>
  );
}
