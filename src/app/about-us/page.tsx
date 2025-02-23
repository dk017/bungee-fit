import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | BungeeFitnessNear.me",
  description:
    "Learn about our mission to help you discover and experience the transformative power of bungee fitness workouts near you.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>

        <div className="prose prose-purple max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Welcome to BungeeFitnessNear.me, your trusted companion in
            discovering the exciting world of bungee fitness. Our platform is
            dedicated to connecting fitness enthusiasts with local bungee
            workout studios, making this innovative form of exercise more
            accessible to everyone.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Meet Our Expert
          </h2>

          <div className="bg-purple-50 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-6">
              <img
                src="/sophia-chen.jpg"
                alt="Sophia Chen"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-purple-900">
                  Sophia Chen
                </h3>
                <p className="text-purple-700 mb-4">
                  Certified Bungee Fitness Instructor & Content Director
                </p>
              </div>
            </div>

            <p className="text-gray-700 mt-4">
              "Hi there! I'm Sophia Chen, a certified fitness trainer with a
              specialization in bungee workouts and aerial fitness. With over 8
              years of experience in the fitness industry and a degree in
              Exercise Science from the University of Texas, I've made it my
              mission to help others discover the joy and benefits of bungee
              fitness.
            </p>

            <p className="text-gray-700 mt-4">
              What started as a personal passion has evolved into a journey of
              exploring and documenting bungee fitness studios across the
              country. I've experienced firsthand how this unique form of
              exercise can transform both body and mind, making fitness fun and
              accessible to people of all fitness levels.
            </p>

            <p className="text-gray-700 mt-4">
              Through BungeeFitnessNear.me, I share my expertise and insights to
              help you find the perfect bungee fitness studio near you. Join me
              in discovering how this innovative workout can revolutionize your
              fitness journey!"
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Our Mission
          </h2>

          <p className="text-gray-700 mb-6">
            At BungeeFitnessNear.me, we're committed to:
          </p>

          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li>
              Connecting you with verified bungee fitness studios in your area
            </li>
            <li>
              Providing accurate, up-to-date information about class offerings
              and pricing
            </li>
            <li>Sharing expert insights and guidance about bungee workouts</li>
            <li>Building a community of bungee fitness enthusiasts</li>
            <li>Making fitness fun, accessible, and effective for everyone</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
