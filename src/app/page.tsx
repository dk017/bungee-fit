"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { supabase } from "../lib/supabase";

type FeaturedCity = {
  id: string;
  name: string;
  state: string;
  country: string;
  slug: string;
  imageUrl: string;
  studioCount: number;
  coordinates: {
    lat: number;
    lng: number;
  };
};

const benefits = [
  {
    title: "Low Impact Workout",
    description:
      "Perfect for all fitness levels, reducing stress on joints while maximizing results",
    icon: "🦿",
    details: [
      "90% reduced impact on joints",
      "Suitable for rehabilitation",
      "Safe for most fitness levels",
      "Adaptable resistance levels",
      "Perfect for injury recovery",
      "Gentle on your spine and knees",
    ],
  },
  {
    title: "High Calorie Burn",
    description:
      "Burn up to 400 calories in just 30 minutes of bungee training",
    icon: "🔥",
    details: [
      "2-3x more effective than traditional cardio",
      "Increased metabolic rate",
      "Continued calorie burn post-workout",
      "Enhanced fat burning",
      "Improved cardiovascular health",
      "Boosts endurance levels",
    ],
  },
  {
    title: "Full Body Workout",
    description:
      "Engages multiple muscle groups simultaneously for efficient training",
    icon: "💪",
    details: [
      "Targets core muscles",
      "Improves upper body strength",
      "Enhances leg power",
      "Increases flexibility",
      "Better body coordination",
      "Enhanced muscle definition",
    ],
  },
  {
    title: "Mental Benefits",
    description: "Boost your mood and mental well-being while having fun",
    icon: "🧠",
    details: [
      "Reduces stress levels",
      "Increases endorphins",
      "Builds confidence",
      "Improves focus",
      "Enhanced body awareness",
      "Fun and engaging workout",
    ],
  },
];

const bungeeClasses = [
  {
    title: "Bungee Basics",
    description:
      "Perfect for beginners learning fundamental movements and proper form",
    duration: "45 mins",
    level: "Beginner",
    icon: "🎯",
    details: [
      "Introduction to bungee equipment",
      "Basic bouncing techniques",
      "Core stability exercises",
      "Simple aerial movements",
    ],
  },
  {
    title: "Bungee Dance",
    description:
      "Combine dance moves with bungee resistance for a fun cardio session",
    duration: "60 mins",
    level: "Intermediate",
    icon: "💃",
    details: [
      "Choreographed routines",
      "Music-based movements",
      "Dynamic combinations",
      "Artistic expression",
    ],
  },
  {
    title: "Bungee HIIT",
    description: "High-intensity interval training with bungee resistance",
    duration: "45 mins",
    level: "Advanced",
    icon: "⚡",
    details: [
      "Intense cardio bursts",
      "Strength intervals",
      "Power movements",
      "Maximum calorie burn",
    ],
  },
  {
    title: "Bungee Core",
    description: "Focus on core strength and stability using bungee resistance",
    duration: "50 mins",
    level: "All Levels",
    icon: "🎯",
    details: [
      "Core-specific exercises",
      "Balance training",
      "Posture improvement",
      "Ab definition work",
    ],
  },
  {
    title: "Bungee Flow",
    description: "Combine yoga and pilates principles with bungee movements",
    duration: "60 mins",
    level: "Intermediate",
    icon: "🧘‍♀️",
    details: [
      "Flowing movements",
      "Flexibility work",
      "Mindful exercise",
      "Strength building",
    ],
  },
  {
    title: "Bungee Power",
    description:
      "Advanced class focusing on power moves and complex combinations",
    duration: "45 mins",
    level: "Advanced",
    icon: "💪",
    details: [
      "Advanced techniques",
      "Power movements",
      "Complex sequences",
      "Performance elements",
    ],
  },
];

