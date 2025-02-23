import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Users, Package, Star, Clock, Heart, Shield, Zap, Brain } from 'lucide-react';
import { cities, getPopularCities, formatCityState } from '../lib/locations';

const categories = [
  {
    title: 'Studios',
    icon: <MapPin className="h-6 w-6" />,
    description: 'Find certified bungee fitness studios with professional equipment and expert instructors'
  },
  {
    title: 'Classes',
    icon: <Users className="h-6 w-6" />,
    description: 'Discover various bungee fitness classes from beginner to advanced levels'
  },
  {
    title: 'Equipment',
    icon: <Package className="h-6 w-6" />,
    description: 'Explore professional bungee fitness equipment and safety gear'
  }
];

const benefits = [
  {
    icon: <Heart className="h-6 w-6 text-purple-600" />,
    title: 'Low Impact Exercise',
    description: 'Gentle on joints while providing effective resistance training, perfect for all fitness levels'
  },
  {
    icon: <Zap className="h-6 w-6 text-purple-600" />,
    title: 'High Calorie Burn',
    description: '30 seconds of bungee equals 2 minutes of traditional cardio exercise'
  },
  {
    icon: <Star className="h-6 w-6 text-purple-600" />,
    title: 'Full Body Workout',
    description: 'Combines resistance training, cardio, and core strengthening in one session'
  },
  {
    icon: <Brain className="h-6 w-6 text-purple-600" />,
    title: 'Mental Wellness',
    description: 'Reduces stress and anxiety while boosting mood through dynamic movement'
  }
];

const workoutTypes = [
  {
    title: 'Bungee Aerobics',
    description: 'High-intensity cardio with moves like high knees, leg lifts, and dynamic squats',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    title: 'Aerial Tricks',
    description: 'Advanced movements including swings, spins, and choreographed routines',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    title: 'Strength Training',
    description: 'Build muscle and improve core strength with resistance-based exercises',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

export const HomePage = () => {
  const popularCities = getPopularCities();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">Experience the Future of Fitness</span>
          <span className="block text-purple-600">with Bungee Workouts</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Discover the revolutionary workout that combines resistance training, cardio, and aerial movements. 
          30 seconds on a bungee equals 2 minutes of traditional cardio exercise!
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to={`/${popularCities[0].slug}/studios`}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            Find Studios
          </Link>
          <Link
            to={`/${popularCities[0].slug}/classes`}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 border-purple-600"
          >
            Browse Classes
          </Link>
        </div>
      </section>

      {/* What is Bungee Fitness Section */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-xl shadow-sm">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">What is Bungee Fitness?</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              Bungee Fitness is an innovative workout trend that's revolutionizing the fitness industry. 
              It combines elements of resistance exercise, cardio, and acrobatics using a specialized harness 
              and bungee cord system attached to the ceiling.
            </p>
            <p className="mb-4">
              Originally derived from aerial arts and circus performances, bungee fitness has evolved into 
              a comprehensive workout system that provides high-intensity training while being gentle on your joints.
            </p>
            <p>
              The unique combination of muscle engagement, cardiovascular benefits, and the sensation of 
              weightlessness makes it an exciting alternative to traditional workouts.
            </p>
          </div>
        </div>
      </section>

      {/* Workout Types */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Types of Bungee Workouts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workoutTypes.map((type) => (
            <div key={type.title} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={type.image} 
                alt={type.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-gray-600">{type.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Benefits of Bungee Fitness</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-purple-600 mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore Bungee Fitness</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.title} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-purple-600 mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <Link
                to={`/${popularCities[0].slug}/${category.title.toLowerCase()}`}
                className="text-purple-600 font-medium hover:text-purple-700"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Cities */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Find Bungee Fitness Near You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularCities.map((city) => (
            <Link
              key={city.slug}
              to={`/${city.slug}/studios`}
              className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow"
            >
              <MapPin className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <span className="text-gray-900 font-medium">{formatCityState(city)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">How effective is bungee fitness?</h3>
            <p className="text-gray-600">
              Bungee fitness is highly effective, with 30 seconds of bungee exercise equating to 2 minutes 
              of traditional cardio. It provides a full-body workout while being gentle on your joints.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Is there a weight limit?</h3>
            <p className="text-gray-600">
              Yes, most bungee systems have a maximum weight capacity of 400 pounds. Equipment specifications 
              vary by studio, so it's best to check with your local facility.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">What should I wear?</h3>
            <p className="text-gray-600">
              Wear form-fitting athletic wear like leggings and a fitted top. Avoid loose clothing that 
              could interfere with the bungee equipment. Sturdy athletic shoes are also essential.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">How many calories can I burn?</h3>
            <p className="text-gray-600">
              A typical 30-minute bungee fitness session can burn 300-400 calories, depending on intensity 
              and individual factors. The unique resistance training aspect helps boost metabolism.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative h-96 rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Bungee fitness class in action"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/70 to-pink-600/70 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Try Bungee Fitness?</h2>
            <p className="text-xl mb-6">Experience the most innovative workout of 2025!</p>
            <Link
              to={`/${popularCities[0].slug}/classes`}
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Find Classes Near You
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};