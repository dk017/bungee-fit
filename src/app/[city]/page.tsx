import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import {
  generateCityIntro,
  generateCityConclusion,
} from "../../lib/cityContent";
import { StudioCard } from "../../components/StudioCard";
import { AuthorCard } from "../../components/AuthorCard";
import { ClientCityPage } from "../../components/ClientCityPage";
import { CityFeaturedImage } from "../../components/CityFeaturedImage";
import { getCityWithRelatedData } from "../../lib/supabase";

interface PageProps {
  params: {
    city: string;
  };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Remove "bungee-fitness-" prefix from the slug to get city name
  const citySlug = params.city.replace("bungee-fitness-", "");

  // Get city data from Supabase
  const cityData = await getCityWithRelatedData(citySlug);

  // Format city name for display (e.g., "new-york" -> "New York")
  const cityName =
    cityData?.name ||
    citySlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const stateOrCountry = cityData?.state || cityData?.country || "";

  return {
    title: `Bungee Fitness in ${cityName} - Find Local Studios & Classes`,
    description: `Looking for bungee fitness in ${cityName}${
      stateOrCountry ? `, ${stateOrCountry}` : ""
    }? Discover local studios, compare classes, read reviews, and start your low-impact, high-intensity fitness journey today!`,
    openGraph: {
      title: `Bungee Fitness Studios in ${cityName} - Local Classes & Reviews`,
      description: `Find the best bungee fitness studios in ${cityName}. Get fit with this unique workout that combines cardio, strength training, and fun!`,
      url: `https://bungeefitnessnear.me/bungee-fitness-${citySlug}`,
      siteName: "BungeeFitnessNear.me",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Bungee Fitness Studios in ${cityName}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Bungee Fitness in ${cityName} - Find Local Studios`,
      description: `Discover bungee fitness studios in ${cityName}. Low-impact, high-intensity workouts that are perfect for all fitness levels.`,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: `https://bungeefitnessnear.me/bungee-fitness-${citySlug}`,
    },
    keywords: [
      `bungee fitness ${cityName}`,
      `bungee workout ${cityName}`,
      "aerial fitness",
      "low impact workout",
      "fitness studios",
      "group fitness classes",
      cityName.toLowerCase(),
      "bungee exercise",
    ],
  };
}

export default async function CityPage({ params }: PageProps) {
  const citySlug = params.city.replace("bungee-fitness-", "");
  const cityData = await getCityWithRelatedData(citySlug);

  if (!cityData) notFound();

  // Destructure the data directly
  const { name, state, country, description, imageUrl, studios } = cityData;

  return (
    <ClientCityPage cityName={name}>
      <main className="min-h-screen bg-white">
        <CityFeaturedImage
          cityName={name}
          stateName={state || country}
          imageUrl={imageUrl}
        />

        {/* What is Bungee Fitness Section */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6">
                What is Bungee Fitness?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {name}, known for {description}, has embraced the innovative
                    workout trend of Bungee Fitness. This unique aerial workout
                    combines resistance training, cardio, and dance elements
                    while being suspended in a bungee harness.
                  </p>
                  <h3 className="text-xl font-semibold mb-3">
                    Benefits of Bungee Fitness:
                  </h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Low-impact, joint-friendly workout</li>
                    <li>Burns up to 500-800 calories per session</li>
                    <li>Improves core strength and stability</li>
                    <li>Enhances flexibility and coordination</li>
                    <li>Reduces stress on joints and spine</li>
                    <li>Fun, unique workout experience</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">
                    What to Expect:
                  </h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>45-60 minute classes</li>
                    <li>Professional instruction and safety guidance</li>
                    <li>Weight limits typically between 90-250 lbs</li>
                    <li>Proper attire: Form-fitting workout clothes</li>
                    <li>Beginner-friendly options available</li>
                  </ul>
                  <div className="mt-6 bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">
                      Before Your First Class:
                    </h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>✓ Wear snug-fitting athletic wear</li>
                      <li>✓ Arrive 15 minutes early</li>
                      <li>✓ Bring water and a small towel</li>
                      <li>✓ Complete any required waivers</li>
                      <li>✓ Inform instructor of any injuries</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {generateCityIntro({
                name: name,
                state: state,
                studioCount: studios.length,
                uniqueFeatures: [
                  `Known for ${description},`,
                  `${name} provides an ideal setting for this innovative workout.`,
                ],
                nearbyCity: cityData?.nearbyCity,
              }).map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Studios Listing Section */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">
              Bungee Fitness Studios in {name}
            </h2>
            <div className="space-y-6">
              {studios?.map((studio) => (
                <StudioCard key={studio.id} studio={studio} cityName={name} />
              ))}
            </div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {generateCityConclusion({
                name: name,
                state: state,
                studioCount: studios.length,
                uniqueFeatures: [
                  `Known for ${description},`,
                  `${name} provides an ideal setting for this innovative workout.`,
                ],
                nearbyCity: cityData?.nearbyCity,
              }).map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">
                  Is bungee fitness safe?
                </h3>
                <p className="text-gray-600">
                  Yes, bungee fitness is very safe when practiced under
                  certified instructors. All equipment is regularly inspected,
                  and proper form is emphasized throughout each class.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">
                  How many calories can I burn?
                </h3>
                <p className="text-gray-600">
                  A typical 60-minute bungee fitness class can burn between
                  500-800 calories, depending on intensity and individual
                  factors.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">
                  Do I need prior experience?
                </h3>
                <p className="text-gray-600">
                  No prior experience is needed. Most studios offer beginner
                  classes and provide comprehensive instruction for new
                  participants.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">
                  What should I wear?
                </h3>
                <p className="text-gray-600">
                  Wear form-fitting athletic clothes that won't ride up during
                  inversions. Leggings and a fitted top are recommended. Avoid
                  loose clothing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Author Card Section */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AuthorCard
              name="Sophia Chen"
              title="Aerial Fitness Expert & Studio Reviewer"
              imageUrl="/sophia-chen.jpg"
              bio="Hey there! I'm Sophia, your aerial fitness guide and studio explorer. With a background in Sports Science from UCLA and certification in aerial arts instruction, I've dedicated myself to discovering and reviewing the best aerial fitness experiences across the country."
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-purple-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Try Bungee Fitness?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Book your first class today and experience the joy of flying while
              working out!
            </p>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Find a Studio Near You
            </button>
          </div>
        </section>
      </main>
    </ClientCityPage>
  );
}