const faqs = [
  {
    question: "Is bungee fitness safe?",
    answer:
      "Yes! Bungee fitness is supervised by certified instructors and uses professional-grade equipment. The bungee support actually reduces impact on joints while providing resistance training benefits.",
  },
  {
    question: "Who can participate?",
    answer:
      "Most adults can participate in bungee fitness. Weight limits vary by studio (typically 250-300 lbs). Consult your doctor if you have any medical conditions or concerns.",
  },
  {
    question: "What should I wear?",
    answer:
      "Wear form-fitting athletic wear that won't get tangled in the equipment. Leggings or fitted shorts, a tight-fitting top, and athletic shoes are recommended.",
  },
  {
    question: "How many calories can I burn?",
    answer:
      "A typical 60-minute bungee fitness class can burn between 400-800 calories, depending on intensity and individual factors.",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "No prior experience is needed! Beginners start with basic classes to learn proper form and technique before progressing to more advanced moves.",
  },
  {
    question: "How often should I do bungee fitness?",
    answer:
      "We recommend 2-3 sessions per week for optimal results, allowing your body time to recover between workouts.",
  },
  {
    question: "Is there a weight limit?",
    answer:
      "Yes, most studios have weight limits ranging from 250-300 lbs due to equipment specifications. Check with your local studio for specific requirements.",
  },
  {
    question: "Will I be sore after class?",
    answer:
      "Like any new exercise, you may experience some muscle soreness, particularly after your first few classes. This is normal and typically subsides as your body adapts.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    image: "/testimonials/sarah.jpg",
    quote:
      "Bungee fitness completely transformed my workout routine. It's fun, challenging, and I've seen amazing results!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Former Athlete",
    image: "/testimonials/michael.jpg",
    quote:
      "As someone with joint issues, bungee fitness has been a game-changer. I can work out intensely without the impact.",
    rating: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Yoga Instructor",
    image: "/testimonials/emma.jpg",
    quote:
      "The combination of strength training and aerial movement is unlike anything I've experienced before.",
    rating: 5,
  },
];

const CitySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState<FeaturedCity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data, error } = await supabase
          .from("cities")
          .select(
            `
            id,
            name,
            state,
            country,
            slug,
            studios (
              id,
              business_status
            )
          `
          )
          .order("name", { ascending: true });

        if (error) throw error;

        const formattedCities = data.map((city) => ({
          id: city.id,
          name: city.name,
          state: city.state || "",
          country: city.country,
          slug: city.slug,
          imageUrl: `/city-images/${city.slug}.jpg`,
          studioCount:
            city.studios?.filter((s) => s.business_status === "OPERATIONAL")
              .length || 0,
          coordinates: { lat: 0, lng: 0 }, // You can add actual coordinates if available
        }));

        setCities(formattedCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative max-w-xl mx-auto">
      <div className="flex items-center bg-white rounded-lg shadow-sm">
        <input
          type="text"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-3 rounded-l-lg focus:outline-none"
        />
        <button className="px-6 py-3 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700">
          Search
        </button>
      </div>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-2 text-gray-500">Loading cities...</div>
          ) : filteredCities.length === 0 ? (
            <div className="px-4 py-2 text-gray-500">No cities found</div>
          ) : (
            filteredCities.map((city) => (
              <Link
                key={city.id}
                href={`/${city.country.toLowerCase()}/bungee-fitness-${
                  city.slug
                }`}
                className="block px-4 py-2 hover:bg-gray-50"
              >
                <span className="font-medium">{city.name}</span>
                {city.state && (
                  <>
                    , <span className="text-gray-500">{city.state}</span>
                  </>
                )}
                <span className="text-sm text-gray-400 ml-2">
                  {city.studioCount}{" "}
                  {city.studioCount === 1 ? "studio" : "studios"}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// Add article content type
type ArticlePreview = {
  title: string;
  author: string;
  date: string;
  slug: string;
  excerpt: string;
  category: string;
};

// Add popular articles data
const popularArticles: ArticlePreview[] = [
  {
    title: "Bungee Fitness NYC – Explore Best Bungee Studios Near You",
    author: "Sophia Chen",
    date: "2024-01-15",
    slug: "bungee-fitness-nyc",
    excerpt:
      "Discover the top-rated bungee fitness studios in New York City...",
    category: "Bungee Studios, USA",
  },
  {
    title: "Bungee Fitness Chicago, Illinois – Top Bungee Studios Near You",
    author: "Sophia Chen",
    date: "2024-01-10",
    slug: "bungee-fitness-chicago",
    excerpt: "Find the best bungee fitness studios in Chicago...",
    category: "Bungee Studios, USA",
  },
  // ... more articles
];

// Add scientific benefits section
const scientificBenefits = [
  {
    title: "The Science Behind Bungee Low-Impact Exercise",
    content:
      "Behind the airborne fun is solid biomechanics: cords reduce impact, boost heart rate and engage every muscle without hammering your joints.",
  },
  {
    title: "Bungee Cord Mechanics",
    content:
      "The Bungee Cord creates an uncommon synergy of low-impact resistance. As you move, they provide a gentle, consistent pull, making each exercise a graceful dance with physics.",
  },
];

// Add equipment section
const equipmentInfo = {
  title: "Essential Bungee Fitness Equipment",
  description: "Understanding the key equipment used in bungee fitness",
  items: [
    {
      title: "Harness and Bungee Cords",
      description:
        "Professional-grade harnesses and cords designed for safety and optimal resistance",
      details: [
        "Weight-rated equipment",
        "Adjustable for different body types",
        "Regular safety inspections",
        "Professional installation",
      ],
    },
    {
      title: "Safety Equipment",
      description: "Additional safety gear required for bungee workouts",
      details: [
        "Proper footwear",
        "Ceiling mounting systems",
        "Safety clips and carabiners",
        "Emergency release mechanisms",
      ],
    },
  ],
};

export default function HomePage() {
  const [featuredCities, setFeaturedCities] = useState<FeaturedCity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCities = async () => {
      try {
        const { data, error } = await supabase
          .from("cities")
          .select(
            `
            id,
            name,
            state,
            country,
            slug,
            featured,
            studios (
              id,
              business_status
            )
          `
          )
          .eq("featured", true)
          .order("name", { ascending: true });

        if (error) throw error;

        const formattedCities = data.map((city) => ({
          id: city.id,
          name: city.name,
          state: city.state || "",
          country: city.country,
          slug: city.slug,
          imageUrl: `/city-images/${city.slug}.jpg`,
          studioCount:
            city.studios?.filter((s) => s.business_status === "OPERATIONAL")
              .length || 0,
          coordinates: { lat: 0, lng: 0 }, // You can add actual coordinates if available
        }));

        setFeaturedCities(formattedCities);
      } catch (error) {
        console.error("Error fetching featured cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCities();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Find Bungee Fitness Studios</span>
          <span className="block text-purple-600">Near You</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Discover certified bungee fitness studios in your city. Experience the
          revolutionary workout that combines resistance training, cardio, and
          aerial movements.
        </p>
        <div className="mt-8">
          <CitySearch />
        </div>
      </section>

      {/* Featured Cities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Popular Cities
          </h2>
          {loading ? (
            <div className="text-center text-gray-500">Loading cities...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCities.map((city) => (
                <Link
                  key={city.id}
                  href={`/${city.country.toLowerCase()}/bungee-fitness-${
                    city.slug
                  }`}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow block"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={city.imageUrl}
                      alt={`Bungee Fitness in ${city.name}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">
                      Bungee Fitness in {city.name}
                    </h3>
                    {city.state && (
                      <p className="text-sm opacity-90">{city.state}</p>
                    )}
                    <p className="text-sm mt-2">
                      {city.studioCount}{" "}
                      {city.studioCount === 1 ? "Studio" : "Studios"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* What is Bungee Fitness Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What is Bungee Fitness and Why is it Trending?
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Bungee Fitness is an innovative workout trend that combines
                  elements of resistance exercise, cardio, and acrobatics. Using
                  a specialized harness and bungee cord attached to the ceiling,
                  you'll experience a unique low-impact, high-intensity workout.
                </p>
                <p>
                  Originally derived from aerial arts and circus performances,
                  bungee fitness has evolved into a comprehensive workout system
                  that provides exceptional results while being gentle on your
                  joints.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a"
                alt="Bungee fitness in action"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Benefits of Bungee Fitness
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <ul className="space-y-2">
                  {benefit.details.map((detail, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="text-purple-600 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Common Bungee Classes at Studios
            </h2>
            <p className="text-xl text-gray-600">
              Discover the types of classes offered at bungee fitness studios
              worldwide. Each studio may have their own unique variations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bungeeClasses.map((classType) => (
              <div
                key={classType.title}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="text-4xl mb-4">{classType.icon}</div>
                <h3 className="text-xl font-semibold mb-4">
                  {classType.title}
                </h3>
                <p className="text-gray-600 mb-4">{classType.description}</p>
                <p className="text-gray-600">
                  <span className="font-semibold">Duration:</span>{" "}
                  {classType.duration}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Level:</span>{" "}
                  {classType.level}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="flex mt-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Latest Bungee Fitness Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <p className="text-sm text-purple-600 mb-2">
                    {article.category}
                  </p>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>By {article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{format(new Date(article.date), "MMM d, yyyy")}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scientific Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            The Science of Bungee Fitness
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {scientificBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            {equipmentInfo.title}
          </h2>
          <p className="text-xl text-gray-600 text-center mb-8">
            {equipmentInfo.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {equipmentInfo.items.map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.details.map((detail, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="text-purple-600 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
