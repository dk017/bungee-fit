import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityStudios } from "../../../../lib/supabase";
export const runtime = "edge";
interface PageProps {
  params: {
    country: string;
    city: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const country = params.country.toUpperCase();
  const city = params.city.replace("bungee-fitness-", "").toUpperCase();

  return {
    title: `Bungee Fitness Studios in ${city}, ${country} - Find Local Classes`,
    description: `Discover bungee fitness studios in ${city}, ${country}. Find local classes, read reviews, and start your fitness journey today!`,
  };
}

export default async function CityStudiosPage({ params }: PageProps) {
  const city = params.city.replace("bungee-fitness-", "").toUpperCase();
  const { studios, error } = await getCityStudios(
    params.country.toUpperCase(),
    city
  );

  if (error || !studios?.length) notFound();

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">
          Bungee Fitness Studios in {city}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio) => (
            <div key={studio.id} className="studio-card">
              {/* Add your studio card component here */}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
