import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import {
  generateCityIntro,
  generateCityConclusion,
} from "../../../lib/cityContent";
import { StudioCard } from "../../../components/StudioCard";
import { AuthorCard } from "../../../components/AuthorCard";
import { ClientCityPage } from "../../../components/ClientCityPage";
import { CityFeaturedImage } from "../../../components/CityFeaturedImage";
import { getCityWithRelatedData, supabase } from "../../../lib/supabase";

export async function generateStaticParams() {
  const { data: cities } = await supabase
    .from("cities")
    .select("slug, country");
  if (!cities) return [];
  return cities.map((city) => ({
    country: city.country.toLowerCase(),
    city: `bungee-fitness-${city.slug}`,
  }));
}

interface PageProps {
  params: {
    country: string;
    city: string;
  };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const cityData = await getCityWithRelatedData(params.city);

  if (!cityData) return notFound();

  const citySlug = params.city.replace("bungee-fitness-", "");
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
      url: `https://bungeefitnessnear.me/${params.country}/bungee-fitness-${citySlug}`,
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
      canonical: `https://bungeefitnessnear.me/${params.country}/bungee-fitness-${citySlug}`,
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
  const cityData = await getCityWithRelatedData(params.city);

  if (!cityData) notFound();

  const { name, state, country, description, studios } = cityData;

  return (
    <>
      <ClientCityPage cityName={name} studios={studios}>
        <main className="min-h-screen bg-white">
          <CityFeaturedImage cityName={name} stateName={state || country} />

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
                      {name}, known for {description}, has embraced the
                      innovative workout trend of Bungee Fitness. This unique
                      aerial workout combines resistance training, cardio, and
                      dance elements while being suspended in a bungee harness.
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
                Bungee Fitness Studios near {name}
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
                  studioCount: studios.length,
                }).map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Author Section */}
          <section className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AuthorCard
                name={"Sophia Chen"}
                title={"Founder of Bungee Fitness"}
                imageUrl={"/sophia-chen.jpg"}
                bio={
                  "Sophia is the founder of Bungee Fitness. She is a certified bungee fitness instructor and has been teaching bungee fitness for 10 years. \nShe is also a certified aerial yoga instructor and has been teaching aerial yoga for 5 years. \n Out of that interest, she created Bungee Fitness to share her love for this unique workout with others."
                }
              />
            </div>
          </section>
        </main>
      </ClientCityPage>
    </>
  );
}
