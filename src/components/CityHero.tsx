import { City } from "../lib/supabase";

interface CityHeroProps {
  city: City;
}

export function CityHero({ city }: CityHeroProps) {
  return (
    <section className="text-center py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span className="block">Bungee Fitness Studios</span>
        <span className="block text-purple-600">
          in {city.name}, {city.state}
        </span>
      </h1>
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        Discover the best bungee fitness studios in {city.name}. Experience a
        unique workout that combines cardio, strength training, and fun!
      </p>
    </section>
  );
}
