import Image from "next/image";
import Link from "next/link";

interface CityCardProps {
  city: {
    id: string;
    name: string;
    slug: string;
    state?: string;
    studioCount: number;
  };
  country: string;
}

export function CityCard({ city, country }: CityCardProps) {
  return (
    <Link
      href={`/${country.toLowerCase()}/bungee-fitness-${city.slug}`}
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow block"
    >
      <div className="relative w-full h-48">
        <Image
          src="/default-city-banner.png"
          alt={`Bungee Fitness in ${city.name}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h2 className="text-xl font-bold mb-1">
          Bungee Fitness in {city.name}
        </h2>
        {city.state && <p className="text-sm opacity-90">{city.state}</p>}
        <p className="text-sm mt-2">
          {city.studioCount} {city.studioCount === 1 ? "Studio" : "Studios"}
        </p>
      </div>
    </Link>
  );
}
