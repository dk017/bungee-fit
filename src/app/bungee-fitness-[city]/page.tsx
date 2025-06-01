import { redirect } from "next/navigation";
import { cityCountryMap } from "../../lib/city-country";

// Add generateStaticParams to handle static generation
export async function generateStaticParams() {
  // Return an empty array since this is a catch-all route
  return [];
}

export default function OldCityPage({ params }: { params: { city: string } }) {
  // Add null check for params
  if (!params?.city) {
    return null;
  }

  const citySlug = params.city.toLowerCase();
  const country = cityCountryMap[citySlug] || "us";

  console.error("Old URL format detected:", {
    citySlug,
    country,
    redirectingTo: `/${country}/bungee-fitness-${citySlug}`,
  });

  redirect(`/${country}/bungee-fitness-${citySlug}`);
}
