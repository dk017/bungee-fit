import { redirect } from "next/navigation";
import { cityCountryMap } from "../../lib/city-country";

export default function OldCityPage({ params }: { params: { city: string } }) {
  const citySlug = params.city.toLowerCase();
  const country = cityCountryMap[citySlug] || "us";

  console.error("Old URL format detected:", {
    citySlug,
    country,
    redirectingTo: `/${country}/bungee-fitness-${citySlug}`,
  });

  redirect(`/${country}/bungee-fitness-${citySlug}`);
}
