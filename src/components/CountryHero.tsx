export function CountryHero({ country }: { country: string }) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Bungee Fitness Studios in {country}
        </h1>
        <p className="text-xl text-white opacity-90">
          Find the best bungee fitness studios near you
        </p>
      </div>
    </div>
  );
}
