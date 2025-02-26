import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryCities } from "../../../lib/supabase";
import { CityCard } from "../../../components/CityCard";
import { CountryHero } from "../../../components/CountryHero";

// Define all possible country routes
export async function generateStaticParams() {
  return [{ country: "us" }, { country: "au" }, { country: "uk" }];
}

interface PageProps {
  params: {
    country: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const country = params.country.toUpperCase();

  return {
    title: `Bungee Fitness Studios in ${country} - Find Local Studios`,
    description: `Discover bungee fitness studios across ${country}. Find local classes, read reviews, and start your fitness journey today!`,
  };
}

export default async function CountryStudiosPage({ params }: PageProps) {
  const { cities, error } = await getCountryCities(
    params.country.toUpperCase()
  );

  if (error || !cities?.length) notFound();

  return (
    <main className="min-h-screen bg-white">
      <CountryHero country={params.country.toUpperCase()} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </section>
    </main>
  );
}
