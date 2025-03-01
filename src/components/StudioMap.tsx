"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import type { Studio } from "../lib/types";

interface StudioMapProps {
  studios: Studio[];
  selectedStudio?: Studio | null;
  onStudioSelect?: (studio: Studio) => void;
}

export const StudioMap = ({
  studios,
  selectedStudio,
  onStudioSelect,
}: StudioMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
    });

    loader.load().then(() => {
      if (!mapRef.current) return;

      // Calculate bounds for all studios
      const bounds = new google.maps.LatLngBounds();
      studios.forEach((studio) => {
        bounds.extend(
          new google.maps.LatLng(studio.latitude, studio.longitude)
        );
      });

      // Create map
      const map = new google.maps.Map(mapRef.current, {
        zoom: 12,
        center: bounds.getCenter(),
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      map.fitBounds(bounds);
      mapInstanceRef.current = map;

      // Add markers
      studios.forEach((studio) => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(studio.latitude, studio.longitude),
          map,
          title: studio.name,
          icon: {
            url:
              selectedStudio?.id === studio.id
                ? "/marker-active.svg"
                : "/marker.svg",
            scaledSize: new google.maps.Size(32, 32),
          },
        });

        marker.addListener("click", () => {
          onStudioSelect?.(studio);
        });

        markersRef.current.push(marker);
      });
    });

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    };
  }, [studios, selectedStudio]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] rounded-lg overflow-hidden shadow-md"
    />
  );
};
