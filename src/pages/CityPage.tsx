import React from 'react';
import { useParams } from 'react-router-dom';
import { LeadForm } from '../components/LeadForm';
import { MapPin, Users, Clock, Star } from 'lucide-react';

export const CityPage = () => {
  const { city, category } = useParams();
  const formattedCity = city?.replace('-', ' ').split('/')[0] || '';
  const formattedState = city?.split('/')[1]?.toUpperCase() || '';

  const features = [
    {
      icon: <MapPin className="h-6 w-6 text-purple-600" />,
      title: 'Prime Locations',
      description: 'Conveniently located studios across the city'
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: 'Expert Instructors',
      description: 'Certified professionals to guide your journey'
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      title: 'Flexible Schedule',
      description: 'Classes available morning through evening'
    },
    {
      icon: <Star className="h-6 w-6 text-purple-600" />,
      title: 'Top-Rated',
      description: 'Highly reviewed by our community'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Bungee Fitness {category?.charAt(0).toUpperCase()}{category?.slice(1)}</span>
          <span className="block text-purple-600">in {formattedCity}, {formattedState}</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Discover the best bungee fitness {category} in {formattedCity}. Experience a unique workout that combines cardio, strength training, and fun!
        </p>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-12 rounded-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose Bungee Fitness in {formattedCity}?
          </h2>
          <p className="text-gray-600 mb-4">
            Bungee fitness is revolutionizing the way {formattedCity} stays fit. This innovative workout 
            combines the thrill of aerial movements with effective resistance training, providing a 
            unique and engaging fitness experience.
          </p>
          <p className="text-gray-600 mb-4">
            Our {category} in {formattedCity} offer state-of-the-art facilities and expert guidance 
            to ensure you get the most out of your bungee fitness journey. Whether you're a beginner 
            or an experienced fitness enthusiast, you'll find the perfect program to match your goals.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Low-impact, high-intensity workouts</li>
            <li>Suitable for all fitness levels</li>
            <li>Experienced and certified instructors</li>
            <li>Modern facilities with latest equipment</li>
          </ul>
        </div>
        <div>
          <LeadForm city={`${formattedCity}, ${formattedState}`} interest={category || ''} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">How much does a bungee fitness class cost in {formattedCity}?</h3>
            <p className="mt-2 text-gray-600">Prices vary by studio, but typically range from $25-45 per class, with package deals and memberships available for better value.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">What should I wear to a bungee fitness class?</h3>
            <p className="mt-2 text-gray-600">Wear form-fitting athletic wear, such as leggings and a fitted top. Avoid loose clothing that could interfere with the bungee equipment.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Is bungee fitness suitable for beginners?</h3>
            <p className="mt-2 text-gray-600">Yes! Bungee fitness is adaptable to all fitness levels. Instructors will help you adjust the resistance and movements to match your ability.</p>
          </div>
        </div>
      </section>
    </div>
  );
};